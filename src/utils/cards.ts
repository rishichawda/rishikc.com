/**
 * Generated share cards (1200x630 PNG) for pages that have no image of their own: the home page,
 * the hub pages and bits without a hero image. Text and the wide logo on a white card, no
 * photographs, so a card is crawlable and never lands under /_astro/photos/. Served from /og/ by src/pages/og.
 */
import { Resvg } from "@resvg/resvg-js";
import satori from "satori";
import sharp from "sharp";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { shareCards as source, type Card } from "./siteData";
import { AUTHOR_NAME } from "./jsonLd";
import type { ShareImage } from "./shareImage";

export type { Card };

/** The card text, from content/about/share-cards.json; "{name}" stands for the author's name. */
const fill = (card: Card): Card => ({
  kicker: card.kicker.replaceAll("{name}", AUTHOR_NAME),
  title: card.title.replaceAll("{name}", AUTHOR_NAME),
  subtitle: card.subtitle.replaceAll("{name}", AUTHOR_NAME),
});

/** The card for each hub page, by URL path. Anything else gets the default card. */
export const HUB_CARDS: Record<string, Card> = Object.fromEntries(
  Object.entries(source.pages).map(([path, card]) => [path, fill(card)]),
);

export const DEFAULT_CARD: Card = fill(source.default);

/** The card for a bit that has no hero image. */
export const bitCard = (title: string): Card => fill({ ...source.bit, title });

/** What the card shows, as alt text: the section, the title and the line under it. */
export const cardAlt = (card: Card) =>
  `${card.kicker !== card.title ? `${card.kicker}: ` : ""}${card.title}. ${card.subtitle}`;

/** The card key for a page path, as used in /og/<key>.png. */
export const cardKey = (path: string) =>
  path === "/" ? "home" : HUB_CARDS[path] ? path.slice(1, -1).replaceAll("/", "-") : "default";

/** The share image for a hub page path, or the default card for any other path. */
export const cardImage = (path: string, alt?: string): ShareImage => ({
  src: `/og/${cardKey(path)}.png`,
  width: 1200,
  height: 630,
  type: "image/png",
  alt: alt ?? cardAlt(HUB_CARDS[path] ?? DEFAULT_CARD),
});

/** The share image for a bit that has no hero image. */
export const bitCardImage = (id: string, title: string): ShareImage => ({
  src: `/og/bits/${id}.png`,
  width: 1200,
  height: 630,
  type: "image/png",
  alt: cardAlt(bitCard(title)),
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

// The card font is the latin subset. A character outside it would be drawn as an empty box, so a card
// whose text has one fails the build, naming the character, instead of shipping a broken share image.
const latinRanges = (
  JSON.parse(await readFile(join(fontDir, "..", "unicode.json"), "utf8")).latin as string
)
  .split(",")
  .map((range) => range.replace("U+", "").split("-U+").join("-").split("-").map((hex) => parseInt(hex, 16)))
  .map(([from, to = from]) => [from, to] as const);

function assertCovered(text: string, where: string) {
  for (const char of text) {
    const code = char.codePointAt(0)!;
    if (!latinRanges.some(([from, to]) => code >= from && code <= to)) {
      throw new Error(`The ${where} "${text}" has "${char}" (U+${code.toString(16).toUpperCase()}), which the card font does not have. Add a font that does to src/utils/cards.ts.`);
    }
  }
}

// The wide logo (5:3, white tile) sits in the top-right corner, drawn at twice its size so it stays sharp.
const LOGO_WIDTH = 120;
const LOGO_HEIGHT = Math.round((LOGO_WIDTH * 3) / 5);
const logoSrc = `data:image/png;base64,${(
  await sharp(join(process.cwd(), "content/assets/logo/logo_wide.png"))
    .resize(LOGO_WIDTH * 2, LOGO_HEIGHT * 2)
    .png({ compressionLevel: 9 })
    .toBuffer()
).toString("base64")}`;

const text = (content: string, style: Record<string, string | number>) => ({
  type: "div",
  props: { style: { display: "flex", ...style }, children: content },
});

/** A translucent strip with one line of white text, to lay over the bottom edge of a preview. */
export async function renderCreditStrip(line: string, width: number, height: number): Promise<Uint8Array> {
  assertCovered(line, "credit line");
  const tree = {
    type: "div",
    props: {
      style: {
        width,
        height,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "rgba(0, 0, 0, 0.6)",
        color: "#FFFFFF",
        fontSize: Math.round(height * 0.5),
        fontWeight: 500,
        fontFamily: "Red Hat Display",
      },
      children: line,
    },
  };
  const svg = await satori(tree as Parameters<typeof satori>[0], { width, height, fonts });
  return new Resvg(svg).render().asPng();
}

/** Render a card to PNG bytes: a white print-style card on a grey mat, with the logo top-right. */
export async function renderCard(card: Card): Promise<Uint8Array> {
  assertCovered(card.kicker, "card kicker");
  assertCovered(card.title, "card title");
  assertCovered(card.subtitle, "card subtitle");
  assertCovered(source.footer, "card footer");
  // The title shrinks in steps as it gets longer; the line clamps cut anything that is still too long.
  const titleSize = card.title.length > 110 ? 44 : card.title.length > 70 ? 55 : card.title.length > 40 ? 69 : 88;
  const row = { display: "flex", justifyContent: "space-between", alignItems: "center" };
  const tree = {
    type: "div",
    props: {
      style: {
        width: 1200,
        height: 630,
        display: "flex",
        boxSizing: "border-box",
        padding: 36,
        background: "#F0F0F0",
        fontFamily: "Red Hat Display",
      },
      children: {
        type: "div",
        props: {
          style: {
            display: "flex",
            flex: 1,
            flexDirection: "column",
            justifyContent: "space-between",
            boxSizing: "border-box",
            padding: "44px 56px",
            background: "#FFFFFF",
            borderRadius: 6,
            boxShadow: "0 6px 28px rgba(0, 0, 0, 0.14)",
          },
          children: [
            {
              type: "div",
              props: {
                style: row,
                children: [
                  text(card.kicker.toUpperCase(), { fontSize: 28, fontWeight: 700, color: "#586898", letterSpacing: 2 }),
                  { type: "img", props: { src: logoSrc, width: LOGO_WIDTH, height: LOGO_HEIGHT } },
                ],
              },
            },
            {
              type: "div",
              props: {
                style: { display: "flex", flexDirection: "column", gap: 18 },
                children: [
                  text(card.title, { fontSize: titleSize, fontWeight: 700, color: "#141414", lineHeight: 1.08, display: "block", lineClamp: 3 }),
                  text(card.subtitle, { fontSize: 34, fontWeight: 500, color: "#5A5A5A", lineHeight: 1.3, display: "block", lineClamp: 2 }),
                ],
              },
            },
            {
              type: "div",
              props: {
                style: row,
                children: [
                  text(source.footer, { fontSize: 26, fontWeight: 500, color: "#777777" }),
                  text("", { width: 200, height: 8, borderRadius: 4, background: "linear-gradient(90deg, #9aa7d7, #E8A87C)" }),
                ],
              },
            },
          ],
        },
      },
    },
  };
  const svg = await satori(tree as Parameters<typeof satori>[0], { width: 1200, height: 630, fonts });
  return new Resvg(svg).render().asPng();
}
