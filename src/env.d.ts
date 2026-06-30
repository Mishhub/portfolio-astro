/// <reference path="../.astro/types.d.ts" />
/// <reference types="@astrojs/cloudflare" />

// Secrets/bindings available at runtime on Cloudflare (set in the dashboard) and
// locally via .dev.vars. Accessed through `Astro.locals.runtime.env`.
interface Env {
  RESEND_API_KEY: string;
}

type Runtime = import("@astrojs/cloudflare").Runtime<Env>;

declare namespace App {
  interface Locals extends Runtime {}
}
