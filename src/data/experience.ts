/**
 * Professional timeline. Sourced directly from the resume — every company,
 * date, responsibility and metric is taken from it. Nothing is invented.
 */

export interface ExperienceEntry {
  company: string;
  /** e.g. "FinTech · Web3" — descriptive domain context. */
  context: string;
  role: string;
  location: string;
  start: string; // ISO yyyy-mm
  end: string | null; // null = present
  summary: string;
  responsibilities: string[];
  /** Outcomes — uses the real metrics stated in the resume. */
  impact: string[];
  stack: string[];
  current?: boolean;
}

export const EXPERIENCE: ExperienceEntry[] = [
  {
    company: "LMNTO Performance Information Technology",
    context: "FinTech · Web3 Platforms · Agentic AI",
    role: "Senior Full Stack Engineer",
    location: "Dubai, UAE",
    start: "2023-05",
    end: null,
    current: true,
    summary:
      "Architect and operate three interconnected FinTech/Web3 platforms serving 3M+ users — event-driven NestJS and Django microservices, a centralized identity layer, a high-volume payouts pipeline and double-entry ledger, and production agentic AI.",
    responsibilities: [
      "Architected and operate 3 interconnected FinTech/Web3 platforms serving 3M+ users, built as event-driven microservices in NestJS and Django communicating over gRPC.",
      "Designed centralized OAuth2 / OpenID Connect single sign-on across all 3 web applications — authorization code flow with PKCE, scopes, JWT access/refresh/ID tokens and RBAC.",
      "Designed an immutable snapshot → intent → settlement pipeline for high-volume reward and bonus payments; versioned snapshots make every run auditable, resumable and recomputable when inputs change.",
      "Built the double-entry ledger those payouts settle into: transactions flow through Kafka via a transactional outbox, on PostgreSQL sharded with Citus, partitioned by month, replicated to a read replica and backed up with Barman PITR.",
      "Built an internal multi-agent AI assistant with LangGraph, LangChain and FastAPI that answers how a feature is implemented, what its PRD specifies and why an issue is happening for a specific user.",
      "Architected the assistant as query understanding → planner/router → specialist agents with tool calling (pgvector RAG over implementation docs and PRDs, a SQL-agent subgraph over a SQLAlchemy data-access layer, knowledge-base tools) → response synthesizer, with fallback routing when an agent fails.",
      "Ran the agents with read-only, scoped tool permissions, PII redaction and prompt-injection guardrails, tracing and debugging them in LangSmith and LangSmith Studio.",
      "Shipped an MCP-based pull-request review agent built on tool calling and the Model Context Protocol.",
      "Built the NodeLink backend (NestJS + PostgreSQL), integrating SumSub KYC/AML and BoldSign e-signatures through rate-limited connectors with retries, with MinIO storage, BullMQ background jobs and Socket.IO real-time updates scaled via a Redis adapter.",
      "Developed a unified proxy admin panel to integrate and operate the platforms from one place.",
      "Drove design and code reviews, architecture decision records (ADRs) and technical documentation, and mentored developers in a cross-functional team of 4 developers, 2 QA, a team lead, and product and project managers.",
      "Published open-source NestJS packages — nestjs-minio-backend and nestjs-dynamic-filter — as reusable libraries for MinIO storage and dynamic query filtering.",
    ],
    impact: [
      "Customer support now resolves user cases with the AI assistant instead of escalating to product or engineering.",
      "The payouts pipeline handles 100+ payouts/sec, with every run auditable, resumable and recomputable.",
      "Cut authentication-related support tickets by 30% with centralized SSO and improved login UX and error handling.",
      "Reduced API latency by 45% with Redis caching on hot paths.",
      "Maintained 99.95% uptime, troubleshooting production issues end to end with structured logging, metrics and distributed tracing in OpenObserve, plus Sentry error monitoring.",
      "Ledger data is protected by restore-tested Barman point-in-time recovery.",
    ],
    stack: [
      "NestJS",
      "Django",
      "FastAPI",
      "TypeScript",
      "Python",
      "PostgreSQL",
      "Citus",
      "Redis",
      "Apache Kafka",
      "gRPC",
      "OAuth2 / OIDC",
      "LangGraph",
      "LangChain",
      "pgvector",
      "LangSmith",
      "MCP",
      "Docker",
      "AWS",
      "OpenObserve",
      "Sentry",
    ],
  },
  {
    company: "Coolshop SRL",
    context: "Automotive · Configurator Products",
    role: "Senior Full Stack Developer",
    location: "Dubai, UAE",
    start: "2022-11",
    end: "2023-05",
    summary:
      "Built highly interactive configurator products — CaseIH Build & Price and Cool-Model-Selection — from scratch, with a focus on frontend performance, reusable UI and fast, automated delivery.",
    responsibilities: [
      "Built CaseIH Build & Price and Cool-Model-Selection from scratch with React 18, TypeScript, GraphQL, Apollo, Storybook and Styled Components, with server-side rendering for SEO and load time.",
      "Designed and consumed GraphQL and REST APIs with Apollo Client, and built fully responsive, accessible UIs.",
      "Translated business requirements into features with product and design teams in a fast-paced Agile environment.",
      "Created reusable UI component libraries to standardize the frontend across products.",
      "Containerized frontend services with Docker and integrated performance monitoring to track Core Web Vitals and runtime regressions.",
      "Deployed automated GitHub Actions CI/CD pipelines for the team, with Jest unit testing.",
    ],
    impact: [
      "Configurators reused across 5+ region-specific deployments.",
      "Reduced frontend load times by 60% through bundle optimization and code splitting.",
      "Increased development velocity by 40% with shared, reusable UI component libraries.",
      "Cut deployment time from 2 hours to under 10 minutes with GitHub Actions CI/CD.",
    ],
    stack: [
      "React 18",
      "TypeScript",
      "GraphQL",
      "Apollo Client",
      "Apollo Server",
      "Storybook",
      "Styled Components",
      "Jest",
      "Docker",
      "GitHub Actions",
    ],
  },
  {
    company: "Connectopia",
    context: "Web3 · NFT",
    role: "Full Stack Blockchain Developer",
    location: "Dubai, UAE",
    start: "2022-04",
    end: "2022-10",
    summary:
      "Shipped on-chain products end to end — Ethereum smart contracts, minting pages and an NFT launchpad — while leading a small Agile team.",
    responsibilities: [
      "Created Ethereum smart contracts, minting pages and an NFT launchpad.",
      "Developed full-stack web apps using the MERN stack and the Alchemy API.",
      "Led an Agile team of 5 engineers through planning and delivery.",
    ],
    impact: [
      "Delivered 12 major features across 6 sprints.",
      "Handled 50K+ on-chain transactions with zero contract vulnerabilities (internal audit).",
    ],
    stack: ["Solidity", "Ethereum", "MongoDB", "Express", "React", "Node.js", "Alchemy"],
  },
  {
    company: "Stead Technologies LLP",
    context: "Product Studio · SaaS",
    role: "Full Stack Developer",
    location: "Bangalore, India",
    start: "2020-12",
    end: "2022-04",
    summary:
      "Delivered full-stack products for multiple clients — a custom CMS, a complete HR platform, a multi-tenant financial-reporting backend, and an open-source calendar library.",
    responsibilities: [
      "Built BoxedCMS, a plug-and-play custom CMS (Angular 11 + Node.js) with CKEditor authoring, Passport.js local/social login + 2FA, multilingual content and dynamic theme uploads.",
      "Built and deployed a complete HR platform (Spovio) for SMB customers with React and Django — time-off, attendance and payroll modules on Redis + Celery, AWS S3 and email/SMS.",
      "Built Puretax, a multi-tenant Django + DRF backend with QuickBooks Online sync and Redis + Celery report generation.",
      "Built on the MERN stack (MongoDB, Express, React, Node.js) with RESTful APIs and Redis caching for session and content delivery.",
      "Launched and maintained an open-source calendar project.",
    ],
    impact: [
      "Improved client publishing time by 70% with the custom CMS.",
      "Spovio served 10+ businesses managing over 1,200 employees and automated 80% of their HR workflows.",
      "Puretax generated 600+ reports a month in PDF, XLSX and CSV.",
      "Open-source calendar project reached 100+ weekly NPM downloads.",
    ],
    stack: [
      "Angular",
      "Node.js",
      "React",
      "Django",
      "Django REST Framework",
      "MongoDB",
      "Express",
      "PostgreSQL",
      "Redis",
      "Celery",
      "AWS S3",
    ],
  },
  {
    company: "AgileCrew",
    context: "E-commerce · Real-Time",
    role: "Junior Software Developer",
    location: "Kozhikode, India",
    start: "2019-08",
    end: "2020-12",
    summary:
      "Built e-commerce and real-time meeting platforms on the MERN stack and AWS, plus a Python/FastAPI microservice — growing from feature work into ownership of real-time and integration-heavy systems.",
    responsibilities: [
      "Built e-commerce and real-time meeting platforms using the MERN stack on AWS EC2.",
      "Built a Python/FastAPI microservice for order notifications and inventory sync alongside the core MERN stack.",
      "Implemented real-time communication with WebSockets.",
      "Integrated payment and identity providers into the checkout flow.",
    ],
    impact: [
      "Supported up to 2,000 concurrent users in the real-time meeting platform via WebSockets.",
      "Processed 10K+ order-notification and inventory-sync events a day through the FastAPI microservice.",
      "Enabled 500+ secure checkouts daily through payment and identity integrations.",
      "Cut infrastructure costs by 25% using EC2 spot instances and containerized deployments.",
    ],
    stack: [
      "MongoDB",
      "Express",
      "React",
      "Node.js",
      "Python",
      "FastAPI",
      "WebSockets",
      "AWS EC2",
      "Docker",
    ],
  },
];

/** Education (from the resume). */
export const EDUCATION = {
  degree: "B.Tech, Computer Science",
  school: "MES College of Engineering",
  location: "Calicut, India",
  start: "2015",
  end: "2019",
} as const;
