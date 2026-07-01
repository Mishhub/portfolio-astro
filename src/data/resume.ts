/**
 * Dedicated content for the print /resume page — mirrors the finalized,
 * ATS-optimized CV (the same one exported as the downloadable PDF). Kept
 * separate from the shared skill/experience/certification data so the resume
 * can present its exact wording (merged projects, "Gen AI" headline, AI as
 * completed) without changing the public Skills / Experience / Certifications
 * pages.
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
  date: string;
  location: string;
  context: string;
  bullets: string[];
}

export interface ResumeCertification {
  name: string;
  issuer: string;
  date?: string;
}

export const RESUME = {
  name: "Mohammed Mishhub Thari",
  headline: "Senior Full Stack Developer · Gen AI",

  summary:
    "Senior Full Stack Software Engineer and AI Engineer with 7+ years building and scaling high-traffic web and Web3 platforms serving millions of users. Backend-leaning full-stack — NestJS, Node.js and Django services with React and Next.js frontends, OAuth2 / OpenID Connect authentication, event-driven microservices over gRPC, and cloud-native delivery on AWS and GCP. Now shipping production Generative AI — LLM applications, retrieval-augmented generation (RAG) and AI agents — with the same engineering rigour I bring to distributed systems.",

  skills: [
    { label: "Languages", items: "JavaScript, TypeScript, Python, Go, HTML, CSS, SQL, Solidity" },
    { label: "Frontend", items: "React.js, Next.js, Angular, Redux, Tailwind CSS, Material UI, Bootstrap, React Native" },
    { label: "Backend", items: "Node.js, NestJS, Django, Django REST Framework (DRF), Celery, Express, Gin, REST APIs" },
    { label: "Architecture", items: "Enterprise Application Architecture, Microservices, Distributed Systems, Event-Driven Architecture, System Design, gRPC, OpenID Connect, OAuth2" },
    { label: "AI Engineering", items: "Generative AI, RAG, Vector Databases (pgvector, qdrant), AI Agents, MCP, LangChain, LiteLLM, LangGraph, LlamaIndex, Fine-tuning (QLoRA), OpenAI, Claude" },
    { label: "Databases", items: "PostgreSQL, MongoDB, Redis" },
    { label: "DevOps & Cloud", items: "Docker, AWS (EC2, Fargate, S3, Route53), GCP, Azure, Azure Kubernetes Service (AKS), Azure Container Registry (ACR), Kubernetes (K8s), GitHub Actions, Nginx, Cloudflare, CI/CD, SSL" },
    { label: "Blockchain", items: "Solidity, Ethereum, Solana, Truffle, Hardhat, Account Abstraction, Metaplex" },
    { label: "Testing", items: "Jest, Mocha, Storybook" },
  ] satisfies ResumeSkillGroup[],

  experience: [
    {
      role: "Senior Full Stack Engineer",
      company: "LMNTO Performance Information Technology",
      date: "05/2023 – Present",
      location: "Dubai, UAE",
      context: "FinTech · Web3 Platforms",
      bullets: [
        "Architected and operate 3 interconnected FinTech/Web3 platforms serving 1.5M+ users on event-driven microservices over gRPC, with centralized OAuth2 / OpenID Connect single sign-on across all platforms (auth support tickets −30%).",
        "NodeLink (DePIN rewards): NestJS 11 + PostgreSQL with SumSub KYC/AML, BoldSign e-signatures, MinIO storage, OAuth2/OIDC (authorization code, PKCE, scopes) with JWT access/refresh/ID tokens, Redis + BullMQ jobs, Socket.IO real-time (Redis adapter for horizontal scaling), and Sentry + OpenObserve observability.",
        "Zenit World (copy-trading, 3M+ users): Django 4.1 + PostgreSQL; Fireblocks digital-asset custody, SumSub KYC/AML, a custom ZENIT token with fiat/crypto wallets, staking, yield farming and automated copy-trading; Redis + Celery audit logging.",
        "Web3 SSO & Wallet Platform: Viem wallet-gateway microservice, Account Abstraction (Biconomy, Alchemy), Merkle-tree reward eligibility, referral graph, gRPC cross-platform sync, JWT sessions + RBAC.",
        "Reduced API response time 45% with Redis caching; held 99.95% uptime on Docker with structured logging, metrics and distributed tracing.",
        "Shipped production Generative AI: an LLM support chatbot with RAG and an agent-based PR-review system using tool calling and the Model Context Protocol (MCP).",
        "Published open-source NestJS packages (nestjs-minio-backend, nestjs-dynamic-filter); drove design reviews, ADRs and mentoring.",
      ],
    },
    {
      role: "Senior Full Stack Developer",
      company: "Coolshop SRL",
      date: "11/2022 – 05/2023",
      location: "Dubai, UAE",
      context: "Automotive · Configurator Products",
      bullets: [
        "Built configurator products — CaseIH Build & Price and Cool-Model-Selection — from scratch with React 18, TypeScript, GraphQL, Apollo, Storybook and Styled Components; server-side rendering for SEO and load time; reused across 5+ region-specific deployments.",
        "Reduced frontend load times 60% via bundle optimization and code splitting; raised dev velocity 40% with reusable component libraries; Jest unit testing.",
        "Cut deployment time from 2 hours to under 10 minutes with automated GitHub CI/CD.",
      ],
    },
    {
      role: "Full Stack Blockchain Developer",
      company: "Connectopia",
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
      date: "12/2020 – 04/2022",
      location: "Bangalore, India",
      context: "Product Studio · SaaS",
      bullets: [
        "BoxedCMS: plug-and-play custom CMS (Angular 11 + Node.js) with CKEditor authoring, Passport.js local/social login + 2FA, multilingual content and dynamic theme uploads — improved client publishing time 70%.",
        "Spovio (HRMS): React + Django, used by 10+ businesses managing 1,200+ employees; time-off, attendance and payroll modules, Redis + Celery, AWS S3, email/SMS — automated 80% of HR workflows.",
        "Puretax: multi-tenant Django + DRF backend with QuickBooks Online sync, Redis + Celery; 600+ reports/month in PDF/XLSX/CSV.",
        "Launched an open-source calendar library with 100+ weekly npm downloads.",
      ],
    },
    {
      role: "Junior Software Developer",
      company: "AgileCrew",
      date: "08/2019 – 12/2020",
      location: "Calicut, India",
      context: "E-commerce · Real-Time",
      bullets: [
        "Built MERN e-commerce and real-time meeting platforms on AWS EC2.",
        "Supported 2,000 concurrent users over WebSockets.",
        "Enabled 500+ secure checkouts/day.",
        "Cut infrastructure cost 25% with EC2 spot instances and containerized deployments.",
      ],
    },
  ] satisfies ResumeExperience[],

  education: {
    degree: "B.Tech Computer Science",
    school: "MES College of Engineering",
    location: "Calicut, India",
    date: "2015 – 2019",
  },

  certifications: [
    { name: "AI Engineer Core Track: LLM Engineering, RAG, QLoRA, Agents", issuer: "Ed Donner — Udemy", date: "2026" },
    { name: "One Million Prompters: OpenAI Agents SDK, CrewAI, LangGraph, AutoGen, and MCP", issuer: "Dubai Future Foundation", date: "2026" },
    { name: "Ethereum and Solidity: The Complete Developer's Guide", issuer: "Udemy", date: "2024" },
    { name: "Complete React Native Developer in 2022: Zero to Mastery [with Hooks]", issuer: "Udemy", date: "2023" },
    { name: "The Complete Junior to Senior Web Developer Roadmap (2022)", issuer: "Udemy", date: "2022" },
    { name: "The Complete Web Developer in 2022: Zero to Mastery", issuer: "Udemy", date: "2022" },
  ] satisfies ResumeCertification[],
} as const;