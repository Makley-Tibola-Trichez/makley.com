import { getCollection } from 'astro:content';

import type { Education, EducationKind } from '@domain/education/education.entity';
import { Education as EducationEntity } from '@domain/education/education.entity';
import type { EducationRepository } from '@domain/education/education.repository';
import { toEducation } from './mappers/education.mapper';

export class EducationContentRepository implements EducationRepository {
  private cache: readonly Education[] | null = null;

  async findAll(): Promise<readonly Education[]> {
    if (this.cache) return this.cache;

    const entries = await getCollection('education', ({ data }) => !data.draft);
    this.cache = entries.map(toEducation).sort(EducationEntity.compareDesc);

    return this.cache;
  }

  async findByKind(kind: EducationKind): Promise<readonly Education[]> {
    return (await this.findAll()).filter((item) => item.kind === kind);
  }
}
