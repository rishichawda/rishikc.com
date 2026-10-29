import type { APIRoute } from "astro";
import { iconPng } from "../utils/icons";

export const GET: APIRoute = async () =>
  new Response(new Uint8Array(await iconPng("apple-touch-icon")), { headers: { "Content-Type": "image/png" } });
