import type { CollectionEntry } from 'astro:content';

type ProjectData = CollectionEntry<'projects'>['data'];
type ProjectTranslationData = CollectionEntry<'projectTranslations'>['data'];

/**
 * Only fields present in `override` replace the canonical ones. `cover` is
 * the one exception to the shallow merge: the override only ever carries
 * `alt`, so a plain spread would replace the whole object and silently drop
 * the canonical `image` — it's merged one level deeper instead.
 */
export function mergeProjectTranslation(
  canonical: ProjectData,
  override: ProjectTranslationData | undefined,
): ProjectData {
  if (!override) return canonical;

  return {
    ...canonical,
    ...override,
    cover:
      override.cover && canonical.cover
        ? { ...canonical.cover, ...override.cover }
        : canonical.cover,
  };
}
