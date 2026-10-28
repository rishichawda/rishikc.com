import type { APIRoute, GetStaticPaths } from "astro";
import { getCollection } from "astro:content";
import { previewResponse } from "../../utils/preview";

export const getStaticPaths = (async () => {
  const galleries = await getCollection("gallery");
  return galleries.map((gallery) => ({
    params: { slug: gallery.data.directory },
    props: { photo: gallery.data.featured_image },
  }));
}) satisfies GetStaticPaths;

export const GET: APIRoute = ({ props }) => previewResponse(props.photo);
