/**
 * Accessors for the structured-data entities. The data lives in content/about: structured-data.json
 * holds the topic, school, employer, language and place tables, and wikidata.json holds each Wikidata
 * ID with the English label Wikidata gives it. .github/scripts/seo-audit.mjs checks every ID in the
 * built pages against that file and against the live Wikidata label, so a wrong ID fails the audit
 * instead of shipping.
 */
import { structuredData as data, wikidata } from "./siteData";

export const wikidataUrl = (id: string) => `https://www.wikidata.org/wiki/${id}`;

/** The display name for a Wikidata ID. A missing ID fails the build. */
export function topicName(id: string): string {
  const known = wikidata[id];
  if (!known) throw new Error(`${id} is not in content/about/wikidata.json`);
  return known.name;
}

/** A schema.org Thing (or subtype) named and linked by its Wikidata item. */
export function entity(id: string, type = "Thing"): Record<string, unknown> {
  return { "@type": type, name: topicName(id), sameAs: wikidataUrl(id) };
}

export const LOCALE = data.locale;
export const ALTERNATE_NAMES = data.alternateNames;
/** What the author knows about: skills, interests, and the topics the articles and gallery cover. */
export const KNOWS_ABOUT = data.knowsAbout;
/** Article tags (lower case, as written in the frontmatter) mapped to the topic they are about. */
export const TAG_TOPIC_IDS = data.tagTopics;
/** The tables below are keyed by the strings written in content/about/profile.json. */
export const SCHOOLS = data.schools;
export const CREDENTIAL_BODIES = data.credentialBodies;
export const CREDENTIAL_SUBJECT_IDS = data.credentialSubjects;
export const EMPLOYER_IDS = data.employers;
export const LANGUAGES = data.languages;
export const PLACE_IDS = data.places;
/** The occupation category the author's roles belong to, as an O*NET-SOC code. */
export const OCCUPATION = data.occupation;
export const PHOTO_RIGHTS = data.photoRights;
/** The license of the articles and bits (the photographs are all rights reserved). */
export const CONTENT_LICENSE = data.contentLicense;
/** The author's given, middle and family names. Kumar is a middle name, not a second family name. */
export const NAME_PARTS = data.nameParts;
/** The label of each blog section in the Blog node's name. */
export const BLOG_LABELS = data.blogLabels;
/** Robots directives: for pages of the gallery photographs, and for an article whose header is one. */
export const ROBOTS = data.robots;
