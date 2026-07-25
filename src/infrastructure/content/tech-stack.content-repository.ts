import { getCollection } from 'astro:content';

import { EntityNotFoundError } from '@domain/shared/errors';
import type {
  Technology,
  TechnologyGroup,
} from '@domain/tech-stack/technology.entity';
import {
  TECH_CATEGORIES,
  TECH_CATEGORY_LABELS,
  Technology as TechnologyEntity,
} from '@domain/tech-stack/technology.entity';
import type { TechStackRepository } from '@domain/tech-stack/tech-stack.repository';

export class TechStackContentRepository implements TechStackRepository {
  private cache: readonly Technology[] | null = null;

  async findAll(): Promise<readonly Technology[]> {
    if (this.cache) return this.cache;

    const entries = await getCollection('stack');
    const source = entries[0];

    if (!source) {
      throw new EntityNotFoundError('Stack', 'src/content/stack/main.yaml');
    }

    this.cache = source.data.technologies.map(TechnologyEntity.create);
    return this.cache;
  }

  /**
   * Groups by category following the domain's declared category order, and
   * drops empty categories so the UI never renders a heading with nothing under
   * it — a common failure when the template iterates over a static list.
   */
  async findGrouped(): Promise<readonly TechnologyGroup[]> {
    const technologies = await this.findAll();

    return TECH_CATEGORIES.map((category) => ({
      category,
      label: TECH_CATEGORY_LABELS[category],
      technologies: technologies.filter((tech) => tech.category === category),
    })).filter((group) => group.technologies.length > 0);
  }

  async findCore(): Promise<readonly Technology[]> {
    return (await this.findAll()).filter((tech) => tech.isCore);
  }
}
