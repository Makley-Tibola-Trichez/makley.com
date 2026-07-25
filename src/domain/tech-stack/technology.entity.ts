import { Slug } from '../shared/value-objects/slug.vo';

/**
 * Buckets requested in the brief. Ordered here because this array is also the
 * render order of the stack section — one list, one source of truth.
 */
export const TECH_CATEGORIES = [
  'frontend',
  'backend',
  'mobile',
  'database',
  'cloud',
  'devops',
  'testing',
  'observability',
  'tooling',
  'ai',
] as const;

export type TechCategory = (typeof TECH_CATEGORIES)[number];

export const TECH_CATEGORY_LABELS: Record<TechCategory, string> = {
  frontend: 'Front-end',
  backend: 'Back-end',
  mobile: 'Mobile',
  database: 'Banco de Dados',
  cloud: 'Cloud',
  devops: 'DevOps',
  testing: 'Testes & Qualidade',
  observability: 'Observabilidade & Produto',
  tooling: 'Ferramentas',
  ai: 'Inteligência Artificial',
};

export interface TechnologyProps {
  readonly id: string;
  readonly name: string;
  readonly category: TechCategory;
  /**
   * Marks the handful of technologies the professional actually leads with.
   * Used to weight the visual hierarchy instead of showing 40 equal chips —
   * a flat list tells a recruiter nothing about depth.
   */
  readonly core?: boolean;
  readonly note?: string;
}

export class Technology {
  private constructor(
    public readonly id: Slug,
    public readonly name: string,
    public readonly category: TechCategory,
    public readonly isCore: boolean,
    public readonly note: string | null,
  ) {}

  static create(props: TechnologyProps): Technology {
    return new Technology(
      Slug.create(props.id),
      props.name,
      props.category,
      props.core ?? false,
      props.note ?? null,
    );
  }

  get categoryLabel(): string {
    return TECH_CATEGORY_LABELS[this.category];
  }
}

/** A category plus its technologies — the shape the stack section renders. */
export interface TechnologyGroup {
  readonly category: TechCategory;
  readonly label: string;
  readonly technologies: readonly Technology[];
}
