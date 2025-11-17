
# Copilot Agent Instructions for rishikc.com

## 🚀 Quick Start for Copilot

**Always follow these rules:**

- Only use Astro, TypeScript, and Tailwind CSS. Never add other frameworks or client-side JS libraries.
- UI components must be `.astro` files in `src/components/`.
- Use `content/assets/` for images referenced in markdown/content, `src/assets/` for images imported in components, and `public/` only for files that must be directly accessible by URL.
- Never move, duplicate, or reference assets/scripts outside their intended folders.
- All content/components must be accessible (WCAG 2.1 AA) and SEO-friendly.
- Validate every change: `yarn dev`, check Problems panel, `yarn build`.

---

## Purpose

These instructions ensure all code and content contributions maintain the highest standards of quality, consistency, and maintainability for the project.

## Project Overview

This repository is a personal website built with Astro, TypeScript, and Tailwind CSS. It features articles, a gallery, open source contributions, and project showcases. The content is organized in markdown, JSON, and image assets, with custom components and layouts for rendering.

## Key Technologies

- **Astro**: Static site generator for building fast websites.
- **TypeScript**: Used for configuration and some scripts.
- **Tailwind CSS**: Utility-first CSS framework for styling.
- **PostCSS**: Used for CSS processing.
- **Node.js**: For running scripts and build processes.

## Directory Structure

- `astro.config.mjs`, `tsconfig.json`, `tailwind.config.mjs`, `postcss.config.cjs`: Project configuration files.
- `package.json`: Lists dependencies and scripts.
- `content/`: Contains all site content, including articles (markdown), assets (images, SVGs), gallery, projects, and quotes.
  - `about/`: Profile and services info.
  - `articles/`: Markdown articles, each in its own folder.
  - `assets/`: Images and SVGs for the site. **This folder is for content assets referenced in markdown or site content, not for direct public serving.**
    - *Example*: If an article references an image, place it here and use a relative path in the markdown.
  - `gallery/`: Gallery images and update script.
  - `projects/`: Project data and scripts.
  - `reads/`: Quotes and related scripts.
- `design/`: Design assets (PNGs, not web-served; for design reference only).
- `public/`: Publicly served static files (e.g., favicon). **Assets here are directly accessible via URL.**
- `src/`: Source code for the site.
  - `content.config.ts`: Content collections configuration.
  - `assets/`: Source SVGs and images for use in components. **Not for direct public serving; use for imports in Astro components.**
    - *Example*: If a `.astro` component imports an SVG or image, place it here and import it directly in the component.

## Updating Existing Content or Assets

- To update an article, edit the markdown file in its folder under `content/articles/`.
- To update an asset, replace or edit the file in its correct folder (`content/assets/`, `src/assets/`, or `public/`). Never move assets between these folders unless explicitly instructed.
- For gallery, projects, or quotes, use the provided scripts to update metadata or data files.

## Handling Breaking Changes or Major Refactors

- Do not perform breaking changes or major refactors (e.g., changing folder structure, renaming core files, or altering build configuration) unless explicitly instructed or confirmed by the user.
- For any significant change, summarize the impact and request user confirmation before proceeding.

  - `components/`: Astro components for UI (e.g., footer, LinkCard, search bar, SEO, article, gallery, etc.).
  - `layouts/`, `pages/`, `plugins/`, `styles/`, `utils/`: Standard Astro project structure for layouts, pages, plugins, styles, and utility functions.
  - `plugins/`: Custom Astro/remark plugins (e.g., `remark-reading-time.mjs`).

## Content Management

- Articles and profile info are in markdown and JSON under `content/`.
- Gallery images are organized by category, with a shell script to update JSON metadata.
- Projects and quotes are managed via JSON and JS scripts.

## Build & Development

- Use `yarn` to install dependencies.
- Use `yarn dev` to start the development server.
- Use `yarn build` to build the site for production.
- Use `yarn preview` to preview the production build.

## Coding Conventions

- **Do not create React, Vue, Svelte, or other non-Astro components unless explicitly instructed to set up such frameworks.**
- **Do not create UI components in `.js`, `.ts`, `.jsx`, `.tsx`, `.vue`, or `.svelte` files. All UI components must be `.astro` files in `src/components/`.**
- **Do not add any client-side JavaScript frameworks or libraries (e.g., React, Vue, Svelte, Angular, Alpine.js, etc.) unless explicitly requested.**
- Use TypeScript (`.ts`) for configuration and scripts where possible. Prefer `.ts` over `.js` for new scripts unless otherwise required for compatibility.
- Use Tailwind CSS classes for styling components.
- Organize content and assets semantically in the `content/` directory.
- Use markdown for articles and documentation.

## Special Scripts

- `content/gallery/update_gallery_json.sh`: Updates gallery metadata.
- `content/projects/generate_contributions.js`: Generates open source contributions data.
- `content/reads/quotes.js`: Manages quotes data.

## Best Practices for Copilot Agent

- Strictly adhere to the Astro, TypeScript, and Tailwind CSS architecture. **Do not introduce any other frameworks or libraries unless explicitly requested.**
- Follow the existing directory and file naming conventions for all edits and new content.
- For new articles, always create a new folder under `content/articles/` and include a markdown file. Do not place articles elsewhere.
- For new UI components, use `.astro` files in `src/components/` only. **Never create UI components in `.js`, `.ts`, `.jsx`, `.tsx`, `.vue`, or `.svelte` files.**
- For new images or assets, place them in the appropriate `content/assets/` (for content referenced in markdown) or `src/assets/` (for component imports) subfolder. Use `public/` only for files that must be directly accessible via URL. **Never move, duplicate, or reference assets/scripts outside their intended folders.**
- When updating configuration, ensure consistency with TypeScript and Astro conventions. Use `.ts` for new scripts unless compatibility requires `.js`.
- Use the provided scripts for updating gallery, projects, and quotes data. **Do not replace, duplicate, or move these scripts; only extend them if necessary.**
- All content and assets must be accessible, optimized for performance, and follow SEO best practices (e.g., alt text for images, semantic HTML, descriptive titles).
- All components and content must be accessible (e.g., proper ARIA attributes, keyboard navigation, color contrast).
- Always validate changes by:

  - Running `yarn dev` to check the development server for errors.
  - Checking the VS Code Problems panel for any reported issues, and fixing **all** problems before ending your task. Never consider a task complete if there are any errors or warnings in the Problems panel.
  - Ensuring the site builds successfully with `yarn build`.

## Contribution & Pull Request Guidelines

- Ensure your changes follow all instructions in this document.
- For code changes, ensure code is clean, well-commented, and follows project conventions.

## Accessibility & SEO

- All new content and components must be accessible (WCAG 2.1 AA or better) and SEO-friendly.
- Use semantic HTML, descriptive alt text, and proper heading structure.
- Avoid using color as the only means of conveying information.

## Validation Checklist

Before submitting changes, always:

- [ ] Run `yarn dev` and verify there are no errors or warnings.
- [ ] Check the Problems panel in VS Code for issues.
- [ ] Run `yarn build` to ensure the site builds successfully.

---

## Additional Notes

- The site is designed to be accessible and SEO-friendly.
- Contributions should maintain the clean, organized structure of the repository.
- Refer to `README.md` for more details on setup and contribution guidelines.
