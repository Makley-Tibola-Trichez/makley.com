import type { Locale } from '../locales';

export interface ProjectDetailDictionary {
  privateSourceBadge: string;
  roleLabel: string;
  contextLabel: string;
  categoryLabel: string;
  resultsHeading: string;
  problemLabel: string;
  solutionLabel: string;
  challengesHeading: string;
  stackHeading: string;
  relatedHeading: string;
  pagerAriaLabel: string;
  previousLabel: string;
  nextLabel: string;
  ctaHeading: string;
  ctaText: string;
  ctaButton: string;
}

export const projectDetailDictionary: Record<Locale, ProjectDetailDictionary> = {
  'pt-BR': {
    privateSourceBadge: 'Código privado',
    roleLabel: 'Meu papel',
    contextLabel: 'Contexto',
    categoryLabel: 'Categoria',
    resultsHeading: 'Resultados',
    problemLabel: 'O problema',
    solutionLabel: 'A solução',
    challengesHeading: 'Principais desafios',
    stackHeading: 'Tecnologias utilizadas',
    relatedHeading: 'Projetos relacionados',
    pagerAriaLabel: 'Navegar entre projetos',
    previousLabel: 'Anterior',
    nextLabel: 'Próximo',
    ctaHeading: 'Tem um desafio parecido?',
    ctaText: 'Se esse tipo de problema é o que a sua equipe está enfrentando, vamos conversar.',
    ctaButton: 'Entrar em contato',
  },
  en: {
    privateSourceBadge: 'Private code',
    roleLabel: 'My role',
    contextLabel: 'Context',
    categoryLabel: 'Category',
    resultsHeading: 'Results',
    problemLabel: 'The problem',
    solutionLabel: 'The solution',
    challengesHeading: 'Key challenges',
    stackHeading: 'Technologies used',
    relatedHeading: 'Related projects',
    pagerAriaLabel: 'Navigate between projects',
    previousLabel: 'Previous',
    nextLabel: 'Next',
    ctaHeading: 'Facing a similar challenge?',
    ctaText: "If that's the kind of problem your team is running into, let's talk.",
    ctaButton: 'Get in touch',
  },
};
