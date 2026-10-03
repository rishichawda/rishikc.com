// @ts-check
import { defineEcConfig } from 'astro-expressive-code';
import { pluginCollapsibleSections } from '@expressive-code/plugin-collapsible-sections';

export default defineEcConfig({
  themes: ['dracula'],
  plugins: [pluginCollapsibleSections()],
  styleOverrides: {
    borderRadius: '12px',
    codeFontFamily: 'var(--font-mono)',
  },
});
