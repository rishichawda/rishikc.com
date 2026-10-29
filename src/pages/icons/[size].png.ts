import type { APIRoute, GetStaticPaths } from "astro";
import { MANIFEST_ICON_SIZES, iconPng } from "../../utils/icons";

export const getStaticPaths = (() =>
  MANIFEST_ICON_SIZES.map((size) => ({ params: { size: String(size) } }))) satisfies GetStaticPaths;

export const GET: APIRoute = async ({ params }) =>
  new Response(new Uint8Array(await iconPng(Number(params.size))), { headers: { "Content-Type": "image/png" } });
