/**
 * Generated share cards (1200x630 PNG) for pages that have no image of their own: the home page,
 * the hub pages and bits without a hero image. Text on a brand background, no photographs, so a
 * card is crawlable and never lands under /_astro/photos/. Served from /og/ by src/pages/og.
 */
import { Resvg } from "@resvg/resvg-js";
import satori from "satori";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import type { ShareImage } from "./shareImage";

export interface Card {
  title: string;
  subtitle: string;
  kicker: string;
}

const NAME = "Rishi Kumar Chawda";

/** The card for each hub page, by URL path. Anything else gets the default card. */
export const HUB_CARDS: Record<string, Card> = {
  "/": { kicker: "rishikc.com", title: NAME, subtitle: "Software Engineer, Writer & Photographer" },
  "/about/": { kicker: "About", title: NAME, subtitle: "Engineer. Photographer. Seeker of Adventures." },
  "/career/": { kicker: "Career", title: "Career", subtitle: "Experience, skills and education" },
  "/contact/": { kicker: "Contact", title: "Get in touch", subtitle: "Collaborations, jobs and questions" },
  "/articles/": { kicker: "Articles", title: "Articles", subtitle: "Web development, TypeScript, DevSecOps and engineering practice" },
  "/articles/series/": { kicker: "Articles", title: "Article series", subtitle: "Multi-part deep dives, in order" },
  "/bits/": { kicker: "Bits", title: "Bits", subtitle: "Short thoughts on technology, creativity and engineering" },
  "/gallery/": { kicker: "Gallery", title: "Gallery", subtitle: "Photography by " + NAME },
  "/projects/": { kicker: "Projects", title: "Projects", subtitle: "Open source work, side projects and experiments" },
  "/reads/": { kicker: "Reads", title: "Reads", subtitle: "Quotes and passages worth keeping" },
  "/privacy/": { kicker: "Privacy", title: "Privacy policy", subtitle: "rishikc.com" },
  "/search/": { kicker: "Search", title: "Search", subtitle: "Articles, bits and the gallery" },
};

export const DEFAULT_CARD: Card = { kicker: "rishikc.com", title: NAME, subtitle: "Software Engineer, Writer & Photographer" };

/** The card key for a page path, as used in /og/<key>.png. */
export const cardKey = (path: string) =>
  path === "/" ? "home" : HUB_CARDS[path] ? path.slice(1, -1).replaceAll("/", "-") : "default";

/** The share image for a hub page path, or the default card for any other path. */
export const cardImage = (path: string, alt?: string): ShareImage => ({
  src: `/og/${cardKey(path)}.png`,
  width: 1200,
  height: 630,
  type: "image/png",
  alt: alt ?? (HUB_CARDS[path] ?? DEFAULT_CARD).title,
});

/** The share image for a bit that has no hero image. */
export const bitCardImage = (id: string, title: string): ShareImage => ({
  src: `/og/bits/${id}.png`,
  width: 1200,
  height: 630,
  type: "image/png",
  alt: title,
});

// satori reads TTF, OTF and WOFF but not WOFF2, so the cards use the WOFF files of the same
// font family the site sets its headings in.
const fontDir = join(process.cwd(), "node_modules/@fontsource/red-hat-display/files");
const fonts = await Promise.all(
  ([500, 700] as const).map(async (weight) => ({
    name: "Red Hat Display",
    weight,
    style: "normal" as const,
    data: await readFile(join(fontDir, `red-hat-display-latin-${weight}-normal.woff`)),
  })),
);

const text = (content: string, style: Record<string, string | number>) => ({
  type: "div",
  props: { style: { display: "flex", ...style }, children: content },
});

/** Render a card to PNG bytes. */
export async function renderCard(card: Card): Promise<Uint8Array> {
  const titleSize = card.title.length > 70 ? 54 : card.title.length > 40 ? 66 : 82;
  const tree = {
    type: "div",
    props: {
      style: {
        width: 1200,
        height: 630,
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        boxSizing: "border-box",
        padding: 80,
        background: "#141414",
        borderLeft: "16px solid #9aa7d7",
        fontFamily: "Red Hat Display",
      },
      children: [
        text(card.kicker, { fontSize: 32, fontWeight: 700, color: "#9aa7d7", letterSpacing: 2 }),
        {
          type: "div",
          props: {
            style: { display: "flex", flexDirection: "column", gap: 24 },
            children: [
              text(card.title, { fontSize: titleSize, fontWeight: 700, color: "#ECECEC", lineHeight: 1.12 }),
              text(card.subtitle, { fontSize: 36, fontWeight: 500, color: "#B8B8B8", lineHeight: 1.3 }),
            ],
          },
        },
        text("rishikc.com", { fontSize: 30, fontWeight: 500, color: "#B8B8B8" }),
      ],
    },
  };
  const svg = await satori(tree as Parameters<typeof satori>[0], { width: 1200, height: 630, fonts });
  return new Resvg(svg).render().asPng();
}
