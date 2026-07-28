import type { CollectionEntry } from 'astro:content';

import { Profile } from '@domain/profile/profile.entity';

export function toProfile(entry: CollectionEntry<'profile'>): Profile {
  const { data } = entry;

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
