import type { Locale } from '@i18n/locales';

import type { Education, EducationKind } from './education.entity';

/** Port for the academic timeline (degrees, courses, certifications, talks). */
export interface EducationRepository {
  findAll(locale?: Locale): Promise<readonly Education[]>;
  findByKind(kind: EducationKind): Promise<readonly Education[]>;
}
