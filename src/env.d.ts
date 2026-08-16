/// <reference path="../.astro/types.d.ts" />
/// <reference types="@astrojs/cloudflare" />

// Secrets/bindings available at runtime on Cloudflare (set in the dashboard) and
// locally via .dev.vars. Accessed through `Astro.locals.runtime.env`.
interface Env {
  RESEND_API_KEY: string;
  /** Base URL of the chatbot backend (HF Space), e.g. https://mishhub-portfolio-chatbot.hf.space */
  CHATBOT_API_URL: string;
  /** Visitor log — D1 binding declared in wrangler.jsonc. Schema: db/schema.sql. */
  ANALYTICS_DB: D1Database;
  /** Secret salt for the pseudonymous visitor hash. Rotating it unlinks history. */
  VISITOR_SALT: string;
}

type Runtime = import("@astrojs/cloudflare").Runtime<Env>;

declare namespace App {
  interface Locals extends Runtime {}
}
