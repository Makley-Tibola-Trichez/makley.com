import type { Project, ProjectCategory } from './project.entity';

/**
 * Port (Hexagonal Architecture / Dependency Inversion).
 *
 * The application layer depends on this interface, never on Astro's
 * `getCollection`. Swapping Content Collections for a CMS, an API or a database
 * means writing one new adapter in `src/infrastructure` — no use case, page or
 * component changes.
 */
export interface ProjectRepository {
  findAll(): Promise<readonly Project[]>;
  findBySlug(slug: string): Promise<Project | null>;
  findFeatured(limit?: number): Promise<readonly Project[]>;
  findByCategory(category: ProjectCategory): Promise<readonly Project[]>;
}
