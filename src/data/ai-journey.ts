/**
 * Data for the "AI Engineering Journey" page — a living log of the transition
 * into production AI engineering. Honest framing: this documents active
 * learning, not claimed mastery.
 */

export const AI_COURSE = {
  title: "AI Engineer Core Track: LLM Engineering, RAG, QLoRA, Agents",
  instructor: "Ed Donner",
  status: "In progress",
  blurb:
    "An 8-week, hands-on programme building real LLM applications. I'm working through it alongside my own experiments and write-ups.",
} as const;

export interface Topic {
  name: string;
  /** Where this sits in the learning arc. */
  stage: "foundations" | "core" | "agents" | "applied";
}

/** Topics currently being studied — drives the topic cloud on the AI page. */
export const AI_TOPICS: Topic[] = [
  { name: "LLMs", stage: "foundations" },
  { name: "Prompt Engineering", stage: "foundations" },
  { name: "Embeddings", stage: "core" },
  { name: "Vector Databases", stage: "core" },
  { name: "RAG", stage: "core" },
  { name: "Tool Calling", stage: "core" },
  { name: "OpenAI SDK", stage: "core" },
  { name: "AI Agents", stage: "agents" },
  { name: "Agentic AI", stage: "agents" },
  { name: "Model Context Protocol (MCP)", stage: "agents" },
  { name: "LangGraph", stage: "agents" },
  { name: "CrewAI", stage: "agents" },
  { name: "AutoGen", stage: "agents" },
  { name: "AI Workflows", stage: "applied" },
];

export interface Milestone {
  /** Short period label, e.g. "Q1 2025". */
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
      "LLM fundamentals, prompt engineering and the OpenAI SDK. Building intuition for tokens, context windows and model behaviour.",
    status: "done",
  },
  {
    period: "Phase 2",
    title: "Retrieval & Grounding",
    description:
      "Embeddings, vector databases and RAG pipelines — with evaluation harnesses to measure retrieval quality, not vibes.",
    status: "done",
  },
  {
    period: "Phase 3",
    title: "Agents & Tooling",
    description:
      "Tool calling, agentic workflows and the Model Context Protocol. Comparing LangGraph, CrewAI and AutoGen on real tasks.",
    status: "active",
  },
  {
    period: "Phase 4",
    title: "Production AI",
    description:
      "Bringing engineering rigour to AI systems: observability, cost control, guardrails and shipping an agent to production.",
    status: "planned",
  },
];

/** Hands-on artefacts that will grow over time. */
export const AI_OUTPUTS = [
  "Open-source experiments and notebooks",
  "Technical write-ups on what worked and what didn't",
  "A production-grade agent with real observability",
] as const;
