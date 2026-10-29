/**
 * After the build (and after @playform/compress, which drops embedded metadata), writes the rights
 * metadata into every JPEG and WebP the build moved to _astro/photos. The text comes from
 * content/about: the author's name from profile.json and the terms from structured-data.json. This
 * runs in the build tool, outside the content layer, so it reads those two files directly.
 */
import { readFile, readdir, writeFile } from 'node:fs/promises';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';
import { buildExif, buildXmp, injectJpeg, injectWebp } from '../utils/imageMetadata.mjs';

const readData = async (name) =>
  JSON.parse(await readFile(fileURLToPath(new URL(`../../content/about/${name}`, import.meta.url)), 'utf8')).data;

export default function photoRights() {
  let site = '';
  return {
    name: 'photo-rights',
    hooks: {
      'astro:config:done': ({ config }) => {
        site = String(config.site ?? '').replace(/\/$/, '');
      },
      'astro:build:done': async ({ dir, logger }) => {
        const [profile, structured, cards] = await Promise.all([
          readData('profile.json'),
          readData('structured-data.json'),
          readData('share-cards.json'),
        ]);
        const terms = structured.photoRights;
        const creator = profile.name;
        const rights = {
          creator,
          notice: terms.notice.replace('{year}', '').replace('{name}', creator).replace(/\s+/g, ' ').trim(),
          usageTerms: terms.usageTerms,
          webStatement: `${site}${terms.licensePath}`,
          contactUrl: `${site}${terms.acquireLicensePath}`,
          credit: `${creator} / ${cards.footer}`,
          source: cards.footer,
          dataMining: terms.dataMining,
          digitalSourceType: terms.digitalSourceType,
        };
        const exif = buildExif(rights);
        const xmp = buildXmp(rights);
        const photos = join(fileURLToPath(dir), '_astro', 'photos');
        let count = 0;
        for (const name of await readdir(photos).catch(() => [])) {
          const extension = name.slice(name.lastIndexOf('.') + 1).toLowerCase();
          if (!['jpg', 'jpeg', 'webp'].includes(extension)) continue;
          const path = join(photos, name);
          const file = await readFile(path);
          if (extension === 'webp') {
            const { width, height, hasAlpha } = await sharp(file).metadata();
            await writeFile(path, injectWebp(file, exif, xmp, { width, height, hasAlpha }));
          } else {
            await writeFile(path, injectJpeg(file, exif, xmp));
          }
          count += 1;
        }
        logger.info(`wrote rights metadata into ${count} photographs`);
      },
    },
  };
}
