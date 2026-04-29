import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function stripMarkdown(text: string): string {
  if (!text) return "";
  // Remove **bold**, *italic*, # headings, and `code` ticks
  return text
    .replace(/(\*\*|\*|_|#|`)/g, "")
    .replace(/^\s*-\s+/gm, "• ") // replace list hyphens with cleaner bullets
    .trim();
}
