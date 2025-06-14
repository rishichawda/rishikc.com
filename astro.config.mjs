// @ts-check
import { defineConfig } from 'astro/config';

import mdx from '@astrojs/mdx';
import { h } from 'hastscript'

import siteMetadata from './metadata';
import { getEnv } from 'astro/env/runtime';
import remarkToc from 'remark-toc';
import rehypePresetMinify from 'rehype-preset-minify';

import { remarkReadingTime } from './src/plugins/remark-reading-time.mjs';
import remarkNotes from 'remark-notes-plugin';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import rehypeSlug from 'rehype-slug';
import { imageService } from "@unpic/astro/service";

import sitemap from '@astrojs/sitemap';

import playformCompress from '@playform/compress';

const AnchorLinkIcon = h(
  'span',
  { ariaHidden: 'true', class: 'inline-flex items-center justify-center ml-2' },
  h(
    'svg',
    { width: '0.7em', height: '0.7em', viewBox: '0 0 24 24', fill: "none" },
    h('g', {
      "stroke-linecap": "round", "stroke-linejoin": "round"
    },
    ),
    h(
      'g',
      h(
        'path',
        {
          "fill-rule": "evenodd",
          "clip-rule": "evenodd",
          d: "M8 2.25C4.27208 2.25 1.25 5.27208 1.25 9C1.25 10.7283 1.90054 12.3065 2.96894 13.5002C3.24518 13.8088 3.71933 13.8351 4.02797 13.5589C4.33662 13.2826 4.36288 12.8085 4.08664 12.4998C3.25487 11.5705 2.75 10.3451 2.75 9C2.75 6.10051 5.10051 3.75 8 3.75H12C14.8995 3.75 17.25 6.10051 17.25 9C17.25 11.8995 14.8995 14.25 12 14.25H10C9.58579 14.25 9.25 14.5858 9.25 15C9.25 15.4142 9.58579 15.75 10 15.75H12C15.7279 15.75 18.75 12.7279 18.75 9C18.75 5.27208 15.7279 2.25 12 2.25H8Z",
          fill: "#1C274C"
        }
      ),
      h(
        "path",
        {
          opacity: "0.5",
          d: "M6.75 15C6.75 12.1005 9.10051 9.75 12 9.75H14C14.4142 9.75 14.75 9.41421 14.75 9C14.75 8.58579 14.4142 8.25 14 8.25H12C8.27208 8.25 5.25 11.2721 5.25 15C5.25 18.7279 8.27208 21.75 12 21.75H16C19.7279 21.75 22.75 18.7279 22.75 15C22.75 13.2717 22.0995 11.6935 21.0311 10.4998C20.7548 10.1912 20.2807 10.1649 19.972 10.4411C19.6634 10.7174 19.6371 11.1915 19.9134 11.5002C20.7451 12.4295 21.25 13.6549 21.25 15C21.25 17.8995 18.8995 20.25 16 20.25H12C9.10051 20.25 6.75 17.8995 6.75 15Z",
          fill: "#1C274C"
        }
      )
    )
  )
)

export default defineConfig({
  integrations: [mdx({
    syntaxHighlight: 'shiki',
    shikiConfig: { theme: 'dracula' },
    remarkPlugins: [remarkToc, remarkReadingTime, remarkNotes],
    rehypePlugins: [rehypePresetMinify, rehypeSlug, [rehypeAutolinkHeadings, {
      behavior: 'append',
      content: AnchorLinkIcon,
    }]],
    remarkRehype: { footnoteLabel: 'Footnotes' },
    gfm: true,
  }), sitemap(), playformCompress({
    CSS: true,
    HTML: {
      "html-minifier-terser": {
        removeAttributeQuotes: false,
        collapseWhitespace: true,
        removeComments: true,
        minifyCSS: true,
        minifyJS: true,
      },
    },
    Image: true,
    JavaScript: true,
    SVG: true,
    Logger: 0,
  })],

  site: siteMetadata.siteUrl,
  trailingSlash: 'always',
  compressHTML: true,
  vite: {
    build: {
      // Enable CSS code splitting for better loading performance
      cssCodeSplit: true,
      // Increase chunk size warning limit
      chunkSizeWarningLimit: 1000,
      rollupOptions: {
        output: {
          // Better chunk splitting for LCP optimization
          manualChunks: {
            'vendor': ['astro'],
            'fonts': ['@fontsource-variable/inter', '@fontsource-variable/red-hat-display', '@fontsource-variable/red-hat-text', '@fontsource-variable/montserrat'],
            'ui': ['astro:assets']
          }
        }
      }
    },
    ssr: {
      // Optimize SSR performance
      noExternal: ['@fontsource-variable/*']
    }
  },
  security: {
    checkOrigin: true
  },
});