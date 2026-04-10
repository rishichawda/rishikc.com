import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import type { APIContext } from 'astro';

export async function GET(context: APIContext) {
  const [articles, bits] = await Promise.all([
    getCollection('articles'),
    getCollection('bits'),
  ]);

  const items = [
    ...articles.map((post) => ({
      title: post.data.title,
      description: post.data.description,
      pubDate: post.data.date,
      link: `/articles/${post.id}/`,
    })),
    ...bits.map((bit) => ({
      title: bit.data.title,
      description: bit.data.description,
      pubDate: bit.data.date,
      link: `/bits/${bit.id}/`,
    })),
  ].sort((a, b) => b.pubDate.getTime() - a.pubDate.getTime());

  return rss({
    title: 'Rishi Kumar Chawda — Articles & Bits',
    description:
      'Technical articles on web development, React, TypeScript, DevSecOps, and engineering best practices.',
    site: context.site!,
    items,
    trailingSlash: true,
  });
}
