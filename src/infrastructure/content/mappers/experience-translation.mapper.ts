import type { CollectionEntry } from 'astro:content';

type ExperienceData = CollectionEntry<'experience'>['data'];
type ExperienceTranslationData = CollectionEntry<'experienceTranslations'>['data'];

/** Only fields present in `override` replace the canonical ones. */
export function mergeExperienceTranslation(
  canonical: ExperienceData,
  override: ExperienceTranslationData | undefined,
): ExperienceData {
  return override ? { ...canonical, ...override } : canonical;
}
