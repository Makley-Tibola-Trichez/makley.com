---
name: i18n-sync
description: Use proactively whenever pt-BR content in src/content/ (profile, experience, education, projects, stack) or UI text in src/presentation/components/organisms|molecules is added, removed, or changed, to keep the English (en) translation in sync. Invoke this immediately after making such an edit, before reporting the task done — don't wait for the user to ask.
---

# Keeping the English translation in sync

This site is bilingual (pt-BR default at `/`, English at `/en/`) via Astro's
native i18n routing. Translation is **not** full-file duplication — it's an
additive override layer, so most PT-BR edits need a small, targeted mirror
edit rather than a full retranslation. This skill is the checklist for that.

Read `src/i18n/locales.ts` first if you haven't touched this codebase's i18n
layer recently — it's the zero-dependency source of truth for `Locale` and
is imported from every layer below.

## 1. Figure out what kind of change happened

**A. Content collection edit** — a file under `src/content/{profile,experience,education,projects,stack}/`.

**B. UI chrome text edit** — a hardcoded string changed inside an
`.astro` file under `src/presentation/components/organisms/` or
`molecules/`, or inside a `src/presentation/scripts/*.ts` that emits
user-facing text (e.g. `contact-form.ts`, `command-palette.ts`).

Handle whichever applies; a single commit may need both.

## 2. Content collection edits (case A)

Each collection has a matching `*Translations` collection registered in
`src/content.config.ts`, loaded from the **same directory**, filename
`<original-name>.<locale>.<ext>` (e.g. `01-sicredi.en.yaml`,
`agronota.en.yaml`, `main.en.yaml`). Only translatable fields are optional in
that schema — everything else (proper nouns, URLs, numeric-only values)
falls back to the canonical PT-BR file automatically, so never duplicate
those fields into the override.

| Collection | Canonical file | Override file | Translatable fields | Stays PT-BR / untouched |
|---|---|---|---|---|
| `profile` | `src/content/profile/main.yaml` | `main.en.yaml` | `bio[]`, `location`, `availabilityNote`, `specialties[]`, `focusAreas[]`, `goals[]`, `languages[]`, `resumePath` | `name`, `email`, `phone`, `socials[]`, `stats[]`, `avatar`, `headline`, `heroStatement`, `heroIntro`, `title` |
| `experience` | `src/content/experience/NN-slug.yaml` | `NN-slug.en.yaml` | `role`, `seniority`, `location`, `summary`, `responsibilities[]`, `achievements[]` (value+label pairs) | `company`, `companyUrl`, `technologies[]`, `employmentType`, `start`/`end` |
| `education` | `src/content/education/NN-slug.yaml` | `NN-slug.en.yaml` | `credential`, `description`, `highlights[]` | `institution`, `field`, `credentialUrl`, `kind`, `start`/`end` |
| `projects` | `src/content/projects/slug.md` | `slug.en.yaml` (note: `.yaml`, not `.md` — frontmatter-only, no body) | `title` (only if not a proper product name), `tagline`, `results[]` (translate `.label`, keep `.value` unless it's prose like "Em desenvolvimento") | `category`, `year`, `role`, `technologies[]`, `cover`, `links[]`, and the whole markdown body (`problem`/`solution`/`challenges`/`context`/`summary` are detail-page-only — **out of scope**, see §4) |
| `stack` | `src/content/stack/main.yaml` | *(no override collection)* | Only `note` on `core: true` technologies is ever shown in the UI — see §2a | everything else |

**Procedure:**

1. Identify which canonical file changed and what fields changed.
2. If the changed field is in the "translatable" column above: open (or
   create) the matching `.en.yaml` override and update/add that field with a
   natural English translation — not a literal word-for-word one. Match the
   tone already used in the sibling `.en.yaml` files.
3. If the changed field is in the "stays PT-BR" column: no action needed.
4. **New entry added** (new experience/education/project file): create its
   `.en.yaml` sibling in the same pass. Skipping this doesn't break the
   build — the repository just falls back to PT-BR content for that entry on
   `/en/`, which is a silent, easy-to-miss regression. Always create it.
5. **Entry deleted or renamed**: delete/rename the matching `.en.yaml` file
   too — a stray override with no matching canonical id is simply never
   read (harmless but dead weight; clean it up).

### 2a. Stack technology notes

`technology.note` is only rendered for `core: true` entries, via the
additive lookup `getTechNote()` in `src/i18n/dictionaries/stack.ts`
(`TECH_NOTES_EN`, keyed by technology `id`). If you add/change a `note` on a
`core: true` technology in `src/content/stack/main.yaml`, add/update the
matching entry in `TECH_NOTES_EN`. Notes on non-core technologies are never
displayed, so they don't need an English counterpart.

## 3. UI chrome text edits (case B)

Every organism already reads its strings from `getDictionary(locale)` —
`src/i18n/dictionary.ts` aggregates one file per namespace from
`src/i18n/dictionaries/*.ts` (`about.ts`, `hero.ts`, `stack.ts`,
`projects.ts`, `experience.ts`, `education.ts`, `resume.ts`, `contact.ts`,
`palette.ts`, `header.ts`, `footer.ts`).

**Procedure:**

1. Find the dictionary file owning that namespace (matches the organism:
   `HeroSection` → `hero.ts`, `ContactSection` → `contact.ts`, etc.).
2. Update the string in **both** the `'pt-BR'` and `en` entries of that
   dictionary's `Record<Locale, ...>` object.
3. If you added genuinely new UI text (not previously in any dictionary) —
   e.g. a new label, button, or aria-label in an organism/molecule — **do
   not hardcode it as a plain string in the template**. Add a new field to
   the relevant `*Dictionary` interface and both locale entries, then read
   it via `{t.<field>}` in the component, matching the existing pattern in
   that file. A hardcoded string here is a silent regression: it will render
   in pt-BR even on `/en/` and nothing will catch it at build time.
4. Domain-layer enum labels (`TECH_CATEGORY_LABELS`, `PROJECT_CATEGORY_LABELS`,
   `EMPLOYMENT_TYPE_LABELS`, `EDUCATION_KIND_LABELS`) are intentionally left
   pt-BR-only in the entities themselves — the English equivalents live in
   additive `get*Label(value, locale, fallback)` helpers next to the
   relevant dictionary (`dictionaries/stack.ts`, `dictionaries/projects.ts`,
   `dictionaries/education.ts`). If a new enum value is added to a domain
   entity, add its English label to the matching helper's `*_LABELS_EN` map
   too — otherwise it silently falls back to the pt-BR label on `/en/`.

## 4. Explicitly out of scope — do not "fix" these without being asked

`/curriculo`, `/projetos` (catalog + `[slug]` detail pages), the markdown
body of project case studies (`problem`/`solution`/`challenges`/`context`),
`BaseHead.astro` (hreflang tags), `structured-data.ts`, `SITE.locale` /
`SITE.localeOg` in `src/config/site.ts`, and `Profile.availabilityLabel`
are all pt-BR-only by design for now. Content changes there need no English
counterpart. If you're unsure whether something is in scope, check whether
the organism rendering it already imports `getDictionary`/`resolveLocale` —
if it doesn't, it hasn't been brought into the i18n system yet, and adding a
translation for it is a bigger task than this skill covers (flag it to the
user instead of guessing).

## 5. Verify

1. `pnpm run check` — must report 0 errors (catches schema mismatches in new
   `.en.yaml` files immediately).
2. `pnpm run build` — confirms the merge/fallback logic doesn't throw for
   any locale.
3. Spot-check both `/` and `/en/` (dev server or `dist/`) for the section you
   touched: the pt-BR side must render byte-identical to before your change,
   and the English side must show the new content/text — not the old
   English text, and not a pt-BR fallback where English was expected.
