import type { APIRoute } from "astro";
import { getCollection } from "astro:content";

export const GET: APIRoute = async () => {
    const allArticles = await getCollection("articles");
    const allBits = await getCollection("bits");
    const allGallery = await getCollection("gallery");
    const allQuotes = await getCollection("quotes");

    const searchIndex = {
        articles: allArticles.map((article) => ({
            title: article.data.title,
            description: article.data.description,
            tags: article.data.tags || [],
            path: article.data.path,
            date: article.data.date.toISOString(),
            hero_image: article.data.hero_image,
            hero_image_alt: article.data.hero_image_alt || article.data.title,
            searchableContent: [
                article.data.title,
                article.data.description,
                article.data.subtitle,
                article.data.keywords,
                article.data.tags.join(" "),
                article.data.category,
            ]
                .filter(Boolean)
                .join(" ")
                .toLowerCase(),
        })),
        bits: allBits.map((bit) => ({
            title: bit.data.title,
            description: bit.data.description,
            tags: bit.data.tags || [],
            path: bit.data.path,
            date: bit.data.date.toISOString(),
            searchableContent: [
                bit.data.title,
                bit.data.description,
                bit.data.tags?.join(" "),
            ]
                .filter(Boolean)
                .join(" ")
                .toLowerCase(),
        })),
        gallery: allGallery.map((gallery) => ({
            title: gallery.data.title,
            description: gallery.data.description || "",
            location: gallery.data.location || "",
            tags: gallery.data.tags || [],
            directory: gallery.data.directory,
            featured_image: gallery.data.featured_image,
            featured_image_alt:
                gallery.data.featured_image_alt || gallery.data.title,
            images_count: gallery.data.images?.length || 0,
            searchableContent: [
                gallery.data.title,
                gallery.data.description,
                gallery.data.location,
                gallery.data.tags?.join(" "),
                gallery.data.directory,
            ]
                .filter(Boolean)
                .join(" ")
                .toLowerCase(),
        })),
        quotes: allQuotes[1]?.data
            ? allQuotes[1].data.map((quote: any) => ({
                  quote: quote.quote,
                  info: quote.info || "",
                  searchableContent: [quote.quote, quote.info]
                      .filter(Boolean)
                      .join(" ")
                      .toLowerCase(),
              }))
            : [],
    };

    return new Response(JSON.stringify(searchIndex), {
        headers: {
            "Content-Type": "application/json",
            "Cache-Control": "public, max-age=3600",
            "X-Robots-Tag": "noindex, nofollow",
        },
    });
};
