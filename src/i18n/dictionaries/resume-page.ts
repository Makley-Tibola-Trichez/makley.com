import type { Locale } from '../locales';

/**
 * `/curriculo` — the standalone online résumé page. Separate namespace from
 * `resume.ts` (the homepage CTA band that links out to this page).
 */
export interface ResumePageDictionary {
  pageTitle: string;
  /** `{name}` and `{title}` are replaced by the profile's name and job title. */
  pageDescriptionTemplate: string;
  breadcrumbHome: string;
  downloadPdfButton: string;
  /**
   * Always written in the *other* language on purpose — a pt-BR visitor on
   * `/en/curriculo` should recognise "Versão em português" at a glance, same
   * as an English-speaking recruiter recognises "English version" on `/curriculo`.
   */
  otherVersionButton: string;
  summaryHeading: string;
  experienceHeading: string;
  resultsLabel: string;
  technologiesLabel: string;
  educationHeading: string;
  credentialsHeading: string;
  stackHeading: string;
  languagesHeading: string;
}

export const resumePageDictionary: Record<Locale, ResumePageDictionary> = {
  'pt-BR': {
    pageTitle: 'Currículo',
    pageDescriptionTemplate:
      'Currículo completo de {name} — {title}. Experiência profissional, formação acadêmica, certificações e stack tecnológica.',
    breadcrumbHome: 'Início',
    downloadPdfButton: 'Baixar PDF',
    otherVersionButton: 'English version',
    summaryHeading: 'Resumo profissional',
    experienceHeading: 'Experiência profissional',
    resultsLabel: 'Resultados:',
    technologiesLabel: 'Tecnologias:',
    educationHeading: 'Formação acadêmica',
    credentialsHeading: 'Certificações, cursos e eventos',
    stackHeading: 'Stack tecnológica',
    languagesHeading: 'Idiomas',
  },
  en: {
    pageTitle: 'Resume',
    pageDescriptionTemplate:
      'Full resume for {name} — {title}. Professional experience, education, certifications and tech stack.',
    breadcrumbHome: 'Home',
    downloadPdfButton: 'Download PDF',
    otherVersionButton: 'Versão em português',
    summaryHeading: 'Professional summary',
    experienceHeading: 'Professional experience',
    resultsLabel: 'Results:',
    technologiesLabel: 'Technologies:',
    educationHeading: 'Education',
    credentialsHeading: 'Certifications, courses & events',
    stackHeading: 'Tech stack',
    languagesHeading: 'Languages',
  },
};
