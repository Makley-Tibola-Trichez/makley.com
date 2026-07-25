import { ExternalLink } from '../shared/value-objects/external-link.vo';

export type SocialPlatform =
  | 'github'
  | 'linkedin'
  | 'instagram'
  | 'email'
  | 'phone'
  | 'hackerrank'
  | 'resume';

export interface SocialProfileProps {
  readonly platform: SocialPlatform;
  readonly url: string;
  readonly handle: string;
  /** Hidden from the header/footer but still emitted in structured data. */
  readonly primary?: boolean;
}

export class SocialProfile {
  private constructor(
    public readonly platform: SocialPlatform,
    public readonly link: ExternalLink,
    public readonly handle: string,
    public readonly isPrimary: boolean,
  ) {}

  static create(props: SocialProfileProps): SocialProfile {
    return new SocialProfile(
      props.platform,
      ExternalLink.create({ url: props.url, label: props.handle, kind: 'other' }),
      props.handle,
      props.primary ?? false,
    );
  }

  get url(): string {
    return this.link.url;
  }

  /** `sameAs` in schema.org only accepts real profile pages, not mailto/tel. */
  get isSameAsCandidate(): boolean {
    return this.link.url.startsWith('https://');
  }
}

/** A headline metric shown in the hero. */
export interface ProfileStat {
  readonly value: string;
  readonly label: string;
  readonly detail?: string;
}

export type AvailabilityStatus = 'open' | 'selective' | 'closed';

/**
 * The hero headline as three parts. Splitting it in the *data* keeps markup out
 * of the content file while still letting the middle word be typeset in the
 * display serif — the one editorial flourish on the page.
 */
export interface HeroStatement {
  readonly lead: string;
  readonly emphasis: string;
  readonly trail: string;
}

export interface ProfileProps {
  readonly name: string;
  readonly shortName: string;
  readonly headline: string;
  readonly title: string;
  readonly heroStatement: HeroStatement;
  readonly heroIntro: string;
  readonly bio: readonly string[];
  readonly location: string;
  readonly locality: string;
  readonly region: string;
  readonly country: string;
  readonly email: string;
  readonly phone?: string;
  readonly availability: AvailabilityStatus;
  readonly availabilityNote: string;
  readonly specialties: readonly string[];
  readonly focusAreas: readonly { title: string; description: string }[];
  readonly goals: readonly string[];
  readonly languages: readonly { name: string; level: string }[];
  readonly stats: readonly ProfileStat[];
  readonly socials: readonly SocialProfileProps[];
  readonly resumePath: string;
  readonly avatar?: { src: string; alt: string };
}

/**
 * Aggregate root for "who this person is".
 *
 * Everything the header, hero, about section, contact section, footer and
 * JSON-LD need about the professional resolves through this single entity, so
 * a change of e-mail or headline propagates everywhere from one content file.
 */
export class Profile {
  private constructor(
    public readonly name: string,
    public readonly shortName: string,
    public readonly headline: string,
    public readonly title: string,
    public readonly heroStatement: HeroStatement,
    public readonly heroIntro: string,
    public readonly bio: readonly string[],
    public readonly location: string,
    public readonly locality: string,
    public readonly region: string,
    public readonly country: string,
    public readonly email: string,
    public readonly phone: string | null,
    public readonly availability: AvailabilityStatus,
    public readonly availabilityNote: string,
    public readonly specialties: readonly string[],
    public readonly focusAreas: readonly { title: string; description: string }[],
    public readonly goals: readonly string[],
    public readonly languages: readonly { name: string; level: string }[],
    public readonly stats: readonly ProfileStat[],
    public readonly socials: readonly SocialProfile[],
    public readonly resumePath: string,
    public readonly avatar: { src: string; alt: string } | null,
  ) {}

  static create(props: ProfileProps): Profile {
    return new Profile(
      props.name,
      props.shortName,
      props.headline,
      props.title,
      props.heroStatement,
      props.heroIntro,
      props.bio,
      props.location,
      props.locality,
      props.region,
      props.country,
      props.email,
      props.phone ?? null,
      props.availability,
      props.availabilityNote,
      props.specialties,
      props.focusAreas,
      props.goals,
      props.languages,
      props.stats,
      props.socials.map(SocialProfile.create),
      props.resumePath,
      props.avatar ?? null,
    );
  }

  social(platform: SocialPlatform): SocialProfile | null {
    return this.socials.find((s) => s.platform === platform) ?? null;
  }

  get primarySocials(): readonly SocialProfile[] {
    return this.socials.filter((s) => s.isPrimary);
  }

  /** URLs safe to emit as schema.org `sameAs`. */
  get sameAs(): readonly string[] {
    return this.socials.filter((s) => s.isSameAsCandidate).map((s) => s.url);
  }

  get mailto(): string {
    return `mailto:${this.email}`;
  }

  get isAvailable(): boolean {
    return this.availability !== 'closed';
  }

  /** Drives the colour + copy of the availability pill in the header. */
  get availabilityLabel(): string {
    const labels: Record<AvailabilityStatus, string> = {
      open: 'Disponível para novas oportunidades',
      selective: 'Aberto a conversas selecionadas',
      closed: 'Sem disponibilidade no momento',
    };
    return labels[this.availability];
  }
}
