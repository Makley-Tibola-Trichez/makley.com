/**
 * Copy-to-clipboard for the e-mail address.
 *
 * Feedback is both visual (the label changes) and announced (the button's
 * accessible name updates), because a purely visual "Copiado!" is invisible to
 * a screen reader user who just pressed the button.
 */

const RESET_DELAY_MS = 2000;

export function initCopyEmail(): void {
  document.addEventListener('click', async (event) => {
    const button = (event.target as HTMLElement | null)?.closest<HTMLButtonElement>(
      '[data-copy-email]',
    );

    if (!button) return;

    const value = button.dataset.value;
    if (!value || !navigator.clipboard) return;

    const label = button.querySelector<HTMLElement>('[data-copy-label]');
    const originalLabel = label?.textContent ?? 'Copiar';
    const originalAria = button.getAttribute('aria-label') ?? '';

    try {
      await navigator.clipboard.writeText(value);

      if (label) label.textContent = 'Copiado!';
      button.setAttribute('aria-label', `E-mail ${value} copiado`);
    } catch {
      if (label) label.textContent = 'Falhou';
      button.setAttribute('aria-label', 'Não foi possível copiar o e-mail');
    }

    window.setTimeout(() => {
      if (label) label.textContent = originalLabel;
      button.setAttribute('aria-label', originalAria);
    }, RESET_DELAY_MS);
  });
}
