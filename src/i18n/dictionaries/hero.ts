import type { Locale } from '../locales';
import type { AvailabilityStatus } from '@domain/profile/profile.entity';

export interface HeroDictionary {
  viewProjects: string;
  downloadResume: string;
  scrollToAbout: string;
  /** `{years}` is replaced by the computed years-of-experience number. */
  experienceMeta: string;
  /** `<meta name="description">`/OG/Twitter description for the home page. */
  metaDescription: string;
}

export const heroDictionary: Record<Locale, HeroDictionary> = {
  'pt-BR': {
    viewProjects: 'Ver projetos',
    downloadResume: 'Baixar currículo',
    scrollToAbout: 'Ir para a seção Sobre',
    experienceMeta: '{years} anos de experiência profissional',
    metaDescription:
      'Software Engineer com 5+ anos construindo produtos SaaS em React e TypeScript. Design systems, performance e interfaces que escalam para milhares de usuários.',
  },
  en: {
    viewProjects: 'View projects',
    downloadResume: 'Download resume',
    scrollToAbout: 'Go to the About section',
    experienceMeta: '{years} years of professional experience',
    metaDescription:
      'Software Engineer with 5+ years building SaaS products in React and TypeScript. Design systems, performance and interfaces that scale to thousands of users.',
  },
};

/**
 * `Profile.availabilityLabel` is domain-layer hardcoded pt-BR (mirrors
 * `PROJECT_CATEGORY_LABELS` and friends) — additive lookup so out-of-scope
 * call sites keep using the untouched getter.
 */
const AVAILABILITY_LABELS_EN: Record<AvailabilityStatus, string> = {
  open: 'Open to new opportunities',
  selective: 'Open to select conversations',
  closed: 'Not available right now',
};

export function getAvailabilityLabel(
  status: AvailabilityStatus,
  locale: Locale,
  fallback: string,
): string {
  return locale === 'en' ? AVAILABILITY_LABELS_EN[status] : fallback;
}
