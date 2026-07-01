// @ts-check
import { defineConfig } from "astro/config";
import cloudflare from "@astrojs/cloudflare";
import react from "@astrojs/react";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import icon from "astro-icon";
import tailwindcss from "@tailwindcss/vite";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";

import { SITE } from "./src/config/site";

// React 19's server entries need different builds per runtime:
//  - `astro dev` runs SSR in Node, where `react-dom/server.browser` works
//    (Node provides MessageChannel) but `server.edge` (CommonJS) throws
//    "require is not defined" under Vite's dev SSR.
//  - `astro build` output runs on the Cloudflare Workers (workerd) runtime,
//    which has no MessageChannel — so `server.browser` throws at deploy and we
//    must use `server.edge` (setTimeout-based scheduling), bundled by the build.
// So we only apply the server.edge alias for builds; dev uses the adapter default.
const isBuild = process.argv.includes("build");

// https://astro.build/config
export default defineConfig({
  site: SITE.url,
  trailingSlash: "never",
  // Static by default — every page is prerendered to the CDN. Only routes that
  // opt out with `export const prerender = false` (e.g. src/pages/api/contact.ts)
  // run on-demand as Cloudflare Pages Functions.
  adapter: cloudflare({
    // Exposes Cloudflare bindings/secrets via `locals.runtime.env` during
    // `astro dev` (reads .dev.vars), matching production behaviour.
    platformProxy: { enabled: true },
  }),
  prefetch: {
    prefetchAll: true,
    defaultStrategy: "viewport",
  },
  integrations: [
    react(),
    mdx(),
    icon({ iconDir: "src/icons" }),
    sitemap({
      filter: (page) => !page.includes("/og/"),
    }),
  ],
  vite: {
    plugins: [tailwindcss()],
    resolve: {
      // Build only: force the Workers-safe React server entry (see note above).
      // In dev we leave the adapter's server.browser alias in place.
      alias: isBuild
        ? [{ find: /^react-dom\/server$/, replacement: "react-dom/server.edge" }]
        : [],
    },
  },
  markdown: {
    syntaxHighlight: "shiki",
    shikiConfig: {
      themes: {
        light: "github-light",
        dark: "github-dark-dimmed",
      },
      wrap: true,
    },
    rehypePlugins: [
      rehypeSlug,
      [
        rehypeAutolinkHeadings,
        {
          behavior: "append",
          properties: { className: ["heading-anchor"], ariaHidden: true, tabIndex: -1 },
        },
      ],
    ],
  },
  image: {
    // Allow remote avatars / OG sources if ever needed; local assets preferred.
    responsiveStyles: true,
    layout: "constrained",
  },
  experimental: {
    clientPrerender: true,
  },
});
