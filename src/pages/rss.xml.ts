import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import type { APIContext } from 'astro';
import { AUTHOR_NAME } from '../utils/jsonLd';
import { CONTENT_LICENSE, LOCALE } from '../utils/topics';

// RSS wants an email address for <author>, so the author goes in Dublin Core instead.
const CREATOR = `<dc:creator>${AUTHOR_NAME}</dc:creator>`;

export async function GET(context: APIContext) {
  const site = context.site!.toString().replace(/\/$/, '');
  // The channel's copyright statement: the same notice as the footer, with the links written out.
  const copyright = CONTENT_LICENSE.feedNotice
    .replaceAll('{year}', String(CONTENT_LICENSE.copyrightYear))
    .replaceAll('{name}', AUTHOR_NAME)
    .replaceAll('{exclusions}', CONTENT_LICENSE.exclusions)
    .replaceAll('{license}', `${CONTENT_LICENSE.name} (${CONTENT_LICENSE.url})`)
    .replaceAll('{code}', `${CONTENT_LICENSE.code.name} (${site}${CONTENT_LICENSE.termsPath}#code)`);
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
      categories: post.data.tags,
      customData: CREATOR,
    })),
    ...bits.map((bit) => ({
      title: bit.data.title,
      description: bit.data.description,
      pubDate: bit.data.date,
      link: `/bits/${bit.id}/`,
      categories: bit.data.tags,
      customData: CREATOR,
    })),
  ].sort((a, b) => b.pubDate.getTime() - a.pubDate.getTime());

  return rss({
    title: 'Rishi Kumar Chawda — Articles & Bits',
    description:
      'Technical articles on web development, React, TypeScript, DevSecOps, and engineering best practices.',
    site: context.site!,
    items,
    trailingSlash: true,
    xmlns: { dc: 'http://purl.org/dc/elements/1.1/' },
    customData: `<language>${LOCALE.toLowerCase()}</language><copyright>${copyright}</copyright>`,
  });
}
