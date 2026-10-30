import type { APIRoute } from "astro";
import { iconPngAt } from "../utils/icons";

export const GET: APIRoute = async () =>
  new Response(new Uint8Array(await iconPngAt(32)), { headers: { "Content-Type": "image/png" } });
