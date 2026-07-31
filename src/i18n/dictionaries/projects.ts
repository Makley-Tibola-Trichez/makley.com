import { getRelativeLocaleUrl } from 'astro:i18n';

import type { Locale } from '../locales';
import type { Project, ProjectCategory } from '@domain/projects/project.entity';

export interface ProjectsDictionary {
  eyebrow: string;
  defaultTitle: string;
  defaultDescription: string;
  /** Override used specifically by the home page's featured-projects teaser. */
  homeDescription: string;
  viewAll: string;
  filterAriaLabel: string;
  countSingular: string;
  countPlural: string;
  emptyState: string;
  viewCaseStudy: string;
  technologiesOfAriaLabel: string;
  privateSource: string;
  allFilterLabel: string;
  /** `/projetos` — the `<title>`/meta-description for the standalone catalog page. */
  catalogPageTitle: string;
  catalogPageDescription: string;
  /** Heading/description passed to `ProjectsSection` when rendering the full catalog. */
  catalogTitle: string;
  catalogDescription: string;
}

export const projectsDictionary: Record<Locale, ProjectsDictionary> = {
  'pt-BR': {
    eyebrow: 'Projetos',
    defaultTitle: 'Projetos que resolveram problemas reais',
    defaultDescription:
      'Cada estudo de caso descreve o problema, a solução implementada, os desafios enfrentados e os resultados alcançados.',
    homeDescription:
      'Estudos de caso com problema, solução, desafios e resultados. Cada um deles rodou em produção.',
    viewAll: 'Ver todos',
    filterAriaLabel: 'Filtrar projetos por categoria',
    countSingular: 'projeto',
    countPlural: 'projetos',
    emptyState: 'Nenhum projeto nesta categoria ainda.',
    viewCaseStudy: 'Ver estudo de caso',
    technologiesOfAriaLabel: 'Tecnologias de {title}',
    privateSource: 'Código-fonte privado',
    allFilterLabel: 'Todos',
    catalogPageTitle: 'Projetos',
    catalogPageDescription:
      'Estudos de caso completos: problema, solução, desafios, resultados e stack de cada projeto que desenvolvi — de SaaS fiscal a design systems.',
    catalogTitle: 'Todos os projetos',
    catalogDescription:
      'Filtre por categoria para ver o tipo de trabalho que mais te interessa. Cada projeto tem um estudo de caso com problema, solução, desafios e resultados.',
  },
  en: {
    eyebrow: 'Projects',
    defaultTitle: 'Projects that solved real problems',
    defaultDescription:
      'Each case study covers the problem, the solution shipped, the challenges faced and the results achieved.',
    homeDescription:
      'Case studies with problem, solution, challenges and results. Every one of them ran in production.',
    viewAll: 'View all',
    filterAriaLabel: 'Filter projects by category',
    countSingular: 'project',
    countPlural: 'projects',
    emptyState: 'No projects in this category yet.',
    viewCaseStudy: 'View case study',
    technologiesOfAriaLabel: 'Technologies used in {title}',
    privateSource: 'Private source code',
    allFilterLabel: 'All',
    catalogPageTitle: 'Projects',
    catalogPageDescription:
      "Full case studies: problem, solution, challenges, results and tech stack for every project I've built — from tax SaaS to design systems.",
    catalogTitle: 'All projects',
    catalogDescription:
      'Filter by category to see the kind of work you care about most. Every project has a case study with problem, solution, challenges and results.',
  },
};

/**
 * `Project.href` is domain-layer hardcoded (`/projetos/${slug}`) — the path
 * segment stays identical across locales by design (same convention as the
 * `#sobre` etc. section ids), so making it locale-correct is just a matter of
 * prefixing it the same way `getRelativeLocaleUrl` prefixes every other route.
 */
export function getProjectHref(project: Pick<Project, 'href'>, locale: Locale): string {
  return getRelativeLocaleUrl(locale, project.href);
}

/**
 * `Project.categoryLabel` is hardcoded pt-BR in the domain layer
 * (PROJECT_CATEGORY_LABELS in project.entity.ts). Additive, locale-aware
 * lookup — mirrors `getTechCategoryLabel` in dictionaries/stack.ts — so
 * out-of-scope call sites (résumé PDF, structured data, /projetos detail
 * page) keep using the untouched getter.
 */
const PROJECT_CATEGORY_LABELS_EN: Record<ProjectCategory, string> = {
  produto: 'SaaS Product',
  'design-system': 'Design System',
  performance: 'Performance & DevOps',
  pesquisa: 'Research',
};

export function getProjectCategoryLabel(
  category: ProjectCategory,
  locale: Locale,
  fallback: string,
): string {
  return locale === 'en' ? PROJECT_CATEGORY_LABELS_EN[category] : fallback;
}
