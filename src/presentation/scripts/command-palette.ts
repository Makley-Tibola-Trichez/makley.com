/**
 * Command palette behaviour.
 *
 * Implements the ARIA combobox + listbox pattern:
 *  - Real DOM focus stays in the text input at all times.
 *  - A virtual cursor moves through options via `aria-activedescendant`, so
 *    arrow keys navigate results without stealing focus from the field.
 *  - A polite live region announces how many results matched.
 *
 * Filtering is a plain substring match over a precomputed keyword string.
 * With a few dozen items that is instantaneous, and it avoids shipping a fuzzy
 * search library for a list this size.
 */

import { setPreference, toggleTheme } from './theme';

interface PaletteElements {
  dialog: HTMLDialogElement;
  input: HTMLInputElement;
  items: HTMLLIElement[];
  groups: HTMLLIElement[];
  empty: HTMLElement;
  status: HTMLElement;
}

export function initCommandPalette(): void {
  const dialog = document.querySelector<HTMLDialogElement>('[data-palette]');
  if (!dialog) return;

  const input = dialog.querySelector<HTMLInputElement>('[data-palette-input]');
  const empty = dialog.querySelector<HTMLElement>('[data-palette-empty]');
  const status = dialog.querySelector<HTMLElement>('[data-palette-status]');

  if (!input || !empty || !status) return;

  const elements: PaletteElements = {
    dialog,
    input,
    empty,
    status,
    items: Array.from(dialog.querySelectorAll<HTMLLIElement>('[data-palette-item]')),
    groups: Array.from(dialog.querySelectorAll<HTMLLIElement>('[data-palette-group]')),
  };

  let activeIndex = 0;

  /* ------------------------------------------------------------- selection */

  const visibleItems = (): HTMLLIElement[] => elements.items.filter((item) => !item.hidden);

  const setActive = (index: number): void => {
    const visible = visibleItems();
    if (visible.length === 0) {
      elements.input.removeAttribute('aria-activedescendant');
      return;
    }

    // Wrap around: arrowing past the end returns to the top.
    activeIndex = (index + visible.length) % visible.length;

    for (const item of elements.items) item.setAttribute('aria-selected', 'false');

    const active = visible[activeIndex];
    if (!active) return;

    active.setAttribute('aria-selected', 'true');
    elements.input.setAttribute('aria-activedescendant', active.id);
    active.scrollIntoView({ block: 'nearest' });
  };

  /* --------------------------------------------------------------- filter */

  const filter = (query: string): void => {
    const normalized = query
      .trim()
      .toLowerCase()
      .normalize('NFD')
      .replace(/[̀-ͯ]/g, '');

    for (const item of elements.items) {
      const keywords = (item.dataset.keywords ?? '')
        .normalize('NFD')
        .replace(/[̀-ͯ]/g, '');
      const label = (item.textContent ?? '')
        .toLowerCase()
        .normalize('NFD')
        .replace(/[̀-ͯ]/g, '');

      item.hidden = normalized.length > 0 && !keywords.includes(normalized) && !label.includes(normalized);
    }

    // Hide a group heading when everything under it was filtered out.
    for (const group of elements.groups) {
      const groupItems = Array.from(group.querySelectorAll<HTMLLIElement>('[data-palette-item]'));
      group.hidden = groupItems.every((item) => item.hidden);
    }

    const count = visibleItems().length;
    elements.empty.hidden = count > 0;
    elements.status.textContent =
      count === 0 ? 'Nenhum resultado' : `${count} ${count === 1 ? 'resultado' : 'resultados'}`;

    setActive(0);
  };

  /* --------------------------------------------------------------- actions */

  const runAction = (action: string): void => {
    switch (action) {
      case 'toggle-theme':
        toggleTheme();
        break;
      case 'system-theme':
        setPreference('system');
        break;
      case 'copy-email': {
        const email = document.querySelector<HTMLAnchorElement>('a[href^="mailto:"]');
        const value = email?.href.replace('mailto:', '') ?? '';
        void navigator.clipboard?.writeText(value).then(() => {
          elements.status.textContent = 'E-mail copiado';
        });
        break;
      }
    }
  };

  const activate = (item: HTMLElement): void => {
    const href = item.dataset.href;
    const action = item.dataset.action;

    window.posthog?.capture('command_palette_item_selected', {
      item_id: item.id,
      selection_type: href ? 'navigation' : 'action',
    });

    if (href) {
      close();
      window.location.href = href;
      return;
    }

    if (action) {
      runAction(action);
      // Theme actions are visible behind the dialog, so keep it open for
      // comparison; anything else has done its job and should dismiss.
      if (action === 'copy-email') close();
    }
  };

  /* ------------------------------------------------------------ open/close */

  function open(): void {
    if (dialog!.open) return;
    dialog!.showModal();
    document.documentElement.classList.add('u-no-scroll');
    elements.input.value = '';
    filter('');
    elements.input.focus();
  }

  function close(): void {
    if (dialog!.open) dialog!.close();
  }

  dialog.addEventListener('close', () => {
    document.documentElement.classList.remove('u-no-scroll');
  });

  /* ------------------------------------------------------------- listeners */

  document.addEventListener('keydown', (event) => {
    const isPaletteShortcut = (event.key === 'k' || event.key === 'K') && (event.metaKey || event.ctrlKey);

    if (isPaletteShortcut) {
      event.preventDefault();
      dialog.open ? close() : open();
      return;
    }

    // `/` is a familiar "focus search" shortcut, but must not hijack typing.
    if (event.key === '/' && !dialog.open) {
      const target = event.target as HTMLElement | null;
      const isTyping =
        target instanceof HTMLInputElement ||
        target instanceof HTMLTextAreaElement ||
        target?.isContentEditable === true;

      if (!isTyping) {
        event.preventDefault();
        open();
      }
    }
  });

  document.addEventListener('click', (event) => {
    const target = event.target as HTMLElement | null;
    if (target?.closest('[data-palette-open]')) open();
    if (target?.closest('[data-palette-close]')) close();
  });

  dialog.addEventListener('click', (event) => {
    // Backdrop click.
    if (event.target === dialog) {
      close();
      return;
    }

    const item = (event.target as HTMLElement | null)?.closest<HTMLElement>('[data-palette-item]');
    if (item) activate(item);
  });

  dialog.addEventListener('pointermove', (event) => {
    const item = (event.target as HTMLElement | null)?.closest<HTMLLIElement>('[data-palette-item]');
    if (!item) return;

    const index = visibleItems().indexOf(item);
    if (index >= 0 && index !== activeIndex) setActive(index);
  });

  elements.input.addEventListener('input', () => filter(elements.input.value));

  elements.input.addEventListener('keydown', (event) => {
    switch (event.key) {
      case 'ArrowDown':
        event.preventDefault();
        setActive(activeIndex + 1);
        break;
      case 'ArrowUp':
        event.preventDefault();
        setActive(activeIndex - 1);
        break;
      case 'Home':
        event.preventDefault();
        setActive(0);
        break;
      case 'End':
        event.preventDefault();
        setActive(visibleItems().length - 1);
        break;
      case 'Enter': {
        event.preventDefault();
        const active = visibleItems()[activeIndex];
        if (active) activate(active);
        break;
      }
    }
  });

  filter('');
}
