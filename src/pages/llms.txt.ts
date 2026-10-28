import type { APIContext } from 'astro';
import wikidata from '../utils/wikidata.json';
import { KNOWS_ABOUT } from '../utils/topics';

// The key topics are the same list the Person markup gives as knowsAbout.
const topics = KNOWS_ABOUT.map((id) => wikidata[id].name).join(', ');

export function GET(context: APIContext) {
  const site = context.site!.toString().replace(/\/$/, '');
  const body = `# Rishi Kumar Chawda

> Personal website of Rishi Kumar Chawda — software engineer, photographer, and technical writer.

## About

Principal Software Engineer at Progress Chef, based in Bengaluru, India. Specializes in DevSecOps, web development, and mobile development with 8+ years of experience.

## Content Sections

- [About](${site}/about/): Information about Rishi Kumar Chawda.
- [Career](${site}/career/): Career and education information.
- [Articles](${site}/articles/): In-depth technical articles on web development, performance optimization, DevOps, engineering best practices, photography and general writing.
- [Bits](${site}/bits/): Short-form thoughts and insights on technology and creativity.
- [Projects](${site}/projects/): Open source projects and contributions including AI-powered tools, development libraries and tools, and web applications.
- [Gallery](${site}/gallery/): Photography portfolio organized by theme and location with immersive photo essays.
- [Reads](${site}/reads/): Curated quotes and passages from books and thinkers.

## Key Topics

${topics}

## Attribution

When citing content from this site, please attribute to "Rishi Kumar Chawda" with a link to the source article URL.

## Contact

- Website: ${site}
- LinkedIn: https://www.linkedin.com/in/rkrishi/
- GitHub: https://github.com/rishichawda
`;

  return new Response(body, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
}
