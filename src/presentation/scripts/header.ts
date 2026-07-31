/**
 * Header behaviour: frosted-on-scroll, scroll spy, mobile menu dialog.
 *
 * Every listener here is passive or delegated, and the scroll spy uses an
 * IntersectionObserver rather than a scroll handler — no layout reads happen
 * during scrolling, which is what keeps this off the main-thread critical path.
 */

export function initHeader(): void {
  initScrollState();
  initScrollSpy();
  initMobileMenu();
  initLanguageSwitcher();
}

/** Adds `data-scrolled` once the page leaves the top, for the frosted bar. */
function initScrollState(): void {
  const header = document.querySelector<HTMLElement>('[data-site-header]');
  if (!header) return;

  const sentinel = document.createElement('div');
  sentinel.setAttribute('aria-hidden', 'true');
  sentinel.style.cssText = 'position:absolute;top:0;left:0;width:1px;height:1px;';
  document.body.prepend(sentinel);

  // A sentinel + observer replaces a scroll listener entirely: the browser tells
  // us when the top of the document leaves the viewport.
  const observer = new IntersectionObserver(
    ([entry]) => {
      if (!entry) return;
      header.toggleAttribute('data-scrolled', !entry.isIntersecting);
    },
    { rootMargin: '0px' },
  );

  observer.observe(sentinel);
}

/** Highlights the nav item matching the section currently in view. */
function initScrollSpy(): void {
  const links = Array.from(document.querySelectorAll<HTMLAnchorElement>('[data-nav-link]'));
  if (links.length === 0) return;

  const sections = links
    .map((link) => {
      const hash = link.dataset.navLink;
      return hash ? document.querySelector<HTMLElement>(hash) : null;
    })
    .filter((section): section is HTMLElement => section !== null);

  if (sections.length === 0) return;

  const setActive = (id: string): void => {
    for (const link of links) {
      link.toggleAttribute('data-active', link.dataset.navLink === `#${id}`);
    }
  };

  const observer = new IntersectionObserver(
    (entries) => {
      // Pick the entry closest to the top of the viewport rather than simply the
      // last one to intersect — otherwise fast scrolling lands on the wrong item.
      const visible = entries
        .filter((entry) => entry.isIntersecting)
        .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);

      const first = visible[0];
      if (first) setActive(first.target.id);
    },
    {
      // Band across the upper-middle of the viewport: a section counts as
      // "current" while its content occupies the reading area.
      rootMargin: '-20% 0px -70% 0px',
      threshold: 0,
    },
  );

  for (const section of sections) observer.observe(section);
}

/** Native `<dialog>` mobile menu — focus trap and Esc handling come for free. */
function initMobileMenu(): void {
  const dialog = document.querySelector<HTMLDialogElement>('[data-menu]');
  if (!dialog) return;

  const open = (): void => {
    dialog.showModal();
    // Prevent the page behind the dialog from scrolling on iOS.
    document.documentElement.classList.add('u-no-scroll');
  };

  const close = (): void => {
    dialog.close();
  };

  dialog.addEventListener('close', () => {
    document.documentElement.classList.remove('u-no-scroll');
  });

  document.addEventListener('click', (event) => {
    const target = event.target as HTMLElement | null;
    if (!target) return;

    if (target.closest('[data-menu-open]')) open();
    if (target.closest('[data-menu-close]')) close();
    // Anchor navigation inside the dialog must dismiss it, otherwise the modal
    // stays on top of the section it just scrolled to.
    if (target.closest('[data-menu-link]')) close();
  });

  // Clicking the backdrop (the dialog element itself, outside the panel).
  dialog.addEventListener('click', (event) => {
    if (event.target === dialog) close();
  });
}

/**
 * Each option is a real `<a href>` to the target locale's home URL (computed
 * server-side via `getRelativeLocaleUrl`) — the menu works with JS disabled,
 * just without the toggle or the hash-preserving enhancement below.
 */
function initLanguageSwitcher(): void {
  const root = document.querySelector<HTMLElement>('[data-lang-switcher]');
  const trigger = root?.querySelector<HTMLButtonElement>('[data-lang-trigger]');
  const menu = root?.querySelector<HTMLElement>('[data-lang-menu]');
  if (!root || !trigger || !menu) return;

  const close = (): void => {
    menu.hidden = true;
    trigger.setAttribute('aria-expanded', 'false');
  };

  const open = (): void => {
    menu.hidden = false;
    trigger.setAttribute('aria-expanded', 'true');
  };

  trigger.addEventListener('click', () => {
    if (menu.hidden) open();
    else close();
  });

  document.addEventListener('click', (event) => {
    if (!menu.hidden && !root.contains(event.target as Node)) close();
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && !menu.hidden) {
      close();
      trigger.focus();
    }
  });

  // On the home page, carry the current section hash over so switching
  // language keeps the visitor on the same section instead of dropping them
  // at the top of the page.
  for (const option of menu.querySelectorAll<HTMLAnchorElement>('[data-lang-option]')) {
    option.addEventListener('click', (event) => {
      if (option.dataset.preserveHash === 'true' && window.location.hash) {
        event.preventDefault();
        window.location.href = option.href + window.location.hash;
      }
    });
  }
}
