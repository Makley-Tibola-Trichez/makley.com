import type { Education } from '@domain/education/education.entity';
import type { Experience } from '@domain/experience/experience.entity';
import type { Profile } from '@domain/profile/profile.entity';
import type { Project } from '@domain/projects/project.entity';
import { SITE } from '@config/site';

/**
 * schema.org builders.
 *
 * Structured data is generated from the same domain entities that render the
 * page, so the markup and the machine-readable graph can never disagree — the
 * classic failure mode when JSON-LD is hand-maintained in a template.
 *
 * All nodes are emitted in a single `@graph` with stable `@id`s, which lets
 * Google resolve relationships (Person → worksFor → Organization) instead of
 * treating each block as an isolated island.
 */

type JsonLdNode = Record<string, unknown>;

const absolute = (path: string): string =>
  path.startsWith('http') ? path : `${SITE.url}${path.startsWith('/') ? path : `/${path}`}`;

const ID = {
  person: `${SITE.url}/#person`,
  website: `${SITE.url}/#website`,
} as const;

export function buildPersonNode(
  profile: Profile,
  experiences: readonly Experience[],
  education: readonly Education[],
  skills: readonly string[],
): JsonLdNode {
  const currentRole = experiences.find((experience) => experience.isCurrent);
  const degree = education.find((item) => item.kind === 'graduacao');

  return {
    '@type': 'Person',
    '@id': ID.person,
    name: profile.name,
    givenName: profile.shortName,
    jobTitle: profile.title,
    description: profile.headline,
    url: `${SITE.url}/`,
    email: profile.email,
    ...(profile.phone ? { telephone: profile.phone } : {}),
    address: {
      '@type': 'PostalAddress',
      addressLocality: profile.locality,
      addressRegion: profile.region,
      addressCountry: profile.country,
    },
    ...(currentRole
      ? {
          worksFor: {
            '@type': 'Organization',
            name: currentRole.company,
            ...(currentRole.companyUrl ? { url: currentRole.companyUrl } : {}),
          },
        }
      : {}),
    ...(degree
      ? {
          alumniOf: {
            '@type': 'CollegeOrUniversity',
            name: degree.institution,
          },
          hasCredential: {
            '@type': 'EducationalOccupationalCredential',
            credentialCategory: 'degree',
            name: degree.credential,
          },
        }
      : {}),
    knowsAbout: skills,
    knowsLanguage: profile.languages.map((language) => ({
      '@type': 'Language',
      name: language.name,
    })),
    sameAs: profile.sameAs,
  };
}

export function buildWebSiteNode(profile: Profile): JsonLdNode {
  return {
    '@type': 'WebSite',
    '@id': ID.website,
    url: `${SITE.url}/`,
    name: profile.name,
    alternateName: SITE.name,
    description: SITE.description,
    inLanguage: SITE.locale,
    publisher: { '@id': ID.person },
    author: { '@id': ID.person },
    copyrightHolder: { '@id': ID.person },
    copyrightYear: new Date().getUTCFullYear(),
  };
}

export function buildProfilePageNode(profile: Profile): JsonLdNode {
  return {
    '@type': 'ProfilePage',
    '@id': `${SITE.url}/#profilepage`,
    url: `${SITE.url}/`,
    name: `${profile.name} — ${profile.title}`,
    description: profile.headline,
    inLanguage: SITE.locale,
    isPartOf: { '@id': ID.website },
    about: { '@id': ID.person },
    mainEntity: { '@id': ID.person },
  };
}

/**
 * Projects are `CreativeWork`, not `SoftwareApplication`: these pages describe
 * the *work done on* a product, not an app a visitor can install. Claiming
 * otherwise invites rich-result rejections for missing offers/ratings.
 */
export function buildProjectNode(project: Project, coverUrl?: string): JsonLdNode {
  return {
    '@type': 'CreativeWork',
    '@id': `${SITE.url}${project.href}#project`,
    url: absolute(project.href),
    name: project.title,
    headline: project.tagline,
    description: project.summary,
    inLanguage: SITE.locale,
    dateCreated: String(project.year),
    creator: { '@id': ID.person },
    author: { '@id': ID.person },
    keywords: project.technologies.join(', '),
    genre: project.categoryLabel,
    ...(coverUrl ? { image: absolute(coverUrl) } : {}),
    ...(project.liveLink ? { sameAs: [project.liveLink.url] } : {}),
  };
}

export interface Breadcrumb {
  readonly name: string;
  readonly url: string;
}

export function buildBreadcrumbNode(items: readonly Breadcrumb[]): JsonLdNode {
  return {
    '@type': 'BreadcrumbList',
    '@id': `${absolute(items[items.length - 1]?.url ?? '/')}#breadcrumb`,
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: absolute(item.url),
    })),
  };
}

/** Wraps nodes into the single `@graph` document emitted per page. */
export function buildGraph(nodes: readonly JsonLdNode[]): string {
  return JSON.stringify({
    '@context': 'https://schema.org',
    '@graph': nodes,
  });
}
