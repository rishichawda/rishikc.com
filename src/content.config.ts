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

const gallery = defineCollection({
    loader: glob({ pattern: "**/gallery.json", base: "./content/gallery" }),
    schema: ({ image }) =>
        z.object({
            // Gallery metadata
            title: z.string(),
            description: z.string().optional(),
            date: z.coerce.date().optional(),
            tags: z.array(z.string()).optional(),
            location: z.string().optional(),
            camera: z.string().optional(),
            settings: z.string().optional(),
            
            // Featured image
            featured_image: image(),
            featured_image_alt: z.string().optional(),
            featured_image_caption: z.string().optional(),
            featured_image_credit: z.string().optional(),
            
            // Directory information
            directory: z.string(),
            path: z.string(),
            
            // Gallery images
            images: z.array(z.object({
                src: image(),
                alt: z.string().optional(),
                caption: z.string().optional(),
                credit: z.string().optional(),
                date: z.coerce.date().optional(),
                location: z.string().optional(),
                camera: z.string().optional(),
                settings: z.string().optional(),
            })),
        }),
});

export const collections = { articles, quotes, logo, gallery };