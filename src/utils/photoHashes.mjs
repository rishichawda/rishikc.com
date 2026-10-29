import { createHash } from 'node:crypto';
import { existsSync, readdirSync, readFileSync, statSync } from 'node:fs';
import { join } from 'node:path';

// Gallery photographs are published under /_astro/photos/ so robots.txt can keep every crawler out
// of that one path while article images stay crawlable. Astro hashes the asset's bytes, not its
// source folder, so a photo is recognised by the SHA-256 of its file content.
const IMAGE_FILE = /\.(jpe?g|png|webp|gif|avif)$/i;

export const sha256 = (bytes) => createHash('sha256').update(bytes).digest('hex');

function imageFiles(dir) {
  if (!existsSync(dir)) return [];
  return readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const path = join(dir, entry.name);
    if (entry.isDirectory()) return entry.name.startsWith('.') ? [] : imageFiles(path);
    return IMAGE_FILE.test(entry.name) ? [path] : [];
  });
}

/**
 * Map of SHA-256 to file for every gallery photograph. Throws when another image under the content
 * directory has the same bytes as a photograph: a copy would be written next to the gallery original
 * and break it, and it could not be protected by path. A checkout without the content directory
 * (a fork has no access to the private submodule) gets an empty map.
 */
export function photoHashes(contentDir = 'content') {
  const gallery = join(contentDir, 'gallery');
  const photos = new Map(imageFiles(gallery).map((file) => [sha256(readFileSync(file)), file]));
  // Only a file the same size as a photograph can be a copy, so only those are read.
  const sizes = new Set([...photos.values()].map((file) => statSync(file).size));
  for (const file of imageFiles(contentDir).filter((f) => !f.startsWith(gallery + '/'))) {
    if (!sizes.has(statSync(file).size)) continue;
    const photo = photos.get(sha256(readFileSync(file)));
    if (photo) throw new Error(`${file} is a byte-identical copy of the gallery photo ${photo}. Reference the gallery file instead.`);
  }
  return photos;
}
