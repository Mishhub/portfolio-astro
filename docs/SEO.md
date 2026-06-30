# SEO Reference

The site implements all of this in code (`src/components/seo/BaseHead.astro`, `src/lib/seo.ts`).
This file documents the per-page metadata and the structured data, and is a handy copy/paste
reference. Replace `https://mishhub.com` with the real production origin (`SITE.url`).

## Meta titles & descriptions

| Page | Title (`<title>` appends "· Mohammed Mishhub") | Meta description |
| --- | --- | --- |
| Home | Mohammed Mishhub — Senior Full Stack Software Engineer | Senior Full Stack Engineer with 7+ years building and scaling web & Web3 platforms — NestJS, Node.js, React, Django, PostgreSQL, Redis and distributed systems. |
| About | About | Senior full-stack engineer (7+ yrs) across FinTech and Web3 — backend architecture, distributed systems, authentication and identity, from India to Dubai. |
| Experience | Experience | 7+ years across LMNTO, Coolshop, Connectopia, Stead and AgileCrew — event-driven microservices, auth/identity, Web3 and real-time systems. |
| Projects | Projects | Selected engineering work — NodeLink, Zenit World, a Web3 SSO & wallet platform, Spovio, Puretax and more. NestJS, Django, React, Solidity. |
| Case Studies | Case Studies | In-depth engineering case studies on compliance, identity, copy-trading, multi-tenant reporting and real-time systems. |
| Articles | Articles | Notes on authentication, NestJS, event-driven systems, Redis/BullMQ, Web3 and AI engineering. |
| AI Journey | AI Engineering Journey | Documenting an active transition into production AI engineering — LLMs, RAG, agents, MCP, LangGraph and more. |
| Skills | Skills | Full-stack skill matrix — TypeScript, NestJS, Node.js, React, Next.js, Django, Solidity, PostgreSQL, Redis, AWS/GCP. |
| Open Source | Open Source | Open-source work including nestjs-minio-backend and a calendar library with 100+ weekly npm downloads. |
| Certifications | Certifications & Courses | Courses and certifications across full-stack web, Ethereum & Solidity, React Native and AI engineering. |
| Resume | Résumé | Print-optimized résumé for a Senior Full Stack Software Engineer — experience, skills and certifications. |
| Contact | Get in touch | Open to senior & staff full-stack / backend roles. Reach out about the work or a problem you're solving. |

## Keywords (used naturally, never stuffed)

Senior Full Stack Engineer · Backend Engineer · Software Architect · System Design · NestJS · Node.js ·
React · Next.js · TypeScript · Python · Django · PostgreSQL · Redis · BullMQ · gRPC · Docker · AWS · GCP ·
OAuth2 · OpenID Connect · Authentication · Identity Platform · Distributed Systems · Microservices ·
Event-Driven Architecture · Real-Time · WebSockets · GraphQL · Blockchain · Web3 · Solidity · FinTech ·
AI Engineer · LLM Engineering · RAG · MCP · Vector Database.

## JSON-LD — Person (home)

```json
{
  "@context": "https://schema.org",
  "@type": "Person",
  "@id": "https://mishhub.com/#person",
  "name": "Mohammed Mishhub",
  "url": "https://mishhub.com",
  "jobTitle": "Senior Full Stack Software Engineer",
  "email": "mailto:mishhub@gmail.com",
  "address": { "@type": "PostalAddress", "addressLocality": "Dubai", "addressCountry": "AE" },
  "sameAs": [
    "https://github.com/mishhub",
    "https://www.linkedin.com/in/mishhub",
    "https://stackoverflow.com/users/8920915/mishhubmohammed"
  ],
  "knowsAbout": ["Full Stack Development","NestJS","Node.js","React","Next.js","Django","Distributed Systems","Microservices","OAuth2","OpenID Connect","PostgreSQL","Redis","Blockchain","Web3","Solidity","FinTech","AI Engineering"]
}
```

## JSON-LD — WebSite

```json
{
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": "https://mishhub.com/#website",
  "url": "https://mishhub.com",
  "name": "Mohammed Mishhub — Senior Full Stack Software Engineer",
  "publisher": { "@id": "https://mishhub.com/#person" },
  "inLanguage": "en"
}
```

## JSON-LD — Blog (articles index)

```json
{
  "@context": "https://schema.org",
  "@type": "Blog",
  "@id": "https://mishhub.com/articles/#blog",
  "url": "https://mishhub.com/articles",
  "name": "Mohammed Mishhub — Articles",
  "author": { "@id": "https://mishhub.com/#person" }
}
```

Article and case-study pages emit `TechArticle` + `BreadcrumbList`; every TechArticle includes an `image`.

## Open Graph & Twitter (defaults; per-page overrides supported)

```
og:type        = website (profile on home, article on articles)
og:site_name   = Mohammed Mishhub
og:title       = <page title>
og:description = <page description>
og:image       = https://mishhub.com/og/default.png   (1200x630)
og:locale      = en_US
twitter:card   = summary_large_image
```

## Canonical URLs

Every page sets `<link rel="canonical">` to its absolute URL. Suggested canonical examples:
`https://mishhub.com/`, `/about`, `/experience`, `/projects`, `/projects/nodelink`,
`/case-studies/nodelink`, `/articles`, `/articles/<slug>`, `/ai-engineering`, `/skills`,
`/open-source`, `/certifications`, `/resume`, `/contact`.

Also shipped: `robots.txt`, `sitemap-index.xml`, `rss.xml`.
