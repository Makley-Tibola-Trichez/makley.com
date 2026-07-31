import type { Locale } from '../locales';

/**
 * Shared UI-chrome strings used by more than one standalone page (breadcrumbs
 * today) — kept separate from any single organism's namespace so `/curriculo`,
 * `/projetos` and its detail page don't each duplicate the same two strings.
 */
export interface CommonDictionary {
  breadcrumbsAriaLabel: string;
  homeLabel: string;
}

export const commonDictionary: Record<Locale, CommonDictionary> = {
  'pt-BR': {
    breadcrumbsAriaLabel: 'Trilha de navegação',
    homeLabel: 'Início',
  },
  en: {
    breadcrumbsAriaLabel: 'Breadcrumb',
    homeLabel: 'Home',
  },
};
