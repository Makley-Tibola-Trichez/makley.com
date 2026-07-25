import { GetPortfolioOverviewUseCase } from '@application/use-cases/get-portfolio-overview.use-case';
import { GetProjectCatalogUseCase } from '@application/use-cases/get-project-catalog.use-case';
import { GetProjectDetailUseCase } from '@application/use-cases/get-project-detail.use-case';

import { EducationContentRepository } from './content/education.content-repository';
import { ExperienceContentRepository } from './content/experience.content-repository';
import { ProfileContentRepository } from './content/profile.content-repository';
import { ProjectContentRepository } from './content/project.content-repository';
import { TechStackContentRepository } from './content/tech-stack.content-repository';

/**
 * Composition root.
 *
 * This is the **only** module in the codebase that knows both the ports and the
 * concrete adapters. Pages import use cases from here; nothing else instantiates
 * a repository. Pointing the site at a CMS later means editing this file and
 * adding one adapter — every use case, page and component stays untouched.
 *
 * Instances are module-level singletons on purpose: each repository memoises its
 * collection, so a full build reads and maps the content exactly once instead of
 * once per generated page.
 */

const profileRepository = new ProfileContentRepository();
const projectRepository = new ProjectContentRepository();
const experienceRepository = new ExperienceContentRepository();
const educationRepository = new EducationContentRepository();
const techStackRepository = new TechStackContentRepository();

export const repositories = {
  profile: profileRepository,
  project: projectRepository,
  experience: experienceRepository,
  education: educationRepository,
  techStack: techStackRepository,
} as const;

export const useCases = {
  getPortfolioOverview: new GetPortfolioOverviewUseCase(
    profileRepository,
    projectRepository,
    experienceRepository,
    educationRepository,
    techStackRepository,
  ),
  getProjectCatalog: new GetProjectCatalogUseCase(projectRepository),
  getProjectDetail: new GetProjectDetailUseCase(projectRepository, profileRepository),
} as const;
