// @ts-check
import { defineConfig } from 'astro/config';

import mdx from '@astrojs/mdx';

import siteMetadata from './metadata';
import { getEnv } from 'astro/env/runtime';
import remarkToc from 'remark-toc';
import rehypePresetMinify from 'rehype-preset-minify';

import { remarkReadingTime } from './src/plugins/remark-reading-time.mjs';
import remarkNotes from 'remark-notes-plugin';

// https://astro.build/config
export default defineConfig({
  integrations: [
    mdx({
    syntaxHighlight: 'shiki',
    shikiConfig: { theme: 'dracula' },
    remarkPlugins: [remarkToc, remarkReadingTime, remarkNotes],
    rehypePlugins: [rehypePresetMinify],
    remarkRehype: { footnoteLabel: 'Footnotes' },
    // gfm: true,
  })],

  site: siteMetadata.siteUrl,
  trailingSlash: getEnv('NODE_ENV') == 'development' ? 'ignore' : 'always',
  compressHTML: true,
  security: {
    checkOrigin: true
  },
});