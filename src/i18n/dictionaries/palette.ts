import type { Locale } from '../locales';

export interface PaletteDictionary {
  ariaLabel: string;
  searchPlaceholder: string;
  searchAriaLabel: string;
  closeAriaLabel: string;
  resultsAriaLabel: string;
  emptyState: string;
  footer: { navigate: string; open: string; close: string };
  groups: { navigate: string; projects: string; resume: string; actions: string; links: string };
  nav: {
    home: string;
    about: string;
    stack: string;
    projects: string;
    timeline: string;
    education: string;
    contact: string;
  };
  actions: {
    resumeOnline: string;
    resumePdf: string;
    copyEmail: string;
    toggleTheme: string;
    systemTheme: string;
  };
}

export function formatResultsCount(count: number, locale: Locale): string {
  if (locale === 'en') {
    return count === 0 ? 'No results' : `${count} ${count === 1 ? 'result' : 'results'}`;
  }
  return count === 0 ? 'Nenhum resultado' : `${count} ${count === 1 ? 'resultado' : 'resultados'}`;
}

export const paletteDictionary: Record<Locale, PaletteDictionary> = {
  'pt-BR': {
    ariaLabel: 'Busca e navegação rápida',
    searchPlaceholder: 'Buscar projetos, seções e ações…',
    searchAriaLabel: 'Buscar no site',
    closeAriaLabel: 'Fechar busca',
    resultsAriaLabel: 'Resultados',
    emptyState: 'Nenhum resultado. Tente "projetos", "currículo" ou "contato".',
    footer: { navigate: 'navegar', open: 'abrir', close: 'fechar' },
    groups: {
      navigate: 'Navegar',
      projects: 'Projetos',
      resume: 'Currículo',
      actions: 'Ações',
      links: 'Links',
    },
    nav: {
      home: 'Início',
      about: 'Sobre',
      stack: 'Stack tecnológica',
      projects: 'Projetos',
      timeline: 'Trajetória',
      education: 'Formação',
      contact: 'Contato',
    },
    actions: {
      resumeOnline: 'Ver currículo online',
      resumePdf: 'Baixar currículo (PDF)',
      copyEmail: 'Copiar e-mail',
      toggleTheme: 'Alternar tema claro/escuro',
      systemTheme: 'Usar o tema do sistema',
    },
  },
  en: {
    ariaLabel: 'Search and quick navigation',
    searchPlaceholder: 'Search projects, sections and actions…',
    searchAriaLabel: 'Search the site',
    closeAriaLabel: 'Close search',
    resultsAriaLabel: 'Results',
    emptyState: 'No results. Try "projects", "resume" or "contact".',
    footer: { navigate: 'navigate', open: 'open', close: 'close' },
    groups: {
      navigate: 'Navigate',
      projects: 'Projects',
      resume: 'Resume',
      actions: 'Actions',
      links: 'Links',
    },
    nav: {
      home: 'Home',
      about: 'About',
      stack: 'Tech stack',
      projects: 'Projects',
      timeline: 'Timeline',
      education: 'Education',
      contact: 'Contact',
    },
    actions: {
      resumeOnline: 'View resume online',
      resumePdf: 'Download resume (PDF)',
      copyEmail: 'Copy email',
      toggleTheme: 'Toggle light/dark theme',
      systemTheme: 'Use system theme',
    },
  },
};
