# SEO Reference

The site implements all of this in code (`src/components/seo/BaseHead.astro`, `src/lib/seo.ts`).
This file documents the per-page metadata and the structured data, and is a handy copy/paste
reference. Replace `https://mishhub.com` with the real production origin (`SITE.url`).

## Meta titles & descriptions

| Page | Title (`<title>` appends "· Mohammed Mishhub") | Meta description |
| --- | --- | --- |
| Home | Mohammed Mishhub — Senior Full Stack Engineer | Senior Full Stack Engineer (7+ yrs): NestJS, Django, FastAPI & React platforms for 3M+ users — now shipping production agentic AI with LangGraph, RAG & MCP. |
| About | About | A senior full-stack engineer (7+ yrs) across FinTech and Web3 — distributed systems, authentication and identity, and production agentic AI. |
| Experience | Experience | 7+ years across LMNTO, Coolshop, Connectopia, Stead and AgileCrew — event-driven microservices, auth/identity, Web3 and real-time systems. |
| Projects | Projects | Selected engineering work — a multi-agent AI assistant, a payouts settlement & double-entry ledger, NodeLink, Zenit World, a Web3 SSO & wallet platform, a RAG chatbot and more. |
| Case Studies | Case Studies | In-depth engineering case studies on multi-agent AI, payouts and ledgers, compliance, identity, copy-trading, RAG and multi-tenant reporting. |
| Articles | Articles | Notes on authentication, NestJS, event-driven systems, Redis/BullMQ, Web3 and AI engineering. |
| AI Engineering | AI Engineering — Agentic & Generative AI | Production agentic and generative AI: a multi-agent LangGraph assistant, an MCP-based PR-review agent and a RAG chatbot — after Ed Donner's AI Engineer tracks. |
| Skills | Skills — Full Stack, Distributed Systems & AI | A grouped skill matrix across backend, frontend, architecture, data, messaging, cloud, observability and agentic & generative AI, each rated on a four-level scale. |
| Open Source | Open Source | Open-source work: the production RAG chatbot behind this site and published NestJS and JavaScript packages on npm. |
| Certifications | Certifications & Courses | Certifications led by Ed Donner's AI Engineer Core and Agentic tracks, alongside full-stack web, Ethereum & Solidity and React Native. |
| Resume | Resume — Senior Full Stack Engineer · Agentic AI | Resume for a Senior Full Stack Engineer — 7+ years building FinTech and Web3 platforms for 3M+ users, shipping production agentic AI with LangGraph, RAG and MCP. |
| Contact | Get in touch | Open to senior & staff full-stack / backend roles. Reach out about the work or a problem you're solving. |

## Keywords (used naturally, never stuffed)

Senior Full Stack Engineer · Backend Engineer · Software Architect · System Design · NestJS · Node.js ·
React · Next.js · TypeScript · Python · Django · FastAPI · PostgreSQL · Citus · Redis · Kafka · BullMQ · gRPC ·
Docker · Kubernetes · AWS · GCP · OAuth2 · OpenID Connect · Authentication · Identity Platform ·
Distributed Systems · Microservices · Event-Driven Architecture · Real-Time · WebSockets · GraphQL ·
Blockchain · Web3 · Solidity · FinTech · Double-Entry Ledger · AI Engineer · Agentic AI · Generative AI ·
Multi-Agent Systems · LangGraph · LangChain · LLM Engineering · RAG · MCP · Vector Database.

## JSON-LD — Person (home)

```json
{
  "@context": "https://schema.org",
  "@type": "Person",
  "@id": "https://mishhub.com/#person",
  "name": "Mohammed Mishhub",
  "url": "https://mishhub.com",
  "jobTitle": "Senior Full Stack Engineer",
  "email": "mailto:mishhub@gmail.com",
  "address": { "@type": "PostalAddress", "addressLocality": "Dubai", "addressCountry": "AE" },
  "sameAs": [
    "https://github.com/mishhub",
    "https://www.linkedin.com/in/mishhub",
    "https://stackoverflow.com/users/8920915/mishhubmohammed"
  ],
  "knowsAbout": ["Full Stack Development","NestJS","Node.js","React","Next.js","Python","Django","FastAPI","Distributed Systems","Microservices","Event-Driven Architecture","Apache Kafka","OAuth2","OpenID Connect","Authentication","PostgreSQL","Redis","Kubernetes","Blockchain","Web3","Solidity","FinTech","AI Engineering","Agentic AI","Generative AI","Multi-Agent Systems","LangGraph","LangChain","Retrieval-Augmented Generation","Model Context Protocol"]
}
```

## JSON-LD — WebSite

```json
{
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": "https://mishhub.com/#website",
  "url": "https://mishhub.com",
  "name": "Mohammed Mishhub — Senior Full Stack Engineer",
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
