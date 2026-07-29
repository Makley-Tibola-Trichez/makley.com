---
title: AgroNota
tagline: Plataforma fiscal e financeira que transformou o fechamento contábil do produtor rural em minutos.
category: produto
year: 2025
role: Desenvolvedor Front-end
context: SBSistemas · Smarten Venture Builder
featured: true
order: 1
confidential: true

summary: >-
  Sistema web e mobile de emissão de NFP-e, geração de Livro Caixa e LCDPR para produtores
  rurais, escritórios de contabilidade, sindicatos e cooperativas. Atuei no front-end do
  produto ao longo de quatro anos, do fluxo de emissão às telas de conciliação e relatórios.

problem: >-
  O fechamento contábil do produtor rural no Brasil é um dos mais burocráticos que existem:
  NFP-e emitidas em portais estaduais distintos, Funrural, vendas para entrega futura,
  rateio entre atividades e a obrigatoriedade do LCDPR. Escritórios de contabilidade
  passavam o mês inteiro lançando documentos manualmente, um produtor por vez, com alto
  risco de erro e retrabalho na hora da entrega à Receita.

solution: >-
  Construímos um produto que busca os documentos direto na SEFAZ em tempo real e aplica um
  conjunto de regras que classifica automaticamente cada lançamento — chegando a 95% do
  Livro Caixa e do LCDPR gerados sem intervenção humana. No front-end isso significou telas
  de altíssima densidade de dados (tabelas com milhares de linhas, edição em lote,
  conciliação por OFX) que precisavam continuar responsivas, além de um app para emissão em
  campo, onde a conexão nem sempre coopera.

challenges:
  - >-
    Renderizar tabelas fiscais com milhares de lançamentos sem travar a interface —
    resolvido com virtualização, paginação server-side e memoização criteriosa do estado
    derivado.
  - >-
    Modelar formulários fiscais com dezenas de campos interdependentes e validação
    condicional, mantendo-os testáveis e legíveis com React Hook Form e Zod.
  - >-
    Manter consistência visual e comportamental entre AgroNota e os demais produtos da
    empresa, consumindo o mesmo design system sem engessar as necessidades específicas
    do domínio fiscal.
  - >-
    Sustentar código legado enquanto novas funcionalidades eram entregues, sem congelar o
    roadmap nem acumular dívida técnica silenciosa.

results:
  - value: 7.100+
    label: clientes ativos
    detail: Produtores, escritórios contábeis, sindicatos e cooperativas
  - value: 95%
    label: do Livro Caixa automatizado
    detail: Geração de Livro Caixa e LCDPR por regras, sem lançamento manual
  - value: 735h
    label: economizadas por mês
    detail: Redução relatada por um único escritório de contabilidade cliente

technologies:
  - React
  - TypeScript
  - Next.js
  - Vite
  - Zustand
  - Redux
  - TanStack Query
  - React Hook Form
  - Zod
  - Material UI
  - Styled Components
  - Cypress
  - Sentry
  - GitLab CI/CD

cover:
  image: ../../assets/projects/agronota.webp
  alt: Página inicial do AgroNota apresentando a plataforma de emissão fiscal para o produtor rural.

links:
  - url: https://agronota.com.br
    label: Visitar o produto
    kind: website
---

## O contexto

O AgroNota nasceu para um público que raramente é prioridade em software: o produtor rural
e o contador que atende dezenas deles. É um domínio onde a regra fiscal muda por estado, o
usuário está no campo com sinal instável e o custo de um erro de lançamento aparece meses
depois, na malha fina.

## Meu papel

Trabalhei no front-end do produto ao longo de quatro anos, participando desde o fluxo de
emissão de documentos até as telas de conciliação bancária e relatórios gerenciais. Além da
entrega de funcionalidades, atuei em revisão de código, pair programming, definição de
padrões entre os desenvolvedores e na organização das demandas.

Um dos pontos que mais me marcou tecnicamente foi aprender a tratar densidade de informação
como problema de design, não só de performance: reduzir o número de cliques do fechamento
mensal valeu tanto quanto reduzir o tempo de renderização da tabela.
