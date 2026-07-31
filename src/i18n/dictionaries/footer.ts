import type { Locale } from '../locales';

export interface FooterDictionary {
  brandAriaLabel: string;
  navGroupTitle: string;
  navLinks: { label: string; hash: string }[];
  resourcesGroupTitle: string;
  resumeOnlineLink: string;
  resumePdfLink: string;
  allProjectsLink: string;
  findMeTitle: string;
  copyrightSuffix: string;
  colophonPrefix: string;
  colophonSuffix: string;
}

export const footerDictionary: Record<Locale, FooterDictionary> = {
  'pt-BR': {
    brandAriaLabel: '{name} — página inicial',
    navGroupTitle: 'Navegação',
    navLinks: [
      { label: 'Sobre', hash: '#sobre' },
      { label: 'Stack', hash: '#stack' },
      { label: 'Projetos', hash: '#projetos' },
      { label: 'Trajetória', hash: '#trajetoria' },
      { label: 'Contato', hash: '#contato' },
    ],
    resourcesGroupTitle: 'Recursos',
    resumeOnlineLink: 'Currículo online',
    resumePdfLink: 'Baixar currículo (PDF)',
    allProjectsLink: 'Todos os projetos',
    findMeTitle: 'Onde me encontrar',
    copyrightSuffix: 'Todos os direitos reservados.',
    colophonPrefix: 'Feito com',
    colophonSuffix: 'e TypeScript — sem framework de UI no cliente.',
  },
  en: {
    brandAriaLabel: '{name} — home page',
    navGroupTitle: 'Navigation',
    navLinks: [
      { label: 'About', hash: '#sobre' },
      { label: 'Stack', hash: '#stack' },
      { label: 'Projects', hash: '#projetos' },
      { label: 'Timeline', hash: '#trajetoria' },
      { label: 'Contact', hash: '#contato' },
    ],
    resourcesGroupTitle: 'Resources',
    resumeOnlineLink: 'Resume online',
    resumePdfLink: 'Download resume (PDF)',
    allProjectsLink: 'All projects',
    findMeTitle: 'Where to find me',
    copyrightSuffix: 'All rights reserved.',
    colophonPrefix: 'Built with',
    colophonSuffix: 'and TypeScript — no client-side UI framework.',
  },
};
