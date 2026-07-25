import type { APIRoute } from 'astro';

import { SITE } from '@config/site';
import { repositories } from '@infrastructure/container';

/** Minimal XML escaping — content is authored by us, but titles contain `&`. */
const escapeXml = (value: string): string =>
  value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');

/**
 * A feed of the case studies.
 *
 * Small but genuinely useful: it lets anyone following the work get new project
 * write-ups without a newsletter, and it is one more machine-readable surface
 * pointing at the canonical URLs.
 */
export const GET: APIRoute = async () => {
  const projects = await repositories.project.findAll();
  const profile = await repositories.profile.get();

  const items = projects
    .map((project) => {
      // Projects carry a year, not a date; 1 January keeps the ordering stable
      // and honest rather than inventing a publication day.
      const pubDate = new Date(Date.UTC(project.year, 0, 1)).toUTCString();

      return `    <item>
      <title>${escapeXml(project.title)}</title>
      <link>${SITE.url}${project.href}</link>
      <guid isPermaLink="true">${SITE.url}${project.href}</guid>
      <description>${escapeXml(project.tagline)}</description>
      <category>${escapeXml(project.categoryLabel)}</category>
      <pubDate>${pubDate}</pubDate>
    </item>`;
    })
    .join('\n');

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${escapeXml(profile.name)} — Projetos</title>
    <link>${SITE.url}/</link>
    <description>${escapeXml(SITE.description)}</description>
    <language>pt-br</language>
    <atom:link href="${SITE.url}/rss.xml" rel="self" type="application/rss+xml" />
${items}
  </channel>
</rss>
`;

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/rss+xml; charset=utf-8',
      'Cache-Control': 'public, max-age=3600',
    },
  });
};
