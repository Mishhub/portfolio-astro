# Engineering Portfolio

A fast, accessible, SEO-complete portfolio for a senior software engineer — built with
Astro, Tailwind CSS and TypeScript. Dark-mode first, light-mode supported, with a small
amount of JavaScript shipped only where it earns its place.

## Stack

- **[Astro 5](https://astro.build)** — static output, View Transitions, content collections
- **[Tailwind CSS v4](https://tailwindcss.com)** — CSS-first config, OKLCH design tokens
- **TypeScript** (strict) · **MDX** for articles & case studies
- **React 19** islands — only the theme toggle and mobile nav are hydrated
- **astro-icon** (Lucide) — icons inlined as SVG at build time, zero runtime JS
- **@astrojs/sitemap**, **@astrojs/rss**, **sharp** (image + asset generation)

> **Node version**: Astro 7 requires Node ≥ 22.12. This project targets the installed
> Node 20.17 and is therefore pinned to the latest **Astro 5.x**, which is fully featured
> and stable. Bump to Astro 7 after upgrading Node if you wish.

## Getting started

```bash
npm install
npm run dev        # http://localhost:4321
npm run build      # astro check (typecheck) + astro build  ->  dist/
npm run preview    # serve the production build
npm run format     # prettier
```

## Make it yours

Almost everything personal lives in a few files:

| What | Where |
| --- | --- |
| Name, role, tagline, socials, email, nav, résumé link | `src/config/site.ts` |
| Work history (timeline) | `src/data/experience.ts` |
| Skills + levels | `src/data/skills.ts` |
| Certifications | `src/data/certifications.ts` |
| Pinned repos / OSS stats | `src/data/open-source.ts` |
| AI learning topics & roadmap | `src/data/ai-journey.ts` |
| Home value-props, tech list, highlights | `src/data/home.ts` |
| Colours, fonts, radii (design tokens) | `src/styles/global.css` |

**Placeholders to replace** (intentionally bracketed or `#`):

- Company names in `src/data/experience.ts`
- Certification names / credential URLs in `src/data/certifications.ts`
- Repository URLs in `src/data/open-source.ts`
- Social URLs + display name in `src/config/site.ts`
- A real headshot: pass `src` to `<Avatar />` (e.g. an image in `src/assets`)
- The contact form `action` in `src/pages/contact.astro` (wire to Formspree / Resend / etc.)

## Writing content

Content collections are validated against schemas in `src/content.config.ts`.

- **Articles** → `src/content/articles/*.mdx`
- **Projects** → `src/content/projects/*.mdx` (rich frontmatter + optional body)
- **Case studies** → `src/content/case-studies/*.mdx`

The filename is the slug. Frontmatter is type-checked on build, so a missing/incorrect
field fails fast. Import foundation components inside MDX, e.g.
`import Callout from "@/components/ui/Callout.astro"`.

**Diagrams** are authored as standalone `.astro` components in
`src/components/diagrams/` (inline SVG + scoped styles, theme-aware via `currentColor`)
and imported into MDX — this keeps them crisp and ships zero JavaScript. See
`EventDrivenPaymentsDiagram.astro` for the pattern.

## Brand assets

Favicons, the apple-touch icon, PWA icons and the 1200×630 Open Graph card are generated
from `public/favicon.svg` and an inline template:

```bash
node scripts/generate-assets.mjs
```

## Architecture

```
src/
├─ components/
│  ├─ ui/         reusable primitives (Button, Card, Section, Tag, Stat, Prose…)
│  ├─ layout/     Header, Footer, nav islands, PageHeader, Breadcrumbs
│  ├─ cards/      ProjectCard, ArticleCard, CaseStudyCard
│  ├─ sections/   home-page sections + reusable ContactCTA
│  ├─ diagrams/   zero-JS SVG system diagrams for case studies
│  └─ seo/        BaseHead (meta, OG, Twitter, JSON-LD)
├─ content/       articles, projects, case-studies (MDX)
├─ data/          typed content modules (experience, skills, …)
├─ layouts/       BaseLayout, ArticleLayout
├─ lib/           utils, seo (JSON-LD builders), content helpers
├─ pages/         routes (incl. dynamic [slug], rss.xml, robots.txt)
├─ config/        site config (single source of identity)
└─ styles/        global.css (tokens, prose theme, view transitions)
```

## SEO

Per-page titles & descriptions, canonical URLs, Open Graph + Twitter cards, JSON-LD
(`Person`, `WebSite`, `ProfilePage`, `TechArticle`, `BreadcrumbList`), a sitemap, an RSS
feed and `robots.txt` are all wired up. Update `SITE.url` in `src/config/site.ts` to your
production origin before deploying.

## Deploy

It's a static site — deploy `dist/` anywhere (Vercel, Netlify, Cloudflare Pages, GitHub
Pages). No server required.

---

Built with [Astro](https://astro.build).
