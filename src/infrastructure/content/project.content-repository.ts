import { getCollection, getEntry, render } from 'astro:content';

import { DEFAULT_LOCALE, type Locale } from '@i18n/locales';
import type { Project, ProjectCategory } from '@domain/projects/project.entity';
import { Project as ProjectEntity } from '@domain/projects/project.entity';
import type { ProjectRepository } from '@domain/projects/project.repository';
import { toProject } from './mappers/project.mapper';
import { mergeProjectTranslation } from './mappers/project-translation.mapper';

/**
 * Content Collections adapter for {@link ProjectRepository}.
 *
 * Everything runs at build time, so the in-memory cache below simply avoids
 * re-reading and re-mapping the same collection for each of the ~10 pages that
 * need it during a single build.
 */
export class ProjectContentRepository implements ProjectRepository {
  private readonly cache = new Map<Locale, readonly Project[]>();

  async findAll(locale: Locale = DEFAULT_LOCALE): Promise<readonly Project[]> {
    const cached = this.cache.get(locale);
    if (cached) return cached;

    const entries = await getCollection('projects', ({ data }) => !data.draft);
    const translations = await getCollection('projectTranslations', ({ id }) =>
      id.endsWith(`.${locale}`),
    );

    const projects = entries
      .map((entry) => {
        const override = translations.find((t) => t.id === `${entry.id}.${locale}`);
        const merged = mergeProjectTranslation(entry.data, override?.data);
        return toProject(entry.id, merged);
      })
      .sort(ProjectEntity.compare);

    this.cache.set(locale, projects);
    return projects;
  }

  async findBySlug(slug: string, locale: Locale = DEFAULT_LOCALE): Promise<Project | null> {
    const projects = await this.findAll(locale);
    return projects.find((project) => project.slug.value === slug) ?? null;
  }

  async findFeatured(limit?: number, locale: Locale = DEFAULT_LOCALE): Promise<readonly Project[]> {
    const featured = (await this.findAll(locale)).filter((project) => project.isFeatured);
    return typeof limit === 'number' ? featured.slice(0, limit) : featured;
  }

  async findByCategory(
    category?: ProjectCategory,
    locale: Locale = DEFAULT_LOCALE,
  ): Promise<readonly Project[]> {
    const response = await this.findAll(locale);
    if (!category) return response;

    return response.filter((project) => project.category === category);
  }

  /**
   * Renders the markdown body of a case study.
   *
   * Deliberately **not** part of the domain port: `render()` returns an Astro
   * component, which is a presentation concern. Keeping it on the concrete
   * adapter means the port stays free of framework types (ISP) while the detail
   * page still gets its long-form content from a single place.
   *
   * `locale` looks up `projectBodyTranslations` first (`<slug>.<locale>`) and
   * falls back to the canonical pt-BR body when no translation exists yet —
   * same fallback convention as every other translated field in this repo.
   */
  async renderBody(slug: string, locale: Locale = DEFAULT_LOCALE) {
    if (locale !== DEFAULT_LOCALE) {
      const translated = await getEntry('projectBodyTranslations', `${slug}.${locale}`);
      if (translated) {
        const { Content, headings } = await render(translated);
        return { Content, headings };
      }
    }

    const entry = await getEntry('projects', slug);
    if (!entry) return null;

    const { Content, headings } = await render(entry);
    return { Content, headings };
  }
}
