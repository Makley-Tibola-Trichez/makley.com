import type { APIRoute } from 'astro';
import { renderToBuffer } from '@react-pdf/renderer';

import { useCases } from '@infrastructure/container';
import { buildResumeDocument } from '@presentation/pdf/resume-document';

/**
 * English counterpart of `makley-trichez-cv-pt-br.pdf.ts` — same rationale,
 * built from the same content with the English locale. Stays under
 * `/curriculo/` rather than `/en/curriculo/` because it's a static asset
 * referenced by literal path (`profile.resumePath`), not an i18n-routed page.
 */
export const prerender = true;

export const GET: APIRoute = async () => {
  const { profile, experiences, education, techGroups } =
    await useCases.getPortfolioOverview.execute('en');

  const document = buildResumeDocument({
    profile,
    experiences,
    education,
    techGroups,
    locale: 'en',
  });
  const buffer = await renderToBuffer(document);

  return new Response(new Uint8Array(buffer), {
    headers: {
      'Content-Type': 'application/pdf',
      'Content-Disposition': 'inline; filename="makley-trichez-cv-en-us.pdf"',
      'Cache-Control': 'public, max-age=86400',
    },
  });
};
