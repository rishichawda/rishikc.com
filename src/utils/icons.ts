/**
 * The site icons, cut from the square logo master in content/assets/logo. The master has wide margins
 * around the artwork, so each icon is a centred square crop of it, which keeps the artwork readable at
 * 16 pixels.
 */
import sharp from "sharp";
import master from "../../content/assets/logo/logo_square/1024.png";

/** Share of the master's width and height that the icons keep. */
const CROP = 0.88;

/** Sizes of the PNG icons the web manifest lists. */
export const MANIFEST_ICON_SIZES = [192, 512] as const;
export const APPLE_TOUCH_ICON_SIZE = 180;
/** Sizes packed into favicon.ico. */
export const FAVICON_SIZES = [16, 32, 48] as const;

export async function iconPng(size: number): Promise<Buffer> {
  // Astro defines the source path on every imported image; it is not an enumerable property.
  const fsPath = (master as typeof master & { fsPath?: string }).fsPath;
  if (!fsPath) throw new Error("No source path for the logo master");
  const side = Math.round(Math.min(master.width, master.height) * CROP);
  return sharp(fsPath.split("?")[0])
    .extract({
      left: Math.round((master.width - side) / 2),
      top: Math.round((master.height - side) / 2),
      width: side,
      height: side,
    })
    .resize(size, size)
    .png({ compressionLevel: 9 })
    .toBuffer();
}

/** A favicon.ico holding one PNG image per size. */
export async function faviconIco(): Promise<Buffer> {
  const images = await Promise.all(FAVICON_SIZES.map(async (size) => ({ size, data: await iconPng(size) })));
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
