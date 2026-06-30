import { SITE, SOCIALS } from "@/config/site";

/**
 * JSON-LD builders. Each returns a plain schema.org object; pages pass the
 * result(s) to <BaseHead jsonLd={...} />. Keeping these as functions (rather
 * than inline literals) means structured data stays consistent across pages.
 */

type Json = Record<string, unknown>;

const sameAs = SOCIALS.filter((s) => s.icon !== "mail").map((s) => s.href);

/** The engineer as a Person — the backbone entity for the whole site. */
export function personSchema(origin: string): Json {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": `${origin}/#person`,
    name: SITE.name,
    url: origin,
    jobTitle: SITE.role,
    email: `mailto:${SITE.email}`,
    description: SITE.description,
    sameAs,
    knowsAbout: [
      "Full Stack Development",
      "NestJS",
      "Node.js",
      "React",
      "Next.js",
      "Django",
      "Distributed Systems",
      "Microservices",
      "Event-Driven Architecture",
      "OAuth2",
      "OpenID Connect",
      "Authentication",
      "PostgreSQL",
      "Redis",
      "Blockchain",
      "Web3",
      "Solidity",
      "FinTech",
      "AI Engineering",
    ],
  };
}

export function websiteSchema(origin: string): Json {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${origin}/#website`,
    url: origin,
    name: `${SITE.name} — ${SITE.role}`,
    description: SITE.description,
    inLanguage: SITE.lang,
    publisher: { "@id": `${origin}/#person` },
  };
}

export function profilePageSchema(origin: string): Json {
  return {
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    url: origin,
    mainEntity: { "@id": `${origin}/#person` },
  };
}

export interface ArticleSchemaInput {
  title: string;
  description: string;
  url: string;
  image?: string;
  datePublished: string;
  dateModified?: string;
  tags?: string[];
}

export function articleSchema(origin: string, a: ArticleSchemaInput): Json {
  return {
    "@context": "https://schema.org",
    "@type": "TechArticle",
    headline: a.title,
    description: a.description,
    url: a.url,
    // Article rich results require an image; fall back to the default OG card.
    image: a.image ?? new URL(SITE.ogImage, origin).href,
    datePublished: a.datePublished,
    dateModified: a.dateModified ?? a.datePublished,
    inLanguage: SITE.lang,
    author: { "@id": `${origin}/#person` },
    publisher: { "@id": `${origin}/#person` },
    mainEntityOfPage: a.url,
    ...(a.tags?.length ? { keywords: a.tags.join(", ") } : {}),
  };
}

export interface Crumb {
  name: string;
  url: string;
}

export function breadcrumbSchema(crumbs: Crumb[]): Json {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: crumbs.map((c, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: c.name,
      item: c.url,
    })),
  };
}
