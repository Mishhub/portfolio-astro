/**
 * Compact project list for the print resume page. Drawn from the case studies
 * and the resume — real shipped work, no invention. Kept short so the resume
 * stays to ~1–2 pages; the full write-ups live in the case studies.
 */

export interface ResumeProject {
  name: string;
  summary: string;
  stack: string[];
}

export const RESUME_PROJECTS: ResumeProject[] = [
  {
    name: "AI Engineering — LLM Chatbot & Automated PR Review",
    summary:
      "Production Generative AI: a retrieval-augmented generation (RAG) chatbot over internal docs and an agent-based pull-request review system using tool calling and the Model Context Protocol (MCP), with LLM evaluation, guardrails and observability.",
    stack: ["RAG", "AI Agents", "MCP", "OpenAI", "Claude", "LangGraph"],
  },
  {
    name: "NodeLink",
    summary:
      "DePIN reward ecosystem — KYC/AML (SumSub), e-signatures (BoldSign), OAuth2/OIDC with JWTs, real-time updates and full observability.",
    stack: ["NestJS 11", "PostgreSQL", "Redis", "BullMQ", "Socket.IO"],
  },
  {
    name: "Zenit World",
    summary:
      "Copy-trading platform with 3M+ users — Fireblocks custody, SumSub KYC, a custom token with fiat/crypto wallets, staking and automated copy-trading.",
    stack: ["Django 4.1", "PostgreSQL", "Redis", "Celery"],
  },
  {
    name: "Web3 SSO & Wallet Platform",
    summary:
      "Centralized OAuth2/OIDC single sign-on, a Viem wallet gateway, Account Abstraction, Merkle-tree reward eligibility and gRPC cross-platform sync.",
    stack: ["NestJS", "Viem", "gRPC", "JWT", "RBAC"],
  },
  {
    name: "Spovio (HRMS)",
    summary:
      "Complete HR platform — time-off, attendance and payroll modules with role-based accrual; automated 80% of HR workflows.",
    stack: ["React", "Django", "Redis", "Celery", "AWS S3"],
  },
  {
    name: "Puretax",
    summary:
      "Multi-tenant tax backend with QuickBooks Online sync; 600+ reports/month exported to PDF/XLSX/CSV with visual charts.",
    stack: ["Django", "DRF", "Redis", "Celery"],
  },
];