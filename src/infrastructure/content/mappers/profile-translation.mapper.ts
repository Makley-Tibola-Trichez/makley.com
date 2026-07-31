import type { CollectionEntry } from 'astro:content';

type ProfileData = CollectionEntry<'profile'>['data'];
type ProfileTranslationData = CollectionEntry<'profileTranslations'>['data'];

/**
 * Only fields present in `override` replace the canonical ones; everything
 * else (email, socials, stats, avatar, resumePath, ...) falls through
 * untouched. No override for the locale simply returns `canonical` as-is.
 */
export function mergeProfileTranslation(
  canonical: ProfileData,
  override: ProfileTranslationData | undefined,
): ProfileData {
  return override ? { ...canonical, ...override } : canonical;
}
