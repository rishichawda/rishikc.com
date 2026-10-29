import { structuredData } from "./siteData";

const { minimumCount, limit, terms } = structuredData.mentions;
const patterns = terms.map((term) => ({ id: term.wikidata, pattern: new RegExp(term.pattern, `g${term.flags ?? ""}`) }));

/** The Wikidata IDs of the terms the text uses often enough to count, most used first. */
export function findMentions(text: string): string[] {
  return patterns
    .map(({ id, pattern }) => ({ id, count: text.match(pattern)?.length ?? 0 }))
    .filter(({ count }) => count >= minimumCount)
    .sort((a, b) => b.count - a.count)
    .slice(0, limit)
    .map(({ id }) => id);
}
