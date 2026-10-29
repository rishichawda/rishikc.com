import type { APIContext } from 'astro';
import { getCollection } from 'astro:content';
import { KNOWS_ABOUT, topicName } from '../utils/topics';
import { llms, profile } from '../utils/siteData';
import { CONTENT_LICENSE } from '../utils/topics';
import type { Section } from '../utils/siteData';

export async function GET(context: APIContext) {
  const site = context.site!.toString().replace(/\/$/, '');
  const [projects, contributions] = (await getCollection('projects')).map((entry) => entry.data as unknown[]);

  // The text in content/about/llms.json uses these placeholders.
  const fill = (text: string) =>
    text
      .replaceAll('{name}', profile.name)
      .replaceAll('{site}', site)
      .replaceAll('{license}', `${CONTENT_LICENSE.name} (${CONTENT_LICENSE.url})`)
      .replaceAll('{projects}', String(projects.length))
      .replaceAll('{contributions}', String(contributions.length));
  const link = ({ title, path, description }: Section) =>
    `- [${title}](${site}${path})${description ? `: ${fill(description)}` : ''}`;

  // The key topics are the same list the Person markup gives as knowsAbout.
  const topics = [...KNOWS_ABOUT.map(topicName), ...llms.extraTopics].join(', ');
  const contact = [
    link(llms.contact),
    ...llms.contact.socials.flatMap((platform) => {
      const social = profile.socials.find((s) => s.platform === platform);
      return social ? [`- [${platform}](${social.url})`] : [];
    }),
  ].join('\n');

  const body = `# ${profile.name}

> ${fill(llms.summary)}

## About

${profile.summary} Based in ${profile.location}.

## Content Sections

${llms.sections.map(link).join('\n')}

## Key Topics

${topics}

## Attribution

${fill(llms.attribution)}

## Contact

${contact}

## Optional

${llms.optional.map(link).join('\n')}
- Website: ${site}
`;

  return new Response(body, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
}
