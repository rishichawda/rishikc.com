import type { APIRoute } from "astro";
import { profile, structuredData } from "../utils/siteData";

export const GET: APIRoute = () => {
  const { shortName, themeColor } = structuredData.head;
  const manifest = {
    name: profile.name,
    short_name: shortName,
    start_url: "/",
    display: "browser",
    lang: structuredData.locale,
    theme_color: themeColor.light,
    background_color: themeColor.light,
    icons: structuredData.head.icons.map(({ name, size, purpose }) => ({
      src: `/icons/${name}.png`,
      sizes: `${size}x${size}`,
      type: "image/png",
      purpose,
    })),
  };
  return new Response(JSON.stringify(manifest, null, 2), { headers: { "Content-Type": "application/manifest+json" } });
};
