// Regenerates public/robots.txt from the community list of AI crawlers and agents:
//   https://github.com/ai-robots-txt/ai.robots.txt (robots.json)
//
//   node .github/scripts/update-robots.mjs
//
// Every crawler on that list, plus the extras below, is kept off the gallery photographs, the
// share-image crops under /previews/ and /api/. Every other crawler (search engines, link-preview
// bots) is kept off the photographs and /api/ only, so a shared link still gets its preview image.
import { readFile, writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';

const SOURCE = 'https://raw.githubusercontent.com/ai-robots-txt/ai.robots.txt/main/robots.json';
const OUT = fileURLToPath(new URL('../../public/robots.txt', import.meta.url));

// The crawler names that are not taken from the community list are in the content repository.
const DATA = fileURLToPath(new URL('../../content/about/structured-data.json', import.meta.url));
// EXTRA: crawlers the list does not carry (the Google image indexer, Meta's search indexer).
// LINK_PREVIEW: on the list, but Facebook and WhatsApp fetch the share image with it, so it must reach /previews/.
const { extraCrawlers: EXTRA, linkPreviewCrawlers: LINK_PREVIEW } = JSON.parse(await readFile(DATA, 'utf8')).data.robots;

const response = await fetch(SOURCE);
if (!response.ok) throw new Error(`${SOURCE} answered ${response.status}`);
const listed = Object.keys(await response.json());

const agents = [...new Set([...listed, ...EXTRA])]
  .filter((name) => !LINK_PREVIEW.includes(name))
  .sort((a, b) => a.localeCompare(b, 'en', { sensitivity: 'base' }));

const body = `# Photography is reserved: no crawler may fetch /_astro/photos/ (the gallery photographs).
# AI crawlers, AI agents and image indexers are also kept off /previews/ (crops of those photographs,
# there only so that a shared link gets a preview image). The ${agents.length} names are the community list at
# https://github.com/ai-robots-txt/ai.robots.txt plus ${EXTRA.join(' and ')}, without ${LINK_PREVIEW.join(' and ')}.
# Regenerate with: node .github/scripts/update-robots.mjs
# Text pages, article images, icons and share images stay crawlable for search and link previews.
# A crawler uses only the one group that names it, so the "*" group below covers everything else.

User-agent: *
Disallow: /_astro/photos/
Disallow: /api/

${agents.map((name) => `User-agent: ${name}`).join('\n')}
Disallow: /_astro/photos/
Disallow: /previews/
Disallow: /api/

# Sitemap location
Sitemap: https://rishikc.com/sitemap-index.xml
`;

await writeFile(OUT, body);
console.log(`public/robots.txt: ${agents.length} AI and image crawlers`);
