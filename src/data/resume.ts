/**
 * Dedicated content for the print /resume page — mirrors the current CV word
 * for word (the same one exported as the downloadable PDF), including its
 * company and credential links. Kept separate from the shared skill /
 * experience / certification data so the resume can present the CV's exact
 * wording without changing the public Skills / Experience / Certifications
 * pages, which carry the fuller record.
 *
 * The downloadable file lives at `public/resume.pdf` (see RESUME_PDF below).
 */

/** Path to the static, downloadable PDF served from /public. */
export const RESUME_PDF = "/resume.pdf";
/** Suggested filename when the visitor downloads it. */
export const RESUME_PDF_NAME = "Mohammed-Mishhub-Thari-Resume.pdf";

export interface ResumeSkillGroup {
  label: string;
  items: string;
}

export interface ResumeExperience {
  role: string;
  company: string;
  /** Company website, as linked from the CV. */
  url?: string;
  date: string;
  location: string;
  /** Domain line under the role; omitted where the CV has none. */
  context?: string;
  bullets: string[];
}

export interface ResumeCertification {
  name: string;
  issuer: string;
  date?: string;
  /** Credential URL, as linked from the CV. */
  url?: string;
}

export interface Resume {
  name: string;
  headline: string;
  website: string;
  summary: string;
  skills: ResumeSkillGroup[];
  experience: ResumeExperience[];
  education: { degree: string; school: string; location: string; date: string };
  certifications: ResumeCertification[];
}

export const RESUME: Resume = {
  name: "Mohammed Mishhub Thari",
  headline: "Senior Full Stack Engineer | React · Node.js · Python · AI",
  website: "https://mishhub.com",

  summary:
    "Senior Full Stack Engineer with 7+ years building and operating FinTech and Web3 platforms serving 3M+ users. Builds event-driven microservices in Node.js/NestJS and Python (Django, FastAPI) over gRPC and REST, with React and Next.js frontends, OAuth2/OpenID Connect SSO, PostgreSQL and Redis, in cloud-native deployments with Docker and CI/CD on AWS and GCP. Ships production agentic AI: a multi-agent LangGraph assistant (planner/router, RAG, SQL-agent subgraph) and an MCP-based PR-review agent. Hands-on with Kubernetes, Apache Kafka, RabbitMQ, OpenTelemetry, Prometheus, Grafana, k6 and PostgreSQL scaling: replication, partitioning, Citus sharding and Barman point-in-time recovery (PITR).",

  skills: [
    { label: "Languages", items: "TypeScript, JavaScript, Python, SQL, Go, Solidity, HTML5, CSS3" },
    { label: "Frontend", items: "React.js, Next.js, Redux, Zustand, Tailwind CSS, Material UI, Storybook, Angular" },
    {
      label: "Backend",
      items:
        "Node.js, NestJS, Express, Django, Django REST Framework (DRF), FastAPI, TypeORM, SQLAlchemy, Mongoose, RESTful APIs (JSON), gRPC, GraphQL, WebSockets (Socket.IO), OpenAPI/Swagger, Apache Kafka, RabbitMQ, BullMQ, Celery, Redis Pub/Sub",
    },
    {
      label: "Databases (SQL & NoSQL)",
      items:
        "PostgreSQL (replication & read replicas, partitioning, Citus sharding, Barman PITR), Redis, MongoDB, pgvector, Qdrant, Data Modeling & Schema Design, Query Optimization, Indexing",
    },
    {
      label: "Architecture",
      items:
        "Microservices, Distributed Systems, Event-Driven Architecture, System Design, Scalability, High Availability, Performance Optimization, Caching, Idempotency, Transactional Outbox, Saga pattern, Temporal, Clean Code, SOLID, Authentication & Authorization (OAuth2, OpenID Connect, RBAC), Rate Limiting, Agile/Scrum",
    },
    {
      label: "AI Engineering",
      items:
        "Large Language Models (LLMs), Retrieval-Augmented Generation (RAG), AI Agents, Multi-Agent Systems, SQL Agents, LangChain, LangGraph, LangSmith, LangSmith Studio, Gradio, Model Context Protocol (MCP), OpenAI Agents SDK, CrewAI, Claude Agent Skills, LlamaIndex, LiteLLM, Embeddings, Cross-Encoder Reranking, LLM Evaluation, Prompt Engineering, Tool/Function Calling, Fine-tuning (QLoRA), Hugging Face, OpenAI, Claude Code (Anthropic), CLAUDE.md / AGENTS.md",
    },
    {
      label: "FinTech & Web3",
      items:
        "KYC/AML (SumSub), Digital-Asset Custody (Fireblocks), Crypto Wallets, Ethereum, Solana, Hardhat, Viem, Account Abstraction (ERC-4337), Metaplex, Settlement and Reconciliation",
    },
    {
      label: "DevOps & Cloud",
      items:
        "AWS (EC2, ECS, ECR, Fargate, S3, Route 53), GCP, Azure (AKS, ACR), Docker, Kubernetes (K8s), GitHub Actions, GitLab CI, CI/CD, Nginx (reverse proxy / API gateway), Cloudflare, Git, Linux",
    },
    {
      label: "Observability & Testing",
      items:
        "OpenTelemetry, Prometheus, Grafana, Sentry, OpenObserve, Distributed Tracing, k6 (load testing), Jest, Mocha, Automated Testing (Unit & Integration), Structured Logging",
    },
  ],

  experience: [
    {
      role: "Senior Full Stack Engineer",
      company: "LMNTO Performance Information Technology",
      url: "https://lmn.to/",
      date: "05/2023 – present",
      location: "Dubai, UAE",
      bullets: [
        "Architected and operate 3 interconnected FinTech/Web3 platforms serving 3M+ users, built as event-driven microservices in NestJS and Django communicating over gRPC.",
        "Designed centralized OAuth2/OpenID Connect single sign-on across all 3 Web applications (authorization code flow with PKCE, scopes, JWT access/refresh/ID tokens, RBAC), cutting auth-related support tickets 30%.",
        "Designed an immutable snapshot → intent → settlement data pipeline for high-volume reward and bonus payment transaction processing, handling 100+ payouts/sec. Versioned snapshots make every run auditable, resumable and recomputable when inputs change.",
        "Built an internal multi-agent AI assistant (chatbot) integrating LLM inference that answers how a feature is implemented, what its PRD specifies and why an issue is happening for a specific user. Customer support now resolves user cases without escalating to product or engineering.",
        "Architected it with LangGraph, LangChain and FastAPI: query understanding → planner/router → specialist agents with tool calling (pgvector RAG over implementation docs and PRDs, a SQL-agent subgraph over a SQLAlchemy data access layer, knowledge-base tools) → response synthesizer, with error handling and fallback routing when an agent fails. Traced and debugged with LangSmith and LangSmith Studio.",
        "Agents run with read-only, scoped tool permissions and PII redaction, with guardrails against prompt injection.",
        "NodeLink (DePIN rewards): built the NestJS + PostgreSQL backend integrating third-party services (SumSub KYC/AML, BoldSign e-signatures) through rate-limited connectors with retries, plus MinIO object storage, asynchronous processing with BullMQ background jobs and Socket.IO real-time updates, scaled horizontally via a Redis adapter.",
        "Zenit World (copy-trading, 3M+ users): Django + PostgreSQL platform with Fireblocks digital-asset custody, SumSub KYC/AML, fiat/crypto wallets for the ZENIT token, staking, yield farming, automated copy-trading and Celery + Redis audit logging.",
        "Web3 SSO & Wallet Platform: Viem wallet-gateway microservice with Account Abstraction (Biconomy, Alchemy), Merkle-tree reward-eligibility proofs, a referral graph and gRPC cross-platform sync.",
        "Built a double-entry ledger where transactions flow through Kafka via a transactional outbox. It runs on PostgreSQL sharded with Citus, partitioned by month, replicated to a read replica and backed up with Barman PITR (restore tested).",
        "Cut API latency 45% with Redis caching and maintained 99.95% uptime troubleshooting production issues end to end with structured logging, metrics and distributed tracing in OpenObserve, with Sentry error monitoring.",
        "Drove design and code reviews and architecture decision records (ADRs) and technical documentation and mentored developers in a cross-functional team of 4 developers, 2 QA, a team lead, and product and project managers.",
        "Published open-source NestJS packages (nestjs-minio-backend, nestjs-dynamic-filter) as reusable libraries for MinIO storage and dynamic query filtering.",
      ],
    },
    {
      role: "Senior Full Stack Developer",
      company: "Coolshop SRL",
      url: "https://www.coolshop.it/en/index/",
      date: "11/2022 – 05/2023",
      location: "Dubai, UAE",
      context: "Automotive · Configurator Products",
      bullets: [
        "Built highly interactive configurator products — CaseIH Build & Price and Cool-Model-Selection — from scratch with React 18, TypeScript, GraphQL, Apollo, Storybook and Styled Components; server-side rendering for SEO and load time; reused across 5+ region-specific deployments.",
        "Designed and consumed GraphQL and REST APIs with Apollo Client; built fully responsive, accessible UIs and translated business requirements into features with product and design teams in a fast-paced Agile environment.",
        "Containerized frontend services with Docker and integrated performance monitoring to track Core Web Vitals and runtime regressions.",
        "Reduced frontend load times 60% via bundle optimization and code splitting; raised dev velocity 40% with reusable component libraries; Jest unit testing.",
        "Cut deployment time from 2 hours to under 10 minutes with GitHub Actions CI/CD.",
      ],
    },
    {
      role: "Full Stack Blockchain Developer",
      company: "Connectopia",
      url: "https://www.connectopia.io/",
      date: "04/2022 – 10/2022",
      location: "Dubai, UAE",
      context: "Web3 · NFT",
      bullets: [
        "Built Ethereum smart contracts, minting pages and an NFT launchpad (MERN + Alchemy API).",
        "Led an Agile team of 5, delivering 12 features across 6 sprints.",
        "Processed 50K+ on-chain transactions with zero contract vulnerabilities.",
      ],
    },
    {
      role: "Full Stack Developer",
      company: "Stead Technologies LLP",
      url: "https://stead.global/",
      date: "12/2020 – 04/2022",
      location: "Bangalore, India",
      context: "Product Studio · SaaS",
      bullets: [
        "BoxedCMS: plug-and-play custom CMS (Angular 11 + Node.js) with CKEditor authoring, Passport.js local/social login + 2FA, multilingual content and dynamic theme uploads — improved client publishing time 70%.",
        "Built on the MERN stack (MongoDB, Express, React, Node.js) with RESTful APIs and Redis caching for session and content delivery.",
        "Spovio (HRMS): React + Django, used by 10+ businesses managing 1,200+ employees; time-off, attendance and payroll modules, Redis + Celery, AWS S3, email/SMS — automated 80% of HR workflows.",
        "Puretax: multi-tenant Django + DRF backend with QuickBooks Online sync, Redis + Celery; 600+ reports/month in PDF/XLSX/CSV.",
        "Launched an open-source calendar library with 100+ weekly npm downloads.",
      ],
    },
    {
      role: "Junior Software Developer",
      company: "AgileCrew",
      date: "08/2019 – 12/2020",
      location: "Kozhikode, India",
      context: "E-commerce · Real-Time",
      bullets: [
        "Built MERN e-commerce and real-time meeting platforms on AWS EC2.",
        "Built a Python/FastAPI microservice for order notifications and inventory sync, processing 10K+ events/day alongside the core MERN stack.",
        "Supported 2,000 concurrent users over WebSockets.",
        "Enabled 500+ secure checkouts/day.",
      ],
    },
  ],

  education: {
    degree: "B.Tech Computer Science",
    school: "MES College of Engineering",
    location: "Calicut, India",
    date: "2015 – 2019",
  },

  certifications: [
    {
      name: "AI Engineer Agentic Track: The Complete Agent & MCP Course",
      issuer: "Ed Donner — Udemy",
      date: "2026",
      url: "https://www.udemy.com/certificate/UC-ffbeec9d-32f4-40a9-a723-4bd49c0814e9/",
    },
    {
      name: "AI Engineer Core Track: LLM Engineering, RAG, QLoRA, Agents",
      issuer: "Ed Donner — Udemy",
      date: "2026",
      url: "https://www.udemy.com/certificate/UC-8f4669e0-bae9-49a9-9234-e0d3faaa7523/",
    },
    {
      name: "One Million Prompters: OpenAI Agents SDK, CrewAI, LangGraph and MCP",
      issuer: "Dubai Future Foundation",
      date: "2026",
      url: "https://omp.dub.ai/certificate/FNpnQC5CyKX8",
    },
  ],
};
