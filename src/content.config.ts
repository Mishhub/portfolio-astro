import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

/**
 * Content collections (Astro Content Layer).
 *
 * Only file/MDX-backed, render-heavy content lives here: articles, projects and
 * case studies. Simple structured lists (experience, skills, certifications,
 * open-source) are plain typed modules under `src/data/` — see those files.
 *
 * Schemas below are the contract for every entry. Keep them strict so authoring
 * mistakes surface at build time rather than in the browser.
 */

const ARTICLE_CATEGORIES = [
  "System Design",
  "Backend",
  "Frontend",
  "Architecture",
  "DevOps",
  "AI Engineering",
  "Career",
] as const;

const metric = z.object({
  value: z.string(),
  label: z.string(),
});

const articles = defineCollection({
  loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/content/articles" }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      description: z.string(),
      publishDate: z.coerce.date(),
      updatedDate: z.coerce.date().optional(),
      category: z.enum(ARTICLE_CATEGORIES),
      tags: z.array(z.string()).default([]),
      draft: z.boolean().default(false),
      featured: z.boolean().default(false),
      cover: image().optional(),
      coverAlt: z.string().optional(),
      author: z.string().optional(),
    }),
});

const projects = defineCollection({
  loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/content/projects" }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      /** One-line card summary. */
      summary: z.string(),
      /** SEO/meta description (falls back to summary). */
      description: z.string().optional(),
      year: z.string(),
      role: z.string(),
      status: z.enum(["live", "wip", "archived", "internal"]).default("live"),
      featured: z.boolean().default(false),
      order: z.number().default(999),
      domain: z.string().optional(), // e.g. "FinTech", "Developer Tooling"
      problem: z.string(),
      solution: z.string(),
      /** Short architecture note; full diagrams belong in a linked case study. */
      architecture: z.string().optional(),
      contributions: z.array(z.string()).default([]),
      technologies: z.array(z.string()).default([]),
      challenges: z.array(z.string()).default([]),
      /** Qualitative outcomes. Avoid invented numbers; use bracketed placeholders. */
      impact: z.array(z.string()).default([]),
      metrics: z.array(metric).default([]),
      lessons: z.array(z.string()).default([]),
      links: z
        .object({
          github: z.string().url().optional(),
          demo: z.string().url().optional(),
          caseStudy: z.string().optional(), // slug of a case study
        })
        .default({}),
      cover: image().optional(),
      coverAlt: z.string().optional(),
    }),
});

const caseStudies = defineCollection({
  loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/content/case-studies" }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      description: z.string(),
      /** One-line index summary. */
      summary: z.string(),
      year: z.string(),
      role: z.string(),
      problemSpace: z.string(),
      tags: z.array(z.string()).default([]),
      stack: z.array(z.string()).default([]),
      metrics: z.array(metric).default([]),
      /** Slug of the related project, if any. */
      relatedProject: z.string().optional(),
      featured: z.boolean().default(false),
      order: z.number().default(999),
      cover: image().optional(),
      coverAlt: z.string().optional(),
    }),
});

export const collections = { articles, projects, caseStudies };

export { ARTICLE_CATEGORIES };
