import { existsSync, readdirSync, readFileSync } from 'node:fs';
import { join } from 'node:path';

// Last-modified dates for the sitemap, read from the frontmatter of the content files. The sitemap
// integration runs from the config file, before the content collections exist, so it cannot ask them.
const field = (text, key) => text.match(new RegExp(`^${key}:\\s*["']?([^"'\\n]+?)["']?\\s*$`, 'm'))?.[1];
const frontmatter = (file) => readFileSync(file, 'utf8').split(/^---$/m)[1] ?? '';

/** Map of URL path to ISO date for every article and bit, plus the two lists that hold them. */
export function lastModified(contentDir = 'content') {
  const dates = new Map();
  const files = [];
  const articles = join(contentDir, 'articles');
  const bits = join(contentDir, 'bits');
  if (existsSync(articles)) {
    for (const entry of readdirSync(articles, { withFileTypes: true })) {
      if (!entry.isDirectory()) continue;
      for (const name of ['index.mdx', 'index.md']) {
        if (existsSync(join(articles, entry.name, name))) files.push(join(articles, entry.name, name));
      }
    }
  }
  if (existsSync(bits)) {
    for (const name of readdirSync(bits)) if (/\.mdx?$/.test(name)) files.push(join(bits, name));
  }
  const newest = { '/articles/': 0, '/bits/': 0 };
  for (const file of files) {
    const meta = frontmatter(file);
    const path = field(meta, 'path');
    const date = new Date(field(meta, 'dateModified') ?? field(meta, 'date') ?? NaN);
    if (!path || Number.isNaN(date.getTime())) continue;
    dates.set(path, date.toISOString());
    const list = file.startsWith(articles) ? '/articles/' : '/bits/';
    newest[list] = Math.max(newest[list], date.getTime());
  }
  for (const [path, time] of Object.entries(newest)) if (time) dates.set(path, new Date(time).toISOString());
  return dates;
}
