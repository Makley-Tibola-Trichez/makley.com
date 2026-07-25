import type { Education } from '@domain/education/education.entity';
import type { EducationRepository } from '@domain/education/education.repository';
import type { Experience } from '@domain/experience/experience.entity';
import type { ExperienceRepository } from '@domain/experience/experience.repository';
import type { Profile } from '@domain/profile/profile.entity';
import type { ProfileRepository } from '@domain/profile/profile.repository';
import type { Project } from '@domain/projects/project.entity';
import type { ProjectRepository } from '@domain/projects/project.repository';
import type { TechnologyGroup } from '@domain/tech-stack/technology.entity';
import type { TechStackRepository } from '@domain/tech-stack/tech-stack.repository';

export interface PortfolioOverview {
  readonly profile: Profile;
  readonly featuredProjects: readonly Project[];
  readonly allProjects: readonly Project[];
  readonly experiences: readonly Experience[];
  readonly education: readonly Education[];
  readonly techGroups: readonly TechnologyGroup[];
  /** Years between the first role and today — never a hardcoded number. */
  readonly yearsOfExperience: number;
}

/**
 * Assembles everything the home page renders.
 *
 * The page template calls exactly one use case instead of reaching into five
 * repositories. That keeps the orchestration testable in isolation and means a
 * change in what the home page shows never leaks into the template's structure.
 *
 * Dependencies arrive through the constructor (Dependency Inversion): this
 * class knows the *ports*, never the Content Collections adapters behind them.
 */
export class GetPortfolioOverviewUseCase {
  constructor(
    private readonly profiles: ProfileRepository,
    private readonly projects: ProjectRepository,
    private readonly experiences: ExperienceRepository,
    private readonly education: EducationRepository,
    private readonly techStack: TechStackRepository,
  ) {}

  async execute(): Promise<PortfolioOverview> {
    const [profile, allProjects, featuredProjects, experiences, education, techGroups] =
      await Promise.all([
        this.profiles.get(),
        this.projects.findAll(),
        this.projects.findFeatured(),
        this.experiences.findAll(),
        this.education.findAll(),
        this.techStack.findGrouped(),
      ]);

    return {
      profile,
      featuredProjects,
      allProjects,
      experiences,
      education,
      techGroups,
      yearsOfExperience: this.calculateYearsOfExperience(experiences),
    };
  }

  /**
   * Derived from the earliest professional start date, so the site ages
   * correctly on its own instead of quietly becoming wrong next January.
   */
  private calculateYearsOfExperience(experiences: readonly Experience[]): number {
    if (experiences.length === 0) return 0;

    const earliest = experiences.reduce((oldest, current) =>
      current.period.start < oldest.period.start ? current : oldest,
    );

    const elapsedMs = Date.now() - earliest.period.start.getTime();
    return Math.max(1, Math.floor(elapsedMs / (1000 * 60 * 60 * 24 * 365.25)));
  }
}
