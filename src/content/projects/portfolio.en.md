---
---

## Architecture decisions

The code is split into four layers, with dependencies always pointing inward: `domain`
(entities and rules, no framework dependency), `application` (use cases), `infrastructure`
(adapters over Astro's Content Collections) and `presentation` (components under Atomic
Design).

In practice, that means swapping the content source — from local files to a CMS or an API
— takes writing one new adapter and nothing else. No use case, page or component has to
change.

## Performance as a project constraint

The rule that guided development was simple: no feature justifies shipping a UI framework
to the browser. Project filters, the command palette and theme switching are all handled
with plain TypeScript, event delegation and CSS — which keeps client-side execution cost
close to zero.
