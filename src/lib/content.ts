import { getCollection, type CollectionEntry } from "astro:content";
import readingTime from "reading-time";

/** "5 min read" for an article/case-study body. */
export function readingTimeOf(entry: { body?: string }): string {
  return readingTime(entry.body ?? "").text;
}

/** Published articles, newest first. Drafts are dropped outside dev. */
export async function getPublishedArticles(): Promise<CollectionEntry<"articles">[]> {
  const all = await getCollection("articles", ({ data }) =>
    import.meta.env.PROD ? !data.draft : true,
  );
  return all.sort((a, b) => b.data.publishDate.valueOf() - a.data.publishDate.valueOf());
}

/** Projects sorted by explicit `order`, then most recent. */
export async function getSortedProjects(): Promise<CollectionEntry<"projects">[]> {
  const all = await getCollection("projects");
  return all.sort((a, b) => a.data.order - b.data.order);
}

/** Case studies sorted by explicit `order`. */
export async function getSortedCaseStudies(): Promise<CollectionEntry<"caseStudies">[]> {
  const all = await getCollection("caseStudies");
  return all.sort((a, b) => a.data.order - b.data.order);
}

/** First featured entry, falling back to the first entry. */
export function pickFeatured<T extends { data: { featured?: boolean } }>(
  entries: T[],
): T | undefined {
  return entries.find((e) => e.data.featured) ?? entries[0];
}

/** Unique, sorted tag list across a set of articles. */
export function collectTags(entries: CollectionEntry<"articles">[]): string[] {
  const tags = new Set<string>();
  for (const e of entries) e.data.tags.forEach((t) => tags.add(t));
  return [...tags].sort((a, b) => a.localeCompare(b));
}
