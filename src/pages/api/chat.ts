import type { APIRoute } from "astro";

// Run on-demand (Cloudflare Worker) rather than being prerendered.
export const prerender = false;

// Same-origin proxy to the chatbot backend (FastAPI on HF Spaces).
// Why proxy instead of calling the Space from the browser:
//  - the backend URL never appears in page source,
//  - no CORS in play (same origin),
//  - this Worker is an enforcement point (Turnstile/rate rules can be
//    added here later without touching the Python service),
//  - we forward the real client IP so the backend's per-IP rate limit
//    keys on visitors, not on Cloudflare's egress.

const json = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { "Content-Type": "application/json" },
  });

const upstreamBase = (locals: App.Locals): string | null => {
  const url = locals.runtime?.env?.CHATBOT_API_URL ?? import.meta.env.CHATBOT_API_URL;
  return url ? url.replace(/\/+$/, "") : null;
};

/** Warm-up / readiness probe. The widget pings this when the chat opens so
 * a sleeping free-tier container starts waking before the first question. */
export const GET: APIRoute = async ({ locals }) => {
  const base = upstreamBase(locals);
  if (!base) return json({ status: "unconfigured" }, 503);
  try {
    const res = await fetch(`${base}/api/health`, {
      signal: AbortSignal.timeout(60_000), // cold starts can take a while
    });
    return json(await res.json(), res.status);
  } catch {
    return json({ status: "unreachable" }, 503);
  }
};

export const POST: APIRoute = async ({ request, locals }) => {
  const base = upstreamBase(locals);
  if (!base) return json({ detail: "Chat is not configured yet." }, 503);

  const contentType = request.headers.get("content-type") ?? "";
  if (!contentType.includes("application/json")) {
    return json({ detail: "Expected application/json." }, 415);
  }

  // cf-connecting-ip is set by Cloudflare from the true client. Forwarding
  // it as X-Forwarded-For gives the backend chain [client, worker-egress];
  // with TRUSTED_PROXY_HOPS=2 the backend rate-limits per real visitor.
  const clientIp = request.headers.get("cf-connecting-ip");
  const body = await request.text(); // read once; reused across retries

  // Free-tier Spaces return an instant 5xx (or refuse the connection) while
  // cold-booting, which takes ~12-60s. Rather than surfacing that as a hard
  // "unavailable" error, retry through the boot: the widget keeps showing
  // "Waking up the assistant…" the whole time and then streams the answer.
  // Non-5xx responses (2xx success, 429 rate limit, 4xx) return immediately.
  const deadline = Date.now() + 90_000; // under the widget's 120s POST timeout
  const RETRY_DELAY_MS = 4_000;

  while (true) {
    const remaining = deadline - Date.now();
    if (remaining <= 0) {
      return json({ detail: "The assistant is waking up — please try again in a moment." }, 503);
    }

    let upstream: Response | null = null;
    try {
      upstream = await fetch(`${base}/api/chat`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(clientIp ? { "X-Forwarded-For": clientIp } : {}),
        },
        body, // backend validates size + schema
        signal: AbortSignal.timeout(Math.min(remaining, 60_000)),
      });
    } catch {
      // fetch threw (unreachable / per-attempt timeout) — treat as cold, retry.
    }

    // Success or a non-retryable status: pass the SSE body through as a live
    // stream — never buffer it, or tokens would arrive in one lump.
    if (upstream && upstream.status < 500) {
      return new Response(upstream.body, {
        status: upstream.status,
        headers: {
          "Content-Type": upstream.headers.get("content-type") ?? "text/event-stream",
          "Cache-Control": "no-cache",
        },
      });
    }

    // Cold 5xx (or threw). Discard any body and wait before the next attempt,
    // unless another delay would blow the deadline.
    upstream?.body?.cancel();
    if (Date.now() + RETRY_DELAY_MS >= deadline) {
      return json({ detail: "The assistant is waking up — please try again in a moment." }, 503);
    }
    await new Promise((resolve) => setTimeout(resolve, RETRY_DELAY_MS));
  }
};
