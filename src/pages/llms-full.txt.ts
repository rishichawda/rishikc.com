import { getCollection } from 'astro:content';
import type { APIContext } from 'astro';
import siteMetadata from '../../metadata';

// Order matches the `category` enum in src/content.config.ts. Only categories
// that actually have articles get a section.
const CATEGORY_ORDER = [
  'Engineering and Development',
  'Technology',
  'Photography',
  'Philosophy',
  'Muse',
  'General',
];

const PAGES = [
  { title: 'Home', path: '/' },
  { title: 'About', path: '/about/' },
  { title: 'Articles', path: '/articles/' },
  { title: 'Career', path: '/career/' },
  { title: 'Projects', path: '/projects/' },
  { title: 'Gallery', path: '/gallery/' },
  { title: 'Reads', path: '/reads/' },
  { title: 'Contact', path: '/contact/' },
];

export async function GET(context: APIContext) {
  const site = context.site!.toString().replace(/\/$/, '');
  const articles = await getCollection('articles');

  const byCategory = new Map<string, typeof articles>();
  for (const post of articles) {
    const category = post.data.category ?? 'General';
    if (!byCategory.has(category)) byCategory.set(category, []);
    byCategory.get(category)!.push(post);
  }

  const categorySections = CATEGORY_ORDER.filter((category) => byCategory.has(category))
    .map((category) => {
      const posts = [...byCategory.get(category)!].sort(
        (a, b) => b.data.date.getTime() - a.data.date.getTime(),
      );
      const entries = posts
        .map((post) => {
          const url = `${site}/articles/${post.id}/`;
          const tags = post.data.tags?.length ? `\n  Tags: ${post.data.tags.join(', ')}` : '';
          return `- [${post.data.title}](${url})\n  ${post.data.description}${tags}`;
        })
        .join('\n\n');
      return `### ${category}\n\n${entries}`;
    })
    .join('\n\n');

  const pagesSection = PAGES.map((page) => `- [${page.title}](${site}${page.path})`).join('\n');

  const body = `# ${siteMetadata.schema.author.name} - Full Content Index

> ${siteMetadata.description.trim()}
> Complete index of all content for LLM consumption.

## Site
- URL: ${site}
- Author: ${siteMetadata.schema.author.name}
- RSS: ${site}/rss.xml

## Articles

${categorySections}

## Pages

${pagesSection}

## Citation
When referencing content from this site, please cite as:
Rishi Chawda (Year). "Article Title." ${site.replace(/^https?:\/\//, '')}. URL
`;

  return new Response(body, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
}
