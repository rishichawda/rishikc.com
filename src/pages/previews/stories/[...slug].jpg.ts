import type { APIRoute, GetStaticPaths } from "astro";
import { getCollection } from "astro:content";
import { previewResponse } from "../../../utils/preview";

export const getStaticPaths = (async () => {
  const stories = await getCollection("photo_stories");
  return stories.map((story) => ({
    params: { slug: story.data.path.replace("/gallery/stories/", "").replace(/\/$/, "") },
    props: { photo: story.data.cover_image },
  }));
}) satisfies GetStaticPaths;

export const GET: APIRoute = ({ props }) => previewResponse(props.photo);
