/**
 * Skill matrix, grouped by discipline. Sourced directly from the resume —
 * nothing here is invented. `level` is a self-assessment; the resume's profile
 * names React, Next.js, Node.js, NestJS, Django and Solidity as core strengths.
 */

export type SkillLevel = "expert" | "advanced" | "proficient" | "learning";

export interface Skill {
  name: string;
  level: SkillLevel;
  /** Optional one-liner shown on hover / expanded view. */
  note?: string;
}

export interface SkillGroup {
  id: string;
  title: string;
  /** Short framing of how the engineer uses this group. */
  blurb: string;
  skills: Skill[];
}

export const SKILL_GROUPS: SkillGroup[] = [
  {
    id: "languages",
    title: "Languages",
    blurb: "The languages I reach for across services, contracts and tooling.",
    skills: [
      { name: "TypeScript", level: "expert" },
      { name: "JavaScript", level: "expert" },
      { name: "Python", level: "advanced" },
      { name: "Solidity", level: "advanced" },
      { name: "Go", level: "proficient" },
      { name: "SQL", level: "advanced" },
    ],
  },
  {
    id: "backend",
    title: "Backend",
    blurb: "Service design, APIs and the runtime behaviour of systems under load.",
    skills: [
      { name: "NestJS", level: "expert" },
      { name: "Node.js", level: "expert" },
      { name: "Django", level: "advanced", note: "+ Django REST Framework" },
      { name: "Express", level: "advanced" },
      { name: "Celery", level: "advanced" },
      { name: "Gin", level: "proficient" },
    ],
  },
  {
    id: "frontend",
    title: "Frontend",
    blurb: "Accessible, fast interfaces — from React SPAs to server-rendered apps.",
    skills: [
      { name: "React.js", level: "expert" },
      { name: "Next.js", level: "expert" },
      { name: "Angular", level: "advanced" },
      { name: "Redux", level: "advanced" },
      { name: "React Native", level: "proficient" },
      { name: "Tailwind CSS", level: "advanced", note: "Material UI · Bootstrap" },
    ],
  },
  {
    id: "blockchain",
    title: "Blockchain & Web3",
    blurb: "Smart contracts, wallet infrastructure and on-chain integrations.",
    skills: [
      { name: "Solidity", level: "advanced" },
      { name: "Ethereum", level: "advanced" },
      { name: "Solana", level: "proficient" },
      { name: "Account Abstraction", level: "proficient", note: "Biconomy · Alchemy" },
      { name: "Hardhat / Truffle", level: "advanced" },
      { name: "Metaplex", level: "proficient" },
    ],
  },
  {
    id: "databases",
    title: "Databases & Caching",
    blurb: "Modelling data and keeping the hot path fast.",
    skills: [
      { name: "PostgreSQL", level: "expert" },
      { name: "MongoDB", level: "advanced" },
      { name: "Redis", level: "advanced", note: "caching · queues · adapters" },
    ],
  },
  {
    id: "devops",
    title: "DevOps & Cloud",
    blurb: "Shipping safely and repeatably across AWS and GCP.",
    skills: [
      { name: "Docker", level: "expert" },
      { name: "AWS", level: "advanced", note: "EC2 · Fargate · S3 · Route53" },
      { name: "GCP", level: "proficient" },
      { name: "GitHub Actions", level: "advanced" },
      { name: "Nginx", level: "advanced" },
      { name: "Cloudflare", level: "proficient" },
    ],
  },
  {
    id: "architecture",
    title: "Architecture",
    blurb: "Decomposing domains into services that stay correct as they scale.",
    skills: [
      { name: "Microservices", level: "advanced" },
      { name: "Event-Driven Design", level: "advanced" },
      { name: "gRPC", level: "advanced" },
      { name: "OAuth2", level: "expert" },
      { name: "OpenID Connect", level: "expert" },
      { name: "WebSockets", level: "advanced", note: "Socket.IO" },
    ],
  },
  {
    id: "ai",
    title: "AI Engineering",
    blurb: "Actively transitioning into production AI engineering — learning in public.",
    skills: [
      { name: "LLM Engineering", level: "learning" },
      { name: "RAG & Vector Search", level: "learning" },
      { name: "AI Agents (MCP)", level: "learning" },
      { name: "Prompt Engineering", level: "learning" },
    ],
  },
];

/** Domains the engineer has shipped into — used as context tags, not skills. */
export const DOMAINS = ["FinTech & Web3", "Authentication & Identity", "Distributed Systems"] as const;
