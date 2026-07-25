/**
 * Cursor spotlight for cards.
 *
 * One delegated `pointermove` listener for the entire page instead of one per
 * card, and all work is deferred to `requestAnimationFrame` so a fast mouse
 * cannot cause more style writes than there are frames.
 *
 * Skipped entirely on coarse pointers (touch) — there is no cursor to follow,
 * and the listener would only cost battery.
 */

const CARD_SELECTOR = '[data-project-card], [data-spotlight]';

export function initSpotlight(): void {
  const hasFinePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (!hasFinePointer || prefersReducedMotion) return;

  let frame = 0;
  let pending: { card: HTMLElement; x: number; y: number } | null = null;

  document.addEventListener(
    'pointermove',
    (event) => {
      const card = (event.target as HTMLElement | null)?.closest<HTMLElement>(CARD_SELECTOR);
      if (!card) return;

      const rect = card.getBoundingClientRect();
      pending = {
        card,
        x: event.clientX - rect.left,
        y: event.clientY - rect.top,
      };

      if (frame) return;

      frame = requestAnimationFrame(() => {
        frame = 0;
        if (!pending) return;

        pending.card.style.setProperty('--spotlight-x', `${pending.x}px`);
        pending.card.style.setProperty('--spotlight-y', `${pending.y}px`);
        pending = null;
      });
    },
    { passive: true },
  );
}
