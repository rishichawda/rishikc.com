import { defineCollection, z } from 'astro:content';
import { glob, file } from 'astro/loaders';

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
            dateModified: z.coerce.date().optional(),
            keywords: z.string(),
            tags: z.array(z.string()),
            category: z.enum(['General', 'Technology', 'Photography', 'Engineering and Development', 'Philosophy', 'Muse']).optional(),
            jsonld_schema: z.enum(['Article', 'BlogPosting', 'TechArticle']).optional(),
            series: z.object({
                title: z.string(), // Title of the series
                currentPart: z.number(), // Which part this article is (1-based)
                ongoing: z.boolean().optional(),
            }).optional(),
            faq: z.array(z.object({
                question: z.string(),
                answer: z.string(),
            })).optional(),
        }),
});

const bits = defineCollection({
    loader: glob({ pattern: "**/*.{md,mdx}", base: "./content/bits" }),
    schema: ({ image }) =>
        z.object({
            title: z.string(),
            description: z.string(),
            hero_image: image().optional(),
            path: z.string(),
            date: z.coerce.date(),
            tags: z.array(z.string()).optional(),
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
            title: z.string(),
            description: z.string().optional(),
            date: z.coerce.date().optional(),
            tags: z.array(z.string()).optional(),
            location: z.string().optional(),
            camera: z.string().optional(),
            settings: z.string().optional(),
            
            featured_image: image(),
            featured_image_alt: z.string().optional(),
            featured_image_caption: z.string().optional(),
            featured_image_credit: z.string().optional(),
            
            directory: z.string(),
            path: z.string(),
            
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

const photo_stories = defineCollection({
    loader: glob({ pattern: "**/story.json", base: "./content/gallery/stories" }),
    schema: ({ image }) => {
        const sectionImage = z.object({
            src: image(),
            alt: z.string().optional(),
            caption: z.string().optional(),
            camera: z.string().optional(),
            lens: z.string().optional(),
            settings: z.string().optional(),
            location: z.string().optional(),
        });

        return z.object({
            title: z.string(),
            description: z.string(),
            cover_image: image(),
            cover_image_alt: z.string().optional(),
            date: z.coerce.date(),
            tags: z.array(z.string()).optional(),
            path: z.string(),
            reading_time: z.string().optional(),

            prologue: z.string(),

            sections: z.array(z.object({
                type: z.enum(["full-bleed", "text", "diptych", "triptych", "horizontal-scroll", "quote"]),
                image: image().optional(),
                images: z.array(sectionImage).optional(),
                content: z.string().optional(),
                alt: z.string().optional(),
                caption: z.string().optional(),
                attribution: z.string().optional(),
                camera: z.string().optional(),
                lens: z.string().optional(),
                settings: z.string().optional(),
                location: z.string().optional(),
            })),

            epilogue: z.object({
                reflection: z.string(),
                gear_summary: z.string().optional(),
                hobbyist_note: z.string().optional(),
            }),
        });
    },
});

const profile = defineCollection({
    loader: file("content/about/profile.json", { parser: (text) => JSON.parse(text) }),
})

const services = defineCollection({
    loader: file("content/about/services.json", { parser: (text) => JSON.parse(text) })
})

const projects = defineCollection({
    loader: file("content/projects/projects.json", { parser: (text) => JSON.parse(text) }),
})

export const collections = { articles, bits, quotes, logo, gallery, photo_stories, profile, services, projects };