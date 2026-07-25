import type { Profile } from './profile.entity';

/**
 * Port for the professional's identity.
 *
 * `get()` never returns null: a portfolio without a profile is not a valid
 * application state, so the adapter throws at build time instead of forcing
 * every caller into a null check.
 */
export interface ProfileRepository {
  get(): Promise<Profile>;
}
