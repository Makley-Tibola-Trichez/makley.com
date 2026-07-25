import { InvalidValueObjectError } from '../errors';

/**
 * What a link *means*, not what it looks like.
 *
 * Presentation (icon, label, `rel` attributes) is derived from this in the UI
 * layer, so adding a new destination type never requires touching a template's
 * conditional logic in more than one place.
 */
export type LinkKind =
  | 'website'
  | 'repository'
  | 'demo'
  | 'article'
  | 'case-study'
  | 'store'
  | 'other';

export interface ExternalLinkProps {
  readonly url: string;
  readonly label: string;
  readonly kind?: LinkKind;
}

export class ExternalLink {
  private constructor(
    public readonly url: string,
    public readonly label: string,
    public readonly kind: LinkKind,
  ) {}

  static create({ url, label, kind = 'other' }: ExternalLinkProps): ExternalLink {
    let parsed: URL;

    try {
      parsed = new URL(url);
    } catch {
      throw new InvalidValueObjectError('ExternalLink', url, 'URL inválida');
    }

    if (parsed.protocol !== 'https:' && parsed.protocol !== 'mailto:' && parsed.protocol !== 'tel:') {
      throw new InvalidValueObjectError(
        'ExternalLink',
        url,
        'Somente https:, mailto: e tel: são permitidos',
      );
    }

    return new ExternalLink(url, label, kind);
  }

  /** `agronota.com.br` — hostname without `www.`, for display next to links. */
  get displayHost(): string {
    try {
      return new URL(this.url).hostname.replace(/^www\./, '');
    } catch {
      return this.url;
    }
  }

  get isExternal(): boolean {
    return this.url.startsWith('http');
  }

  /**
   * `noopener` prevents the opened page from reaching back through
   * `window.opener`; `noreferrer` avoids leaking the visitor's path.
   */
  get relAttribute(): string | undefined {
    return this.isExternal ? 'noopener noreferrer' : undefined;
  }

  get targetAttribute(): string | undefined {
    return this.isExternal ? '_blank' : undefined;
  }
}
