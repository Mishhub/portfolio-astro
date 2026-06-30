import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/** Merge conditional class names and dedupe conflicting Tailwind utilities. */
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}

/** Format an ISO date as e.g. "Mar 2024" or "12 Mar 2024". */
export function formatDate(
  date: Date | string,
  opts: Intl.DateTimeFormatOptions = { year: "numeric", month: "short" },
): string {
  const d = typeof date === "string" ? new Date(date) : date;
  return new Intl.DateTimeFormat("en-US", { timeZone: "UTC", ...opts }).format(d);
}

/** "Mar 2021 – Present" style range used on the experience timeline. */
export function formatRange(start: Date | string, end?: Date | string | null): string {
  const from = formatDate(start);
  const to = end ? formatDate(end) : "Present";
  return `${from} – ${to}`;
}

/** Whole-year (rounded up) tenure label, e.g. "2 yrs 3 mos". */
export function durationBetween(start: Date | string, end?: Date | string | null): string {
  const from = typeof start === "string" ? new Date(start) : start;
  const to = end ? (typeof end === "string" ? new Date(end) : end) : new Date();
  const months = Math.max(
    1,
    (to.getFullYear() - from.getFullYear()) * 12 + (to.getMonth() - from.getMonth()) + 1,
  );
  const years = Math.floor(months / 12);
  const rem = months % 12;
  const parts: string[] = [];
  if (years) parts.push(`${years} yr${years > 1 ? "s" : ""}`);
  if (rem) parts.push(`${rem} mo${rem > 1 ? "s" : ""}`);
  return parts.join(" ") || "1 mo";
}

/** Resolve a path against the site origin for canonical / OG URLs. */
export function absoluteUrl(path: string, origin: string): string {
  return new URL(path, origin).href;
}

/** Stable slug from arbitrary text. */
export function slugify(input: string): string {
  return input
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "");
}
