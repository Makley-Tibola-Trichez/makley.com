import type { Locale } from '@i18n/locales';

import type { Profile } from './profile.entity';

/**
 * Port for the professional's identity.
 *
 * `get()` never returns null: a portfolio without a profile is not a valid
 * application state, so the adapter throws at build time instead of forcing
 * every caller into a null check.
 *
 * `locale` is optional so callers that don't care about i18n yet (most of the
 * site, for now) keep compiling unchanged; the concrete adapter defaults it
 * to the site's default locale.
 */
export interface ProfileRepository {
  get(locale?: Locale): Promise<Profile>;
}
