import { getCollection, getEntry, render } from 'astro:content';

import type { Project, ProjectCategory } from '@domain/projects/project.entity';
import { Project as ProjectEntity } from '@domain/projects/project.entity';
import type { ProjectRepository } from '@domain/projects/project.repository';
import { toProject } from './mappers/project.mapper';

/**
 * Content Collections adapter for {@link ProjectRepository}.
 *
 * Everything runs at build time, so the in-memory cache below simply avoids
 * re-reading and re-mapping the same collection for each of the ~10 pages that
 * need it during a single build.
 */
export class ProjectContentRepository implements ProjectRepository {
  private cache: readonly Project[] | null = null;

  async findAll(): Promise<readonly Project[]> {
    if (this.cache) return this.cache;

    const entries = await getCollection('projects', ({ data }) => !data.draft);
    this.cache = entries.map(toProject).sort(ProjectEntity.compare);

    return this.cache;
  }

  async findBySlug(slug: string): Promise<Project | null> {
    const projects = await this.findAll();
    return projects.find((project) => project.slug.value === slug) ?? null;
  }

  async findFeatured(limit?: number): Promise<readonly Project[]> {
    const featured = (await this.findAll()).filter((project) => project.isFeatured);
    return typeof limit === 'number' ? featured.slice(0, limit) : featured;
  }

  async findByCategory(category?: ProjectCategory): Promise<readonly Project[]> {
    const response = await this.findAll()
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
   */
  async renderBody(slug: string) {
    const entry = await getEntry('projects', slug);
    if (!entry) return null;

    const { Content, headings } = await render(entry);
    return { Content, headings };
  }
}
