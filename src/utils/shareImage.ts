/**
 * Share images (og:image, twitter:image) with the file facts the head tags declare, and the
 * previews that stand in for photographs. A photograph lives under /_astro/photos/, which
 * robots.txt blocks, so link previews cannot use it; the preview endpoints serve a small
 * downscaled crop from /previews/ instead.
 */
import type { ImageMetadata } from "astro";
import sharp from "sharp";

export interface ShareImage {
  src: string;
  width: number;
  height: number;
  type?: string;
  alt?: string;
}

const MIME: Record<string, string> = {
  png: "image/png",
  jpg: "image/jpeg",
  jpeg: "image/jpeg",
  webp: "image/webp",
  avif: "image/avif",
  gif: "image/gif",
};

/** The share image value for an imported image, with its real size and type. */
export const shareImage = (image: ImageMetadata, alt?: string): ShareImage => ({
  src: image.src,
  width: image.width,
  height: image.height,
  type: MIME[image.format],
  alt,
});

const WIDTH = 1200;
const HEIGHT = 630;

/** True for an image the build moved to /_astro/photos/, which robots.txt blocks. */
export const isPhotograph = (image?: ImageMetadata) => Boolean(image?.src.includes("/_astro/photos/"));

/** The SEO image value for a preview file served at `path`. */
export const previewImage = (path: string, alt?: string): ShareImage => ({
  src: path,
  width: WIDTH,
  height: HEIGHT,
  type: "image/jpeg",
  alt,
});

/** A 1200x630 JPEG crop of a photograph, as an endpoint response. */
export async function previewResponse(photo: ImageMetadata): Promise<Response> {
  // Astro defines the source path on every imported image; it is not an enumerable property.
  const fsPath = (photo as ImageMetadata & { fsPath?: string }).fsPath;
  if (!fsPath) throw new Error(`No source path for the photograph ${photo.src}`);
  const jpeg = await sharp(fsPath.split("?")[0])
    .resize(WIDTH, HEIGHT, { fit: "cover", position: "attention" })
    .jpeg({ quality: 78, mozjpeg: true })
    .toBuffer();
  return new Response(new Uint8Array(jpeg), { headers: { "Content-Type": "image/jpeg" } });
}
