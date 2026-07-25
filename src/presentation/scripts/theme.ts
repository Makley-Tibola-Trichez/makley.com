/**
 * Theme preference management.
 *
 * Contract shared with the inline bootstrap script in `BaseLayout.astro`:
 *  - `localStorage['theme']` holds `'light' | 'dark'`, or is absent to mean
 *    "follow the operating system".
 *  - `<html data-theme>` always reflects the *effective* theme so CSS only ever
 *    has to look at one attribute.
 *
 * Kept as a module (rather than inline) so it is bundled, minified and shared
 * between the header toggle and the command palette.
 */

export type Theme = 'light' | 'dark';
export type ThemePreference = Theme | 'system';

const STORAGE_KEY = 'theme';

export function getSystemTheme(): Theme {
  return window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
}

export function getPreference(): ThemePreference {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored === 'light' || stored === 'dark' ? stored : 'system';
  } catch {
    // Private browsing modes can throw on storage access — degrade to system.
    return 'system';
  }
}

export function getEffectiveTheme(): Theme {
  const preference = getPreference();
  return preference === 'system' ? getSystemTheme() : preference;
}

export function applyTheme(theme: Theme): void {
  document.documentElement.dataset.theme = theme;

  // Keep the browser UI (address bar, notch area) in step with the page.
  const meta = document.querySelector<HTMLMetaElement>('meta[name="theme-color"]');
  if (meta) {
    meta.content = theme === 'light' ? '#fbfbfa' : '#08090A';
  }

  document.dispatchEvent(new CustomEvent<Theme>('themechange', { detail: theme }));
}

export function setPreference(preference: ThemePreference): void {
  try {
    if (preference === 'system') {
      localStorage.removeItem(STORAGE_KEY);
    } else {
      localStorage.setItem(STORAGE_KEY, preference);
    }
  } catch {
    /* Storage unavailable: the choice simply will not persist. */
  }

  applyTheme(preference === 'system' ? getSystemTheme() : preference);
}

export function toggleTheme(): Theme {
  const next: Theme = getEffectiveTheme() === 'dark' ? 'light' : 'dark';
  setPreference(next);
  return next;
}

let initialised = false;

export function initThemeToggle(): void {
  // Guard: the component's `<script>` runs once per page, but a bfcache restore
  // or a repeated import must not attach a second listener.
  if (initialised) return;
  initialised = true;

  document.addEventListener('click', (event) => {
    const trigger = (event.target as HTMLElement | null)?.closest('[data-theme-toggle]');
    if (trigger) toggleTheme();
  });

  // Track the OS only while the visitor has not chosen explicitly.
  window
    .matchMedia('(prefers-color-scheme: light)')
    .addEventListener('change', () => {
      if (getPreference() === 'system') applyTheme(getSystemTheme());
    });
}
