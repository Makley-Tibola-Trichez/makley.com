---
title: makley.com
tagline: Este portfólio — Astro, TypeScript e arquitetura em camadas, com praticamente zero JavaScript no cliente.
category: performance
year: 2026
role: Design & Desenvolvimento
context: Projeto pessoal
featured: false
order: 7

summary: >-
  Portfólio construído do zero com Astro e TypeScript, usando DDD, princípios SOLID e
  Atomic Design. Nenhum framework de UI é enviado ao navegador: toda a interatividade é
  feita com ilhas de TypeScript puro medidas em kilobytes.

problem: >-
  A maioria dos portfólios de desenvolvedor cai em um de dois extremos: ou é bonito e
  carrega centenas de kilobytes de JavaScript para renderizar texto estático, ou é rápido
  e não transmite nenhum cuidado com design. Um portfólio é, ele próprio, uma amostra de
  trabalho — se ele contradiz o que o currículo afirma sobre performance e acessibilidade,
  trabalha contra o próprio dono.

solution: >-
  Astro gerando HTML estático, com interatividade implementada em ilhas de TypeScript
  puro — sem React, sem hidratação. Conteúdo modelado como domínio de verdade (entidades,
  value objects e repositórios), validado por schemas em tempo de build, e componentes
  organizados em Atomic Design. Transições entre páginas usam a View Transitions API
  nativa do CSS, sem roteador no cliente.

challenges:
  - >-
    Entregar filtros, paleta de comandos, alternância de tema e animações de scroll
    mantendo o JavaScript enviado ao cliente na casa dos poucos kilobytes.
  - >-
    Aplicar DDD em um site estático sem cair no excesso de abstração — cada camada
    precisa justificar a própria existência.
  - >-
    Garantir que nenhuma animação prejudique a acessibilidade, respeitando
    prefers-reduced-motion e mantendo o conteúdo legível com JavaScript desativado.
  - >-
    Suportar tema claro e escuro com contraste em conformidade com a WCAG em ambos, sem
    duplicar folhas de estilo.

results:
  - value: 0 KB
    label: de framework de UI
    detail: Nenhum runtime React, Vue ou Svelte enviado ao navegador
  - value: WCAG AA
    label: de contraste
    detail: Verificado nos temas claro e escuro
  - value: 100%
    label: estático
    detail: Pré-renderizado no build, servido direto da CDN

technologies:
  - Astro
  - TypeScript
  - CSS moderno
  - Atomic Design
  - DDD
  - Schema.org
  - View Transitions API

cover:
  image: ../../assets/projects/portfolio.png
  alt: Representação abstrata da arquitetura em camadas deste portfólio.

links:
  - url: https://makley.com
    label: Você está aqui
    kind: website
---

## Decisões de arquitetura

O código é dividido em quatro camadas com dependências apontando sempre para dentro:
`domain` (entidades e regras, sem nenhuma dependência de framework), `application` (casos
de uso), `infrastructure` (adaptadores sobre as Content Collections do Astro) e
`presentation` (componentes em Atomic Design).

Na prática, isso significa que trocar a origem do conteúdo — de arquivos locais para um
CMS ou uma API — exige escrever um novo adaptador e nada mais. Nenhum caso de uso, página
ou componente precisa mudar.

## Performance como restrição de projeto

A regra que guiou o desenvolvimento foi simples: nenhuma funcionalidade justifica enviar
um framework de UI para o navegador. Filtros de projeto, paleta de comandos e alternância
de tema são resolvidos com TypeScript puro, delegação de eventos e CSS — o que mantém o
custo de execução no cliente próximo de zero.
