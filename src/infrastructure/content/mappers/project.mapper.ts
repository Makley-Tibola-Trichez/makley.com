import type { CollectionEntry } from 'astro:content';

import { Project } from '@domain/projects/project.entity';

/**
 * Anti-corruption boundary: validated Content Collection data → domain entity.
 *
 * Keeping the translation in one function means the shape of the markdown
 * frontmatter can change without any of the domain, application or presentation
 * code noticing — only this file has to follow.
 */
export function toProject(entry: CollectionEntry<'projects'>): Project {
  const { data } = entry;

  return Project.create({
    // The filename is the slug — one identifier, no chance of it drifting from
    // the URL that Astro generates for the file.
    slug: entry.id,
    title: data.title,
    tagline: data.tagline,
    category: data.category,
    year: data.year,
    role: data.role,
    context: data.context,
    summary: data.summary,
    problem: data.problem,
    solution: data.solution,
    challenges: data.challenges,
    results: data.results,
    technologies: data.technologies,
    cover: data.cover,
    gallery: data.gallery,
    links: data.links,
    featured: data.featured,
    order: data.order,
    confidential: data.confidential,
  });
}
