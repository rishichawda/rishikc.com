/**
 * JSON-LD @graph entity builders for the connected entity graph.
 * Based on design/v2/18-json-ld-architecture.md
 *
 * All entities use stable @id fragment URIs:
 *   - Person: https://rishikc.com/#person
 *   - WebSite: https://rishikc.com/#website
 *   - Employer (the Person's worksFor organization): https://rishikc.com/#employer
 */
import profileFile from "../../content/about/profile.json";
import {
  ALTERNATE_NAMES,
  CREDENTIAL_BODIES,
  CREDENTIAL_SUBJECT_IDS,
  EMPLOYER_IDS,
  KNOWS_ABOUT,
  LANGUAGES,
  LOCALE,
  OCCUPATION,
  PHOTO_RIGHTS,
  PLACE_IDS,
  SCHOOLS,
  entity,
  wikidataUrl,
} from "./topics";

const SITE_URL = "https://rishikc.com";
const ABOUT_URL = `${SITE_URL}/about/`;
export const AUTHOR_NAME: string = profileFile.data.name;

// ── Stable @id URIs ──
export const IDS = {
  person: `${SITE_URL}/#person`,
  website: `${SITE_URL}/#website`,
  employer: `${SITE_URL}/#employer`,
} as const;

// ── Reference helpers (use these inside page-level schemas) ──
export const personRef = { "@id": IDS.person };
export const websiteRef = { "@id": IDS.website };
/**
 * The Person as an author, creator or publisher value. Google asks for the name and a url that
 * identifies the author, so a bare @id reference is not enough on its own.
 */
export const authorRef = {
  "@type": "Person",
  "@id": IDS.person,
  name: AUTHOR_NAME,
  url: ABOUT_URL,
};

/**
 * Rights for a photograph or a page of photographs. The gallery text states the policy: every
 * photograph is the owner's, and no use is allowed without written permission. That is all rights
 * reserved, which has no standard license URL, so `license` points at the page that states it and
 * `acquireLicensePage` at the page to ask on.
 */
export function photoRights(year?: number): Record<string, unknown> {
  return {
    creator: authorRef,
    creditText: AUTHOR_NAME,
    copyrightNotice: PHOTO_RIGHTS.notice.replace("{year}", String(year ?? "")).replace("{name}", AUTHOR_NAME).replace(/\s+/g, " "),
    copyrightHolder: authorRef,
    ...(year ? { copyrightYear: year } : {}),
    license: `${SITE_URL}${PHOTO_RIGHTS.licensePath}`,
    acquireLicensePage: `${SITE_URL}${PHOTO_RIGHTS.acquireLicensePath}`,
  };
}

// ── Profile data types ──
interface Social { platform: string; url: string; }
interface Certification { institution: string; title: string; }
interface Education { university: string; institution: string; degree: string; }
interface Position { title: string; start_date: string; end_date: string | null; description?: string; }
interface Experience { company: string; website?: string[]; positions: Position[]; }

export interface ProfileData {
  name: string;
  title: string;
  summary: string;
  location?: string;
  socials: Social[];
  certifications?: Certification[];
  education?: Education[];
  experience?: Experience[];
  languages?: { name: string; level: string }[];
}

/** "12-2025", as profile.json writes a month, to the ISO 8601 "2025-12". */
const isoMonth = (month: string) => month.split("-").reverse().join("-");

/**
 * Build the canonical Person entity.
 */
export function buildPersonEntity(profile: ProfileData, profileImageUrl?: string): Record<string, unknown> {
  const [givenName, additionalName, familyName] = profile.name.split(" ");
  const person: Record<string, unknown> = {
    "@type": "Person",
    "@id": IDS.person,
    name: profile.name,
    givenName,
    additionalName,
    familyName,
    alternateName: ALTERNATE_NAMES,
    jobTitle: profile.title,
    description: profile.summary,
    url: ABOUT_URL,
    mainEntityOfPage: ABOUT_URL,
    sameAs: profile.socials.map((s) => s.url),
  };

  if (profileImageUrl) {
    person.image = profileImageUrl;
  }

  // worksFor
  if (profile.experience?.length) {
    const employer = profile.experience[0];
    const websites = employer.website ?? [];
    const wikidata = (EMPLOYER_IDS[employer.company] ?? []).map(wikidataUrl);
    person.worksFor = {
      "@type": "Organization",
      "@id": IDS.employer,
      name: employer.company,
      ...(websites.length ? { url: websites[0] } : {}),
      ...(websites.length || wikidata.length ? { sameAs: [...websites, ...wikidata] } : {}),
    };
  }

  // hasOccupation: one Role per position, with the dates, as schema.org asks for past professions
  if (profile.experience?.length) {
    const category = {
      "@type": "CategoryCode",
      codeValue: OCCUPATION.code,
      name: OCCUPATION.name,
      url: OCCUPATION.url,
      inCodeSet: { "@type": "CategoryCodeSet", name: OCCUPATION.codeSet, url: OCCUPATION.codeSetUrl },
    };
    person.hasOccupation = profile.experience.flatMap((employer) =>
      employer.positions.map((position) => ({
        "@type": "Role",
        roleName: position.title,
        name: `${position.title}, ${employer.company}`,
        ...(position.description ? { description: position.description } : {}),
        startDate: isoMonth(position.start_date),
        ...(position.end_date ? { endDate: isoMonth(position.end_date) } : {}),
        hasOccupation: { "@type": "Occupation", name: position.title, occupationalCategory: category },
      })),
    );
  }

  // address and homeLocation, from "City, Region, Country"
  if (profile.location) {
    const [locality, region, country] = profile.location.split(",").map((part) => part.trim());
    person.address = {
      "@type": "PostalAddress",
      addressLocality: locality,
      ...(region ? { addressRegion: region } : {}),
      ...(country ? { addressCountry: country } : {}),
    };
    person.homeLocation = {
      "@type": "Place",
      name: profile.location,
      ...(PLACE_IDS[locality] ? { sameAs: wikidataUrl(PLACE_IDS[locality]) } : {}),
      ...(region && PLACE_IDS[region] ? { containedInPlace: entity(PLACE_IDS[region], "AdministrativeArea") } : {}),
    };
  }

  // alumniOf
  if (profile.education?.length) {
    person.alumniOf = profile.education.map((edu) => {
      const name = edu.university || edu.institution;
      const school = SCHOOLS[name] ?? {};
      // The institute the degree was taken at, a part of the university.
      const unit = edu.university && edu.institution;
      return {
        "@type": "EducationalOrganization",
        name,
        ...(school.url ? { url: school.url } : {}),
        ...(school.wikidata ? { sameAs: wikidataUrl(school.wikidata) } : {}),
        ...(unit ? {
          department: {
            "@type": "EducationalOrganization",
            name: unit,
            ...(SCHOOLS[unit]?.url ? { url: SCHOOLS[unit].url } : {}),
          },
        } : {}),
      };
    });
  }

  // knowsAbout (Wikidata-backed topics)
  person.knowsAbout = KNOWS_ABOUT.map((id) => entity(id));

  // knowsLanguage
  if (profile.languages?.length) {
    person.knowsLanguage = profile.languages.map((l) => {
      const known = LANGUAGES[l.name];
      return {
        "@type": "Language",
        name: l.name,
        ...(known ? { alternateName: known.code, sameAs: wikidataUrl(known.wikidata) } : {}),
      };
    });
  }

  // hasCredential
  if (profile.certifications?.length) {
    person.hasCredential = profile.certifications.map((cert) => {
      const body = CREDENTIAL_BODIES[cert.institution] ?? {};
      const subject = CREDENTIAL_SUBJECT_IDS[cert.title];
      return {
        "@type": "EducationalOccupationalCredential",
        credentialCategory: "Professional Certification",
        name: cert.title,
        recognizedBy: {
          "@type": "Organization",
          name: cert.institution,
          ...(body.url ? { url: body.url } : {}),
          ...(body.wikidata ? { sameAs: wikidataUrl(body.wikidata) } : {}),
        },
        ...(subject ? { about: entity(subject) } : {}),
      };
    });
  }

  return person;
}

/**
 * Build the canonical WebSite entity with SearchAction.
 */
export function buildWebSiteEntity(description: string): Record<string, unknown> {
  return {
    "@type": "WebSite",
    "@id": IDS.website,
    name: "Rishi Kumar Chawda",
    url: `${SITE_URL}/`,
    description,
    publisher: authorRef,
    inLanguage: LOCALE,
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${SITE_URL}/search/?q={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
  };
}

/**
 * Build a BreadcrumbList from URL segments.
 * Omits breadcrumb for the homepage.
 */
export function buildBreadcrumbList(
  pathname: string,
  pageTitle: string,
): Record<string, unknown> | null {
  if (pathname === "/" || pathname === "") return null;

  const canonicalUrl = `${SITE_URL}${pathname}`;
  const segments = pathname.split("/").filter(Boolean);

  const sectionLabels: Record<string, string> = {
    articles: "Articles",
    gallery: "Gallery",
    bits: "Bits",
    projects: "Projects",
    about: "About",
    career: "Career",
    contact: "Contact",
    reads: "Reads",
    search: "Search",
    privacy: "Privacy",
    stories: "Stories",
    series: "Series",
  };

  const items: { "@type": string; position: number; name: string; item?: string }[] = [
    { "@type": "ListItem", position: 1, name: "Home", item: `${SITE_URL}/` },
  ];

  let pathAccum = "";
  for (let i = 0; i < segments.length; i++) {
    const seg = segments[i];
    pathAccum += `/${seg}`;
    const isLast = i === segments.length - 1;
    const label = isLast ? pageTitle : (sectionLabels[seg] || seg);
    const entry: { "@type": string; position: number; name: string; item?: string } = {
      "@type": "ListItem",
      position: i + 2,
      name: label,
    };
    // Last item omits "item" per Google spec
    if (!isLast) {
      entry.item = `${SITE_URL}${pathAccum}/`;
    }
    items.push(entry);
  }

  return {
    "@type": "BreadcrumbList",
    "@id": `${canonicalUrl}#breadcrumb`,
    itemListElement: items,
  };
}

/**
 * Build a WebPage (or subtype) entity for a page.
 */
export function buildWebPageEntity(options: {
  type?: string;
  url: string;
  name: string;
  description: string;
  dateModified?: string;
  mainEntity?: Record<string, unknown>;
}): Record<string, unknown> {
  const canonicalUrl = options.url.startsWith("http") ? options.url : `${SITE_URL}${options.url}`;
  const page: Record<string, unknown> = {
    "@type": options.type || "WebPage",
    "@id": canonicalUrl,
    url: canonicalUrl,
    name: options.name,
    description: options.description,
    isPartOf: websiteRef,
    inLanguage: LOCALE,
  };

  // Add breadcrumb reference
  const pathname = canonicalUrl.replace(SITE_URL, "");
  if (pathname !== "/") {
    page.breadcrumb = { "@id": `${canonicalUrl}#breadcrumb` };
  }

  if (options.dateModified) {
    page.dateModified = options.dateModified;
  }

  if (options.mainEntity) {
    page.mainEntity = options.mainEntity;
  }

  return page;
}

/**
 * Assemble the full @graph array for a page.
 * Base entities (WebSite, Person, BreadcrumbList) + page-specific entities.
 */
export function buildGraphForPage(options: {
  profile: ProfileData;
  profileImageUrl?: string;
  siteDescription: string;
  pathname: string;
  pageTitle: string;
  pageEntities?: Record<string, unknown>[];
}): Record<string, unknown> {
  const graph: Record<string, unknown>[] = [
    buildWebSiteEntity(options.siteDescription),
    buildPersonEntity(options.profile, options.profileImageUrl),
  ];

  const breadcrumb = buildBreadcrumbList(options.pathname, options.pageTitle);
  if (breadcrumb) {
    graph.push(breadcrumb);
  }

  if (options.pageEntities) {
    graph.push(...options.pageEntities);
  }

  return {
    "@context": "https://schema.org",
    "@graph": graph,
  };
}
