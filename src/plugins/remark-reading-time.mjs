import getReadingTime from 'reading-time';
import { toString } from 'mdast-util-to-string';
import { readFileSync } from 'node:fs';

// The terms that count as a mention, from content/about/structured-data.json.
const { mentions } = JSON.parse(
  readFileSync(new URL('../../content/about/structured-data.json', import.meta.url), 'utf8'),
);
const terms = mentions.terms.map((term) => ({ id: term.wikidata, pattern: new RegExp(term.pattern, `g${term.flags ?? ''}`) }));

/** The Wikidata IDs of the terms the text uses often enough to count, most used first. */
function findMentions(text) {
  return terms
    .map(({ id, pattern }) => ({ id, count: text.match(pattern)?.length ?? 0 }))
    .filter(({ count }) => count >= mentions.minimumCount)
    .sort((a, b) => b.count - a.count)
    .slice(0, mentions.limit)
    .map(({ id }) => id);
}

export function remarkReadingTime() {
  return function (tree, { data }) {
    const textOnPage = toString(tree);
    const readingTime = getReadingTime(textOnPage);
    data.astro.frontmatter.minutesRead = readingTime.text;
    // Words in the article text, code blocks included (mdast-util-to-string reads their text too).
    data.astro.frontmatter.wordCount = readingTime.words;
    data.astro.frontmatter.readingMinutes = Math.max(1, Math.ceil(readingTime.minutes));
    data.astro.frontmatter.mentions = findMentions(textOnPage);
  };
}
