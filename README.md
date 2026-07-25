# makley.com

Portfólio profissional de **Makley Tibola Trichez** — Software Engineer.

Construído com Astro e TypeScript, em arquitetura de camadas (DDD), princípios SOLID e
Atomic Design. **Nenhum framework de UI é enviado ao navegador.**

> 👉 Antes de publicar, leia [`CONTEUDO-PENDENTE.md`](CONTEUDO-PENDENTE.md) — lista tudo que
> foi inferido dos PDFs e precisa da sua confirmação.

---

## Começando

```bash
npm install
npm run dev
```

| Comando | O que faz |
|---|---|
| `npm run dev` | Servidor de desenvolvimento (`localhost:4321`) |
| `npm run build` | Verificação de tipos + build estático em `dist/` |
| `npm run preview` | Serve o `dist/` localmente |
| `npm run check` | Só a verificação de tipos |
| `npm run assets` | Regenera capas dos projetos e ativos de marca |
| `npm run fonts:sync` | Recopia as fontes após atualizar as dependências |

---

## Números da build

Medidos na saída real de `npm run build`:

| Métrica | Valor |
|---|---|
| **JavaScript (site inteiro)** | **6,1 kB** bruto · **2,3 kB** brotli |
| CSS (todas as páginas) | 12,4 kB brotli |
| HTML da home | 18,7 kB brotli |
| Fontes pré-carregadas | 51 kB (2 arquivos woff2, subset latino) |
| Páginas pré-renderizadas | 11 |
| Contraste WCAG | 17,9:1 texto · 6,5:1 acento (escuro) · 4,7:1 acento (claro) |

Para comparação: um portfólio equivalente em Next.js costuma enviar 80–120 kB de JavaScript
só para renderizar texto estático.

---

## Arquitetura

### Por que camadas num site estático

O briefing pedia DDD e SOLID. O risco real desse pedido é o oposto do que ele pretende
evitar: abstração cerimonial que torna um site simples difícil de manter. A regra que segui
foi **cada camada precisa justificar a própria existência com um problema concreto** —
e a justificativa está em comentário no topo de cada arquivo.

```
src/
├── domain/           Entidades, value objects e portas. Zero dependências de framework.
├── application/      Casos de uso. Orquestram, não sabem de onde vêm os dados.
├── infrastructure/   Adaptadores sobre as Content Collections do Astro.
├── presentation/     Atomic Design, layouts, estilos, scripts e SEO.
├── content/          O conteúdo em si (YAML e Markdown), validado no build.
├── config/           Identidade do site e feature flags.
└── pages/            Rotas. Chamam um caso de uso e distribuem os dados.
```

As dependências apontam **sempre para dentro**: `pages → application → domain`. A camada de
infraestrutura implementa interfaces definidas no domínio (Inversão de Dependência), e
[`src/infrastructure/container.ts`](src/infrastructure/container.ts) é o único módulo que
conhece as duas pontas.

**O que isso compra na prática:** trocar a origem do conteúdo — de arquivos locais para um
CMS, uma API ou um banco — significa escrever um adaptador novo e editar o container.
Nenhum caso de uso, página ou componente muda.

### Decisões que valem explicação

**Astro, sem React.** Um portfólio é majoritariamente texto estático. Filtros, paleta de
comandos, alternância de tema e animações de scroll são resolvidos com TypeScript puro,
delegação de eventos e CSS. Enviar um runtime de framework para renderizar um currículo
seria contradizer, no próprio site, o que o currículo afirma sobre performance.

**Content Collections como camada anticorrupção.** Os schemas Zod em
[`src/content.config.ts`](src/content.config.ts) são o único ponto onde conteúdo escrito à
mão é confiado. Rodam no build: uma data mal formatada, um `alt` faltando ou uma categoria
inexistente **quebram o build** em vez de virarem uma página quebrada em produção. As
categorias são importadas do domínio, não redeclaradas — adicionar uma é mudança de uma
linha.

**Datas e métricas como dados estruturados, não texto.** `DateRange` é um value object que
sabe formatar períodos e calcular durações; resultados são pares valor/rótulo. Por isso a
timeline, o currículo online e o JSON-LD nunca discordam sobre o mesmo fato — e os anos de
experiência são derivados da primeira data de trabalho, não escritos à mão (o site envelhece
sozinho, corretamente).

**Tokens de design em duas camadas.** Primitivas (`--gray-*`, `--ember-*`) e semânticas
(`--color-bg`, `--color-text`). Componentes só consomem as semânticas — é Inversão de
Dependência aplicada ao CSS, e é o que faz o tema claro custar ~40 linhas em vez de uma
segunda folha de estilo.

**Animação que nunca esconde conteúdo.** Os elementos nascem visíveis; a classe que os
esconde só é aplicada *depois* que o script de reveal confirma que consegue revelá-los.
Com JavaScript desativado ou falhando, o conteúdo continua legível — a falha mais comum e
mais grave em sites animados. Tudo respeita `prefers-reduced-motion`.

**Transições de página com zero JavaScript.** `@view-transition { navigation: auto }` é
CSS nativo. Sem roteador no cliente, sem hidratação.

### Identidade visual

Ponto de partida deliberado: fugir do azul/violeta que domina portfólios de desenvolvedor.

- **Acento âmbar** (`#FF6A3D` no escuro, `#D2400F` no claro — ambos AA), usado com parcimônia
- **Neutros grafite frio**, nunca preto puro nem branco puro
- **Geist** (texto e mono) + **Instrument Serif** itálico para **uma** palavra no hero
- Detalhe recorrente: filete interno de 1px no topo das superfícies, imitando material real
- Ritmo vertical em grade de 4px, com espaçamento fluido entre seções

---

## Estrutura de componentes (Atomic Design)

```
presentation/components/
├── atoms/       Badge · Button · Eyebrow · Heading · Icon · Kbd · Stat · TechTag
├── molecules/   Breadcrumbs · EducationItem · ExperienceItem · ProjectCard
│                SectionHeader · SocialLinks · ThemeToggle
├── organisms/   Hero · About · Stack · Projects · Experience · Education
│                Resume · Contact · SiteHeader · SiteFooter · CommandPalette
└── templates/   BaseHead
```

Os estilos são escopados por componente (Astro faz isso nativamente), o que elimina a
necessidade de `!important` em todo o projeto.

> **Nota técnica sobre `Heading.astro`:** existe por um motivo não óbvio. Em Astro, usar uma
> união de literais string como tag JSX dinâmica faz o TypeScript rebaixar silenciosamente
> o `Props` do componente inteiro para `IntrinsicAttributes` — desligando a checagem de
> props para todos os chamadores. O componente isola esse problema num único lugar. O
> detalhe completo está comentado no arquivo.

---

## Acessibilidade

Auditado no site rodando, não só por inspeção de código:

- Um único `h1` por página, sem saltos na hierarquia de headings
- Todas as imagens com `alt` e dimensões explícitas (CLS zero)
- Nenhum link ou botão sem nome acessível
- Skip link, landmarks corretos, `lang="pt-BR"`, sem IDs duplicados
- Foco visível em todos os elementos interativos (`:focus-visible`, nunca `:focus`)
- Paleta de comandos segue o padrão ARIA combobox (`aria-activedescendant` + live region)
- Menu mobile e paleta usam `<dialog>` nativo — foco preso, `Esc`, backdrop, tudo de graça
- Alvos de toque com no mínimo 44px; contraste AA nos dois temas
- Suporte a `prefers-reduced-motion` e `forced-colors`

---

## SEO

Meta tags, Open Graph e Twitter Cards em todas as rotas; URLs canônicas; sitemap com
prioridades; `robots.txt` gerado a partir do domínio configurado (nunca fica apontando para
o ambiente errado); feed RSS dos estudos de caso; breadcrumbs visuais e em JSON-LD.

Os dados estruturados são gerados **a partir das mesmas entidades que renderizam a página**,
em um único `@graph` com `@id`s estáveis:

| Rota | Nós schema.org |
|---|---|
| `/` | `Person` + `WebSite` + `ProfilePage` |
| `/projetos/[slug]` | `CreativeWork` + `BreadcrumbList` |
| `/curriculo` | `Person` + `BreadcrumbList` |

---

## Publicação

Saída estática — funciona em qualquer host.

- **Build:** `npm run build`
- **Diretório:** `dist`
- **Node:** 20.3+

Defina `PUBLIC_SITE_URL` no serviço de hospedagem (ver [`.env.example`](.env.example)).

---

## Licença

Código e conteúdo © Makley Tibola Trichez. Todos os direitos reservados.
