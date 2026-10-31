/**
 * Certifications & courses, taken directly from the resume. The resume gives no
 * issue months, so `issued` holds a plain display year (omitted when unknown) —
 * no dates are invented. Credential URLs are the ones the CV links to.
 */

export interface Certification {
  name: string;
  issuer: string;
  /** Display period as a string, e.g. "2022". Omitted when not stated. */
  issued?: string;
  credentialUrl?: string;
  status?: "earned" | "in-progress";
}

export const CERTIFICATIONS: Certification[] = [
  {
    name: "AI Engineer Agentic Track: The Complete Agent & MCP Course",
    issuer: "Ed Donner · Udemy",
    issued: "2026",
    credentialUrl: "https://www.udemy.com/certificate/UC-ffbeec9d-32f4-40a9-a723-4bd49c0814e9/",
    status: "earned",
  },
  {
    name: "AI Engineer Core Track: LLM Engineering, RAG, QLoRA, Agents",
    issuer: "Ed Donner · Udemy",
    issued: "2026",
    credentialUrl: "https://www.udemy.com/certificate/UC-8f4669e0-bae9-49a9-9234-e0d3faaa7523/",
    status: "earned",
  },
  {
    name: "One Million Prompters: OpenAI Agents SDK, CrewAI, LangGraph and MCP",
    issuer: "Dubai Future Foundation",
    issued: "2026",
    credentialUrl: "https://omp.dub.ai/certificate/FNpnQC5CyKX8",
    status: "earned",
  },
  {
    name: "Ethereum and Solidity: The Complete Developer's Guide",
    issuer: "Udemy",
    issued: "2024",
    status: "earned",
  },
  {
    name: "The Complete Junior to Senior Web Developer Roadmap (2022)",
    issuer: "Udemy",
    issued: "2023",
    status: "earned",
  },
  {
    name: "The Complete Web Developer in 2022: Zero to Mastery",
    issuer: "Udemy",
    issued: "2022",
    status: "earned",
  },
  {
    name: "Complete React Native Developer in 2022: Zero to Mastery [with Hooks]",
    issuer: "Udemy",
    issued: "2022",
    status: "earned",
  },
  {
    name: "Industrial Training on C Language",
    issuer: "Fantacode Solutions",
    status: "earned",
    issued: "2019",
  },
];
