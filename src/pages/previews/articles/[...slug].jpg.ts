import type { APIRoute, GetStaticPaths } from "astro";
import { getCollection } from "astro:content";
import { isPhotograph, previewResponse } from "../../../utils/shareImage";

// Only articles whose hero image is a gallery photograph need a preview; other heroes are crawlable.
export const getStaticPaths = (async () => {
  const articles = await getCollection("articles");
  return articles
    .filter((article) => isPhotograph(article.data.hero_image))
    .map((article) => ({
      params: { slug: article.id },
      props: { photo: article.data.hero_image },
    }));
}) satisfies GetStaticPaths;

export const GET: APIRoute = ({ props }) => previewResponse(props.photo);
