/**
 * A structural description of an optimisable image.
 *
 * The domain must not import from `astro:assets`, but it still needs to carry
 * images. `ImageMetadata` (what Astro's `image()` schema helper produces)
 * structurally satisfies this interface, so the entity stays framework-agnostic
 * while the presentation layer can hand the same object straight to `<Image>`
 * and get AVIF/WebP + intrinsic `width`/`height` (i.e. zero CLS) for free.
 */
export interface ImageRef {
  readonly src: string;
  readonly width: number;
  readonly height: number;
  readonly format?: string;
}

/**
 * An image plus its alternative text.
 *
 * `alt` is required, not optional: a decorative-only content image does not
 * exist in this project, and making it mandatory means a missing description
 * fails the build instead of shipping a WCAG 1.1.1 violation.
 */
export interface DescribedImage {
  readonly image: ImageRef;
  readonly alt: string;
  readonly caption?: string;
}
