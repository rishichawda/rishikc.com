// Define interface for website metadata
export interface WebsiteMeta {
  url: string;
  title?: string;
  description?: string;
  image?: string; // URL to an image (og:image or favicon)
  error?: boolean; // Flag if fetching failed
}

// Basic function to extract content from meta tags using regex (less robust)
function extractMetaContent(html: string, property: string): string | undefined {
  // Look for <meta property="og:..." content="..."> or <meta name="description" content="...">
  const metaRegex = new RegExp(`<meta\\s+(?:name|property)=["']${property}["']\\s+content=["']([^"']*)["']`, 'i');
  const match = html.match(metaRegex);
  return match?.[1];
}

// Basic function to extract title
function extractTitle(html: string): string | undefined {
  const titleRegex = /<title>([^<]*)<\/title>/i;
  const match = html.match(titleRegex);
  // Decode HTML entities like &amp;
  return match?.[1]?.replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&quot;/g, '"').replace(/&#39;/g, "'");
}

// Basic function to extract favicon
function extractFavicon(html: string, baseUrl: string): string | undefined {
    const faviconRegex = /<link\s+[^>]*rel=["'](?:shortcut icon|icon)["'][^>]*href=["']([^"']*)["']/i;
    const match = html.match(faviconRegex);
    if (match?.[1]) {
        try {
            // Resolve relative URL against the base URL
            return new URL(match[1], baseUrl).toString();
        } catch (e) {
            // Ignore invalid URLs
            console.warn(`Invalid favicon URL found for ${baseUrl}: ${match[1]}`);
        }
    }
    // Fallback: check root favicon.ico
    try {
        // Check if root favicon exists before returning URL - requires an extra fetch or assume it exists
        // For simplicity here, we just return the potential URL
        return new URL('/favicon.ico', baseUrl).toString();
    } catch (e) {
        return undefined;
    }
}

export async function fetchMetadata(url: string): Promise<WebsiteMeta> {
  try {
    // Use a more descriptive User-Agent
    const response = await fetch(url, { headers: { 'User-Agent': 'RishiKCWebsiteBot/1.0 (+https://rishikc.com/bot-info)' } });
    if (!response.ok) {
      console.warn(`Failed to fetch ${url}: ${response.status} ${response.statusText}`);
      return { url, error: true };
    }
    // Check content type - only parse HTML
    const contentType = response.headers.get('content-type');
    if (!contentType || !contentType.includes('text/html')) {
        console.warn(`Skipping non-HTML content for ${url}: ${contentType}`);
        // Return basic info if not HTML
        return { url, title: url.split('/').pop() || url };
    }

    const html = await response.text();

    const title = extractTitle(html) || undefined;
    const description = extractMetaContent(html, 'description') || extractMetaContent(html, 'og:description') || undefined;
    let image = extractMetaContent(html, 'og:image') || undefined;

    // If no og:image, try favicon
    if (!image) {
        image = extractFavicon(html, url);
    }

    // Ensure image URL is absolute
     if (image) {
        try {
            image = new URL(image, url).toString();
        } catch (e) {
            console.warn(`Invalid image URL found for ${url}: ${image}`);
            image = undefined; // Reset if invalid
        }
    }

    return { url, title, description, image };

  } catch (error: any) {
    console.error(`Error fetching metadata for ${url}:`, error.message);
    return { url, error: true }; // Indicate error
  }
}
