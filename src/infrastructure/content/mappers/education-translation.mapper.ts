import type { CollectionEntry } from 'astro:content';

type EducationData = CollectionEntry<'education'>['data'];
type EducationTranslationData = CollectionEntry<'educationTranslations'>['data'];

/** Only fields present in `override` replace the canonical ones. */
export function mergeEducationTranslation(
  canonical: EducationData,
  override: EducationTranslationData | undefined,
): EducationData {
  return override ? { ...canonical, ...override } : canonical;
}
