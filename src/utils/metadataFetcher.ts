export interface WebsiteMeta {
  url: string;
  title?: string;
  description?: string;
  image?: string;
  error?: boolean;
}

function extractMetaContent(html: string, property: string): string | undefined {
  const metaRegex = new RegExp(`<meta\\s+(?:name|property)=["']${property}["']\\s+content=["']([^"']*)["']`, 'i');
  const match = html.match(metaRegex);
  return match?.[1];
}

function extractTitle(html: string): string | undefined {
  const titleRegex = /<title>([^<]*)<\/title>/i;
  const match = html.match(titleRegex);
  return match?.[1]?.replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&quot;/g, '"').replace(/&#39;/g, "'");
}

function extractFavicon(html: string, baseUrl: string): string | undefined {
    const faviconRegex = /<link\s+[^>]*rel=["'](?:shortcut icon|icon)["'][^>]*href=["']([^"']*)["']/i;
    const match = html.match(faviconRegex);
    if (match?.[1]) {
        try {
            return new URL(match[1], baseUrl).toString();
        } catch (e) {
            console.warn(`Invalid favicon URL found for ${baseUrl}: ${match[1]}`);
        }
    }
    try {
        return new URL('/favicon.ico', baseUrl).toString();
    } catch (e) {
        return undefined;
    }
}

export async function fetchMetadata(url: string): Promise<WebsiteMeta> {
  try {
    const response = await fetch(url, { headers: { 'User-Agent': 'RishiKCWebsiteBot/1.0 (+https://rishikc.com/bot-info)' } });
    if (!response.ok) {
      console.warn(`Failed to fetch ${url}: ${response.status} ${response.statusText}`);
      return { url, error: true };
    }
    const contentType = response.headers.get('content-type');
    if (!contentType || !contentType.includes('text/html')) {
        console.warn(`Skipping non-HTML content for ${url}: ${contentType}`);
        return { url, title: url.split('/').pop() || url };
    }

    const html = await response.text();

    const title = extractTitle(html) || undefined;
    const description = extractMetaContent(html, 'description') || extractMetaContent(html, 'og:description') || undefined;
    let image = extractMetaContent(html, 'og:image') || undefined;

    if (!image) {
        image = extractFavicon(html, url);
    }

     if (image) {
        try {
            image = new URL(image, url).toString();
        } catch (e) {
            console.warn(`Invalid image URL found for ${url}: ${image}`);
            image = undefined;
        }
    }

    return { url, title, description, image };

  } catch (error: any) {
    console.error(`Error fetching metadata for ${url}:`, error.message);
    return { url, error: true };
  }
}
