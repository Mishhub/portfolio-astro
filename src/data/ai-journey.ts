/**
 * Data for the "AI Engineering" page — the training behind the AI work, the
 * stack it uses, the path from fundamentals to production, and what has
 * shipped. Every item traces to the resume or to a public repo.
 */

export interface AiCourse {
  title: string;
  instructor: string;
  provider: string;
  year: string;
  credentialUrl: string;
  blurb: string;
}

/** Both tracks of Ed Donner's AI Engineer programme — completed. */
export const AI_COURSES: AiCourse[] = [
  {
    title: "AI Engineer Core Track: LLM Engineering, RAG, QLoRA, Agents",
    instructor: "Ed Donner",
    provider: "Udemy",
    year: "2026",
    credentialUrl: "https://www.udemy.com/certificate/UC-8f4669e0-bae9-49a9-9234-e0d3faaa7523/",
    blurb:
      "An 8-week, hands-on programme building real LLM applications — from LLM engineering and RAG to QLoRA fine-tuning and agents.",
  },
  {
    title: "AI Engineer Agentic Track: The Complete Agent & MCP Course",
    instructor: "Ed Donner",
    provider: "Udemy",
    year: "2026",
    credentialUrl: "https://www.udemy.com/certificate/UC-ffbeec9d-32f4-40a9-a723-4bd49c0814e9/",
    blurb:
      "Agentic systems end to end — agent frameworks, multi-agent orchestration and the Model Context Protocol (MCP).",
  },
];

export interface Topic {
  name: string;
  /** Where this sits in the arc from fundamentals to production. */
  stage: "foundations" | "core" | "agents" | "applied";
  /** Shown in the AI section on the home page. */
  featured?: boolean;
}

/** The AI stack — drives the topic groups on the AI page and home section. */
export const AI_TOPICS: Topic[] = [
  { name: "LLMs", stage: "foundations", featured: true },
  { name: "Prompt Engineering", stage: "foundations" },
  { name: "Tool / Function Calling", stage: "foundations", featured: true },
  { name: "Embeddings", stage: "foundations" },
  { name: "OpenAI SDK", stage: "foundations" },
  { name: "Hugging Face", stage: "foundations" },
  { name: "Fine-tuning (QLoRA)", stage: "foundations" },
  { name: "RAG", stage: "core", featured: true },
  { name: "Vector Databases", stage: "core" },
  { name: "pgvector", stage: "core", featured: true },
  { name: "Qdrant", stage: "core" },
  { name: "Cross-Encoder Reranking", stage: "core" },
  { name: "LlamaIndex", stage: "core" },
  { name: "LLM Evaluation", stage: "core" },
  { name: "AI Agents", stage: "agents" },
  { name: "Agentic AI", stage: "agents", featured: true },
  { name: "Multi-Agent Systems", stage: "agents", featured: true },
  { name: "LangGraph", stage: "agents", featured: true },
  { name: "LangChain", stage: "agents", featured: true },
  { name: "SQL Agents", stage: "agents" },
  { name: "Model Context Protocol (MCP)", stage: "agents", featured: true },
  { name: "OpenAI Agents SDK", stage: "agents" },
  { name: "CrewAI", stage: "agents" },
  { name: "AutoGen", stage: "agents" },
  { name: "FastAPI", stage: "applied" },
  { name: "LangSmith", stage: "applied", featured: true },
  { name: "LangSmith Studio", stage: "applied" },
  { name: "Guardrails & PII Redaction", stage: "applied" },
  { name: "LiteLLM", stage: "applied" },
  { name: "Gradio", stage: "applied" },
  { name: "AI Workflows", stage: "applied" },
  { name: "Claude Code", stage: "applied" },
  { name: "Claude Agent Skills", stage: "applied" },
  { name: "CLAUDE.md / AGENTS.md", stage: "applied" },
];

export interface Milestone {
  /** Short period label, e.g. "Phase 1". */
  period: string;
  title: string;
  description: string;
  status: "done" | "active" | "planned";
}

export const AI_ROADMAP: Milestone[] = [
  {
    period: "Phase 1",
    title: "Foundations",
    description:
      "LLM fundamentals, prompt engineering, tool / function calling and the OpenAI SDK — real intuition for tokens, context windows and model behaviour.",
    status: "done",
  },
  {
    period: "Phase 2",
    title: "Retrieval & Grounding",
    description:
      "Embeddings, vector databases and RAG pipelines, with cross-encoder reranking and evaluation to measure retrieval quality, not vibes.",
    status: "done",
  },
  {
    period: "Phase 3",
    title: "Agents & Tooling",
    description:
      "Agentic workflows and the Model Context Protocol — LangGraph, CrewAI, the OpenAI Agents SDK and AutoGen compared on real tasks, completing Ed Donner's Agentic Track.",
    status: "done",
  },
  {
    period: "Phase 4",
    title: "Production AI",
    description:
      "Engineering rigour applied to agents in production: a multi-agent LangGraph assistant with read-only scoped tools, PII redaction, prompt-injection guardrails, fallback routing and LangSmith tracing.",
    status: "done",
  },
];

export interface ShippedWork {
  title: string;
  description: string;
  /** Internal or external link to the write-up. */
  href?: string;
  linkLabel?: string;
}

/** AI systems that have actually shipped. */
export const AI_SHIPPED: ShippedWork[] = [
  {
    title: "Multi-agent AI assistant",
    description:
      "LangGraph planner/router, pgvector RAG over implementation docs and PRDs, and a SQL-agent subgraph — customer support resolves user cases without escalating to engineering.",
    href: "/case-studies/multi-agent-ai-assistant",
    linkLabel: "Read the case study",
  },
  {
    title: "MCP-based PR-review agent",
    description:
      "An agent-based pull-request review system built on tool calling and the Model Context Protocol (MCP).",
  },
  {
    title: "This site's RAG chatbot",
    description:
      "FastAPI, Gemini and hand-rolled two-stage retrieval with a refusal floor — production-grade at $0/month, and open source.",
    href: "/projects/portfolio-rag-chatbot",
    linkLabel: "See the project",
  },
];
