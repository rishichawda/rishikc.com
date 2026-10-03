import { readFile } from 'node:fs/promises';

const LOC = /<loc>\s*([^<\s]+)\s*<\/loc>/g;

const locs = (xml) => [...xml.matchAll(LOC)].map((match) => match[1]);

async function fetchText(url) {
  const response = await fetch(url);
  if (!response.ok) throw new Error(`GET ${url} returned ${response.status}`);
  return response.text();
}

/**
 * Site paths such as "/articles/" to audit. SITEMAP_FILE reads a built sitemap from disk;
 * otherwise the live sitemap index under baseUrl is fetched.
 */
export async function sitePaths(baseUrl, sitemapFile = process.env.SITEMAP_FILE) {
  let urls;
  if (sitemapFile) {
    urls = locs(await readFile(sitemapFile, 'utf8'));
  } else {
    urls = [];
    for (const sitemap of locs(await fetchText(new URL('/sitemap-index.xml', baseUrl)))) {
      urls.push(...locs(await fetchText(sitemap)));
    }
  }
  return [...new Set(urls.map((url) => new URL(url).pathname))];
}
