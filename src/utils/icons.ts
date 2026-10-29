/**
 * The site icons. The PNGs come from content/assets/logo/icons (exported from the logo); the favicon is
 * cut from the 512 pixel icon, which keeps the artwork readable at 16 pixels.
 */
import sharp from "sharp";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

/** Sizes packed into favicon.ico. */
export const FAVICON_SIZES = [16, 32, 48] as const;

/** A PNG from content/assets/logo/icons, by file name without the extension. */
export const iconPng = (name: string): Promise<Buffer> =>
  readFile(join(process.cwd(), "content/assets/logo/icons", `${name}.png`));

/** A favicon.ico holding one PNG image per size. */
export async function faviconIco(): Promise<Buffer> {
  const master = await iconPng("icon-512");
  const images = await Promise.all(
    FAVICON_SIZES.map(async (size) => ({
      size,
      data: await sharp(master).resize(size, size).png({ compressionLevel: 9 }).toBuffer(),
    })),
  );
  const header = Buffer.alloc(6);
  header.writeUInt16LE(1, 2); // type: icon
  header.writeUInt16LE(images.length, 4);
  let offset = header.length + images.length * 16;
  const entries = images.map(({ size, data }) => {
    const entry = Buffer.alloc(16);
    entry.writeUInt8(size, 0); // width
    entry.writeUInt8(size, 1); // height
    entry.writeUInt16LE(1, 4); // colour planes
    entry.writeUInt16LE(32, 6); // bits per pixel
    entry.writeUInt32LE(data.length, 8);
    entry.writeUInt32LE(offset, 12);
    offset += data.length;
    return entry;
  });
  return Buffer.concat([header, ...entries, ...images.map(({ data }) => data)]);
}
