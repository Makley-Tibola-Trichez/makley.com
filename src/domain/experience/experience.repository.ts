import type { Experience } from './experience.entity';

/** Port for the professional timeline. Always returns most-recent-first. */
export interface ExperienceRepository {
  findAll(): Promise<readonly Experience[]>;
  findCurrent(): Promise<Experience | null>;
}
