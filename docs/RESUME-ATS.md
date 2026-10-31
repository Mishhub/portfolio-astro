# Mohammed Mishhub Thari

**Senior Full Stack Engineer | React · Node.js · Python · AI** — Dubai, UAE
mishhub@gmail.com · +971 55 974 1412
https://mishhub.com · https://github.com/mishhub · https://www.linkedin.com/in/mishhub · https://stackoverflow.com/users/8920915/mishhubmohammed

---

## Summary

Senior Full Stack Engineer with 7+ years building and operating FinTech and Web3 platforms serving
3M+ users. Builds event-driven microservices in Node.js/NestJS and Python (Django, FastAPI) over gRPC
and REST, with React and Next.js frontends, OAuth2/OpenID Connect SSO, PostgreSQL and Redis, in
cloud-native deployments with Docker and CI/CD on AWS and GCP. Ships production agentic AI: a
multi-agent LangGraph assistant (planner/router, RAG, SQL-agent subgraph) and an MCP-based PR-review
agent. Hands-on with Kubernetes, Apache Kafka, RabbitMQ, OpenTelemetry, Prometheus, Grafana, k6 and
PostgreSQL scaling: replication, partitioning, Citus sharding and Barman point-in-time recovery (PITR).

## Skills

- **Languages:** TypeScript, JavaScript, Python, SQL, Go, Solidity, HTML5, CSS3
- **Frontend:** React.js, Next.js, Redux, Zustand, Tailwind CSS, Material UI, Storybook, Angular
- **Backend:** Node.js, NestJS, Express, Django, Django REST Framework (DRF), FastAPI, TypeORM, SQLAlchemy, Mongoose, RESTful APIs (JSON), gRPC, GraphQL, WebSockets (Socket.IO), OpenAPI/Swagger, Apache Kafka, RabbitMQ, BullMQ, Celery, Redis Pub/Sub
- **Databases (SQL & NoSQL):** PostgreSQL (replication & read replicas, partitioning, Citus sharding, Barman PITR), Redis, MongoDB, pgvector, Qdrant, Data Modeling & Schema Design, Query Optimization, Indexing
- **Architecture:** Microservices, Distributed Systems, Event-Driven Architecture, System Design, Scalability, High Availability, Performance Optimization, Caching, Idempotency, Transactional Outbox, Saga pattern, Temporal, Clean Code, SOLID, Authentication & Authorization (OAuth2, OpenID Connect, RBAC), Rate Limiting, Agile/Scrum
- **AI Engineering:** Large Language Models (LLMs), Retrieval-Augmented Generation (RAG), AI Agents, Multi-Agent Systems, SQL Agents, LangChain, LangGraph, LangSmith, LangSmith Studio, Gradio, Model Context Protocol (MCP), OpenAI Agents SDK, CrewAI, Claude Agent Skills, LlamaIndex, LiteLLM, Embeddings, Cross-Encoder Reranking, LLM Evaluation, Prompt Engineering, Tool/Function Calling, Fine-tuning (QLoRA), Hugging Face, OpenAI, Claude Code (Anthropic), CLAUDE.md / AGENTS.md
- **FinTech & Web3:** KYC/AML (SumSub), Digital-Asset Custody (Fireblocks), Crypto Wallets, Ethereum, Solana, Hardhat, Viem, Account Abstraction (ERC-4337), Metaplex, Settlement and Reconciliation
- **DevOps & Cloud:** AWS (EC2, ECS, ECR, Fargate, S3, Route 53), GCP, Azure (AKS, ACR), Docker, Kubernetes (K8s), GitHub Actions, GitLab CI, CI/CD, Nginx (reverse proxy / API gateway), Cloudflare, Git, Linux
- **Observability & Testing:** OpenTelemetry, Prometheus, Grafana, Sentry, OpenObserve, Distributed Tracing, k6 (load testing), Jest, Mocha, Automated Testing (Unit & Integration), Structured Logging

## Experience

### Senior Full Stack Engineer — LMNTO Performance Information Technology
*Dubai, UAE · May 2023 – Present · FinTech · Web3 Platforms*
- Architected and operate 3 interconnected FinTech/Web3 platforms serving **3M+ users**, built as event-driven microservices in NestJS and Django communicating over gRPC.
- Designed centralized **OAuth2/OpenID Connect** single sign-on across all 3 Web applications (authorization code flow with PKCE, scopes, JWT access/refresh/ID tokens, RBAC), cutting auth-related support tickets **30%**.
- Designed an immutable **snapshot → intent → settlement** data pipeline for high-volume reward and bonus payment transaction processing, handling **100+ payouts/sec**. Versioned snapshots make every run auditable, resumable and recomputable when inputs change.
- Built an internal **multi-agent AI assistant** (chatbot) integrating LLM inference that answers how a feature is implemented, what its PRD specifies and why an issue is happening for a specific user. Customer support now resolves user cases without escalating to product or engineering.
- Architected it with **LangGraph, LangChain** and FastAPI: query understanding → planner/router → specialist agents with tool calling (**pgvector** RAG over implementation docs and PRDs, a SQL-agent subgraph over a **SQLAlchemy** data access layer, knowledge-base tools) → response synthesizer, with error handling and fallback routing when an agent fails. Traced and debugged with **LangSmith** and **LangSmith Studio**.
- Agents run with read-only, scoped tool permissions and PII redaction, with guardrails against prompt injection.
- **NodeLink (DePIN rewards):** built the NestJS + PostgreSQL backend integrating third-party services (SumSub KYC/AML, BoldSign e-signatures) through rate-limited connectors with retries, plus MinIO object storage, asynchronous processing with BullMQ background jobs and Socket.IO real-time updates, scaled horizontally via a Redis adapter.
- **Zenit World (copy-trading, 3M+ users):** Django + PostgreSQL platform with Fireblocks digital-asset custody, SumSub KYC/AML, fiat/crypto wallets for the ZENIT token, staking, yield farming, automated copy-trading and Celery + Redis audit logging.
- **Web3 SSO & Wallet Platform:** Viem wallet-gateway microservice with Account Abstraction (Biconomy, Alchemy), Merkle-tree reward-eligibility proofs, a referral graph and gRPC cross-platform sync.
- Built a **double-entry ledger** where transactions flow through **Kafka** via a transactional outbox. It runs on PostgreSQL sharded with **Citus**, partitioned by month, replicated to a read replica and backed up with **Barman PITR** (restore tested).
- Cut API latency **45%** with Redis caching and maintained **99.95% uptime** troubleshooting production issues end to end with structured logging, metrics and distributed tracing in **OpenObserve**, with **Sentry** error monitoring.
- Drove design and code reviews and architecture decision records (ADRs) and technical documentation and mentored developers in a cross-functional team of 4 developers, 2 QA, a team lead, and product and project managers.
- Published **open-source NestJS packages** (nestjs-minio-backend, nestjs-dynamic-filter) as reusable libraries for MinIO storage and dynamic query filtering.

### Senior Full Stack Developer — Coolshop SRL
*Dubai, UAE · Nov 2022 – May 2023 · Automotive · Configurator Products*
- Built highly interactive configurator products — **CaseIH Build & Price** and Cool-Model-Selection — from scratch with **React 18, TypeScript, GraphQL, Apollo, Storybook and Styled Components**; server-side rendering for SEO and load time; reused across 5+ region-specific deployments.
- Designed and consumed GraphQL and REST APIs with Apollo Client; built fully responsive, accessible UIs and translated business requirements into features with product and design teams in a fast-paced Agile environment.
- Containerized frontend services with Docker and integrated performance monitoring to track **Core Web Vitals** and runtime regressions.
- Reduced **frontend load times 60%** via bundle optimization and code splitting; raised dev **velocity 40%** with reusable component libraries; Jest unit testing.
- Cut deployment time from **2 hours to under 10 minutes** with GitHub Actions CI/CD.

### Full Stack Blockchain Developer — Connectopia
*Dubai, UAE · Apr 2022 – Oct 2022 · Web3 · NFT*
- Built Ethereum smart contracts, minting pages and an NFT launchpad (MERN + Alchemy API).
- Led an Agile team of 5, delivering **12 features across 6 sprints**.
- Processed **50K+ on-chain transactions** with zero contract vulnerabilities.

### Full Stack Developer — Stead Technologies LLP
*Bangalore, India · Dec 2020 – Apr 2022 · Product Studio · SaaS*
- **BoxedCMS:** plug-and-play custom CMS (Angular 11 + Node.js) with **CKEditor** authoring, **Passport.js** local/social login + 2FA, multilingual content and dynamic theme uploads — improved client **publishing time 70%**.
- Built on the MERN stack (MongoDB, Express, React, Node.js) with RESTful APIs and Redis caching for session and content delivery.
- **Spovio (HRMS):** React + Django, used by **10+ businesses managing 1,200+ employees**; time-off, attendance and payroll modules, Redis + Celery, AWS S3, email/SMS — **automated 80% of HR workflows**.
- **Puretax:** multi-tenant Django + DRF backend with **QuickBooks Online sync**, Redis + Celery; **600+ reports/month** in PDF/XLSX/CSV.
- Launched an **open-source** calendar library with **100+ weekly** npm downloads.

### Junior Software Developer — AgileCrew
*Kozhikode, India · Aug 2019 – Dec 2020 · E-commerce · Real-Time*
- Built MERN e-commerce and real-time meeting platforms on AWS EC2.
- Built a Python/FastAPI microservice for order notifications and inventory sync, processing 10K+ events/day alongside the core MERN stack.
- Supported **2,000 concurrent users** over WebSockets.
- Enabled **500+ secure checkouts/day**.

## Open Source

- **nestjs-minio-backend** — NestJS module for MinIO / S3-compatible object storage; published to npm and used in production.
- **nestjs-dynamic-filter** — Database-agnostic filtering for NestJS with MongoDB/Mongoose and PostgreSQL/TypeORM support, pagination and auto Swagger docs.
- **scheduler-calendar** — Reusable calendar library on npm with 100+ weekly downloads.

## Education

**B.Tech Computer Science** — MES College of Engineering, Calicut, India · 2015 – 2019

## Certificates

- **AI Engineer Agentic Track: The Complete Agent & MCP Course** — Ed Donner — Udemy · 2026
- **AI Engineer Core Track: LLM Engineering, RAG, QLoRA, Agents** — Ed Donner — Udemy · 2026
- **One Million Prompters: OpenAI Agents SDK, CrewAI, LangGraph and MCP** — Dubai Future Foundation · 2026

---

### ATS notes
- **Single column, standard headings, no tables/columns/graphics** in the copy you paste into an ATS — this file is structured that way on purpose.
- **Reverse-chronological** order; job titles, companies, dates (`MMM YYYY`) and locations are explicit and consistent so parsers compute tenure correctly.
- **Links are plain visible URLs**, not link-text, so parsers capture them whether they read anchor text or the href.
- **Title line is "Senior Full Stack Engineer | React · Node.js · Python · AI"**, mirroring the CV — Workday weights job-title match heavily, so mirror the exact target title (e.g. "AI Engineer", "Senior Backend Engineer") when you tailor.
- Industry-standard keywords (LLMs, RAG, AI Agents, Multi-Agent Systems, LangGraph, MCP, Kafka, Citus, Kubernetes, OpenTelemetry) appear naturally in Summary, Skills and Experience — not stuffed. Aim for **75–85% match on Jobscan** against each specific job description, not a mythical universal 95%.
- **Company projects are folded into each role** (bolded project labels under the company) rather than a separate Projects section — this keeps every unique keyword while avoiding duplication, and holds the resume to ~2 pages.
- This is a **master** — for any single application, trim the least-relevant bullets and tailor keywords to that posting.
- Every metric is taken verbatim from the current CV — nothing inflated. The AI content reflects the completed *AI Engineer Core Track* and *Agentic Track* and the production agentic AI work at LMNTO; keep it truthful to what you can discuss in an interview.
