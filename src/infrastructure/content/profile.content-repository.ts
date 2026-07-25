import { getCollection } from 'astro:content';

import { EntityNotFoundError } from '@domain/shared/errors';
import type { Profile } from '@domain/profile/profile.entity';
import type { ProfileRepository } from '@domain/profile/profile.repository';
import { toProfile } from './mappers/profile.mapper';

export class ProfileContentRepository implements ProfileRepository {
  private cache: Profile | null = null;

  async get(): Promise<Profile> {
    if (this.cache) return this.cache;

    const entries = await getCollection('profile');
    const entry = entries[0];

    // Failing loudly at build time is the point: a portfolio that renders with
    // an empty profile is worse than one that refuses to build.
    if (!entry) {
      throw new EntityNotFoundError('Profile', 'src/content/profile/main.yaml');
    }

    this.cache = toProfile(entry);
    return this.cache;
  }
}
