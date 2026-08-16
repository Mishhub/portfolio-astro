import type { APIRoute } from "astro";
import { isBot, parseUA, visitorId } from "@/lib/analytics";

// Run on-demand (Cloudflare Worker) rather than being prerendered.
export const prerender = false;

// Beacon endpoint for the first-party visitor log.
//
// Why a beacon at all: every page on this site is prerendered and served
// straight from the ASSETS binding, so the Worker never runs on a page load and
// there is no request for middleware to observe. The layout posts here instead.
//
// Two message types, both from src/components/analytics/Analytics.astro:
//   { t: "view",  ... }  -> INSERT a row
//   { t: "dwell", id, ms } -> fill in how long that page stayed on screen
//
// Geo/network fields come from `request.cf`, which the Workers runtime attaches
// to every request for free. No IP-geolocation API, no key, no rate limit.

/** Trim to a column-sized string, collapsing empties to NULL. */
const str = (v: unknown, max: number): string | null => {
  if (typeof v !== "string") return null;
  const s = v.trim();
  return s ? s.slice(0, max) : null;
};

const ok = () => new Response(null, { status: 204 });

export const POST: APIRoute = async ({ request, locals }) => {
  // The beacon is always same-origin, so the endpoint's own origin is the only
  // legitimate caller. Comparing against the request URL (rather than SITE.url)
  // keeps localhost and preview deployments working without a special case.
  if (request.headers.get("origin") !== new URL(request.url).origin) {
    return new Response(null, { status: 403 });
  }

  const db = locals.runtime?.env?.ANALYTICS_DB;
  // Not configured (no D1 binding yet) — accept and drop, so a missing binding
  // never surfaces as console errors on the site.
  if (!db) return ok();

  let body: Record<string, unknown>;
  try {
    body = (await request.json()) as Record<string, unknown>;
  } catch {
    return new Response(null, { status: 400 });
  }

  const id = str(body.id, 64);
  if (!id) return new Response(null, { status: 400 });

  // Fire-and-forget: the visitor's browser should not wait on our bookkeeping.
  const detach = (work: Promise<unknown>) => {
    const swallowed = work.catch(() => {});
    const ctx = locals.runtime?.ctx;
    if (ctx?.waitUntil) ctx.waitUntil(swallowed);
    return swallowed;
  };

  if (body.t === "dwell") {
    const ms =
      typeof body.ms === "number" && body.ms > 0 ? Math.min(Math.round(body.ms), 7_200_000) : null;
    if (!ms) return ok();
    // `dwell_ms IS NULL` makes this idempotent — a page hidden, revealed and
    // hidden again must not overwrite the first, honest measurement.
    detach(
      db
        .prepare("UPDATE visits SET dwell_ms = ?1 WHERE id = ?2 AND dwell_ms IS NULL")
        .bind(ms, id)
        .run(),
    );
    return ok();
  }

  if (body.t !== "view") return new Response(null, { status: 400 });

  const ua = request.headers.get("user-agent") ?? "";
  const ip = request.headers.get("cf-connecting-ip") ?? "";
  const { browser, os, device } = parseUA(ua);

  // `cf` is typed loosely by the adapter; read defensively rather than casting
  // to a workers-types interface that may drift.
  const cf = (locals.runtime?.cf ?? {}) as Record<string, unknown>;
  const cfStr = (key: string, max = 96) => str(cf[key], max);

  const salt = locals.runtime?.env?.VISITOR_SALT ?? import.meta.env.VISITOR_SALT ?? "unsalted";

  detach(
    visitorId(ip, ua, salt).then((visitor) =>
      db
        .prepare(
          `INSERT OR IGNORE INTO visits (
             id, ts, visitor_id, session_id, path, referrer,
             utm_source, utm_medium, utm_campaign,
             country, region, city, postal_code, timezone, asn, asn_org, colo,
             browser, os, device, screen, lang, is_bot, ua
           ) VALUES (
             ?1, ?2, ?3, ?4, ?5, ?6,
             ?7, ?8, ?9,
             ?10, ?11, ?12, ?13, ?14, ?15, ?16, ?17,
             ?18, ?19, ?20, ?21, ?22, ?23, ?24
           )`,
        )
        .bind(
          id,
          new Date().toISOString(),
          visitor,
          str(body.sid, 64) ?? "unknown",
          str(body.path, 256) ?? "/",
          str(body.ref, 512),
          str(body.us, 96),
          str(body.um, 96),
          str(body.uc, 96),
          cfStr("country", 8),
          cfStr("region"),
          cfStr("city"),
          cfStr("postalCode", 24),
          cfStr("timezone", 64),
          typeof cf.asn === "number" ? cf.asn : null,
          cfStr("asOrganization", 128),
          cfStr("colo", 8),
          browser,
          os,
          device,
          str(body.screen, 24),
          str(body.lang, 24),
          isBot(ua) ? 1 : 0,
          ua.slice(0, 512),
        )
        .run(),
    ),
  );

  return ok();
};
