import type { CollectionEntry } from 'astro:content';

import { Experience } from '@domain/experience/experience.entity';

/**
 * Filenames are numbered (`01-sicredi.yaml`) so the content directory reads in
 * chronological order for a human editor. The numeric prefix is stripped here
 * because it is an authoring convenience, not part of the identity.
 *
 * Takes the id and data separately (rather than the raw entry) so the
 * repository can hand it a locale-merged data object.
 */
export function toExperience(id: string, data: CollectionEntry<'experience'>['data']): Experience {
  return Experience.create({
    id: id.replace(/^\d+-/, ''),
    company: data.company,
    companyUrl: data.companyUrl,
    role: data.role,
    seniority: data.seniority,
    start: data.start,
    end: data.end,
    location: data.location,
    employmentType: data.employmentType,
    summary: data.summary,
    responsibilities: data.responsibilities,
    achievements: data.achievements,
    technologies: data.technologies,
  });
}
