import type { APIRoute, GetStaticPaths } from "astro";
import { getCollection } from "astro:content";
import { DEFAULT_CARD, HUB_CARDS, cardKey, renderCard, type Card } from "../../utils/cards";

export const getStaticPaths = (async () => {
  const hubs = Object.entries(HUB_CARDS).map(([path, card]) => ({
    params: { slug: cardKey(path) },
    props: { card },
  }));
  const bits = (await getCollection("bits")).map((bit) => ({
    params: { slug: `bits/${bit.id}` },
    props: { card: { kicker: "Bits", title: bit.data.title, subtitle: "A short post by Rishi Kumar Chawda" } },
  }));
  return [...hubs, { params: { slug: "default" }, props: { card: DEFAULT_CARD } }, ...bits];
}) satisfies GetStaticPaths;

export const GET: APIRoute = async ({ props }) => {
  const png = await renderCard(props.card as Card);
  return new Response(png, { headers: { "Content-Type": "image/png" } });
};
