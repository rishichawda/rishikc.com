import type { APIRoute } from "astro";
import { APPLE_TOUCH_ICON_SIZE, iconPng } from "../utils/icons";

export const GET: APIRoute = async () =>
  new Response(new Uint8Array(await iconPng(APPLE_TOUCH_ICON_SIZE)), { headers: { "Content-Type": "image/png" } });
