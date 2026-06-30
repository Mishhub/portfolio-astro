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
      // React 19's default server entry (react-dom/server.browser) schedules with
      // MessageChannel, which the Cloudflare Workers runtime doesn't provide
      // ("ReferenceError: MessageChannel is not defined"). The edge build uses
      // setTimeout-based scheduling and runs on Workers (and in Node during dev).
      // Anchored regex so only the bare specifier is rewritten, not *.edge/*.browser.
      alias: [{ find: /^react-dom\/server$/, replacement: "react-dom/server.edge" }],
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
