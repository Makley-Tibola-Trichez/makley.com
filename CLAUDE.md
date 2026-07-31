# makley.com

Portfólio pessoal construído com Astro + TypeScript (arquitetura em camadas:
`domain` → `application` → `infrastructure` → `presentation`), sem framework
de UI no cliente.

## Internacionalização

O site tem **duas versões**: português (pt-BR, padrão, sem prefixo — `/`) e
inglês (`en`, sob `/en/...`). Roteamento via i18n nativo do Astro
(`prefixDefaultLocale: false`), configurado em `astro.config.mjs` a partir de
`src/i18n/locales.ts`.

- Textos de interface: `src/i18n/dictionary.ts` agrega um dicionário por
  namespace em `src/i18n/dictionaries/*.ts`.
- Conteúdo (perfil, projetos, experiência, educação): arquivo canônico em
  pt-BR + override opcional `<nome>.en.<ext>` no mesmo diretório, mesclado em
  tempo de build pelos repositórios em `src/infrastructure/content/`.
- Todo componente que renderiza texto resolve o locale via
  `resolveLocale(Astro.currentLocale)` e busca `getDictionary(locale)`.
- Ver a skill `.claude/skills/i18n-sync/SKILL.md` para o processo completo de
  manter a tradução em sincronia ao editar conteúdo ou textos de interface.

## Documentação (`docs/`)

Mapa dos processos de desenvolvimento documentados — cada linha é um
resumo; o arquivo linkado tem o conhecimento completo (passo a passo,
armadilhas conhecidas, exemplos reais desta base).

| Arquivo | Resumo |
|---|---|
| [`docs/content-i18n.md`](docs/content-i18n.md) | Como escrever e traduzir **conteúdo estruturado** (perfil, projetos, experiência, educação): o padrão arquivo canônico pt-BR + override `.en`, tabela de quais campos são traduzíveis por coleção, como adicionar um campo traduzível novo, como o merge (raso vs. profundo) e a busca por locale funcionam por baixo dos panos, e armadilhas já encontradas nesta base (colisão de glob pattern, merge raso perdendo campo aninhado). |
| [`docs/ui-text-i18n.md`](docs/ui-text-i18n.md) | Como escrever e traduzir **texto de interface** (botões, títulos, aria-labels) fora do conteúdo estruturado: o sistema de dicionário por namespace (`getDictionary`), como adicionar uma string nova ou um namespace novo, o padrão de helper aditivo para enums do domínio (`getProjectCategoryLabel` e afins), locale dentro de scripts client-side, e como montar links locale-aware com `getRelativeLocaleUrl`. |

## Arquitetura de pastas

Camadas com dependências sempre apontando para dentro — `presentation` pode
depender de `domain`, mas `domain` nunca depende de `presentation` nem de
Astro. Trocar a origem do conteúdo (arquivos locais → CMS/API) significa
escrever um novo adaptador em `infrastructure`, sem tocar em mais nada.

```
src/
├── domain/          # Entidades, value objects e regras de negócio puras
├── application/      # Casos de uso — orquestram os repositórios (portas)
├── infrastructure/    # Adaptadores concretos (Content Collections → domínio)
├── presentation/      # Componentes Astro, layouts, scripts client-side, PDF
├── content/           # Conteúdo em si (YAML/Markdown), validado por content.config.ts
├── i18n/              # Locale, dicionários de UI e agregador getDictionary
├── config/            # Configuração estática do site (SITE, FEATURES)
├── assets/            # Imagens processadas pelo pipeline de imagem do Astro
└── pages/             # Rotas (ver tabela abaixo)
```

- **`src/domain/`** — o núcleo do negócio, sem nenhuma dependência de
  framework. Um subpasta por agregado: `profile/`, `projects/`,
  `experience/`, `education/`, `tech-stack/`, mais `shared/` para erros e
  value objects (`ExternalLink`, `DescribedImage`, `DateRange` etc.)
  compartilhados entre eles. É aqui que moram as entidades (`Profile`,
  `Project`...), suas regras (`get isFeatured()`, `get href()`) e os mapas
  hardcoded pt-BR como `PROJECT_CATEGORY_LABELS` (traduzidos via helpers
  aditivos em `i18n/dictionaries/`, não aqui).
- **`src/domain/*/​*.repository.ts`** — as *portas* (interfaces) que a
  camada `application` depende — nunca de `getCollection` do Astro
  diretamente.
- **`src/application/use-cases/`** — orquestração: cada caso de uso recebe
  repositórios pelo construtor e monta o que uma página precisa em uma
  chamada só (`GetPortfolioOverviewUseCase`, `GetProjectCatalogUseCase`,
  `GetProjectDetailUseCase`).
- **`src/infrastructure/`** — os adaptadores concretos das portas do
  domínio, hoje sobre Astro Content Collections
  (`*.content-repository.ts`), mais `mappers/` que traduzem o shape
  validado do YAML/Markdown para as entidades de domínio (incluindo os
  `*-translation.mapper.ts` que fazem o merge canônico + override de
  locale). `container.ts` é a composition root — o único lugar que conhece
  portas *e* adaptadores.
- **`src/content/`** — o conteúdo em si: um arquivo canônico em pt-BR por
  item (`profile/main.yaml`, `projects/*.md`, `experience/*.yaml`,
  `education/*.yaml`, `stack/main.yaml`) mais o override opcional em inglês
  (`*.en.yaml`/`*.en.md`) no mesmo diretório. Validado por
  `src/content.config.ts` na raiz do projeto.
- **`src/i18n/`** — `locales.ts` (fonte única do tipo `Locale`),
  `dictionary.ts` (agregador) e um arquivo por namespace em
  `dictionaries/*.ts` (um por organism/página, mais `common.ts` para
  strings compartilhadas entre páginas como breadcrumbs).
- **`src/presentation/`** — tudo que é renderização:
  - `components/atoms|molecules|organisms/templates` — Atomic Design;
  - `layouts/BaseLayout.astro` — o shell de toda página;
  - `scripts/` — TypeScript puro que roda no cliente (um arquivo por
    comportamento: `theme.ts`, `command-palette.ts`, `contact-form.ts`,
    `project-filter.ts`, `reveal.ts`, `spotlight.ts`, `toast.ts`,
    `copy-email.ts`, `header.ts`, `analytics.ts`) — zero framework de UI,
    só DOM + delegação de eventos;
  - `pdf/resume-document.ts` — monta o currículo em PDF com
    `@react-pdf/renderer` a partir das mesmas entidades que renderizam
    `/curriculo`;
  - `seo/structured-data.ts` — builders do JSON-LD (`@graph` schema.org).
- **`src/config/site.ts`** — identidade estática do site (nome, URL
  canônica, tema de cor, feature flags como `contactEndpoint`) — dados de
  configuração, não conteúdo de domínio.
- **`src/assets/`** — imagens fonte (avatar, capas de projeto) processadas
  pelo pipeline de otimização de imagem do Astro.
- **`public/`** — arquivos servidos como estão (fontes self-hosted,
  favicons, manifest).
- **`scripts/`** (raiz) — scripts Node de manutenção rodados manualmente
  (`fetch-avatar.mjs`, `generate-covers.mjs`, `generate-brand.mjs`,
  `sync-fonts.mjs`), fora do build.
- **`.claude/skills/i18n-sync/`** — skill que documenta o processo de
  manter a tradução em sincronia (ver seção de Internacionalização acima).

## Rotas e componentes

| Rota (pt-BR) | Rota (en) | Arquivo | Composição |
|---|---|---|---|
| `/` | `/en/` | [`src/pages/index.astro`](src/pages/index.astro) / [`src/pages/en/index.astro`](src/pages/en/index.astro) | `BaseLayout` → `HeroSection`, `AboutSection`, `StackSection`, `ProjectsSection` (destaque), `ExperienceSection`, `EducationSection`, `ResumeSection`, `ContactSection` |
| `/projetos` | `/en/projetos` | [`src/pages/projetos/index.astro`](src/pages/projetos/index.astro) / [`src/pages/en/projetos/index.astro`](src/pages/en/projetos/index.astro) | `BaseLayout` → `Breadcrumbs`, `ProjectsSection` (catálogo completo, com filtros) |
| `/projetos/[slug]` | `/en/projetos/[slug]` | [`src/pages/projetos/[slug].astro`](src/pages/projetos/[slug].astro) / [`src/pages/en/projetos/[slug].astro`](src/pages/en/projetos/[slug].astro) | `BaseLayout` → `Breadcrumbs`, `Badge`, `Button`, `Icon`, `TechTag`, `ProjectCard` (relacionados) — estudo de caso completo (problema/solução/desafios/resultados/stack) |
| `/curriculo` | `/en/curriculo` | [`src/pages/curriculo/index.astro`](src/pages/curriculo/index.astro) / [`src/pages/en/curriculo/index.astro`](src/pages/en/curriculo/index.astro) | `BaseLayout` → `Breadcrumbs`, `Button`, `Icon`, `TechTag` — currículo online completo, com botões para os dois PDFs |
| `/curriculo/makley-trichez-cv-pt-br.pdf` | `/curriculo/makley-trichez-cv-en-us.pdf` | [`src/pages/curriculo/makley-trichez-cv-pt-br.pdf.ts`](src/pages/curriculo/makley-trichez-cv-pt-br.pdf.ts) / [`...-en-us.pdf.ts`](src/pages/curriculo/makley-trichez-cv-en-us.pdf.ts) | Rota de API (`GET`) que gera o PDF em build time via `buildResumeDocument` ([`src/presentation/pdf/resume-document.ts`](src/presentation/pdf/resume-document.ts)) — mesmo caminho `/curriculo/...` nas duas línguas, não é uma rota `/en/`-prefixada |
| `/404` | — (pt-BR only) | [`src/pages/404.astro`](src/pages/404.astro) | `BaseLayout` → `Button`, `ProjectCard` (sugestões) — fora do sistema de i18n |
| `/robots.txt` | — | [`src/pages/robots.txt.ts`](src/pages/robots.txt.ts) | Rota de API, não é página |
| `/rss.xml` | — | [`src/pages/rss.xml.ts`](src/pages/rss.xml.ts) | Feed único, pt-BR only |

### `BaseLayout` (usado por toda página)

[`src/presentation/layouts/BaseLayout.astro`](src/presentation/layouts/BaseLayout.astro)
compõe `BaseHead` (`<head>`), `SiteHeader`, `SiteFooter`, `CommandPalette`
(⌘K) e `Toast` — todos já traduzidos e locale-aware.

### Organisms (`src/presentation/components/organisms/`)

`HeroSection`, `AboutSection`, `StackSection`, `ProjectsSection`,
`ExperienceSection`, `EducationSection`, `ResumeSection`, `ContactSection`,
`SiteHeader`, `SiteFooter`, `CommandPalette`.

### Molecules mais reutilizadas

`ProjectCard`, `ExperienceItem`, `EducationItem`, `Breadcrumbs`,
`SocialLinks`, `SectionHeader`, `ThemeToggle`.
