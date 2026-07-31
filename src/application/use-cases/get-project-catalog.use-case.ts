import { DEFAULT_LOCALE, type Locale } from '@i18n/locales';
import { getDictionary } from '@i18n/dictionary';
import { getProjectCategoryLabel } from '@i18n/dictionaries/projects';
import type { Project, ProjectCategory } from '@domain/projects/project.entity';
import { PROJECT_CATEGORY_LABELS } from '@domain/projects/project.entity';
import type { ProjectRepository } from '@domain/projects/project.repository';

export interface CategoryFilter {
  readonly id: ProjectCategory | 'todos';
  readonly label: string;
  readonly count: number;
}

export interface ProjectCatalog {
  readonly projects: readonly Project[];
  readonly filters: readonly CategoryFilter[];
}

/**
 * Returns the project list together with the filter chips.
 *
 * Counts are computed here rather than in the template so the UI can never show
 * a filter that matches nothing — the chip and the result set are derived from
 * the same pass over the data.
 */
export class GetProjectCatalogUseCase {
  constructor(private readonly projects: ProjectRepository) {}

  async execute(locale: Locale = DEFAULT_LOCALE): Promise<ProjectCatalog> {
    const projects = await this.projects.findAll(locale);
    const { allFilterLabel } = getDictionary(locale).projects;

    const counts = new Map<ProjectCategory, number>();
    for (const project of projects) {
      counts.set(project.category, (counts.get(project.category) ?? 0) + 1);
    }

    const filters: CategoryFilter[] = [
      { id: 'todos', label: allFilterLabel, count: projects.length },
      ...[...counts.entries()]
        .map(([category, count]) => ({
          id: category,
          label: getProjectCategoryLabel(category, locale, PROJECT_CATEGORY_LABELS[category]),
          count,
        }))
        .sort((a, b) => b.count - a.count || a.label.localeCompare(b.label, locale)),
    ];

    return { projects, filters };
  }
}
