/**
 * Content for the home page that isn't a content-collection entry: the value
 * propositions, the technologies marquee, and selected highlights. All drawn
 * from the resume — real metrics, real stack, no invention.
 */

export interface ValueProp {
  title: string;
  description: string;
  /** iconify lucide icon name (kebab-case, without the `lucide:` prefix). */
  icon: string;
}

/** The three things a recruiter should take away in the first scroll. */
export const VALUE_PROPS: ValueProp[] = [
  {
    title: "Full-stack, end to end",
    description:
      "React and Next.js on the front, NestJS, Node.js and Django on the back — designed, built, deployed to AWS/GCP and owned in production.",
    icon: "layers",
  },
  {
    title: "Distributed systems that scale",
    description:
      "Event-driven microservices communicating over gRPC, serving 1.5M+ users with Redis caching and 99.95% uptime.",
    icon: "network",
  },
  {
    title: "Auth, identity & Web3",
    description:
      "Centralized OAuth2 / OpenID Connect SSO, KYC/AML flows, smart contracts and wallet infrastructure across FinTech and Web3.",
    icon: "shield-check",
  },
];

/** Technologies marquee. Drawn from the resume's stack. */
export const TRUSTED_TECH: string[] = [
  "TypeScript",
  "NestJS",
  "Node.js",
  "React",
  "Next.js",
  "Python",
  "Django",
  "PostgreSQL",
  "Redis",
  "BullMQ",
  "gRPC",
  "Docker",
  "AWS",
  "GCP",
  "Solidity",
  "GraphQL",
  "Generative AI",
  "LLMs",
  "Prompt Engineering",
  "RAG",
  "OpenAI",
  "Claude",
];

export interface Highlight {
  title: string;
  description: string;
}

/** Selected highlights — recruiter-legible, drawn from real resume facts. */
export const HIGHLIGHTS: Highlight[] = [
  {
    title: "7+ years across web & Web3",
    description:
      "From e-commerce and real-time platforms to FinTech systems serving millions — Dubai and India.",
  },
  {
    title: "Owns systems end to end",
    description:
      "Designs the architecture, writes frontend and backend, ships to AWS/GCP with Docker + CI/CD, and operates it.",
  },
  {
    title: "Authentication & identity specialist",
    description:
      "Centralized OAuth2/OIDC single sign-on, KYC/AML integrations, JWT lifecycles and role-based access control.",
  },
  {
    title: "Open-source contributor",
    description:
      "Published npm packages including nestjs-minio-backend, plus a calendar library with 100+ weekly downloads.",
  },
];
