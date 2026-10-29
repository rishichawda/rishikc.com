import getReadingTime from 'reading-time';
import { toString } from 'mdast-util-to-string';

export function remarkReadingTime() {
  return function (tree, { data }) {
    const textOnPage = toString(tree);
    const readingTime = getReadingTime(textOnPage);
    data.astro.frontmatter.minutesRead = readingTime.text;
    // Words in the article text, code blocks included (mdast-util-to-string reads their text too).
    data.astro.frontmatter.wordCount = readingTime.words;
    data.astro.frontmatter.readingMinutes = Math.max(1, Math.ceil(readingTime.minutes));
  };
}
