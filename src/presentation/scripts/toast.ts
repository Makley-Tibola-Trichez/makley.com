/**
 * Site-wide toast notifications.
 *
 * A single `[data-toast]` instance lives in `BaseLayout`; this module is the
 * only thing that talks to it, so any script can surface a transient message
 * without owning markup or managing its own timers.
 */

const VISIBLE_DURATION_MS = 5000;

let hideTimeout: number | undefined;

export function showToast(message: string, variant: 'success' | 'error' = 'success'): void {
  const toast = document.querySelector<HTMLElement>('[data-toast]');
  const text = toast?.querySelector<HTMLElement>('[data-toast-message]');
  if (!toast || !text) return;

  window.clearTimeout(hideTimeout);

  text.textContent = message;
  toast.dataset.state = variant;
  toast.dataset.visible = 'true';

  hideTimeout = window.setTimeout(() => {
    delete toast.dataset.visible;
  }, VISIBLE_DURATION_MS);
}
