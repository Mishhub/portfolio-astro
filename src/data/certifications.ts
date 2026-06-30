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
    name: "The Complete Web Developer in 2022: Zero to Mastery",
    issuer: "Udemy",
    issued: "2022",
    status: "earned",
  },
  {
    name: "The Complete Junior to Senior Web Developer Roadmap (2022)",
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
    name: "Ethereum and Solidity: The Complete Developer's Guide",
    issuer: "Udemy",
    status: "earned",
  },
  {
    name: "Industrial Training on C Language",
    issuer: "Fantacode Solutions",
    status: "earned",
  },
  {
    name: "LLM Engineering — Master AI & Large Language Models",
    issuer: "Ed Donner",
    status: "in-progress",
  },
];
