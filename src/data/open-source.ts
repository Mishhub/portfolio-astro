/**
 * Pinned repositories + contribution summary for the Open Source page.
 * Real published npm packages: nestjs-minio-backend, scheduler-calendar
 * (100+ weekly downloads) and nestjs-dynamic-filter. No repos or stats are
 * invented; URLs point at the live npm packages.
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
    name: "scheduler-calendar",
    description:
      "A reusable calendar library published to npm during my time at Stead Technologies, with 100+ weekly downloads.",
    language: "JavaScript",
    languageColor: "#f1e05a",
    url: "https://www.npmjs.com/package/scheduler-calendar",
    topics: ["calendar", "npm", "open-source"],
  },
  {
    name: "nestjs-dynamic-filter",
    description:
      "A flexible, database-agnostic filtering system for NestJS — decorator-driven filterable fields, rich operators (exact, contains, gte/lte, in), built-in pagination and auto Swagger docs, with MongoDB/Mongoose and PostgreSQL/TypeORM support. Published to npm.",
    language: "TypeScript",
    languageColor: "#3178c6",
    url: "https://www.npmjs.com/package/nestjs-dynamic-filter",
    topics: ["nestjs", "filter", "mongodb", "postgres", "typeorm"],
  },
];

export interface ContributionSummary {
  label: string;
  value: string;
}

/** Headline contribution stats — taken from the resume, no invented numbers. */
export const CONTRIBUTION_SUMMARY: ContributionSummary[] = [
  { value: "3+", label: "Open-source packages" },
  { value: "100+", label: "Weekly npm downloads" },
  { value: "TS · Py · Sol", label: "Primary languages" },
  { value: "Yes", label: "Open to PRs" },
];

export const GITHUB_PROFILE = "https://github.com/mishhub";
