# Como escrever e traduzir textos de interface (UI chrome)

Este documento cobre texto que **não** vem de `src/content/**` — botões,
títulos de seção, aria-labels, mensagens de formulário, itens de menu. Para
conteúdo estruturado (bio, projetos, experiência), ver
[`content-i18n.md`](./content-i18n.md).

## O padrão: dicionário por namespace

`src/i18n/dictionary.ts` agrega um dicionário por namespace, um arquivo por
namespace em `src/i18n/dictionaries/*.ts`. Cada namespace exporta:

- Uma `interface` com um campo por string (ex. `HeaderDictionary`).
- Um `Record<Locale, XDictionary>` com as duas traduções lado a lado —
  `'pt-BR'` e `en`.

```ts
// src/i18n/dictionaries/hero.ts
export interface HeroDictionary {
  viewProjects: string;
  downloadResume: string;
}

export const heroDictionary: Record<Locale, HeroDictionary> = {
  'pt-BR': { viewProjects: 'Ver projetos', downloadResume: 'Baixar currículo' },
  en: { viewProjects: 'View projects', downloadResume: 'Download resume' },
};
```

Um componente consome assim:

```astro
---
import { getDictionary } from '@i18n/dictionary';
import { resolveLocale } from '@i18n/locales';

const locale = resolveLocale(Astro.currentLocale);
const { hero: t } = getDictionary(locale);
---
<button>{t.viewProjects}</button>
```

Namespaces existem hoje um por organism/página principal (`hero`, `about`,
`stack`, `projects`, `projectDetail`, `experience`, `education`, `resume`,
`resumePage`, `contact`, `palette`, `header`, `footer`) mais `common` para
strings compartilhadas entre páginas (hoje: aria-label e "Início" dos
breadcrumbs).

## Como adicionar um texto novo a um namespace existente

1. Ache o namespace certo — geralmente o mesmo nome do organism/página que
   vai usar o texto (`HeroSection` → `hero.ts`, `ContactSection` →
   `contact.ts`).
2. Adicione o campo na `interface` **e** nos dois objetos (`'pt-BR'` e
   `en`) — o TypeScript recusa o build se faltar um dos dois, então não tem
   como esquecer silenciosamente.
3. Use `{t.novoCampo}` no componente.

**Nunca** deixe uma string nova hardcoded no template, mesmo que pareça
pequena (um `aria-label`, um `title` de tooltip). Se não vier do
dicionário, ela sempre renderiza em pt-BR, inclusive em `/en/`, e nada
aponta o build para isso — foi exatamente assim que o `aria-label` do
`ThemeToggle` e os rótulos de `SocialLinks` passaram despercebidos até uma
auditoria manual.

## Como criar um namespace novo

Só necessário quando o texto não pertence a nenhum organism/página
existente (ex.: uma seção nova).

1. Crie `src/i18n/dictionaries/<nome>.ts` seguindo o padrão acima.
2. Registre em `src/i18n/dictionary.ts`: import, campo na `interface
   Dictionary`, linha no objeto retornado por `getDictionary()`. Três
   pontos, nenhum namespace existente precisa mudar.

## Enums/labels do domínio: por que não vão no dicionário

Alguns getters do domínio retornam texto pt-BR fixo porque o valor vem de
um enum, não de conteúdo editável — ex. `Project.categoryLabel`,
`Profile.availabilityLabel`, `Technology.categoryLabel`. Esses **não**
viram campo de dicionário (o dicionário é para texto fixo de interface, não
para mapear um valor de domínio). O padrão aqui é uma **função auxiliar
aditiva**, ao lado do dicionário do namespace que a usa:

```ts
// src/i18n/dictionaries/hero.ts
const AVAILABILITY_LABELS_EN: Record<AvailabilityStatus, string> = {
  open: 'Open to new opportunities',
  selective: 'Open to select conversations',
  closed: 'Not available right now',
};

export function getAvailabilityLabel(status, locale, fallback) {
  return locale === 'en' ? AVAILABILITY_LABELS_EN[status] : fallback;
}
```

O chamador sempre passa o próprio getter do domínio como `fallback` —
`getAvailabilityLabel(profile.availability, locale, profile.availabilityLabel)`
— então qualquer call site fora do escopo de i18n (que não foi migrado)
continua funcionando sem precisar saber que o helper existe.

Exemplos já implementados: `getProjectCategoryLabel` e `getProjectHref`
(`dictionaries/projects.ts`), `getTechCategoryLabel`/`getTechNote`/
`getTechName` (`dictionaries/stack.ts`), `getAvailabilityLabel`
(`dictionaries/hero.ts`).

**Quando usar isso em vez de conteúdo traduzível** (`content-i18n.md`): o
valor vem de um enum/categoria fixa no domínio → helper aditivo aqui. O
valor vem de um arquivo de conteúdo editável → override de tradução lá.

## Locale dentro de scripts client-side (fora de componentes Astro)

Scripts em `src/presentation/scripts/*.ts` não têm acesso a
`Astro.currentLocale` — rodam no navegador. A fonte da verdade lá é o
próprio `<html lang="...">`, escrito pelo `BaseLayout`:

```ts
const locale = resolveLocale(document.documentElement.lang);
```

## Links que mudam de locale

Qualquer `href` para outra página do site (não uma âncora `#hash` dentro da
página atual) precisa ser locale-aware — nunca escreva `/curriculo` ou
`/projetos` fixo. Use `getRelativeLocaleUrl` de `astro:i18n`:

```ts
import { getRelativeLocaleUrl } from 'astro:i18n';

const curriculoHref = getRelativeLocaleUrl(locale, '/curriculo');
// pt-BR → '/curriculo'   |   en → '/en/curriculo'
```

Para uma âncora de seção da home a partir de uma página diferente (ex. o
botão "Entrar em contato" na página de projeto, que aponta para
`#contato` na home), combine com `getRelativeLocaleUrl(locale, '/')`:

```ts
const homeHref = getRelativeLocaleUrl(locale, '/');
// uso: `${homeHref}#contato`
```

Isso já pegou bugs reais nesta base — links do rodapé e da paleta de
comandos que apontavam pro `/` ou `/curriculo` em pt-BR mesmo estando em
`/en/`.

## Checklist antes de considerar um texto "traduzido"

1. `pnpm run check` — 0 erros (o TypeScript pega campo de dicionário
   faltando).
2. `pnpm run build`.
3. Abra a página em `/` e em `/en/...` (dev server ou `dist/`) — o pt-BR
   deve renderizar idêntico a antes, o inglês deve mostrar o texto novo.
4. Se o texto for um `aria-label`/`title` (sem texto visível na tela), não
   dá pra ver isso olhando a página — grep o HTML gerado ou inspecione o
   DOM.

## Ver também

- [`content-i18n.md`](./content-i18n.md) — conteúdo estruturado
  (perfil, projetos, experiência, educação).
- [`.claude/skills/i18n-sync/SKILL.md`](../.claude/skills/i18n-sync/SKILL.md)
  — checklist rápido para manter uma tradução em sincronia ao editar texto
  de interface existente.
