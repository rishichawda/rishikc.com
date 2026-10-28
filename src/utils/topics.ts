/**
 * Wikidata-backed entities for JSON-LD. src/utils/wikidata.json holds each ID with the English label
 * Wikidata gives it; .github/scripts/seo-audit.mjs checks every ID in the built pages against that
 * file and against the live Wikidata label, so a wrong ID fails the audit instead of shipping.
 */
import wikidata from "./wikidata.json";

export type WikidataId = keyof typeof wikidata;

export const wikidataUrl = (id: WikidataId) => `https://www.wikidata.org/wiki/${id}`;

/** A schema.org Thing (or subtype) named and linked by its Wikidata item. */
export function entity(id: WikidataId, type = "Thing"): Record<string, unknown> {
  return { "@type": type, name: wikidata[id].name, sameAs: wikidataUrl(id) };
}

/** What the author knows about: skills, interests, and the topics the articles and gallery cover. */
export const KNOWS_ABOUT: WikidataId[] = [
  "Q3025536", // DevOps
  "Q108525696", // DevSecOps
  "Q386275", // Web development
  "Q2988038", // Mobile application development
  "Q80993", // Software engineering
  "Q24479", // Chef
  "Q24964334", // Infrastructure as code
  "Q126950763", // Policy as code
  "Q19399674", // React
  "Q55774523", // React Native
  "Q978185", // TypeScript
  "Q2005", // JavaScript
  "Q756100", // Node.js
  "Q123162820", // Playwright
  "Q23679990", // Progressive web app
  "Q7978612", // Web performance optimization
  "Q104618838", // Core Web Vitals
  "Q808932", // Web accessibility
  "Q180711", // Search engine optimization
  "Q1130645", // Open-source software
  "Q1193158", // Technical writing
  "Q11633", // Photography
  "Q966880", // Wildlife photography
  "Q1353984", // Landscape photography
  "Q182956", // Portrait photography
  "Q91079944", // Monochrome photography
];

/** Profile strings (as written in content/about/profile.json) mapped to their Wikidata items. */
export const UNIVERSITY_IDS: Record<string, WikidataId> = {
  "Siksha 'O' Anusandhan University": "Q7513963",
};

export const CREDENTIAL_BODY_IDS: Record<string, WikidataId> = {
  "University of Illinois Urbana-Champaign": "Q457281",
};

export const CREDENTIAL_SUBJECT_IDS: Record<string, WikidataId> = {
  "SAFe Agilist Certification": "Q23808624",
};

export const EMPLOYER_IDS: Record<string, WikidataId[]> = {
  "Progress Chef": ["Q741046", "Q7098706"],
};

export const LANGUAGE_IDS: Record<string, { code: string; id: WikidataId }> = {
  Hindi: { code: "hi", id: "Q1568" },
  English: { code: "en", id: "Q1860" },
  Gujarati: { code: "gu", id: "Q5137" },
  Odia: { code: "or", id: "Q33810" },
};

export const PLACE_IDS: Record<string, WikidataId> = {
  Bengaluru: "Q1355",
  Karnataka: "Q1185",
};

/** Article tags (lower case, as written in the frontmatter) mapped to the topic they are about. */
export const TAG_TOPIC_IDS: Record<string, WikidataId> = {
  "web development": "Q386275",
  typescript: "Q978185",
  react: "Q19399674",
  javascript: "Q2005",
  seo: "Q180711",
  accessibility: "Q808932",
  pwa: "Q23679990",
  "react-native": "Q55774523",
  performance: "Q7978612",
  photography: "Q11633",
  "software-engineering": "Q80993",
  "mobile applications": "Q2988038",
};
