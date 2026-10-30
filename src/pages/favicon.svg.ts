import type { APIRoute } from "astro";
import { faviconSvg } from "../utils/icons";

export const GET: APIRoute = async () =>
  new Response(new Uint8Array(await faviconSvg()), { headers: { "Content-Type": "image/svg+xml" } });
