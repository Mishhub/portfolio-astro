/**
 * Pinned repositories + contribution summary for the Open Source page.
 * Taken from the resume: a published NestJS/MinIO package and an open-source
 * calendar project with 100+ weekly npm downloads. No repos or stats are
 * invented; wire the exact URLs to live repositories as needed.
 */

export interface Repo {
  name: string;
  description: string;
  language: string;
  /** Accent for the language dot (literal hex — allowed in data). */
  languageColor: string;
  url: string;
  stars?: number;
  topics: string[];
  archived?: boolean;
}

export const PINNED_REPOS: Repo[] = [
  {
    name: "nestjs-minio-backend",
    description:
      "A NestJS module for MinIO / S3-compatible object storage — configurable buckets, signed URLs and a clean injectable client. Published to npm and used in production.",
    language: "TypeScript",
    languageColor: "#3178c6",
    url: "https://www.npmjs.com/package/nestjs-minio-backend",
    topics: ["nestjs", "minio", "s3", "storage"],
  },
  {
    name: "Open-source calendar",
    description:
      "A reusable calendar library published to npm during my time at Stead Technologies, with 100+ weekly downloads.",
    language: "JavaScript",
    languageColor: "#f1e05a",
    url: "https://github.com/mishhub",
    topics: ["calendar", "npm", "open-source"],
  },
];

export interface ContributionSummary {
  label: string;
  value: string;
}

/** Headline contribution stats — taken from the resume, no invented numbers. */
export const CONTRIBUTION_SUMMARY: ContributionSummary[] = [
  { value: "2+", label: "Open-source packages" },
  { value: "100+", label: "Weekly npm downloads" },
  { value: "TS · Py · Sol", label: "Primary languages" },
  { value: "Yes", label: "Open to PRs" },
];

export const GITHUB_PROFILE = "https://github.com/mishhub";
