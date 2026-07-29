/**
 * PostHog analytics — optional via environment variables. With
 * `PUBLIC_POSTHOG_PROJECT_TOKEN` unset, `posthog-js` is
 * never fetched: the `import()` below is dynamic specifically so the browser
 * never requests that chunk unless the key check passes. A static top-level
 * import would bundle the library into every visit regardless of whether
 * analytics is configured, quietly breaking this site's "no optional feature
 * costs a byte until it's turned on" rule.
 *
 * `persistence: 'localStorage'` avoids setting a tracking cookie, keeping the
 * "no cookies without consent" posture the rest of the site follows. Because
 * that means no cross-site identifier, cookie-consent banners are not
 * required for this setup — but re-check this if capture options ever change.
 */
const KEY = import.meta.env.PUBLIC_POSTHOG_PROJECT_TOKEN as string | undefined;
const HOST = import.meta.env.PUBLIC_POSTHOG_HOST as string | undefined;

export async function initAnalytics(): Promise<void> {
  if (!KEY || !HOST) return;

  const { default: posthog } = await import('posthog-js');

  posthog.init(KEY, {
    api_host: HOST,
    person_profiles: 'identified_only',
    capture_pageview: true,
    capture_exceptions: {
      capture_unhandled_errors: true,
      capture_unhandled_rejections: true,
      capture_console_errors: false,
    },
    persistence: 'localStorage',
  });
}
