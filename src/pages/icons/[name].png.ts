import type { APIRoute, GetStaticPaths } from "astro";
import { iconPng } from "../../utils/icons";
import { structuredData } from "../../utils/siteData";

export const getStaticPaths = (() =>
  structuredData.head.icons.map(({ name }) => ({ params: { name } }))) satisfies GetStaticPaths;

export const GET: APIRoute = async ({ params }) =>
  new Response(new Uint8Array(await iconPng(params.name!)), { headers: { "Content-Type": "image/png" } });
