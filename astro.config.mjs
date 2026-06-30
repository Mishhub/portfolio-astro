// @ts-check
import { defineConfig } from "astro/config";
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
