/**
 * Pure helpers for the first-party visitor log. Kept out of the route so
 * src/pages/api/track.ts stays readable.
 *
 * User-agent parsing is deliberately a handful of regexes rather than a
 * library: the endpoint runs on every page view, and shipping a 200 KB UA
 * database to the edge to learn "Chrome on macOS" is not a trade worth making.
 */

// Ordered widest-net first. Covers crawlers, previewers (Slack/Discord/
// WhatsApp unfurls), uptime checkers, SEO scrapers and LLM training bots.
const BOT_RE =
  /bot\b|bots\b|crawl|spider|slurp|scrape|search|archiver|facebookexternalhit|preview|curl|wget|python-requests|okhttp|axios|node-fetch|go-http|java\/|headless|phantom|lighthouse|pagespeed|pingdom|uptime|monitor|semrush|ahrefs|mj12|dotbot|bytespider|gptbot|claudebot|anthropic|perplexity|applebot|yandex|baidu|duckduck/i;

/** True for automated traffic. Cheap and imperfect — flags, never blocks. */
export const isBot = (ua: string): boolean => !ua || BOT_RE.test(ua);

export interface UAParts {
  browser: string;
  os: string;
  device: "desktop" | "mobile" | "tablet";
}

/** Order matters: Edge and Opera both claim "Chrome", Chrome claims "Safari". */
export function parseUA(ua: string): UAParts {
  const browser = /Edg\//.test(ua)
    ? "Edge"
    : /OPR\/|Opera/.test(ua)
      ? "Opera"
      : /Firefox\/|FxiOS/.test(ua)
        ? "Firefox"
        : /SamsungBrowser/.test(ua)
          ? "Samsung Internet"
          : /Chrome\/|CriOS/.test(ua)
            ? "Chrome"
            : /Safari\//.test(ua)
              ? "Safari"
              : "Other";

  const os = /Windows NT/.test(ua)
    ? "Windows"
    : /Android/.test(ua)
      ? "Android"
      : /iPhone|iPad|iPod/.test(ua)
        ? "iOS"
        : /Mac OS X|Macintosh/.test(ua)
          ? "macOS"
          : /CrOS/.test(ua)
            ? "ChromeOS"
            : /Linux/.test(ua)
              ? "Linux"
              : "Other";

  // iPadOS 13+ reports a desktop Safari UA, so tablets are undercounted here.
  const device = /iPad|Tablet|PlayBook|Silk/.test(ua)
    ? "tablet"
    : /Mobi|Android|iPhone|iPod/.test(ua)
      ? "mobile"
      : "desktop";

  return { browser, os, device };
}

/**
 * Pseudonymous visitor id: SHA-256 over a secret salt, the IP and the UA,
 * truncated to 16 hex chars.
 *
 * Storing this instead of the IP means repeat visits still link together while
 * the raw address never lands in the database. Rotating VISITOR_SALT breaks
 * that linkage for everyone already recorded — which is the intended escape
 * hatch, not a bug.
 */
export async function visitorId(ip: string, ua: string, salt: string): Promise<string> {
  const data = new TextEncoder().encode(`${salt}|${ip}|${ua}`);
  const digest = await crypto.subtle.digest("SHA-256", data);
  return Array.from(new Uint8Array(digest).slice(0, 8))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}
