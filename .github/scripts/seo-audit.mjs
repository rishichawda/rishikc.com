import { readdir, readFile, stat } from 'node:fs/promises';
import { join, relative, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

// Audits the built site's head tags and JSON-LD. Hard failures exit 1; metrics are printed.
//   node .github/scripts/seo-audit.mjs [--dist dist] [--expected src/utils/wikidata.json] [--offline]
// --offline skips the live Wikidata label check. A Wikidata outage exits 2, apart from a failed check.
const args = process.argv.slice(2);
const flag = (name) => args.indexOf(name);
const dist = resolve(flag('--dist') >= 0 ? args[flag('--dist') + 1] : 'dist');
const offline = flag('--offline') >= 0;
const SITE = 'https://rishikc.com';
const expectedFile = flag('--expected') >= 0
  ? resolve(args[flag('--expected') + 1])
  : fileURLToPath(new URL('../../src/utils/wikidata.json', import.meta.url));
const expected = JSON.parse(await readFile(expectedFile, 'utf8'));

const PERSON_KEYS = ['author', 'creator', 'publisher', 'copyrightHolder', 'provider'];
const failures = [];
const fail = (page, message) => failures.push({ page, message });

async function* walk(dir) {
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const path = join(dir, entry.name);
    if (entry.isDirectory()) yield* walk(path);
    else yield path;
  }
}

const decode = (text) =>
  text.replace(/&amp;/g, '&').replace(/&quot;/g, '"').replace(/&#39;/g, "'").replace(/&lt;/g, '<').replace(/&gt;/g, '>');

function attributes(tag) {
  const attrs = {};
  for (const m of tag.matchAll(/([a-zA-Z:-]+)(?:=(?:"([^"]*)"|'([^']*)'|([^\s>]+)))?/g)) {
    attrs[m[1].toLowerCase()] = decode(m[2] ?? m[3] ?? m[4] ?? '');
  }
  return attrs;
}

function readPage(path, html) {
  const metas = [...html.matchAll(/<meta\s([^>]*)>/gi)].map((m) => attributes(m[1]));
  const links = [...html.matchAll(/<link\s([^>]*)>/gi)].map((m) => attributes(m[1]));
  const meta = (key) => metas.find((m) => m.name === key || m.property === key)?.content;
  const scripts = [...html.matchAll(/<script[^>]*type="?application\/ld\+json"?[^>]*>([\s\S]*?)<\/script>/gi)];
  return {
    path,
    html,
    title: decode(html.match(/<title[^>]*>([\s\S]*?)<\/title>/i)?.[1] ?? ''),
    meta,
    metas,
    links,
    canonical: links.find((l) => l.rel === 'canonical')?.href,
    description: meta('description'),
    jsonld: scripts.map((s) => s[1]),
  };
}

// Image dimensions from the file header: PNG, JPEG, WebP and GIF.
function imageSize(buf) {
  if (buf.toString('latin1', 1, 4) === 'PNG') return { width: buf.readUInt32BE(16), height: buf.readUInt32BE(20) };
  if (buf.toString('latin1', 0, 3) === 'GIF') return { width: buf.readUInt16LE(6), height: buf.readUInt16LE(8) };
  if (buf.toString('latin1', 0, 4) === 'RIFF' && buf.toString('latin1', 8, 12) === 'WEBP') {
    const kind = buf.toString('latin1', 12, 16);
    if (kind === 'VP8X') return { width: 1 + buf.readUIntLE(24, 3), height: 1 + buf.readUIntLE(27, 3) };
    if (kind === 'VP8L') {
      const bits = buf.readUInt32LE(21);
      return { width: 1 + (bits & 0x3fff), height: 1 + ((bits >> 14) & 0x3fff) };
    }
    return { width: buf.readUInt16LE(26) & 0x3fff, height: buf.readUInt16LE(28) & 0x3fff };
  }
  if (buf[0] === 0xff && buf[1] === 0xd8) {
    let i = 2;
    while (i < buf.length) {
      if (buf[i] !== 0xff) return null;
      const marker = buf[i + 1];
      const length = buf.readUInt16BE(i + 2);
      if (marker >= 0xc0 && marker <= 0xcf && ![0xc4, 0xc8, 0xcc].includes(marker)) {
        return { width: buf.readUInt16BE(i + 7), height: buf.readUInt16BE(i + 5) };
      }
      i += 2 + length;
    }
  }
  return null;
}

// Local file for a site URL, or null for an external one.
function distFile(url) {
  if (!url.startsWith(SITE)) return null;
  const path = decodeURIComponent(new URL(url).pathname);
  return join(dist, path.endsWith('/') ? `${path}index.html` : path);
}

const exists = (file) => stat(file).then(() => true, () => false);

// ── Load pages ──
const pages = [];
for await (const file of walk(dist)) {
  if (!file.endsWith('.html') || file.includes('~partytown')) continue;
  const rel = relative(dist, file);
  const path = `/${rel.replace(/index\.html$/, '').replace(/\.html$/, '')}`;
  pages.push(readPage(path, await readFile(file, 'utf8')));
}
if (pages.length === 0) throw new Error(`No pages found in ${dist}. Run yarn build first.`);

// ── JSON-LD ──
const wikidataIds = new Set();
const typesOf = (node) => [node['@type']].flat().filter(Boolean);

function walkGraph(value, visit) {
  if (Array.isArray(value)) value.forEach((v) => walkGraph(v, visit));
  else if (value && typeof value === 'object') {
    visit(value);
    Object.values(value).forEach((v) => walkGraph(v, visit));
  }
}

for (const page of pages) {
  if (!page.canonical) fail(page.path, 'missing canonical link');
  if (!page.description) fail(page.path, 'missing meta description');
  page.nodes = [];
  if (page.jsonld.length === 0) fail(page.path, 'no JSON-LD');
  for (const raw of page.jsonld) {
    let data;
    try {
      data = JSON.parse(raw);
    } catch (error) {
      fail(page.path, `invalid JSON-LD (${error.message})`);
      continue;
    }
    for (const m of raw.matchAll(/wikidata\.org\/(?:wiki|entity)\/(Q\d+)/g)) wikidataIds.add(m[1]);
    const top = data['@graph'] ?? [data];
    const seen = new Set();
    for (const node of top) {
      if (!node['@id']) continue;
      if (seen.has(node['@id'])) fail(page.path, `duplicate @id ${node['@id']}`);
      seen.add(node['@id']);
    }
    const defined = new Set();
    const refs = [];
    walkGraph(data, (node) => {
      if (!node['@id']) return;
      if (node['@type']) defined.add(node['@id']);
      else if (Object.keys(node).length === 1) refs.push(node['@id']);
    });
    for (const id of refs) if (!defined.has(id)) fail(page.path, `@id reference with no node ${id}`);
    // Google wants the author's name and a url that identifies them, not a bare @id reference.
    walkGraph(data, (node) => {
      for (const key of PERSON_KEYS) {
        for (const value of [node[key]].flat()) {
          if (value?.['@id'] === `${SITE}/#person` && !(value.name && value.url)) {
            fail(page.path, `${key} references the Person without a name and url`);
          }
        }
      }
    });
    if (raw.includes(`${SITE}/#organization`)) fail(page.path, 'uses the #organization id; the employer is #employer');
    page.nodes.push(...top);
  }
}

// ── Images the head points to must exist in dist ──
const imageSizes = new Map();
for (const page of pages) {
  const photoUrls = new Set(page.html.match(/\/_astro\/photos\/[^"'\s)<>,]+/g) ?? []);
  for (const url of photoUrls) {
    if (!(await exists(join(dist, decodeURIComponent(url))))) fail(page.path, `photo URL missing from dist ${url}`);
  }
  for (const key of ['og:image', 'twitter:image', 'image']) {
    const url = page.meta(key);
    const file = url && distFile(url);
    if (file && !(await exists(file))) fail(page.path, `${key} file missing from dist ${url}`);
  }
  const ogImage = page.meta('og:image');
  const file = ogImage && distFile(ogImage);
  if (file && (await exists(file))) {
    if (!imageSizes.has(file)) imageSizes.set(file, imageSize(await readFile(file)));
    page.ogSize = imageSizes.get(file);
  }
}

// ── Photography stays under /_astro/photos/ and robots.txt keeps crawlers out of it ──
const PHOTO_PATH = '/_astro/photos/';
const repoRoot = fileURLToPath(new URL('../../', import.meta.url));
const galleryDir = join(repoRoot, 'content/gallery');
// The build compresses images, so dist files cannot be matched to the originals by content. The
// original's file name survives as the start of the built name: purple_sunbird.<hash>.jpg.
const stem = (file) => file.split('/').at(-1).replace(/\.[^.]+\.[^.]+$/, '');
if (await exists(galleryDir)) {
  const galleryStems = new Set();
  for await (const file of walk(galleryDir)) if (/\.jpe?g$/i.test(file)) galleryStems.add(file.split('/').at(-1).replace(/\.[^.]+$/, ''));
  const published = new Set();
  for await (const file of walk(join(dist, '_astro'))) {
    if (!/\.jpe?g$/i.test(file)) continue;
    const photo = galleryStems.has(stem(file));
    const underPhotos = file.includes(PHOTO_PATH);
    if (photo && !underPhotos) fail('photos', `gallery photo published outside ${PHOTO_PATH}: ${relative(dist, file)}`);
    if (!photo && underPhotos) fail('photos', `non-gallery file under ${PHOTO_PATH}: ${relative(dist, file)}`);
    if (photo) published.add(stem(file));
  }
  for (const name of galleryStems) if (!published.has(name)) fail('photos', `gallery photo ${name} has no original in dist`);
}

const robots = (await exists(join(dist, 'robots.txt'))) ? await readFile(join(dist, 'robots.txt'), 'utf8') : '';
const groups = [];
for (const line of robots.split('\n').map((l) => l.replace(/#.*/, '').trim()).filter(Boolean)) {
  const [field, ...rest] = line.split(':');
  const value = rest.join(':').trim();
  if (/^user-agent$/i.test(field)) {
    if (!groups.at(-1) || groups.at(-1).rules.length) groups.push({ agents: [], rules: [] });
    groups.at(-1).agents.push(value.toLowerCase());
  } else if (/^(dis)?allow$/i.test(field) && groups.length) {
    groups.at(-1).rules.push({ allow: /^allow$/i.test(field), path: value });
  }
}
// Longest matching rule wins, as in Google's robots.txt parser; plain prefixes are all this file uses.
const allowed = (agent, path) => {
  const group = groups.find((g) => g.agents.includes(agent.toLowerCase())) ?? groups.find((g) => g.agents.includes('*'));
  const match = (group?.rules ?? []).filter((r) => r.path && path.startsWith(r.path)).sort((a, b) => b.path.length - a.path.length)[0];
  return !match || match.allow;
};
const robotAgents = [...new Set([...groups.flatMap((g) => g.agents), 'googlebot', 'bingbot', 'twitterbot'])];
const heroPaths = new Set();
for (const page of pages) {
  const url = page.meta('og:image');
  if (url?.startsWith(SITE) && !url.includes(PHOTO_PATH)) heroPaths.add(new URL(url).pathname);
}
if (groups.length === 0) fail('robots.txt', 'no groups found');
for (const agent of robotAgents) {
  if (allowed(agent, `${PHOTO_PATH}x.jpg`)) fail('robots.txt', `${agent} may fetch ${PHOTO_PATH}`);
  if (allowed(agent, '/api/search-index.json')) fail('robots.txt', `${agent} may fetch /api/`);
  for (const path of ['/', '/articles/', '/favicon.ico', ...heroPaths]) {
    if (!allowed(agent, path)) fail('robots.txt', `${agent} is blocked from ${path}`);
  }
}

// ── Share images and JSON-LD images must not point at a protected photograph ──
for (const page of pages) {
  for (const key of ['og:image', 'twitter:image', 'image']) {
    if (page.meta(key)?.includes(PHOTO_PATH)) fail(page.path, `${key} is a photograph under ${PHOTO_PATH}`);
  }
  for (const node of page.nodes) {
    walkGraph(node, (n) => {
      for (const value of [n.image, n.thumbnailUrl].flat()) {
        const url = typeof value === 'string' ? value : value?.url;
        if (url?.includes(PHOTO_PATH)) fail(page.path, `JSON-LD image is a photograph under ${PHOTO_PATH}`);
      }
    });
  }
  const og = page.meta('og:image');
  if (og?.includes('/previews/') && (page.ogSize?.width !== 1200 || page.ogSize?.height !== 630)) {
    fail(page.path, 'preview image is not 1200x630');
  }
}

// ── Head basics: language, viewport, robots and the declared share image facts ──
const MIME = { png: 'image/png', jpg: 'image/jpeg', jpeg: 'image/jpeg', webp: 'image/webp', avif: 'image/avif', gif: 'image/gif' };
for (const page of pages) {
  if (!/<html[^>]*\slang="?en-US"?/i.test(page.html)) fail(page.path, '<html lang> is not en-US');
  if (!/initial-scale=1/.test(page.meta('viewport') ?? '')) fail(page.path, 'viewport lacks initial-scale=1');
  const robots = page.meta('robots') ?? '';
  if (!robots.includes('noindex') && !robots.includes('max-image-preview:large')) {
    fail(page.path, 'indexable page lacks max-image-preview:large in the robots meta');
  }
  if (page.ogSize) {
    const declared = `${page.meta('og:image:width')}x${page.meta('og:image:height')}`;
    if (declared !== `${page.ogSize.width}x${page.ogSize.height}`) {
      fail(page.path, `og:image declares ${declared}, file is ${page.ogSize.width}x${page.ogSize.height}`);
    }
    const ext = page.meta('og:image').split('.').at(-1);
    if (page.meta('og:image:type') !== MIME[ext]) fail(page.path, `og:image:type is ${page.meta('og:image:type')}, file is ${ext}`);
  }
}

// ── The name is written in full; "Rishi Chawda" may stay only as a keyword or alternate name ──
// Text inside <main> comes from the content repository, so only the site's own chrome is checked.
const shortName = (text) =>
  text
    .replace(/<main[\s\S]*<\/main>/i, '')
    .replace(/<meta[^>]*name="?keywords"?[^>]*>/gi, '')
    .replace(/"alternateName":\[[^\]]*\]/g, '')
    .includes('Rishi Chawda');
for (const page of pages) if (shortName(page.html)) fail(page.path, 'writes "Rishi Chawda" outside keywords and alternateName');
if (await exists(join(dist, 'llms-full.txt')) && shortName(await readFile(join(dist, 'llms-full.txt'), 'utf8'))) {
  fail('/llms-full.txt', 'writes "Rishi Chawda"');
}

// ── Titles: the brand suffix only on short hub pages; every other name and title is bare ──
const BRAND = ' | Rishi Kumar Chawda';
const HUBS = new Set(['/404', '/about/', '/articles/', '/articles/series/', '/bits/', '/career/', '/contact/', '/gallery/', '/privacy/', '/projects/', '/reads/', '/search/']);
for (const page of pages) {
  const suffixed = page.title.endsWith(BRAND);
  if (HUBS.has(page.path)) {
    if (!suffixed) fail(page.path, 'hub page title lacks the brand suffix');
    if (page.title.length > 60) fail(page.path, `hub page title is ${page.title.length} characters`);
  } else if (suffixed) {
    fail(page.path, 'content page title carries the brand suffix');
  }
  for (const key of ['og:title', 'twitter:title']) {
    if (page.meta(key)?.includes(BRAND)) fail(page.path, `${key} carries the brand suffix`);
  }
  if (JSON.stringify(page.nodes).includes(BRAND)) fail(page.path, 'JSON-LD name, headline or breadcrumb carries the brand suffix');
}

// ── Articles: the fields Google and answer engines read ──
const articleNodes = (page) => page.nodes.filter((n) => typesOf(n).some((t) => /Article|BlogPosting/.test(t)) && /#article$/.test(n['@id'] ?? ''));
const pageByPath = new Map(pages.map((p) => [p.path, p]));
const RATIOS = [16 / 9, 4 / 3, 1];
for (const page of pages) {
  for (const article of articleNodes(page)) {
    if (!(article.wordCount > 0)) fail(page.path, 'article has no wordCount');
    if (!/^PT\d+M$/.test(article.timeRequired ?? '')) fail(page.path, 'article has no timeRequired');
    if (article.inLanguage !== 'en-US') fail(page.path, 'article inLanguage is not en-US');
    if (article.isAccessibleForFree !== true) fail(page.path, 'article lacks isAccessibleForFree');
    if (!article.copyrightYear) fail(page.path, 'article lacks copyrightYear');
    const parts = [article.isPartOf].flat().filter(Boolean);
    if (!parts.some((p) => p['@id'] === `${SITE}/#website`)) fail(page.path, 'article is not part of the WebSite');
    if (page.meta('og:type') !== 'article') fail(page.path, 'article page lacks og:type article');
    if (!page.meta('article:published_time')) fail(page.path, 'article page lacks article:published_time');
    if (!page.links.some((l) => l.rel === 'author')) fail(page.path, 'article page lacks <link rel="author">');
    if (!page.html.includes('>Rishi Kumar Chawda</a>')) fail(page.path, 'article page shows no visible byline linking the author');
    // Hero images that are gallery photographs get the preview as their image instead of a set.
    const images = [article.image].flat().filter(Boolean);
    if (page.meta('og:image')?.includes('/previews/')) continue;
    // A bit may have no hero image of its own.
    if (page.path.startsWith('/bits/') && images.length === 0) continue;
    if (images.length === 0) fail(page.path, 'article lists no image');
    // A hero too small for every crop lists fewer, in the order 16x9, 4x3, 1x1.
    for (const [index, url] of images.entries()) {
      const file = distFile(url);
      if (!file || !(await exists(file))) { fail(page.path, `article image file missing ${url}`); continue; }
      const size = imageSize(await readFile(file));
      if (!size || size.width * size.height < 50_000) fail(page.path, `article image under 50K pixels ${url}`);
      else if (images.length === 3 && Math.abs(size.width / size.height - RATIOS[index]) > 0.02) fail(page.path, `article image ${index} is not ${['16x9', '4x3', '1x1'][index]}: ${size.width}x${size.height}`);
      else if (images.length < 3 && !RATIOS.some((r) => Math.abs(size.width / size.height - r) <= 0.02)) fail(page.path, `article image is not 16x9, 4x3 or 1x1: ${size.width}x${size.height}`);
    }
  }
}
for (const page of pages.filter((p) => p.path.startsWith('/articles/series/') && p.path !== '/articles/series/')) {
  const series = page.nodes.find((n) => typesOf(n).includes('CollectionPage'))?.mainEntity;
  for (const part of series?.hasPart ?? []) {
    const articlePage = pageByPath.get(new URL(part.url).pathname);
    const article = articlePage && articleNodes(articlePage)[0];
    const link = [article?.isPartOf].flat().find((p) => p?.['@type'] === 'CreativeWorkSeries');
    if (!link || link.url !== `${SITE}${page.path}`) fail(articlePage?.path ?? part.url, `article is not linked to its series ${page.path}`);
    else if (!Number.isInteger(article.position)) fail(articlePage.path, 'article in a series lacks position');
  }
}

// ── Projects and services ──
const projectsList = pageByPath.get('/projects/')?.nodes.find((n) => typesOf(n).includes('CollectionPage'))?.mainEntity;
if (!projectsList || projectsList.itemListElement.length !== projectsList.numberOfItems) {
  fail('/projects/', 'the project list does not hold every project');
}
for (const { item } of projectsList?.itemListElement ?? []) {
  if (!item.url || !item.author) fail('/projects/', `project ${item.name} lacks url or author`);
}
if (!pageByPath.get('/')?.nodes.some((n) => typesOf(n).includes('Service'))) fail('/', 'no Service nodes for the services section');

// ── Wikidata ──
for (const id of wikidataIds) {
  if (!expected[id]) fail('wikidata', `${id} is not in src/utils/wikidata.json`);
}
let wikidataError = '';
if (!offline && wikidataIds.size > 0) {
  const ids = [...wikidataIds].filter((id) => expected[id]);
  const url = `https://www.wikidata.org/w/api.php?action=wbgetentities&ids=${ids.join('|')}&props=labels&languages=en&format=json`;
  try {
    const response = await fetch(url, {
      headers: { 'User-Agent': 'rishikc.com-seo-audit/1.0 (https://rishikc.com)' },
      signal: AbortSignal.timeout(30_000),
    });
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    const { entities } = await response.json();
    for (const id of ids) {
      const label = entities?.[id]?.labels?.en?.value;
      if (label !== expected[id].label) fail('wikidata', `${id} label is "${label}", expected "${expected[id].label}"`);
    }
  } catch (error) {
    wikidataError = `Wikidata check failed to run: ${error.message}. Use --offline to skip it.`;
  }
}

// ── Metrics ──
const SUFFIX = ' | Rishi Kumar Chawda';
const articles = pages.flatMap((p) => p.nodes).filter((n) => typesOf(n).some((t) => /Article|BlogPosting/.test(t)) && /#article$/.test(n['@id'] ?? ''));
const count = (list, test) => list.filter(test).length;
const lengths = pages.map((p) => p.title.length);
const logoPages = pages.filter((p) => /\/_astro\/logo\./.test(p.meta('og:image') ?? ''));
const wrongSize = pages.filter((p) => {
  const w = Number(p.meta('og:image:width'));
  const h = Number(p.meta('og:image:height'));
  return p.ogSize && (p.ogSize.width !== w || p.ogSize.height !== h);
});
const photoFiles = [];
for await (const file of walk(join(dist, '_astro'))) if (file.includes('/photos/')) photoFiles.push(file);
const sitemapXml = (await Promise.all((await readdir(dist)).filter((f) => /^sitemap-\d+\.xml$/.test(f)).map((f) => readFile(join(dist, f), 'utf8')))).join('');
const stripped = (s) => s.replace(SUFFIX, '');

const metrics = {
  'Pages built': pages.length,
  'Pages with JSON-LD, canonical and description problems': failures.filter((f) => /JSON-LD|canonical|meta description/.test(f.message)).length,
  [`Titles ending in "${SUFFIX}"`]: count(pages, (p) => p.title.endsWith(SUFFIX)),
  'Titles over 60 characters (with suffix / without)': `${count(pages, (p) => p.title.length > 60)} / ${count(pages, (p) => stripped(p.title).length > 60)}`,
  'Longest title': Math.max(...lengths),
  'Meta descriptions over 160 / under 70 characters': `${count(pages, (p) => (p.description ?? '').length > 160)} / ${count(pages, (p) => (p.description ?? '').length < 70)}`,
  'Pages whose share image is the logo': logoPages.length,
  'Pages whose declared og:image size differs from the file': wrongSize.length,
  'Pages with <meta name="keywords">': count(pages, (p) => p.meta('keywords')),
  'Pages with <meta name="robots">': count(pages, (p) => p.meta('robots')),
  'Article nodes / with isPartOf': `${articles.length} / ${count(articles, (n) => n.isPartOf)}`,
  'JSON-LD names or breadcrumb labels carrying the suffix': count(pages, (p) => JSON.stringify(p.nodes).includes(SUFFIX)),
  'Sitemap URLs / with <lastmod>': `${(sitemapXml.match(/<loc>/g) ?? []).length} / ${(sitemapXml.match(/<lastmod>/g) ?? []).length}`,
  'Files in dist/_astro/photos': photoFiles.length,
  'Wikidata IDs in JSON-LD': [...wikidataIds].join(' ') || 'none',
};
console.log('SEO audit metrics');
for (const [key, value] of Object.entries(metrics)) console.log(`  ${key}: ${value}`);

if (failures.length > 0) {
  // Group a failure that repeats on many pages into one line.
  const groups = Map.groupBy(failures, (f) => f.message);
  console.log(`\n${failures.length} failure(s):`);
  for (const [message, items] of groups) {
    const pages = items.map((f) => f.page);
    const shown = pages.length > 3 ? `${pages.slice(0, 3).join(', ')} and ${pages.length - 3} more` : pages.join(', ');
    console.log(`  - ${message} [${shown}]`);
  }
}
if (wikidataError) console.log(`\n${wikidataError}`);
process.exit(failures.length > 0 ? 1 : wikidataError ? 2 : 0);
