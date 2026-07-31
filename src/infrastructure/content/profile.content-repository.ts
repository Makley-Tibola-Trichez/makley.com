import { getCollection } from 'astro:content';

import { DEFAULT_LOCALE, type Locale } from '@i18n/locales';
import { EntityNotFoundError } from '@domain/shared/errors';
import type { Profile } from '@domain/profile/profile.entity';
import type { ProfileRepository } from '@domain/profile/profile.repository';
import { toProfile } from './mappers/profile.mapper';
import { mergeProfileTranslation } from './mappers/profile-translation.mapper';

export class ProfileContentRepository implements ProfileRepository {
  private readonly cache = new Map<Locale, Profile>();

  async get(locale: Locale = DEFAULT_LOCALE): Promise<Profile> {
    const cached = this.cache.get(locale);
    if (cached) return cached;

    const entries = await getCollection('profile');
    const canonical = entries[0];

    // Failing loudly at build time is the point: a portfolio that renders with
    // an empty profile is worse than one that refuses to build.
    if (!canonical) {
      throw new EntityNotFoundError('Profile', 'src/content/profile/main.yaml');
    }

    // Filtering (not `getEntry`) avoids a "not found" warning on every build
    // for every locale that has no override file yet — the common case.
    const translations = await getCollection('profileTranslations', ({ id }) => id === locale);
    const merged = mergeProfileTranslation(canonical.data, translations[0]?.data);

    const profile = toProfile(merged);
    this.cache.set(locale, profile);
    return profile;
  }
}
