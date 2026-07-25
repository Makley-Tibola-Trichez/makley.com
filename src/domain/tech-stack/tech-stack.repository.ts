import type { Technology, TechnologyGroup } from './technology.entity';

/** Port for the technology stack. `findGrouped` returns categories in order. */
export interface TechStackRepository {
  findAll(): Promise<readonly Technology[]>;
  findGrouped(): Promise<readonly TechnologyGroup[]>;
  findCore(): Promise<readonly Technology[]>;
}
