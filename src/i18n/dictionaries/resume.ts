import type { Locale } from '../locales';

export interface ResumeDictionary {
  eyebrow: string;
  title: string;
  text: string;
  viewOnline: string;
  downloadPdf: string;
  factsAriaLabel: string;
  degreeFact: string;
}

export const resumeDictionary: Record<Locale, ResumeDictionary> = {
  'pt-BR': {
    eyebrow: 'Currículo',
    title: 'Leia online ou leve o PDF',
    text: 'A versão online é sempre a mais atual e está estruturada com dados semânticos. O PDF segue o formato tradicional, pronto para processos seletivos.',
    viewOnline: 'Ver currículo online',
    downloadPdf: 'Baixar PDF',
    factsAriaLabel: 'Resumo do currículo',
    degreeFact: 'Bacharel em Ciência da Computação',
  },
  en: {
    eyebrow: 'Resume',
    title: 'Read it online or take the PDF',
    text: "The online version is always the most up to date and structured with semantic data. The PDF follows the traditional format, ready for hiring processes.",
    viewOnline: 'View resume online',
    downloadPdf: 'Download PDF',
    factsAriaLabel: 'Resume summary',
    degreeFact: "Bachelor's in Computer Science",
  },
};
