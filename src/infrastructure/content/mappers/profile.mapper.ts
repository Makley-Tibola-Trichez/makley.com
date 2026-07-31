import type { CollectionEntry } from 'astro:content';

import { Profile } from '@domain/profile/profile.entity';

/**
 * Takes the validated data shape directly (not a full collection entry):
 * the repository may hand it a locale-merged object that no longer
 * corresponds to any single real entry in the `profile` collection.
 */
export function toProfile(data: CollectionEntry<'profile'>['data']): Profile {
  return Profile.create({
    name: data.name,
    shortName: data.shortName,
    headline: data.headline,
    title: data.title,
    heroStatement: data.heroStatement,
    heroIntro: data.heroIntro,
    bio: data.bio,
    location: data.location,
    locality: data.locality,
    region: data.region,
    country: data.country,
    email: data.email,
    phone: data.phone,
    availability: data.availability,
    availabilityNote: data.availabilityNote,
    specialties: data.specialties,
    focusAreas: data.focusAreas,
    goals: data.goals,
    languages: data.languages,
    stats: data.stats,
    socials: data.socials,
    resumePath: data.resumePath,
    avatar: data.avatar
      ? { image: data.avatar.image, alt: data.avatar.alt }
      : undefined,
  });
}
