import { DateRange, type YearMonth } from '../shared/value-objects/date-range.vo';
import { Slug } from '../shared/value-objects/slug.vo';

export type EmploymentType = 'clt' | 'pj' | 'estagio' | 'freelance' | 'proprio';

export const EMPLOYMENT_TYPE_LABELS: Record<EmploymentType, string> = {
  clt: 'Tempo integral',
  pj: 'PJ',
  estagio: 'Estágio',
  freelance: 'Freelance',
  proprio: 'Projeto próprio',
};

export interface ExperienceAchievement {
  readonly value: string;
  readonly label: string;
}

export interface ExperienceProps {
  readonly id: string;
  readonly company: string;
  readonly companyUrl?: string;
  readonly role: string;
  readonly seniority?: string;
  readonly start: YearMonth;
  readonly end?: YearMonth | null;
  readonly location: string;
  readonly employmentType?: EmploymentType;
  readonly summary: string;
  readonly responsibilities: readonly string[];
  readonly achievements: readonly ExperienceAchievement[];
  readonly technologies: readonly string[];
  readonly order?: number;
}

/**
 * One position in the professional timeline.
 *
 * `achievements` are deliberately structured as value/label pairs rather than
 * bullet text: "20 → 5 min" reads as a metric in the UI and can be lifted into
 * the résumé and JSON-LD without re-parsing prose.
 */
export class Experience {
  private constructor(
    public readonly id: Slug,
    public readonly company: string,
    public readonly companyUrl: string | null,
    public readonly role: string,
    public readonly seniority: string | null,
    public readonly period: DateRange,
    public readonly location: string,
    public readonly employmentType: EmploymentType,
    public readonly summary: string,
    public readonly responsibilities: readonly string[],
    public readonly achievements: readonly ExperienceAchievement[],
    public readonly technologies: readonly string[],
  ) {}

  static create(props: ExperienceProps): Experience {
    return new Experience(
      Slug.create(props.id),
      props.company,
      props.companyUrl ?? null,
      props.role,
      props.seniority ?? null,
      DateRange.create(props.start, props.end ?? null),
      props.location,
      props.employmentType ?? 'clt',
      props.summary,
      props.responsibilities,
      props.achievements,
      props.technologies,
    );
  }

  get isCurrent(): boolean {
    return this.period.isCurrent;
  }

  get periodLabel(): string {
    return this.period.toLabel();
  }

  get durationLabel(): string {
    return this.period.toDurationLabel();
  }

  get employmentTypeLabel(): string {
    return EMPLOYMENT_TYPE_LABELS[this.employmentType];
  }

  /** `Desenvolvedor Front-end · Pleno` */
  get fullRole(): string {
    return this.seniority ? `${this.role} · ${this.seniority}` : this.role;
  }

  static compareDesc(a: Experience, b: Experience): number {
    return DateRange.compareDesc(a.period, b.period);
  }
}
