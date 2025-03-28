// @ts-check
import { defineConfig } from 'astro/config';

import mdx from '@astrojs/mdx';

import tailwindcss from '@tailwindcss/vite';
import siteMetadata from './metadata';
import { getEnv } from 'astro/env/runtime';
import remarkToc from 'remark-toc';
import rehypePresetMinify from 'rehype-preset-minify';

// https://astro.build/config
export default defineConfig({
  integrations: [mdx({
    syntaxHighlight: 'shiki',
    shikiConfig: { theme: 'dracula' },
    remarkPlugins: [remarkToc],
    rehypePlugins: [rehypePresetMinify],
    remarkRehype: { footnoteLabel: 'Footnotes' },
    gfm: false,
  })],

  vite: {
    plugins: [tailwindcss()]
  },

  site: siteMetadata.siteUrl,
  trailingSlash: getEnv('NODE_ENV') == 'development' ? 'ignore' : 'always',
  compressHTML: true,
  security: {
    checkOrigin: true
  },
});