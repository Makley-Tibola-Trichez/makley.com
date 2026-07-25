import { InvalidValueObjectError } from '../errors';

/**
 * A URL-safe identifier.
 *
 * Modelled as a value object rather than a bare `string` so that "this string
 * is safe to interpolate into a route" is guaranteed by the type system instead
 * of by convention. Every `/projetos/[slug]` route is built from one of these.
 */
export class Slug {
  private static readonly PATTERN = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

  /** Combining diacritical marks left behind by NFD normalisation. */
  private static readonly DIACRITICS = /[̀-ͯ]/g;

  private constructor(public readonly value: string) {}

  static create(raw: string): Slug {
    const normalized = raw.trim().toLowerCase();

    if (!Slug.PATTERN.test(normalized)) {
      throw new InvalidValueObjectError(
        'Slug',
        raw,
        'Deve conter apenas letras minúsculas, números e hífens simples',
      );
    }

    return new Slug(normalized);
  }

  /** Derives a slug from free text, accent-insensitive (`Ciência` → `ciencia`). */
  static fromText(text: string): Slug {
    const normalized = text
      .normalize('NFD')
      .replace(Slug.DIACRITICS, '')
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '');

    return Slug.create(normalized);
  }

  equals(other: Slug): boolean {
    return this.value === other.value;
  }

  toString(): string {
    return this.value;
  }
}
