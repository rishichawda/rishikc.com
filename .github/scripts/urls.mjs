const LOC = /<loc>\s*([^<\s]+)\s*<\/loc>/g;

const locs = (xml) => [...xml.matchAll(LOC)].map((match) => match[1]);

async function fetchText(url) {
  const response = await fetch(url, { signal: AbortSignal.timeout(30_000) });
  if (!response.ok) throw new Error(`GET ${url} returned ${response.status}`);
  return response.text();
}

/**
 * Site paths such as "/articles/" to audit, read from the sitemap index served under baseUrl.
 * The built sitemaps name the production host, so every entry is re-read from baseUrl by path;
 * a local preview must never fetch the live site.
 */
export async function sitePaths(baseUrl) {
  const urls = [];
  for (const sitemap of locs(await fetchText(new URL('/sitemap-index.xml', baseUrl)))) {
    urls.push(...locs(await fetchText(new URL(new URL(sitemap).pathname, baseUrl))));
  }
  return [...new Set(urls.map((url) => new URL(url).pathname))];
}
