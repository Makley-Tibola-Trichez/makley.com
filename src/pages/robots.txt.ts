import type { APIRoute } from 'astro';

import { SITE } from '@config/site';

/**
 * `robots.txt` as a route rather than a static file, so the sitemap URL always
 * matches the deployed origin — a hardcoded domain in `public/robots.txt` is a
 * classic source of broken staging/preview deployments.
 */
export const GET: APIRoute = () => {
  const body = `# ${SITE.name} — ${SITE.url}

User-agent: *
Allow: /

# Nada aqui é privado; o único caminho sem valor para indexação é o 404.
Disallow: /404

Sitemap: ${SITE.url}/sitemap-index.xml
`;

  return new Response(body, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=3600',
    },
  });
};
