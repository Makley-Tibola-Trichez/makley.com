/**
 * Scroll-reveal animations.
 *
 * Design constraints this implementation respects:
 *  1. **Content first.** Elements are styled visible by default. The
 *     `js-reveal-ready` class — which is what actually hides them — is only
 *     added once this script confirms it can reveal them again. With JS
 *     disabled or broken, nothing is ever stuck invisible.
 *  2. **No motion when unwanted.** `prefers-reduced-motion` short-circuits the
 *     whole thing; the observer is never created.
 *  3. **Cheap.** One shared IntersectionObserver, elements unobserved after
 *     firing, no scroll listener, no layout reads.
 */

const REVEAL_SELECTOR = '[data-reveal]';
const READY_CLASS = 'js-reveal-ready';
const REVEALED_CLASS = 'is-revealed';

/** Cascade delay between siblings, capped so long lists never feel sluggish. */
const STAGGER_MS = 60;
const MAX_STAGGER_MS = 240;

export function initReveal(): void {
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (prefersReducedMotion || !('IntersectionObserver' in window)) return;

  const elements = Array.from(document.querySelectorAll<HTMLElement>(REVEAL_SELECTOR));
  if (elements.length === 0) return;

  document.documentElement.classList.add(READY_CLASS);

  const observer = new IntersectionObserver(
    (entries) => {
      // Group entries that appear together so siblings cascade rather than all
      // landing on the same frame.
      let index = 0;

      for (const entry of entries) {
        if (!entry.isIntersecting) continue;

        const element = entry.target as HTMLElement;
        const delay = Math.min(index * STAGGER_MS, MAX_STAGGER_MS);
        element.style.setProperty('--reveal-delay', `${delay}ms`);
        element.classList.add(REVEALED_CLASS);

        observer.unobserve(element);
        index += 1;
      }
    },
    {
      // Trigger slightly before the element reaches the viewport so the motion
      // completes as it arrives rather than starting late.
      rootMargin: '0px 0px -12% 0px',
      threshold: 0.05,
    },
  );

  for (const element of elements) {
    // Anything already on screen at load (the hero) is revealed immediately —
    // animating it would delay the largest contentful paint for no benefit.
    const rect = element.getBoundingClientRect();
    if (rect.top < window.innerHeight * 0.9) {
      element.classList.add(REVEALED_CLASS);
      continue;
    }

    observer.observe(element);
  }
}
