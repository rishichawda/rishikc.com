/**
 * Share images (og:image, twitter:image) with the file facts the head tags declare, and the
 * previews that stand in for photographs. A photograph lives under /_astro/photos/, which
 * robots.txt blocks, so link previews cannot use it; the preview endpoints serve a small
 * downscaled crop from /previews/ instead.
 */
import type { ImageMetadata } from "astro";
import sharp from "sharp";
import { renderCreditStrip } from "./cards";
import { rightsNotice } from "./jsonLd";
import { shareCards } from "./siteData";

export interface ShareImage {
  src: string;
  width: number;
  height: number;
  type?: string;
  alt?: string;
}

const SHARE_WIDTH = 1200;
const SHARE_HEIGHT = 630;

/** The share image value for a 1200x630 JPEG served at `path` (see shareResponse). */
export const shareImage = (path: string, alt?: string): ShareImage => ({
  src: path,
  width: SHARE_WIDTH,
  height: SHARE_HEIGHT,
  type: "image/jpeg",
  alt,
});

/**
 * A 1200x630 JPEG of an imported image, as an endpoint response. Link previews want that size, and
 * WhatsApp drops images over 500 KB, which a full-size hero often is. A hero much wider or taller than
 * the card (a wide logo, say) is fitted whole on a white card instead of cropped.
 */
export async function shareResponse(image: ImageMetadata): Promise<Response> {
  // Astro defines the source path on every imported image; it is not an enumerable property.
  const fsPath = (image as ImageMetadata & { fsPath?: string }).fsPath;
  if (!fsPath) throw new Error(`No source path for the image ${image.src}`);
  const ratio = image.width / image.height;
  const jpeg = await sharp(fsPath.split("?")[0])
    .resize(SHARE_WIDTH, SHARE_HEIGHT, ratio > 2.6 || ratio < 1.3 ? { fit: "contain", background: "#ffffff" } : { fit: "cover" })
    .flatten({ background: "#ffffff" })
    .jpeg({ quality: 80, mozjpeg: true })
    .toBuffer();
  return new Response(new Uint8Array(jpeg), { headers: { "Content-Type": "image/jpeg" } });
}

// Previews are small on purpose: link previews show them at a few hundred pixels, and a small, lossy
// crop with the credit across it is of little use to anyone who saves it.
const WIDTH = 600;
const HEIGHT = 315;
const STRIP_HEIGHT = 28;

/**
 * True for an image from the gallery folder. The build moves these to /_astro/photos/, which robots.txt
 * blocks; the source folder is checked instead of that path so that `astro dev` agrees with the build.
 * Astro defines the source path on every imported image, in the build and in dev; it is not an
 * enumerable property.
 */
export const isPhotograph = (image?: ImageMetadata) =>
  Boolean((image as (ImageMetadata & { fsPath?: string }) | undefined)?.fsPath?.includes("/content/gallery/"));

/** The SEO image value for a preview file served at `path`. */
export const previewImage = (path: string, alt?: string): ShareImage => ({
  src: path,
  width: WIDTH,
  height: HEIGHT,
  type: "image/jpeg",
  alt,
});

/** A 600x315 JPEG crop of a photograph with the rights line across its bottom edge, as an endpoint response. */
export async function previewResponse(photo: ImageMetadata): Promise<Response> {
  // Astro defines the source path on every imported image; it is not an enumerable property.
  const fsPath = (photo as ImageMetadata & { fsPath?: string }).fsPath;
  if (!fsPath) throw new Error(`No source path for the photograph ${photo.src}`);
  const strip = await renderCreditStrip(`${rightsNotice()} · ${shareCards.footer}`, WIDTH, STRIP_HEIGHT);
  const jpeg = await sharp(fsPath.split("?")[0])
    .resize(WIDTH, HEIGHT, { fit: "cover", position: "attention" })
    .composite([{ input: Buffer.from(strip), gravity: "south" }])
    .jpeg({ quality: 55, mozjpeg: true })
    .toBuffer();
  return new Response(new Uint8Array(jpeg), { headers: { "Content-Type": "image/jpeg" } });
}
