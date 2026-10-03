// @ts-check
import { defineEcConfig } from 'astro-expressive-code';
import { pluginCollapsibleSections } from '@expressive-code/plugin-collapsible-sections';

export default defineEcConfig({
  themes: ['dracula'],
  plugins: [pluginCollapsibleSections()],
  frames: {
    // Copy exactly what is displayed, including comment lines.
    removeCommentsWhenCopyingTerminalFrames: false,
  },
  styleOverrides: {
    borderRadius: '12px',
    codeFontFamily: 'var(--font-mono)',
  },
});
