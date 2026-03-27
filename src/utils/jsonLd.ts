/**
 * JSON-LD @graph entity builders for the connected entity graph.
 * Based on design/v2/18-json-ld-architecture.md
 *
 * All entities use stable @id fragment URIs:
 *   - Person: https://rishikc.com/#person
 *   - WebSite: https://rishikc.com/#website
 *   - Organization: https://rishikc.com/#organization
 */

const SITE_URL = "https://rishikc.com";

// ── Stable @id URIs ──
export const IDS = {
  person: `${SITE_URL}/#person`,
  website: `${SITE_URL}/#website`,
  organization: `${SITE_URL}/#organization`,
} as const;

// ── Reference helpers (use these inside page-level schemas) ──
export const personRef = { "@id": IDS.person };
export const websiteRef = { "@id": IDS.website };

// ── Profile data types ──
interface Social { platform: string; url: string; }
interface Certification { institution: string; title: string; }
interface Education { university: string; institution: string; degree: string; }
interface Experience { company: string; website?: string[]; positions: { title: string }[]; }

export interface ProfileData {
  name: string;
  title: string;
  summary: string;
  socials: Social[];
  certifications?: Certification[];
  education?: Education[];
  experience?: Experience[];
  languages?: { name: string; level: string }[];
}

/**
 * Build the canonical Person entity.
 */
export function buildPersonEntity(profile: ProfileData, profileImageUrl?: string): Record<string, unknown> {
  const person: Record<string, unknown> = {
    "@type": "Person",
    "@id": IDS.person,
    name: profile.name,
    jobTitle: profile.title,
    description: profile.summary,
    url: `${SITE_URL}/`,
    sameAs: profile.socials.map((s) => s.url),
  };

  if (profileImageUrl) {
    person.image = profileImageUrl;
  }

  // worksFor
  if (profile.experience?.length) {
    const employer = profile.experience[0];
    person.worksFor = {
      "@type": "Organization",
      "@id": IDS.organization,
      name: employer.company,
      ...(employer.website?.length ? {
        url: employer.website[0],
        sameAs: employer.website,
      } : {}),
    };
  }

  // address
  person.address = {
    "@type": "PostalAddress",
    addressLocality: "Bengaluru",
    addressRegion: "KA",
    addressCountry: "IN",
  };

  // alumniOf
  if (profile.education?.length) {
    person.alumniOf = profile.education.map((edu) => ({
      "@type": "EducationalOrganization",
      name: edu.university || edu.institution,
    }));
  }

  // knowsAbout (Wikidata IDs)
  person.knowsAbout = [
    "https://www.wikidata.org/wiki/Q386724",   // DevOps
    "https://www.wikidata.org/wiki/Q80993",    // Software engineering
    "https://www.wikidata.org/wiki/Q11034",    // Mobile app development
    "https://www.wikidata.org/wiki/Q8777",     // Web development
  ];

  // knowsLanguage
  if (profile.languages?.length) {
    person.knowsLanguage = profile.languages.map((l) => l.name);
  }

  // hasCredential
  if (profile.certifications?.length) {
    person.hasCredential = profile.certifications.map((cert) => ({
      "@type": "EducationalOccupationalCredential",
      credentialCategory: "Professional Certification",
      name: cert.title,
      recognizedBy: {
        "@type": "Organization",
        name: cert.institution,
      },
    }));
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
    publisher: personRef,
    inLanguage: "en-US",
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
    inLanguage: "en-US",
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
