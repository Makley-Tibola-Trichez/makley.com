/**
 * Contact form enhancement.
 *
 * Validation is deliberately *not* delegated to `:invalid` styling: fields are
 * only marked after the visitor has attempted to submit (or after they leave a
 * field they already broke). Colouring every empty required field red on load
 * is a well-documented way to make a form feel hostile.
 *
 * Errors set `aria-invalid` and fill an `aria-describedby` target, so a screen
 * reader user hears the specific problem when they land on the field — not just
 * "invalid entry".
 */

interface FieldRule {
  readonly required: boolean;
  readonly minLength?: number;
  readonly email?: boolean;
  readonly messages: {
    readonly required: string;
    readonly invalid?: string;
    readonly tooShort?: string;
  };
}

const RULES: Record<string, FieldRule> = {
  nome: {
    required: true,
    minLength: 2,
    messages: {
      required: 'Informe o seu nome.',
      tooShort: 'O nome está muito curto.',
    },
  },
  email: {
    required: true,
    email: true,
    messages: {
      required: 'Informe o seu e-mail para que eu possa responder.',
      invalid: 'Esse e-mail não parece válido.',
    },
  },
  mensagem: {
    required: true,
    minLength: 20,
    messages: {
      required: 'Escreva uma mensagem.',
      tooShort: 'Conte um pouco mais — pelo menos 20 caracteres.',
    },
  },
};

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

function validateField(field: HTMLInputElement | HTMLTextAreaElement): string | null {
  const rule = RULES[field.name];
  if (!rule) return null;

  const value = field.value.trim();

  if (rule.required && value.length === 0) return rule.messages.required;
  if (rule.email && !EMAIL_PATTERN.test(value)) return rule.messages.invalid ?? 'Valor inválido.';
  if (rule.minLength && value.length < rule.minLength) {
    return rule.messages.tooShort ?? 'Valor muito curto.';
  }

  return null;
}

export function initContactForm(): void {
  const form = document.querySelector<HTMLFormElement>('[data-contact-form]');
  if (!form) return;

  const status = form.querySelector<HTMLElement>('[data-form-status]');
  const submit = form.querySelector<HTMLButtonElement>('button[type="submit"]');
  const endpoint = form.dataset.endpoint ?? '';

  const fields = Array.from(
    form.querySelectorAll<HTMLInputElement | HTMLTextAreaElement>('input[name], textarea[name]'),
  ).filter((field) => field.name in RULES);

  const showError = (field: HTMLInputElement | HTMLTextAreaElement, message: string | null): void => {
    const target = form.querySelector<HTMLElement>(`[data-error-for="${field.name}"]`);

    if (message) {
      field.setAttribute('aria-invalid', 'true');
      if (target) {
        target.textContent = message;
        target.hidden = false;
      }
      return;
    }

    field.removeAttribute('aria-invalid');
    if (target) {
      target.textContent = '';
      target.hidden = true;
    }
  };

  // Re-validate on blur only once a field has already been flagged, so the
  // first pass through the form is never interrupted.
  for (const field of fields) {
    field.addEventListener('blur', () => {
      if (field.getAttribute('aria-invalid') === 'true') {
        showError(field, validateField(field));
      }
    });

    field.addEventListener('input', () => {
      if (field.getAttribute('aria-invalid') === 'true') {
        showError(field, validateField(field));
      }
    });
  }

  const setStatus = (message: string, state: 'success' | 'error' | ''): void => {
    if (!status) return;
    status.textContent = message;
    if (state) {
      status.dataset.state = state;
    } else {
      delete status.dataset.state;
    }
  };

  form.addEventListener('submit', async (event) => {
    let firstInvalid: HTMLElement | null = null;

    for (const field of fields) {
      const message = validateField(field);
      showError(field, message);
      if (message && !firstInvalid) firstInvalid = field;
    }

    if (firstInvalid) {
      event.preventDefault();
      firstInvalid.focus();
      setStatus('Revise os campos destacados antes de enviar.', 'error');
      return;
    }

    // Bot filled the honeypot: pretend everything is fine and drop it.
    const honeypot = form.querySelector<HTMLInputElement>('input[name="website"]');
    if (honeypot && honeypot.value.length > 0) {
      event.preventDefault();
      setStatus('Mensagem enviada. Obrigado!', 'success');
      form.reset();
      return;
    }

    // Without an endpoint the browser handles the `mailto:` action natively —
    // do not intercept, or the mail client never opens.
    if (!endpoint) {
      setStatus('Abrindo o seu cliente de e-mail…', '');
      return;
    }

    event.preventDefault();

    submit?.setAttribute('disabled', '');
    setStatus('Enviando…', '');

    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: { Accept: 'application/json' },
        body: new FormData(form),
      });

      if (!response.ok) throw new Error(`HTTP ${response.status}`);

      window.posthog?.capture('contact_form_submitted', {
        submission_method: 'configured_endpoint',
      });
      form.reset();
      setStatus('Mensagem enviada. Respondo em até 48 horas.', 'success');
    } catch {
      setStatus(
        'Não consegui enviar agora. Escreva direto para tibolamakley1@gmail.com.',
        'error',
      );
    } finally {
      submit?.removeAttribute('disabled');
    }
  });
}
