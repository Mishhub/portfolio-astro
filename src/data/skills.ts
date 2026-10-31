/**
 * Skill matrix, grouped by discipline. Sourced directly from the resume —
 * nothing here is invented. `level` is a self-assessment: "advanced" marks
 * what has shipped to production (e.g. the LangGraph assistant, the Kafka /
 * Citus ledger); "proficient" marks hands-on and course-level depth (e.g.
 * Kubernetes, OpenTelemetry, CrewAI) the resume lists without a production
 * system behind it.
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
    blurb: "The languages I reach for across services, contracts, agents and tooling.",
    skills: [
      { name: "TypeScript", level: "expert" },
      { name: "JavaScript", level: "expert" },
      { name: "Python", level: "expert" },
      { name: "SQL", level: "expert" },
      { name: "Solidity", level: "advanced" },
      { name: "Go", level: "proficient" },
      { name: "HTML5 / CSS3", level: "expert" },
    ],
  },
  {
    id: "backend",
    title: "Backend",
    blurb: "Service design, APIs and the runtime behaviour of systems under load.",
    skills: [
      { name: "NestJS", level: "expert" },
      { name: "Node.js", level: "expert" },
      { name: "Django", level: "expert", note: "+ Django REST Framework" },
      { name: "FastAPI", level: "advanced" },
      { name: "Express", level: "expert" },
      { name: "REST APIs", level: "expert", note: "OpenAPI / Swagger" },
      { name: "GraphQL", level: "advanced", note: "Apollo" },
      { name: "ORMs", level: "advanced", note: "TypeORM · SQLAlchemy · Mongoose" },
      { name: "Gin", level: "proficient" },
    ],
  },
  {
    id: "agentic-ai",
    title: "Agentic AI",
    blurb: "Multi-agent systems in production — orchestrated, tool-using and fenced in by guardrails.",
    skills: [
      { name: "LangGraph", level: "advanced", note: "multi-agent orchestration" },
      { name: "AI Agents & Tool Calling", level: "advanced", note: "planner/router · SQL agents" },
      { name: "Model Context Protocol", level: "advanced", note: "MCP PR-review agent" },
      { name: "Agent Guardrails", level: "advanced", note: "scoped tools · PII redaction" },
      { name: "LangChain", level: "advanced" },
      { name: "OpenAI Agents SDK · CrewAI", level: "proficient" },
      { name: "Claude Code", level: "advanced", note: "Agent Skills · CLAUDE.md / AGENTS.md" },
    ],
  },
  {
    id: "generative-ai",
    title: "Generative AI & LLMs",
    blurb: "Grounded generation — retrieval, ranking, prompting and the tracing to prove it works.",
    skills: [
      { name: "RAG", level: "advanced", note: "pgvector · Qdrant" },
      { name: "Embeddings & Reranking", level: "advanced", note: "cross-encoder" },
      { name: "Prompt Engineering", level: "advanced" },
      { name: "LangSmith", level: "advanced", note: "tracing · LangSmith Studio" },
      { name: "LLM Evaluation", level: "proficient" },
      { name: "LlamaIndex · LiteLLM", level: "proficient" },
      { name: "Fine-tuning (QLoRA)", level: "proficient", note: "Hugging Face · Gradio" },
    ],
  },
  {
    id: "frontend",
    title: "Frontend",
    blurb: "Accessible, fast interfaces — from React SPAs to server-rendered apps.",
    skills: [
      { name: "React.js", level: "expert" },
      { name: "Next.js", level: "expert" },
      { name: "Redux", level: "expert", note: "+ Zustand" },
      { name: "Angular", level: "advanced" },
      { name: "Tailwind CSS", level: "advanced", note: "Material UI · Bootstrap" },
      { name: "Storybook", level: "advanced", note: "component libraries" },
      { name: "React Native", level: "proficient" },
    ],
  },
  {
    id: "architecture",
    title: "Architecture",
    blurb: "Decomposing domains into services that stay correct as they scale.",
    skills: [
      { name: "Microservices", level: "expert" },
      { name: "Event-Driven Design", level: "expert" },
      { name: "Distributed Systems", level: "expert", note: "system design · high availability" },
      { name: "gRPC", level: "advanced" },
      { name: "OAuth2", level: "expert" },
      { name: "OpenID Connect", level: "expert", note: "SSO · PKCE · RBAC" },
      { name: "WebSockets", level: "expert", note: "Socket.IO" },
      { name: "Transactional Outbox · Sagas", level: "advanced", note: "idempotency" },
      { name: "Temporal", level: "proficient" },
    ],
  },
  {
    id: "databases",
    title: "Databases & Caching",
    blurb: "Modelling data, scaling it horizontally and keeping the hot path fast.",
    skills: [
      { name: "PostgreSQL", level: "expert", note: "replication · read replicas" },
      { name: "PostgreSQL at Scale", level: "advanced", note: "Citus · partitioning · Barman PITR" },
      { name: "MongoDB", level: "expert" },
      { name: "Redis", level: "expert", note: "caching · queues · adapters" },
      { name: "Vector Databases", level: "advanced", note: "pgvector · Qdrant" },
      { name: "Data Modeling", level: "expert", note: "query optimization · indexing" },
    ],
  },
  {
    id: "messaging",
    title: "Messaging & Async",
    blurb: "Streams, queues and the background work the request path can't wait for.",
    skills: [
      { name: "Apache Kafka", level: "advanced", note: "via transactional outbox" },
      { name: "BullMQ", level: "advanced" },
      { name: "Celery", level: "expert" },
      { name: "Redis Pub/Sub", level: "advanced" },
      { name: "RabbitMQ", level: "proficient" },
    ],
  },
  {
    id: "devops",
    title: "DevOps & Cloud",
    blurb: "Shipping safely and repeatably across AWS, GCP and Azure.",
    skills: [
      { name: "Docker", level: "expert" },
      { name: "AWS", level: "advanced", note: "EC2 · ECS · ECR · Fargate · S3 · Route 53" },
      { name: "Kubernetes", level: "proficient", note: "Azure AKS · ACR" },
      { name: "GCP", level: "proficient" },
      { name: "GitHub Actions", level: "advanced", note: "+ GitLab CI" },
      { name: "Nginx", level: "advanced", note: "reverse proxy · API gateway" },
      { name: "Cloudflare", level: "proficient" },
      { name: "Linux", level: "advanced" },
    ],
  },
  {
    id: "observability",
    title: "Observability & Testing",
    blurb: "Knowing what production is doing — and proving changes before they reach it.",
    skills: [
      { name: "OpenObserve", level: "advanced", note: "logs · metrics · tracing" },
      { name: "Sentry", level: "advanced", note: "error monitoring" },
      { name: "OpenTelemetry", level: "proficient", note: "distributed tracing" },
      { name: "Prometheus · Grafana", level: "proficient" },
      { name: "k6", level: "proficient", note: "load testing" },
      { name: "Jest · Mocha", level: "advanced", note: "unit · integration" },
    ],
  },
  {
    id: "fintech",
    title: "FinTech & Payments",
    blurb: "Systems that move money and must always reconcile.",
    skills: [
      { name: "KYC / AML", level: "advanced", note: "SumSub" },
      { name: "Digital-Asset Custody", level: "advanced", note: "Fireblocks" },
      { name: "Double-Entry Ledgers", level: "advanced" },
      { name: "Settlement & Reconciliation", level: "advanced", note: "100+ payouts/sec" },
      { name: "Crypto Wallets", level: "advanced", note: "fiat + crypto" },
    ],
  },
  {
    id: "blockchain",
    title: "Blockchain & Web3",
    blurb: "Smart contracts, wallet infrastructure and on-chain integrations.",
    skills: [
      { name: "Solidity", level: "advanced" },
      { name: "Ethereum", level: "advanced" },
      { name: "Viem", level: "advanced", note: "wallet gateway" },
      { name: "Account Abstraction", level: "proficient", note: "ERC-4337 · Biconomy · Alchemy" },
      { name: "Hardhat / Truffle", level: "advanced" },
      { name: "Solana", level: "proficient" },
      { name: "Metaplex", level: "proficient" },
    ],
  },
];

/** Domains the engineer has shipped into — used as context tags, not skills. */
export const DOMAINS = [
  "FinTech",
  "Agentic AI",
  "Gen AI",
  "Web3",
  "Distributed Systems",
  "CMS",
] as const;
