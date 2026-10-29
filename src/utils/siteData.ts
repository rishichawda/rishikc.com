/**
 * The site data in content/about, loaded through the content collections. Top-level await keeps the
 * values synchronous for the markup builders. This file holds types and loading only; the data is in
 * the content repository.
 */
import { getEntry } from "astro:content";

export interface Profile {
  name: string;
  title: string;
  summary: string;
  location: string;
  socials: { platform: string; url: string }[];
}

interface Linked { wikidata?: string; url?: string }

export interface StructuredData {
  locale: string;
  alternateNames: string[];
  knowsAbout: string[];
  tagTopics: Record<string, string>;
  schools: Record<string, Linked>;
  credentialBodies: Record<string, Linked>;
  credentialSubjects: Record<string, string>;
  employers: Record<string, string[]>;
  languages: Record<string, { code: string; wikidata: string }>;
  places: Record<string, string>;
  occupation: { name: string; code: string; codeSet: string; codeSetUrl: string; url: string };
  head: {
    shortName: string;
    themeColor: { light: string; dark: string };
    icons: { name: string; size: number; purpose: "any" | "maskable" }[];
  };
  photoRights: {
    licensePath: string;
    acquireLicensePath: string;
    notice: string;
    usageTerms: string;
    dataMining: string;
    digitalSourceType: string;
  };
  contentLicense: { name: string; url: string; footerNotice: string };
  mentions: { minimumCount: number; limit: number; terms: { pattern: string; wikidata: string; flags?: string }[] };
}

export interface Card { kicker: string; title: string; subtitle: string }

export interface ShareCards {
  footer: string;
  default: Card;
  bit: Pick<Card, "kicker" | "subtitle">;
  pages: Record<string, Card>;
}

export interface Section { title: string; path: string; description?: string }

export interface LlmsText {
  summary: string;
  extraTopics: string[];
  sections: Section[];
  attribution: string;
  contact: Section & { socials: string[] };
  optional: Section[];
}

/** The data of the one "data" entry of a collection. */
async function load<T>(collection: "profile" | "wikidata" | "structuredData" | "shareCards" | "llms"): Promise<T> {
  const entry = await getEntry(collection, "data");
  if (!entry) throw new Error(`The ${collection} collection has no "data" entry`);
  return entry.data as T;
}

export const profile = await load<Profile>("profile");
export const wikidata = await load<Record<string, { label: string; name: string }>>("wikidata");
export const structuredData = await load<StructuredData>("structuredData");
export const shareCards = await load<ShareCards>("shareCards");
export const llms = await load<LlmsText>("llms");
