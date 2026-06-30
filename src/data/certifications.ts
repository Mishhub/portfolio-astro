/**
 * Certifications & courses, taken directly from the resume. The resume gives no
 * issue months, so `issued` holds a plain display year (omitted when unknown) —
 * no dates are invented.
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
    name: "AI Engineer Core Track: LLM Engineering, RAG, QLoRA, Agents",
    issuer: "Ed Donner",
    issued: "2026",
    status: "in-progress",
  },
  {
    name: "One Million Prompters: Boost your knowledge in prompt engineering",
    issuer: "Dubai Future Foundation",
    issued: "2026",
    status: "earned",
  },
  {
    name: "The Complete Web Developer in 2022: Zero to Mastery",
    issuer: "Udemy",
    issued: "2022",
    status: "earned",
  },
  {
    name: "The Complete Junior to Senior Web Developer Roadmap (2022)",
    issuer: "Udemy",
    issued: "2023",
    status: "earned",
  },
  {
    name: "Complete React Native Developer in 2022: Zero to Mastery [with Hooks]",
    issuer: "Udemy",
    issued: "2022",
    status: "earned",
  },
  {
    name: "Ethereum and Solidity: The Complete Developer's Guide",
    issuer: "Udemy",
    issued: "2024",
    status: "earned",
  },
  {
    name: "Industrial Training on C Language",
    issuer: "Fantacode Solutions",
    status: "earned",
    issued: "2019",
  },
];
