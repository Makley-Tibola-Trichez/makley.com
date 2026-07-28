/**
 * PostHog analytics — opt-in via environment variable, exactly like the
 * contact-form endpoint. With `PUBLIC_POSTHOG_KEY` unset, `posthog-js` is
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
const KEY = import.meta.env.PUBLIC_POSTHOG_KEY as string | undefined;
const HOST =
  (import.meta.env.PUBLIC_POSTHOG_HOST as string | undefined) ?? 'https://us.i.posthog.com';

export async function initAnalytics(): Promise<void> {
  if (!KEY) return;

  const { default: posthog } = await import('posthog-js');

  posthog.init(KEY, {
    api_host: HOST,
    person_profiles: 'identified_only',
    capture_pageview: true,
    persistence: 'localStorage',
  });
}
