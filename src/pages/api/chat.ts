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

  let upstream: Response;
  try {
    upstream = await fetch(`${base}/api/chat`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...(clientIp ? { "X-Forwarded-For": clientIp } : {}),
      },
      body: await request.text(), // backend validates size + schema
      signal: AbortSignal.timeout(120_000),
    });
  } catch {
    return json({ detail: "The assistant is unreachable right now." }, 502);
  }

  // Pass the SSE body through as a live stream — never buffer it, or
  // tokens would arrive in one lump after generation finishes.
  return new Response(upstream.body, {
    status: upstream.status,
    headers: {
      "Content-Type": upstream.headers.get("content-type") ?? "text/event-stream",
      "Cache-Control": "no-cache",
    },
  });
};
