# Como escrever e traduzir conteúdo (perfil, projetos, experiência, educação)

Este documento explica o padrão usado para o conteúdo estruturado do site
(`src/content/**`) — como escrever um item novo, como traduzi-lo para
inglês, e como o build "sabe" buscar a versão certa. Para textos de
interface (botões, títulos de seção, aria-labels), ver
[`ui-text-i18n.md`](./ui-text-i18n.md).

## O padrão: canônico + override

Cada coleção tem **um arquivo canônico em pt-BR** por item, contendo
**todos** os campos exigidos pelo schema completo. A tradução para inglês
não duplica esse arquivo — ela vive num **arquivo de override opcional**, no
mesmo diretório, contendo **só os campos que mudam de idioma**, todos
opcionais.

Convenção de nome: `<nome-do-canônico>.<locale>.<extensão>`.

```
src/content/projects/
├── agronota.md          # canônico, pt-BR, schema completo
└── agronota.en.yaml      # override, só os campos traduzíveis
```

Não existe `<nome>.pt-BR.<ext>` — pt-BR *é* o arquivo canônico.

Se o override não existir para um locale, o repositório cai automaticamente
no conteúdo canônico. Isso significa:
- Nunca é obrigatório criar a tradução no mesmo commit para o build não
  quebrar — mas um item sem override fica em pt-BR mesmo em `/en/`, o que é
  uma regressão silenciosa fácil de não perceber. **Sempre crie o override
  ao criar um item novo.**
- Um override sem o canônico correspondente nunca é lido (é peso morto,
  inofensivo — pode limpar).

## Mapa por coleção

| Coleção | Canônico | Override | Campos traduzíveis | Ficam pt-BR (nome próprio/dado, não prosa) |
|---|---|---|---|---|
| `profile` | `profile/main.yaml` | `main.en.yaml` | `headline`, `heroStatement` (lead/emphasis/trail), `heroIntro`, `bio[]`, `location`, `availabilityNote`, `specialties[]`, `focusAreas[]`, `goals[]`, `languages[]`, `stats[]`, `resumePath` | `name`, `email`, `phone`, `socials[]`, `avatar`, `title` |
| `experience` | `experience/NN-slug.yaml` | `NN-slug.en.yaml` | `role`, `seniority`, `location`, `summary`, `responsibilities[]`, `achievements[]` | `company` (exceto `03-produto-proprio`, cujo "nome" é descritivo, não uma marca), `companyUrl`, `technologies[]` (exceto `01-sicredi`, que tem "Microsserviços"), `employmentType`, `start`/`end` |
| `education` | `education/NN-slug.yaml` | `NN-slug.en.yaml` | `credential`, `description`, `highlights[]` | `institution` (nome próprio), `field`, `credentialUrl`, `kind`, `start`/`end` |
| `projects` | `projects/slug.md` (frontmatter + corpo Markdown) | `slug.en.yaml` (frontmatter) **+** `slug.en.md` (corpo, opcional) | `title` (só se não for nome de produto), `tagline`, `summary`, `role`, `context`, `problem`, `solution`, `challenges[]`, `results[]`, `cover.alt`, `links[]`, `technologies[]` (só quando a lista tem termo descritivo em pt, ex. `llm-em-dispositivos-moveis`, `portfolio`) | `category`, `year`, `cover.image` (o arquivo de imagem em si), `featured`, `order`, `confidential` |
| `stack` | `stack/main.yaml` | *(sem coleção de override)* | Só `note` de tecnologias `core: true` — via `getTechNote()` (ver `ui-text-i18n.md`) | Nomes de tecnologia (`name`) são nomes próprios na maioria — as duas exceções (`html`→"HTML semântico", `microsservicos`→"Microsserviços") são tratadas por `getTechName()`, não por override de conteúdo |

**Regra geral para decidir se um campo é traduzível**: é prosa/descrição
lida pelo visitante → traduzível. É nome próprio, URL, categoria/enum,
número ou caminho de arquivo → fica canônico.

## Como adicionar uma tradução

1. Identifique a coleção e o arquivo canônico.
2. Copie **só** os campos traduzíveis da tabela acima para
   `<nome>.en.<ext>`, com uma tradução natural — não palavra por palavra. Dê
   uma olhada em um override já existente na mesma coleção para manter o
   tom.
3. Rode `pnpm run check` — o schema do override é parcial, então um campo
   com o nome errado ou tipo errado falha aqui, não silenciosamente.
4. Rode `pnpm run build` e confira o HTML gerado em `dist/en/...` (ou o
   preview em `/en/...`) — o campo deve aparecer traduzido, e a página em
   `/` (pt-BR) deve continuar idêntica a antes.

## Como adicionar um campo traduzível novo a uma coleção existente

Exemplo: descobriu que `project.summary` nunca foi traduzido (aconteceu
nesta base — ver histórico).

1. Abra `src/content.config.ts`, ache a `defineCollection` de
   `<coleção>Translations` (ex. `projectTranslations`).
2. Adicione o campo como **opcional** no `schema` do override — nunca no
   canônico, que já é obrigatório lá.
3. Se o campo for um objeto aninhado (como `cover`, que tem `image` +
   `alt`), **não** reuse o schema completo do canônico — declare só as
   sub-chaves traduzíveis (`z.object({ alt: z.string().optional() })`).
   Um objeto aninhado precisa de merge profundo, não raso — ver o próximo
   tópico.
4. Nenhuma mudança costuma ser necessária no mapper de domínio
   (`src/infrastructure/content/mappers/*.mapper.ts`): ele já lê o campo do
   objeto de dados mesclado, que é genérico.
5. Escreva a tradução no(s) override(s) relevante(s).

## Como o merge funciona (e a armadilha do merge raso)

Cada `*.content-repository.ts` busca o item canônico + o override do locale
pedido (via `getCollection('xTranslations', ({id}) => id === ...)`, nunca
`getEntry`, para não gerar warning quando a tradução ainda não existe — o
caso comum) e funde os dois com
`mergeXTranslation(canonical, override)` em
`src/infrastructure/content/mappers/*-translation.mapper.ts`.

O merge padrão é raso: `{ ...canonical, ...override }`. Isso é suficiente
para todo campo que é string, número ou **array inteiro** (arrays sempre
são substituídos por completo pelo override, nunca mesclados item a item —
por isso `results[]`, `challenges[]`, `technologies[]` e `stats[]` sempre
levam a lista **completa** traduzida no override, não só o que mudou).

**Armadilha**: um campo objeto onde só *parte* das chaves é traduzível
(hoje, só `Project.cover`, que tem `image` canônico + `alt` traduzível)
quebra o merge raso — `{ ...canonical, ...override }` substituiria o objeto
inteiro, perdendo `image`. `mergeProjectTranslation` trata esse caso à
parte, mesclando `cover` um nível mais fundo. Se adicionar outro campo
objeto parcialmente traduzível no futuro, replique esse tratamento.

## Como o build "sabe" buscar o override certo (para quem for depurar)

- O loader de cada coleção canônica usa um pattern com **negação** para
  excluir os arquivos de override (ex.:
  `pattern: ['*.yaml', '!*.*.yaml']` em `experience`/`education`,
  `pattern: ['**/*.md', '!*.*.md']` em `projects`). Sem a negação, o loader
  tentaria validar o arquivo de override contra o schema **completo** e o
  build quebraria por campos obrigatórios ausentes — esse foi um bug real
  encontrado nesta base antes de o padrão existir.
- O loader de cada coleção `*Translations` usa `generateId` para transformar
  `agronota.en.yaml` no id `agronota.en` (ou, no caso de `profile`, transforma
  `main.en.yaml` em só `en`) — é esse id que o repositório usa para achar a
  tradução certa.
- Depois de editar `src/content.config.ts` (nova coleção ou schema
  alterado), reinicie o dev server — o HMR nem sempre repega mudanças de
  schema de coleção.

## Ver também

- [`ui-text-i18n.md`](./ui-text-i18n.md) — textos de interface (fora do
  conteúdo estruturado): botões, títulos, aria-labels.
- [`.claude/skills/i18n-sync/SKILL.md`](../.claude/skills/i18n-sync/SKILL.md)
  — checklist rápido para manter uma tradução em sincronia toda vez que o
  conteúdo pt-BR mudar (complementa este documento, que explica o "como
  funciona"; a skill é o "não esqueça de fazer X").
