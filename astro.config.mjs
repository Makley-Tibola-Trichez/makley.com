// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

import { SITE } from './src/config/site.ts';

/**
 * Astro configuration.
 *
 * Architectural notes
 * -------------------
 * - `output: 'static'` — the whole portfolio is prerendered. There is no server
 *   runtime, which is what lets us reach ~100 on Lighthouse: HTML is served from
 *   the CDN edge with no hydration cost.
 * - No UI framework integration (React/Vue/Svelte) is installed **on purpose**.
 *   Every interactive behaviour is a small vanilla-TS island, so the shipped JS
 *   stays in the low single-digit kilobytes instead of ~45 kB of runtime.
 *   `react` does appear in package.json, but only as a peer of
 *   `@react-pdf/renderer`, which renders the résumé PDF once per build in a
 *   prerendered API route — it never reaches the browser.
 * - `inlineStylesheets: 'auto'` lets Astro inline small critical CSS into the
 *   document head, removing a render-blocking round-trip for above-the-fold CSS.
 */
export default defineConfig({
  site: SITE.url,
  trailingSlash: 'ignore',

  // Honour a PORT supplied by the environment (preview tooling, containers,
  // CI) and fall back to Astro's default for a plain `npm run dev`.
  server: {
    port: Number(process.env.PORT) || 4321,
  },

  integrations: [
    sitemap({
      filter: (page) => !page.includes('/404'),
      i18n: {
        defaultLocale: 'pt-BR',
        locales: { 'pt-BR': 'pt-BR' },
      },
      serialize(item) {
        // The home page is the entry point recruiters land on: rank it highest.
        if (item.url === `${SITE.url}/`) {
          return { ...item, changefreq: 'weekly', priority: 1.0 };
        }
        if (item.url.includes('/projetos/')) {
          return { ...item, changefreq: 'monthly', priority: 0.8 };
        }
        return { ...item, changefreq: 'monthly', priority: 0.6 };
      },
    }),
  ],

  // Speculative prefetch on hover/viewport — makes internal navigation feel
  // instantaneous without shipping a client-side router.
  prefetch: {
    prefetchAll: true,
    defaultStrategy: 'hover',
  },

  image: {
    // AVIF/WebP generation at build time; nothing is processed at request time.
    responsiveStyles: true,
    layout: 'constrained',
  },

  build: {
    inlineStylesheets: 'auto',
    assets: '_assets',
  },

  vite: {
    build: {
      cssMinify: 'lightningcss',
    },
    ssr: {
      // @react-pdf/renderer pulls in native/WASM layout and font-parsing
      // dependencies (yoga, fontkit) that break when Vite tries to bundle
      // them for SSR. Resolving it through plain Node `require` instead
      // avoids that — it only ever runs inside the build-time PDF route.
      external: ['@react-pdf/renderer'],
    },
  },
});
