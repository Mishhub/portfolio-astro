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

/** The four things a recruiter should take away in the first scroll. */
export const VALUE_PROPS: ValueProp[] = [
  {
    title: "Full-stack, end to end",
    description:
      "React and Next.js on the front; NestJS, Node.js, Django and FastAPI on the back — designed, built, deployed to AWS/GCP and owned in production.",
    icon: "layers",
  },
  {
    title: "Distributed systems that scale",
    description:
      "Event-driven microservices over gRPC and Kafka serving 3M+ users — 100+ payouts/sec into a double-entry ledger on Citus-sharded PostgreSQL, 99.95% uptime.",
    icon: "network",
  },
  {
    title: "Production agentic AI",
    description:
      "A multi-agent LangGraph support copilot — hybrid RAG, policy-checked text-to-SQL, a Redis semantic cache — and an MCP-based PR-review agent, with scoped tools and PII redaction.",
    icon: "brain-circuit",
  },
  {
    title: "Auth, identity & Web3",
    description:
      "Centralized OAuth2 / OpenID Connect SSO with PKCE and RBAC, KYC/AML flows, digital-asset custody, smart contracts and wallet infrastructure.",
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
  "FastAPI",
  "PostgreSQL",
  "Redis",
  "Kafka",
  "BullMQ",
  "gRPC",
  "GraphQL",
  "Docker",
  "Kubernetes",
  "AWS",
  "GCP",
  "Solidity",
  "Generative AI",
  "LLMs",
  "LangGraph",
  "LangChain",
  "RAG",
  "pgvector",
  "MCP",
  "LangSmith",
  "Prompt Engineering",
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
      "From e-commerce and real-time platforms to FinTech systems serving 3M+ users — Dubai and India.",
  },
  {
    title: "Ships production agentic AI",
    description:
      "An agentic copilot that lets customer support resolve user cases without escalating to engineering — backed by Ed Donner's AI Engineer Core and Agentic tracks.",
  },
  {
    title: "Owns systems end to end",
    description:
      "Designs the architecture, writes frontend and backend, ships to AWS/GCP with Docker + CI/CD, and operates it — down to restore-tested PostgreSQL backups.",
  },
  {
    title: "Authentication & identity specialist",
    description:
      "Centralized OAuth2/OIDC single sign-on, KYC/AML integrations, JWT lifecycles and role-based access control.",
  },
  {
    title: "Leads through design",
    description:
      "Drives design and code reviews, ADRs and technical docs, and mentors developers in a cross-functional team of 4 developers, 2 QA, a team lead, and product and project managers.",
  },
  {
    title: "Open-source contributor",
    description:
      "Published npm packages including nestjs-minio-backend and nestjs-dynamic-filter, plus a calendar library with 100+ weekly downloads.",
  },
];
