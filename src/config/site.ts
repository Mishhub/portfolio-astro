/**
 * Single source of truth for identity, navigation and social links.
 *
 * Everything personal lives here so the rest of the codebase never hardcodes a
 * name, handle or URL. Update this file to make the portfolio your own.
 */

export interface NavItem {
  label: string;
  href: string;
  /** Hidden from the primary header but still routable / in the sitemap. */
  secondary?: boolean;
}

export interface SocialLink {
  label: string;
  href: string;
  /** icon key, resolved in the Social component. */
  icon: "github" | "linkedin" | "mail" | "twitter" | "rss" | "stackoverflow";
  handle?: string;
}

export const SITE = {
  /** Canonical production origin — no trailing slash. Used for SEO + sitemap. */
  url: "https://mishhub.dev",

  /** Display name. */
  name: "Mohammed Mishhub",
  /** Short handle used in footers / monograms. */
  handle: "mishhub",
  initials: "MM",

  role: "Senior Full Stack Software Engineer",
  /** One-line value proposition (used in <title> templates + OG). */
  tagline:
    "I design and scale full-stack web & Web3 platforms — distributed backends and the interfaces on top — now moving into agentic AI development.",

  /** Default meta description (overridable per page). Kept under 160 chars. */
  description:
    "Senior Full Stack Engineer, 7+ yrs — NestJS, Node.js, React, Django, distributed systems & Web3, now building agentic AI: LLMs, RAG and AI agents.",

  email: "mishhub@gmail.com",
  location: "Dubai, UAE",
  availability: "Keen to build interesting projects together",

  locale: "en_US",
  lang: "en",
  themeColor: "#0b0b0d",

  /** Default social preview image (1200×630) generated into /public. */
  ogImage: "/og/default.png",
} as const;

/** Primary navigation. `secondary: true` keeps a route out of the top bar. */
export const NAV: NavItem[] = [
  { label: "About", href: "/about" },
  { label: "Experience", href: "/experience" },
  { label: "Projects", href: "/projects" },
  { label: "Case Studies", href: "/case-studies" },
  { label: "Articles", href: "/articles" },
  { label: "AI Journey", href: "/ai-engineering" },
  { label: "Skills", href: "/skills", secondary: true },
  { label: "Open Source", href: "/open-source", secondary: true },
  { label: "Certifications", href: "/certifications", secondary: true },
  { label: "Resume", href: "/resume", secondary: true },
  { label: "Contact", href: "/contact" },
];

export const SOCIALS: SocialLink[] = [
  {
    label: "GitHub",
    href: "https://github.com/mishhub",
    icon: "github",
    handle: "@mishhub",
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/mishhub",
    icon: "linkedin",
    handle: "in/mishhub",
  },
  {
    label: "Stack Overflow",
    href: "https://stackoverflow.com/users/8920915/mishhubmohammed",
    icon: "stackoverflow",
    handle: "Stack Overflow",
  },
  {
    label: "Email",
    href: "mailto:mishhub@gmail.com",
    icon: "mail",
    handle: "mishhub@gmail.com",
  },
];

/**
 * Résumé route. Points at the print-optimised HTML résumé page (which offers a
 * "Save as PDF" action). Drop a real PDF in /public and repoint this if you
 * prefer a direct file download.
 */
export const RESUME_PATH = "/resume";

export type Site = typeof SITE;
