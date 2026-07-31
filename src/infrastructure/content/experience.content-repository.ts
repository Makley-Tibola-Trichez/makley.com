import { getCollection } from 'astro:content';

import { DEFAULT_LOCALE, type Locale } from '@i18n/locales';
import type { Experience } from '@domain/experience/experience.entity';
import { Experience as ExperienceEntity } from '@domain/experience/experience.entity';
import type { ExperienceRepository } from '@domain/experience/experience.repository';
import { toExperience } from './mappers/experience.mapper';
import { mergeExperienceTranslation } from './mappers/experience-translation.mapper';

export class ExperienceContentRepository implements ExperienceRepository {
  private readonly cache = new Map<Locale, readonly Experience[]>();

  async findAll(locale: Locale = DEFAULT_LOCALE): Promise<readonly Experience[]> {
    const cached = this.cache.get(locale);
    if (cached) return cached;

    const entries = await getCollection('experience', ({ data }) => !data.draft);
    const translations = await getCollection('experienceTranslations', ({ id }) =>
      id.endsWith(`.${locale}`),
    );

    const experiences = entries
      .map((entry) => {
        const override = translations.find((t) => t.id === `${entry.id}.${locale}`);
        const merged = mergeExperienceTranslation(entry.data, override?.data);
        return toExperience(entry.id, merged);
      })
      .sort(ExperienceEntity.compareDesc);

    this.cache.set(locale, experiences);
    return experiences;
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
