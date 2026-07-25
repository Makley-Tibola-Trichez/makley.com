/**
 * Category filtering for the project grid.
 *
 * The grid is fully server-rendered; this only toggles visibility. That keeps
 * every project in the crawlable HTML and makes filtering feel instant.
 *
 * State is mirrored into the `?categoria=` query string with `replaceState`, so
 * a filtered view can be shared or reloaded without adding a history entry per
 * click — which would otherwise turn the back button into a filter-undo trap.
 */

const PARAM = 'categoria';

export function initProjectFilters(): void {
  const container = document.querySelector<HTMLElement>('[data-project-filters]');
  const grid = document.querySelector<HTMLElement>('[data-project-grid]');

  if (!container || !grid) return;

  const chips = Array.from(container.querySelectorAll<HTMLButtonElement>('[data-filter]'));
  const cards = Array.from(grid.querySelectorAll<HTMLElement>('[data-project-card]'));
  const counter = document.querySelector<HTMLElement>('[data-project-count]');
  const empty = document.querySelector<HTMLElement>('[data-project-empty]');

  if (chips.length === 0 || cards.length === 0) return;

  const apply = (category: string, { updateUrl = true } = {}): void => {
    let matches = 0;

    for (const card of cards) {
      const isMatch = category === 'todos' || card.dataset.category === category;
      card.hidden = !isMatch;
      if (isMatch) matches += 1;
    }

    for (const chip of chips) {
      chip.setAttribute('aria-pressed', String(chip.dataset.filter === category));
    }

    if (counter) {
      counter.textContent = `${matches} ${matches === 1 ? 'projeto' : 'projetos'}`;
    }

    if (empty) empty.hidden = matches > 0;

    if (updateUrl) {
      const url = new URL(window.location.href);

      if (category === 'todos') {
        url.searchParams.delete(PARAM);
      } else {
        url.searchParams.set(PARAM, category);
      }

      window.history.replaceState({}, '', url);
    }
  };

  container.addEventListener('click', (event) => {
    const chip = (event.target as HTMLElement | null)?.closest<HTMLButtonElement>('[data-filter]');
    if (!chip?.dataset.filter) return;

    apply(chip.dataset.filter);
  });

  // Restore the filter from the URL on load so a shared link opens filtered.
  const initial = new URL(window.location.href).searchParams.get(PARAM);
  const isKnown = initial !== null && chips.some((chip) => chip.dataset.filter === initial);

  if (isKnown && initial) apply(initial, { updateUrl: false });
}
