import type { APIRoute, GetStaticPaths } from "astro";
import { getCollection } from "astro:content";
import { isPhotograph, shareResponse } from "../../utils/shareImage";

// A photograph hero is blocked by robots.txt and has a preview under /previews/ instead.
export const getStaticPaths = (async () => {
  const [articles, bits] = await Promise.all([getCollection("articles"), getCollection("bits")]);
  return [
    ...articles.map((entry) => ({ slug: `articles/${entry.id}`, hero: entry.data.hero_image })),
    ...bits.map((entry) => ({ slug: `bits/${entry.id}`, hero: entry.data.hero_image })),
  ]
    .filter(({ hero }) => hero && !isPhotograph(hero))
    .map(({ slug, hero }) => ({ params: { slug }, props: { hero: hero! } }));
}) satisfies GetStaticPaths;

export const GET: APIRoute = ({ props }) => shareResponse(props.hero);
