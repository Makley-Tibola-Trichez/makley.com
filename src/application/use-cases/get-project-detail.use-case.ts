import { DEFAULT_LOCALE, type Locale } from '@i18n/locales';
import { EntityNotFoundError } from '@domain/shared/errors';
import type { Profile } from '@domain/profile/profile.entity';
import type { ProfileRepository } from '@domain/profile/profile.repository';
import type { Project } from '@domain/projects/project.entity';
import type { ProjectRepository } from '@domain/projects/project.repository';

export interface ProjectDetail {
  readonly project: Project;
  readonly profile: Profile;
  /** Enables prev/next navigation without the page re-querying the catalog. */
  readonly previous: Project | null;
  readonly next: Project | null;
  /** Same-category projects, for the "veja também" rail. */
  readonly related: readonly Project[];
}

export class GetProjectDetailUseCase {
  constructor(
    private readonly projects: ProjectRepository,
    private readonly profiles: ProfileRepository,
  ) {}

  async execute(slug: string, locale: Locale = DEFAULT_LOCALE): Promise<ProjectDetail> {
    const [all, profile] = await Promise.all([
      this.projects.findAll(locale),
      this.profiles.get(locale),
    ]);

    const index = all.findIndex((project) => project.slug.value === slug);

    if (index === -1) {
      throw new EntityNotFoundError('Project', slug);
    }

    // Safe: `index` came from `findIndex` on this same array.
    const project = all[index] as Project;

    const related = all
      .filter((other) => other.category === project.category && !other.slug.equals(project.slug))
      .slice(0, 2);

    return {
      project,
      profile,
      previous: all[index - 1] ?? null,
      next: all[index + 1] ?? null,
      related,
    };
  }
}
