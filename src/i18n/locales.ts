export const LOCALES = ['pt-BR', 'en'] as const;
export type Locale = (typeof LOCALES)[number];
export const DEFAULT_LOCALE: Locale = 'pt-BR';

/** Endonyms — each language's name in itself, so this never needs a translation. */
export const LOCALE_LABELS: Record<Locale, string> = {
  'pt-BR': 'Português',
  en: 'English',
};

/** Flag shown next to each language in the switcher — see `FlagIcon.astro`. */
export const LOCALE_FLAGS: Record<Locale, 'BR' | 'US'> = {
  'pt-BR': 'BR',
  en: 'US',
};

export function isLocale(value: string): value is Locale {
  return (LOCALES as readonly string[]).includes(value);
}

/**
 * `Astro.currentLocale` is typed as loose `string | undefined`. Every route
 * or component that needs a locale calls this once to get a narrowed,
 * guaranteed-valid `Locale`, falling back to the default for any path the
 * i18n router doesn't recognise.
 */
export function resolveLocale(candidate: string | undefined): Locale {
  return candidate && isLocale(candidate) ? candidate : DEFAULT_LOCALE;
}
