import type { Locale } from '../locales';
import type { DateRange } from '@domain/shared/value-objects/date-range.vo';

export interface ExperienceDictionary {
  eyebrow: string;
  title: string;
  description: string;
  resumeButton: string;
  currentBadge: string;
  disclosureLabel: string;
  /** `{company}` is replaced by the experience's company name. */
  technologiesAriaLabel: string;
}

export const experienceDictionary: Record<Locale, ExperienceDictionary> = {
  'pt-BR': {
    eyebrow: 'Trajetória',
    title: 'Onde estive e o que entreguei',
    description:
      'Da primeira experiência full-stack ao trabalho em produtos usados por dezenas de milhares de clientes.',
    resumeButton: 'Currículo em PDF',
    currentBadge: 'Atual',
    disclosureLabel: 'Responsabilidades e tecnologias',
    technologiesAriaLabel: 'Tecnologias utilizadas na {company}',
  },
  en: {
    eyebrow: 'Timeline',
    title: 'Where I have been and what I shipped',
    description:
      'From my first full-stack role to work on products used by tens of thousands of customers.',
    resumeButton: 'Resume (PDF)',
    currentBadge: 'Current',
    disclosureLabel: 'Responsibilities and technologies',
    technologiesAriaLabel: 'Technologies used at {company}',
  },
};

/**
 * `DateRange.toLabel` already accepts an explicit `locale` argument (see
 * date-range.vo.ts) — the "present" label is the only piece each caller must
 * still supply, since it's UI copy, not a formatting concern.
 */
const PRESENT_LABEL: Record<Locale, string> = {
  'pt-BR': 'atual',
  en: 'present',
};

export function formatPeriodLabel(period: DateRange, locale: Locale): string {
  return period.toLabel(locale, PRESENT_LABEL[locale]);
}

/**
 * `DateRange.toDurationLabel()` hardcodes pt-BR pluralization. This is an
 * additive, locale-aware equivalent built on the entity's public
 * `durationInMonths` getter, so the value object itself stays untouched for
 * the (still pt-BR-only) call sites that use the getter directly.
 */
export function formatDurationLabel(period: DateRange, locale: Locale): string {
  const total = period.durationInMonths;
  const years = Math.floor(total / 12);
  const months = total % 12;

  if (locale === 'en') {
    const parts: string[] = [];
    if (years > 0) parts.push(`${years} ${years === 1 ? 'year' : 'years'}`);
    if (months > 0) parts.push(`${months} ${months === 1 ? 'month' : 'months'}`);
    return parts.join(' and ') || '1 month';
  }

  const parts: string[] = [];
  if (years > 0) parts.push(`${years} ${years === 1 ? 'ano' : 'anos'}`);
  if (months > 0) parts.push(`${months} ${months === 1 ? 'mês' : 'meses'}`);
  return parts.join(' e ') || '1 mês';
}
