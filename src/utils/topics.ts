/**
 * Accessors for the structured-data entities. The data lives in content/about: structured-data.json
 * holds the topic, school, employer, language and place tables, and wikidata.json holds each Wikidata
 * ID with the English label Wikidata gives it. .github/scripts/seo-audit.mjs checks every ID in the
 * built pages against that file and against the live Wikidata label, so a wrong ID fails the audit
 * instead of shipping.
 */
import wikidata from "../../content/about/wikidata.json";
import data from "../../content/about/structured-data.json";

type Labels = Record<string, { label: string; name: string }>;
const labels: Labels = wikidata;

export const wikidataUrl = (id: string) => `https://www.wikidata.org/wiki/${id}`;

/** The display name for a Wikidata ID. A missing ID fails the build. */
export function topicName(id: string): string {
  const known = labels[id];
  if (!known) throw new Error(`${id} is not in content/about/wikidata.json`);
  return known.name;
}

/** A schema.org Thing (or subtype) named and linked by its Wikidata item. */
export function entity(id: string, type = "Thing"): Record<string, unknown> {
  return { "@type": type, name: topicName(id), sameAs: wikidataUrl(id) };
}

interface Linked { wikidata?: string; url?: string }

export const LOCALE: string = data.locale;
export const ALTERNATE_NAMES: string[] = data.alternateNames;
/** What the author knows about: skills, interests, and the topics the articles and gallery cover. */
export const KNOWS_ABOUT: string[] = data.knowsAbout;
/** Article tags (lower case, as written in the frontmatter) mapped to the topic they are about. */
export const TAG_TOPIC_IDS: Record<string, string> = data.tagTopics;
/** The tables below are keyed by the strings written in content/about/profile.json. */
export const SCHOOLS: Record<string, Linked> = data.schools;
export const CREDENTIAL_BODIES: Record<string, Linked> = data.credentialBodies;
export const CREDENTIAL_SUBJECT_IDS: Record<string, string> = data.credentialSubjects;
export const EMPLOYER_IDS: Record<string, string[]> = data.employers;
export const LANGUAGES: Record<string, { code: string; wikidata: string }> = data.languages;
export const PLACE_IDS: Record<string, string> = data.places;
export const PHOTO_RIGHTS: { licensePath: string; acquireLicensePath: string; notice: string } = data.photoRights;
