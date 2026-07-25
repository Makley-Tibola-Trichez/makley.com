---
title: Migração Next.js → Vite
tagline: Remoção do runtime de SSR de aplicações que não precisavam dele, cortando custo de cloud e 80% do tempo de deploy.
category: performance
year: 2024
role: Líder técnico da migração
context: SBSistemas · Smarten Venture Builder
featured: true
order: 4
confidential: true

summary: >-
  Liderei a migração de aplicações Next.js para React com Vite, eliminando um servidor de
  renderização que não trazia benefício para produtos autenticados e reduzindo custos de
  infraestrutura junto com o tempo de entrega.

problem: >-
  Os produtos eram sistemas fechados atrás de login: todo o conteúdo é privado, nada é
  indexado por buscadores e não existe ganho de SEO ou de primeiro carregamento público a
  ser extraído do SSR. Mesmo assim, pagávamos o preço completo do framework — servidor
  Node rodando em produção, custo de cloud recorrente, build lento e uma camada de
  complexidade que aparecia em cada bug de hidratação. O deploy levava 15 minutos.

solution: >-
  Conduzi a migração para uma SPA React empacotada com Vite. A decisão foi tomada a partir
  do perfil real de uso do produto, não por preferência de ferramenta: sem necessidade de
  renderização no servidor, o runtime deixa de ser uma vantagem e passa a ser apenas custo.
  A migração foi feita de forma incremental, tela por tela, mantendo o produto no ar
  durante todo o processo.

challenges:
  - >-
    Substituir o roteamento baseado em arquivos do Next por um roteador explícito,
    preservando todas as URLs já usadas pelos clientes.
  - >-
    Migrar sem congelar o roadmap: a aplicação continuou recebendo funcionalidades novas
    enquanto a base era trocada por baixo.
  - >-
    Reproduzir o que o framework entregava de graça — code splitting por rota, otimização
    de assets e variáveis de ambiente — de forma explícita e auditável.
  - >-
    Convencer o time com dados em vez de opinião, medindo tempo de build, tamanho de
    bundle e custo de infraestrutura antes e depois.

results:
  - value: −80%
    label: no tempo de deploy
    detail: Entrega do produto caiu de 15 para 3 minutos
  - value: −1
    label: servidor em produção
    detail: Runtime de SSR eliminado, com redução direta de custo de cloud
  - value: "0"
    label: janelas de indisponibilidade
    detail: Migração incremental, com o produto no ar o tempo todo

technologies:
  - React
  - Vite
  - TypeScript
  - Next.js
  - Zustand
  - TanStack Query
  - Docker
  - GitLab CI/CD

cover:
  image: ../../assets/projects/migracao-next-vite.png
  alt: Diagrama abstrato representando a migração de uma arquitetura com servidor para uma aplicação estática.
---

## A decisão por trás da migração

A pergunta que guiou o projeto não foi "qual framework é melhor", e sim "o que este produto
específico ganha com renderização no servidor". Para uma aplicação inteiramente autenticada,
a resposta honesta era: nada que justificasse o custo.

Documentar isso com números — tempo de build, tamanho de bundle, custo mensal de cloud —
foi o que transformou uma preferência técnica em uma decisão de engenharia defensável.
