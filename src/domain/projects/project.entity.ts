import { Slug } from '../shared/value-objects/slug.vo';
import { ExternalLink } from '../shared/value-objects/external-link.vo';
import type { DescribedImage } from '../shared/value-objects/image-ref.vo';

/**
 * Project taxonomy, used both for the filter UI and for grouping.
 * Kept small on purpose: more than ~5 filters and visitors stop using them.
 */
export const PROJECT_CATEGORIES = [
  'produto',
  'design-system',
  'performance',
  'pesquisa',
] as const;

export type ProjectCategory = (typeof PROJECT_CATEGORIES)[number];

export const PROJECT_CATEGORY_LABELS: Record<ProjectCategory, string> = {
  produto: 'Produto SaaS',
  'design-system': 'Design System',
  performance: 'Performance & DevOps',
  pesquisa: 'Pesquisa',
};

/**
 * A quantified outcome. Numbers are what convince a hiring manager, so results
 * are first-class data (label + value + optional delta) rather than prose —
 * this is what lets them be rendered as stat blocks and fed to structured data.
 */
export interface ProjectResult {
  readonly value: string;
  readonly label: string;
  readonly detail?: string;
}

export interface ProjectProps {
  readonly slug: string;
  readonly title: string;
  readonly tagline: string;
  readonly category: ProjectCategory;
  readonly year: number;
  readonly role: string;
  readonly context: string;
  readonly summary: string;
  readonly problem: string;
  readonly solution: string;
  readonly challenges: readonly string[];
  readonly results: readonly ProjectResult[];
  readonly technologies: readonly string[];
  readonly cover?: DescribedImage;
  readonly gallery?: readonly DescribedImage[];
  readonly links?: readonly { url: string; label: string; kind?: string }[];
  readonly featured?: boolean;
  readonly order?: number;
  /** Set when the work is under NDA or the repository is private. */
  readonly confidential?: boolean;
}

/**
 * The portfolio's headline entity.
 *
 * Behaviour lives here (which links exist, how it is ordered, whether it can be
 * demoed) so templates stay declarative and every surface that renders a
 * project — card, detail page, structured data — agrees on the answers.
 */
export class Project {
  private constructor(
    public readonly slug: Slug,
    public readonly title: string,
    public readonly tagline: string,
    public readonly category: ProjectCategory,
    public readonly year: number,
    public readonly role: string,
    public readonly context: string,
    public readonly summary: string,
    public readonly problem: string,
    public readonly solution: string,
    public readonly challenges: readonly string[],
    public readonly results: readonly ProjectResult[],
    public readonly technologies: readonly string[],
    public readonly cover: DescribedImage | null,
    public readonly gallery: readonly DescribedImage[],
    public readonly links: readonly ExternalLink[],
    public readonly isFeatured: boolean,
    public readonly order: number,
    public readonly isConfidential: boolean,
  ) {}

  static create(props: ProjectProps): Project {
    return new Project(
      Slug.create(props.slug),
      props.title,
      props.tagline,
      props.category,
      props.year,
      props.role,
      props.context,
      props.summary,
      props.problem,
      props.solution,
      props.challenges,
      props.results,
      props.technologies,
      props.cover ?? null,
      props.gallery ?? [],
      (props.links ?? []).map((link) =>
        ExternalLink.create({
          url: link.url,
          label: link.label,
          kind: (link.kind as ExternalLink['kind']) ?? 'other',
        }),
      ),
      props.featured ?? false,
      props.order ?? 999,
      props.confidential ?? false,
    );
  }

  get categoryLabel(): string {
    return PROJECT_CATEGORY_LABELS[this.category];
  }

  get href(): string {
    return `/projetos/${this.slug.value}`;
  }

  get liveLink(): ExternalLink | null {
    return this.links.find((l) => l.kind === 'website' || l.kind === 'demo') ?? null;
  }

  get repositoryLink(): ExternalLink | null {
    return this.links.find((l) => l.kind === 'repository') ?? null;
  }

  get hasLiveDemo(): boolean {
    return this.liveLink !== null;
  }

  get hasSource(): boolean {
    return this.repositoryLink !== null;
  }

  /** The single most persuasive number, surfaced on the card. */
  get headlineResult(): ProjectResult | null {
    return this.results[0] ?? null;
  }

  /** Cards show a capped set; the detail page shows everything. */
  primaryTechnologies(limit = 5): readonly string[] {
    return this.technologies.slice(0, limit);
  }

  get remainingTechnologyCount(): number {
    return Math.max(0, this.technologies.length - 5);
  }

  /** Explicit `order`, then most recent first. */
  static compare(a: Project, b: Project): number {
    if (a.order !== b.order) return a.order - b.order;
    return b.year - a.year;
  }
}
