import type { APIRoute } from 'astro';
import { renderToBuffer } from '@react-pdf/renderer';

import { useCases } from '@infrastructure/container';
import { buildResumeDocument } from '@presentation/pdf/resume-document';

/**
 * Generates the downloadable résumé PDF at build time from the same content
 * that renders `/curriculo`. See the rationale in `resume-document.ts` — this
 * keeps the PDF and the online résumé as a single source of truth instead of
 * two documents that can silently drift apart.
 *
 * `prerender = true` (the default under `output: 'static'`) means this GET
 * handler runs once during `astro build`, and the response body becomes a
 * static file served by the CDN — no server, no per-request cost.
 */
export const prerender = true;

export const GET: APIRoute = async () => {
  const { profile, experiences, education, techGroups } =
    await useCases.getPortfolioOverview.execute('pt-BR');

  const document = buildResumeDocument({
    profile,
    experiences,
    education,
    techGroups,
    locale: 'pt-BR',
  });
  const buffer = await renderToBuffer(document);

  return new Response(new Uint8Array(buffer), {
    headers: {
      'Content-Type': 'application/pdf',
      'Content-Disposition': 'inline; filename="makley-trichez-cv-pt-br.pdf"',
      // Static output means this file only changes on a new deploy — cache
      // it for a full day at the edge and let visitors' browsers keep it too.
      'Cache-Control': 'public, max-age=86400',
    },
  });
};
