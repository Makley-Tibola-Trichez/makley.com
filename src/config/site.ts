/**
 * Single source of truth for anything that identifies the site itself.
 *
 * This is deliberately *configuration*, not domain data: it describes where the
 * site is deployed and how it presents itself to crawlers and social networks.
 * Personal/professional facts live in `src/content/**` and are modelled by the
 * domain layer.
 */

const DEFAULT_URL = 'https://makley.com.br';

/** Allows previews/staging to build with correct canonical + OG absolute URLs. */
const resolvedUrl = (import.meta.env?.PUBLIC_SITE_URL as string | undefined) ?? DEFAULT_URL;

export const SITE = {
  url: resolvedUrl.replace(/\/$/, ''),
  name: 'Makley Trichez',
  shortName: 'Makley',
  title: 'Makley Trichez — Software Engineer & Front-end Specialist',
  /** ~155 chars: the sweet spot before Google truncates. */
  description:
    'Software Engineer com 5+ anos construindo produtos SaaS em React e TypeScript. Design systems, performance e interfaces que escalam para milhares de usuários.',
  locale: 'pt-BR',
  localeOg: 'pt_BR',
  themeColor: '#08090A',
  /** Relative path to the social preview image generated at build time. */
  ogImage: '/og/default.png',
  ogImageAlt: 'Makley Trichez — Software Engineer & Front-end Specialist',
} as const;

/**
 * Feature flags keep optional integrations out of the render path until the
 * owner actually configures them (see CONTEUDO-PENDENTE.md).
 */
export const FEATURES = {
  /**
   * Endpoint that receives the contact form POST (Formspree, Web3Forms, Basin…).
   * While empty the form degrades gracefully into a `mailto:` flow, so the page
   * never ships a broken call-to-action.
   */
  contactEndpoint: (import.meta.env?.PUBLIC_CONTACT_ENDPOINT as string | undefined) ?? '',
  contactAccessKey: (import.meta.env?.PUBLIC_CONTACT_ACCESS_KEY as string | undefined) ?? '',
} as const;

export type SiteConfig = typeof SITE;
