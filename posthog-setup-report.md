# PostHog setup report

PostHog browser analytics was initialized for the Astro portfolio, four anonymous interaction events were instrumented, exception autocapture was enabled, and a starter dashboard was created.

## What was set up

- **SDK:** `posthog-js` was already present in `package.json` at `^1.407.3`; no dependency installation was needed. The required package manager was detected as pnpm.
- **Initialization:** `PUBLIC_POSTHOG_PROJECT_TOKEN` and `PUBLIC_POSTHOG_HOST` were configured in `.env` using the wizard tools and documented in `.env.example`. `src/presentation/components/posthog.astro` contains the inline, environment-gated, queueing browser initialization and is mounted once through `src/presentation/layouts/BaseLayout.astro`.
- **Initialization review:** A duplicate `initAnalytics()` call was removed from `BaseLayout.astro`. The legacy `src/presentation/scripts/analytics.ts` remains in the repository but is unused after that change.
- **Error tracking:** PostHog JS exception autocapture is enabled for unhandled errors and unhandled promise rejections in `posthog.astro` and the legacy `analytics.ts` path. Console-error capture was left disabled. No manual error wrappers were added.
- **Identity:** User identification was intentionally skipped. The application has no authentication, user sessions, login or registration flow, logout boundary, API routes, or account model, so no stable authenticated identifier exists.

## Events instrumented

These are the events defined in `.posthog-wizard-cache/.posthog-events.json` and wired by the capture step:

| Event | What it measures | File |
|---|---|---|
| `contact_form_submitted` | A visitor successfully submits the configured contact form. Mailto fallback submissions are not tracked because they leave the page. | `src/presentation/scripts/contact-form.ts` |
| `email_copied` | A visitor copies the portfolio contact email address. | `src/presentation/scripts/copy-email.ts` |
| `project_filter_applied` | A visitor applies a project category filter. | `src/presentation/scripts/project-filter.ts` |
| `command_palette_item_selected` | A visitor selects a navigation link or utility action from the command palette. | `src/presentation/scripts/command-palette.ts` |

All four events are intentionally anonymous and use bounded, non-PII properties where applicable. No event capture was observed arriving in PostHog during this run; browser delivery was not exercised.

## Dashboard

[Analytics basics (wizard)](https://us.posthog.com/project/531144/dashboard/1920387)

The dashboard contains five saved insights covering the four event trends, project interest by category, and a project-exploration-to-contact conversion funnel. The insights are configured for the last 30 days and can populate once events arrive.

## What the run verified

- `astro check` completed with 0 errors, 0 warnings, and 0 hints.
- `astro build` completed successfully for all 11 pages.
- The configured public environment keys were confirmed present without exposing their values.
- The dashboard and five insight tiles were created in PostHog project 531144.

## What remains unconfirmed

- No browser session was run, so the run did not confirm that the SDK loads in a deployed browser, that any of the four events reaches PostHog, or that exception events arrive.
- No test suite was run. The project has no lint script, so no lint command applied.
- The installed dependency set was not refreshed: `pnpm install` stopped because pnpm refused to remove the modules directory without a TTY. The existing dependency set was sufficient for the successful build.
- No CSP was found, and no CSP browser check was performed.

## Issues to follow up

- **Dependency-install conflict:** `pnpm install` failed with `ERR_PNPM_ABORTED_REMOVE_MODULES_DIR_NO_TTY` in the non-interactive environment. The build passed using the existing `node_modules`, but a normal install should be run in CI or a TTY before merging to verify lockfile reproducibility.
- **Legacy initialization path:** `src/presentation/scripts/analytics.ts` still contains an initialization path and exception settings but is unused after duplicate initialization was removed from `BaseLayout.astro`. Leaving it in place risks future duplicate initialization if reintroduced; remove or deliberately repurpose it in a follow-up.

## Next steps

1. Set `PUBLIC_POSTHOG_PROJECT_TOKEN` and `PUBLIC_POSTHOG_HOST` in every deployment environment, not only the local `.env`; keep the real values out of source control.
2. Open a deployed site in a normal browser and exercise the contact form, email copy control, project filter, and command palette. Confirm the four named events appear in PostHog and that the dashboard tiles populate.
3. Trigger a controlled browser error in a non-production test environment and confirm exception autocapture appears in PostHog Error Tracking.
4. Run the repository test suite and a clean production install/build before merging.
5. If authentication is added later, identify users at the real login/registration boundary with a stable account ID and reset on logout or account switching; do not invent an identifier for the current anonymous portfolio.

## Before you merge

- [ ] Run a full production build and fix any generated-code type or build errors; inspect `src/presentation/components/posthog.astro`, `src/presentation/layouts/BaseLayout.astro`, and the four instrumented scripts listed above.
- [ ] Run the test suite and update any mocks or fixtures covering `src/presentation/scripts/contact-form.ts`, `copy-email.ts`, `project-filter.ts`, and `command-palette.ts`.
- [ ] Configure the exact environment variables documented in `.env.example`—`PUBLIC_POSTHOG_PROJECT_TOKEN` and `PUBLIC_POSTHOG_HOST`—in each deployment environment; verify the initialization guard in `src/presentation/components/posthog.astro`.
- [ ] In a deployed browser, exercise the four call sites in `src/presentation/scripts/contact-form.ts`, `copy-email.ts`, `project-filter.ts`, and `command-palette.ts`, then confirm events arrive in the linked dashboard; the run itself did not verify delivery.
- [ ] Resolve the unused legacy initialization module in `src/presentation/scripts/analytics.ts` before reusing it, so a future caller cannot create duplicate PostHog initialization.
