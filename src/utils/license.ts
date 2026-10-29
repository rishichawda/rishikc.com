/**
 * Which license notice a page carries. The wording is in content/about/structured-data.json
 * (contentLicense.notices); this only picks the key from the URL path.
 */
import { CONTENT_LICENSE } from "./topics";

export type LicenseContext = keyof typeof CONTENT_LICENSE.notices;

/**
 * The articles (their index, the series pages and each article), the bits (their index and each bit),
 * the gallery, or any other page.
 */
export function licenseContext(pathname: string): LicenseContext {
  if (/^\/articles\/(?!series\/)[^/]+\/$/.test(pathname)) return "article";
  if (pathname.startsWith("/articles/")) return "articles";
  if (/^\/bits\/[^/]+\/$/.test(pathname)) return "bit";
  if (pathname.startsWith("/bits/")) return "bits";
  if (pathname.startsWith("/gallery/")) return "gallery";
  return "site";
}

/** The link target of the "{code}" placeholder: the license text on the terms page. */
export const CODE_LICENSE_PATH = `${CONTENT_LICENSE.termsPath}#code`;

/** Splits a notice into plain text and the placeholders {license} and {code}, after filling in {exclusions}. */
export const noticeParts = (notice: string) =>
  notice.replaceAll("{exclusions}", CONTENT_LICENSE.exclusions).split(/(\{license\}|\{code\})/).filter(Boolean);
