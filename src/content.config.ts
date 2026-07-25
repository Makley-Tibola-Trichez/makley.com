import { defineCollection, z, type SchemaContext } from 'astro:content';
import { glob } from 'astro/loaders';

import { PROJECT_CATEGORIES } from './domain/projects/project.entity';
import { TECH_CATEGORIES } from './domain/tech-stack/technology.entity';
import { EDUCATION_KINDS } from './domain/education/education.entity';

/**
 * Content Collections act as the **anti-corruption layer** between hand-edited
 * files and the domain model.
 *
 * The Zod schemas below are the only place raw content is trusted. They run at
 * build time, so a typo in a date, a missing `alt` text or an unknown category
 * breaks `npm run build` instead of silently rendering a broken page. Mappers in
 * `src/infrastructure` then turn these validated shapes into domain entities.
 *
 * Note the categories are imported *from the domain* rather than re-declared:
 * adding a project category is a one-line change in the entity, and the schema
 * follows automatically.
 */

/**
 * Takes the whole `SchemaContext` rather than a loosely typed `image` callback:
 * that preserves Astro's `ImageMetadata` return type, so `image` stays required
 * and non-`any` all the way through to the domain entity.
 */
const describedImageSchema = ({ image }: SchemaContext) =>
  z.object({
    image: image(),
    alt: z.string().min(8, 'Descreva a imagem para leitores de tela'),
    caption: z.string().optional(),
  });

const externalLinkSchema = z.object({
  url: z.string().url(),
  label: z.string(),
  kind: z
    .enum(['website', 'repository', 'demo', 'article', 'case-study', 'store', 'other'])
    .default('other'),
});

/** `2021-11` — authors never type full dates, so ranges stay unambiguous. */
const yearMonth = z
  .string()
  .regex(/^\d{4}-(0[1-9]|1[0-2])$/, 'Use o formato AAAA-MM (ex.: 2021-11)');

const metricSchema = z.object({
  value: z.string(),
  label: z.string(),
  detail: z.string().optional(),
});

const profile = defineCollection({
  loader: glob({ base: './src/content/profile', pattern: '**/*.yaml' }),
  schema: (context) =>
    z.object({
      name: z.string(),
      shortName: z.string(),
      /** Shown under the hero headline; keep under ~90 chars. */
      headline: z.string().max(120),
      title: z.string(),
      /**
       * The hero headline, split so the emphasised word can be rendered in the
       * display serif without HTML living inside the content file.
       */
      heroStatement: z.object({
        lead: z.string(),
        emphasis: z.string(),
        trail: z.string(),
      }),
      heroIntro: z.string(),
      bio: z.array(z.string()).min(1),
      location: z.string(),
      locality: z.string(),
      region: z.string(),
      country: z.string(),
      email: z.string().email(),
      phone: z.string().optional(),
      availability: z.enum(['open', 'selective', 'closed']),
      availabilityNote: z.string(),
      specialties: z.array(z.string()),
      focusAreas: z.array(z.object({ title: z.string(), description: z.string() })),
      goals: z.array(z.string()),
      languages: z.array(z.object({ name: z.string(), level: z.string() })),
      stats: z.array(metricSchema),
      socials: z.array(
        z.object({
          platform: z.enum([
            'github',
            'linkedin',
            'instagram',
            'email',
            'phone',
            'hackerrank',
            'resume',
          ]),
          url: z.string(),
          handle: z.string(),
          primary: z.boolean().default(false),
        }),
      ),
      resumePath: z.string(),
      avatar: describedImageSchema(context).optional(),
    }),
});

const projects = defineCollection({
  // Markdown, not YAML: the body holds the long-form case study rendered on the
  // detail page, while the frontmatter stays strictly typed.
  loader: glob({ base: './src/content/projects', pattern: '**/*.md' }),
  schema: (context) =>
    z.object({
      title: z.string(),
      tagline: z.string().max(160),
      category: z.enum(PROJECT_CATEGORIES),
      year: z.number().int().min(2018).max(2100),
      role: z.string(),
      context: z.string(),
      summary: z.string(),
      problem: z.string(),
      solution: z.string(),
      challenges: z.array(z.string()).min(1),
      results: z.array(metricSchema),
      technologies: z.array(z.string()).min(1),
      cover: describedImageSchema(context).optional(),
      gallery: z.array(describedImageSchema(context)).default([]),
      links: z.array(externalLinkSchema).default([]),
      featured: z.boolean().default(false),
      order: z.number().int().default(999),
      confidential: z.boolean().default(false),
      /** Excluded from the site without deleting the file. */
      draft: z.boolean().default(false),
    }),
});

const experience = defineCollection({
  loader: glob({ base: './src/content/experience', pattern: '**/*.yaml' }),
  schema: z.object({
    company: z.string(),
    companyUrl: z.string().url().optional(),
    role: z.string(),
    seniority: z.string().optional(),
    start: yearMonth,
    end: yearMonth.nullable().default(null),
    location: z.string(),
    employmentType: z.enum(['clt', 'pj', 'estagio', 'freelance', 'proprio']).default('clt'),
    summary: z.string(),
    responsibilities: z.array(z.string()).min(1),
    achievements: z.array(z.object({ value: z.string(), label: z.string() })).default([]),
    technologies: z.array(z.string()).default([]),
    draft: z.boolean().default(false),
  }),
});

const education = defineCollection({
  loader: glob({ base: './src/content/education', pattern: '**/*.yaml' }),
  schema: z.object({
    institution: z.string(),
    credential: z.string(),
    kind: z.enum(EDUCATION_KINDS),
    start: yearMonth,
    end: yearMonth.nullable().default(null),
    field: z.string().optional(),
    description: z.string().optional(),
    highlights: z.array(z.string()).default([]),
    credentialUrl: z.string().url().optional(),
    draft: z.boolean().default(false),
  }),
});

const stack = defineCollection({
  loader: glob({ base: './src/content/stack', pattern: '**/*.yaml' }),
  schema: z.object({
    technologies: z
      .array(
        z.object({
          id: z.string(),
          name: z.string(),
          category: z.enum(TECH_CATEGORIES),
          core: z.boolean().default(false),
          note: z.string().optional(),
        }),
      )
      .min(1),
  }),
});

export const collections = { profile, projects, experience, education, stack };
