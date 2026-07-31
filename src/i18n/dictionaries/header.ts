import type { Locale } from '../locales';

export interface HeaderDictionary {
  skipLink: string;
  /** `{name}` is replaced by the profile's display name. */
  brandAriaLabel: string;
  navItems: { label: string; hash: string }[];
  mainNavAriaLabel: string;
  searchButtonAriaLabel: string;
  searchButtonLabel: string;
  resumeButton: string;
  menuButtonAriaLabel: string;
  mobileMenuAriaLabel: string;
  menuHeading: string;
  closeMenuAriaLabel: string;
  menuNavAriaLabel: string;
  menuResumeLink: string;
  languageSwitcherAriaLabel: string;
}

export const headerDictionary: Record<Locale, HeaderDictionary> = {
  'pt-BR': {
    skipLink: 'Pular para o conteúdo',
    brandAriaLabel: '{name} — página inicial',
    navItems: [
      { label: 'Sobre', hash: '#sobre' },
      { label: 'Stack', hash: '#stack' },
      { label: 'Projetos', hash: '#projetos' },
      { label: 'Trajetória', hash: '#trajetoria' },
      { label: 'Contato', hash: '#contato' },
    ],
    mainNavAriaLabel: 'Navegação principal',
    searchButtonAriaLabel: 'Abrir busca e navegação rápida',
    searchButtonLabel: 'Buscar',
    resumeButton: 'Currículo',
    menuButtonAriaLabel: 'Abrir menu',
    mobileMenuAriaLabel: 'Menu de navegação',
    menuHeading: 'Navegação',
    closeMenuAriaLabel: 'Fechar menu',
    menuNavAriaLabel: 'Navegação do menu',
    menuResumeLink: 'Currículo',
    languageSwitcherAriaLabel: 'Selecionar idioma',
  },
  en: {
    skipLink: 'Skip to content',
    brandAriaLabel: '{name} — home page',
    navItems: [
      { label: 'About', hash: '#sobre' },
      { label: 'Stack', hash: '#stack' },
      { label: 'Projects', hash: '#projetos' },
      { label: 'Timeline', hash: '#trajetoria' },
      { label: 'Contact', hash: '#contato' },
    ],
    mainNavAriaLabel: 'Main navigation',
    searchButtonAriaLabel: 'Open search and quick navigation',
    searchButtonLabel: 'Search',
    resumeButton: 'Resume',
    menuButtonAriaLabel: 'Open menu',
    mobileMenuAriaLabel: 'Navigation menu',
    menuHeading: 'Navigation',
    closeMenuAriaLabel: 'Close menu',
    menuNavAriaLabel: 'Menu navigation',
    menuResumeLink: 'Resume',
    languageSwitcherAriaLabel: 'Select language',
  },
};
