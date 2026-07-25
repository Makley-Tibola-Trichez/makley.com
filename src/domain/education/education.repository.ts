import type { Education, EducationKind } from './education.entity';

/** Port for the academic timeline (degrees, courses, certifications, talks). */
export interface EducationRepository {
  findAll(): Promise<readonly Education[]>;
  findByKind(kind: EducationKind): Promise<readonly Education[]>;
}
