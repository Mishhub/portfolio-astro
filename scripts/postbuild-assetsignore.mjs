/**
 * Cloudflare Workers deploy (`wrangler deploy`) serves ./dist as static assets,
 * while the SSR entry is ./dist/_worker.js/index.js (declared as `main` in
 * wrangler.jsonc). Without this file, wrangler tries to upload _worker.js as a
 * public asset and aborts ("Uploading a Pages _worker.js directory as an asset").
 *
 * _routes.json is a Cloudflare Pages-only artifact and unused under Workers.
 *
 * Runs automatically after `npm run build` via the npm `postbuild` lifecycle.
 */
import { writeFileSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const dist = resolve(dirname(fileURLToPath(import.meta.url)), "..", "dist");
writeFileSync(resolve(dist, ".assetsignore"), "_worker.js\n_routes.json\n");
console.log("✓ dist/.assetsignore — excludes _worker.js & _routes.json from asset upload");
