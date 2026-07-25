import { getCollection } from 'astro:content';

import type { Experience } from '@domain/experience/experience.entity';
import { Experience as ExperienceEntity } from '@domain/experience/experience.entity';
import type { ExperienceRepository } from '@domain/experience/experience.repository';
import { toExperience } from './mappers/experience.mapper';

export class ExperienceContentRepository implements ExperienceRepository {
  private cache: readonly Experience[] | null = null;

  async findAll(): Promise<readonly Experience[]> {
    if (this.cache) return this.cache;

    const entries = await getCollection('experience', ({ data }) => !data.draft);
    this.cache = entries.map(toExperience).sort(ExperienceEntity.compareDesc);

    return this.cache;
  }

  /**
   * The ongoing employment. When more than one role is open at the same time
   * (a day job plus a side venture, which is this profile's case), the sort
   * order already puts the most recent first — so this returns the primary one.
   */
  async findCurrent(): Promise<Experience | null> {
    const all = await this.findAll();
    return all.find((experience) => experience.isCurrent) ?? null;
  }
}
