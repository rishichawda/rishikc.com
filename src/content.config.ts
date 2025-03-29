import { defineCollection, z } from 'astro:content';
import { glob, file } from 'astro/loaders'; // Not available with legacy API

const articles = defineCollection({
    loader: glob({ pattern: "**/*.{md,mdx}", base: "./content/articles" }),
    schema: ({ image }) =>
        z.object({
            title: z.string(),
            subtitle: z.string().optional(),
            description: z.string(),
            hero_image: image(),
            hero_image_alt: z.string().optional(),
            hero_image_credit_text: z.string().optional(),
            path: z.string(),
            date: z.coerce.date(),
            keywords: z.string(),
            tags: z.array(z.string()),
            category: z.enum(['General', 'Technology', 'Photography', 'Engineering and Development', 'Philosophy', 'Muse']).optional(),
        }),
});

const logo = defineCollection({
    loader: glob({ pattern: "**/*.{png,svg,jpg}", base: "./content/assets/logo" }),
    schema: ({ image }) => z.object({ image: image() })
})

const quotes = defineCollection({
    loader: file("content/reads/quotes.json", { parser: (text) => JSON.parse(text) })
})

export const collections = { articles, quotes, logo };