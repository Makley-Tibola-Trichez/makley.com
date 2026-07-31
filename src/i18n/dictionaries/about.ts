import type { Locale } from '../locales';

export interface AboutDictionary {
  eyebrow: string;
  title: string;
  description: string;
  goalsHeading: string;
  factsAriaLabel: string;
  facts: {
    location: string;
    availability: string;
    languages: string;
    specialties: string;
  };
  focusHeading: string;
}

export const aboutDictionary: Record<Locale, AboutDictionary> = {
  'pt-BR': {
    eyebrow: 'Sobre',
    title: 'Cinco anos resolvendo problemas reais de produto',
    description:
      'Front-end com profundidade de produto: entendo a regra de negócio antes de escrever a interface.',
    goalsHeading: 'Para onde estou indo',
    factsAriaLabel: 'Informações rápidas',
    facts: {
      location: 'Localização',
      availability: 'Disponibilidade',
      languages: 'Idiomas',
      specialties: 'Especialidades',
    },
    focusHeading: 'Onde eu gero mais valor',
  },
  en: {
    eyebrow: 'About',
    title: 'Five years solving real product problems',
    description:
      "Front-end with product depth: I understand the business rule before writing the interface.",
    goalsHeading: "Where I'm headed",
    factsAriaLabel: 'Quick facts',
    facts: {
      location: 'Location',
      availability: 'Availability',
      languages: 'Languages',
      specialties: 'Specialties',
    },
    focusHeading: 'Where I create the most value',
  },
};
