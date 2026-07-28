---
title: SimplesCTe
tagline: Emissão de CT-e, MDF-e e CIOT em segundos para transportadoras e caminhoneiros autônomos.
category: produto
year: 2025
role: Desenvolvedor Front-end
context: SBSistemas · Smarten Venture Builder
featured: true
order: 2
confidential: true

summary: >-
  Plataforma web e mobile para emissão de documentos fiscais de transporte de cargas.
  Atuei no front-end do produto, com foco no fluxo de emissão, na integração com a SEFAZ
  e na experiência mobile usada por motoristas na estrada.

problem: >-
  Transportadoras e caminhoneiros autônomos precisam emitir CT-e, MDF-e e CIOT para
  rodar dentro da lei. Os caminhos disponíveis eram o portal do governo — lento, hostil e
  cheio de campos redigitados — ou sistemas de gestão pesados demais para um MEI com um
  caminhão. O resultado era digitação manual repetida, erro de preenchimento, documento
  rejeitado e caminhão parado no pátio esperando resolver.

solution: >-
  Um produto que resolve a emissão em torno de onze segundos: as notas são puxadas
  automaticamente da SEFAZ, o roteiro do manifesto é sugerido pelo sistema, o averbamento
  do seguro acontece por integração e a emissão em lote cobre quem despacha dezenas de
  documentos por dia. No front-end, o desafio foi transformar um formulário fiscal enorme
  em um fluxo que um motorista consegue completar no celular, em pé, ao lado do caminhão.

challenges:
  - >-
    Reduzir um formulário fiscal de dezenas de campos obrigatórios a um fluxo curto,
    preenchendo o máximo possível a partir dos dados já retornados pela SEFAZ.
  - >-
    Garantir uma experiência mobile realmente utilizável em condição de campo — alvos de
    toque grandes, estados de carregamento claros e tolerância a conexão instável.
  - >-
    Tratar a emissão em lote sem bloquear a interface, com feedback individual por
    documento e recuperação de falhas parciais.
  - >-
    Traduzir mensagens de rejeição da SEFAZ — códigos crus e pouco descritivos — em
    orientações que o usuário final consegue seguir sozinho, sem abrir chamado.

results:
  - value: 15.000+
    label: clientes ativos
    detail: Transportadoras, autônomos e escritórios de contabilidade
  - value: ~11s
    label: por documento emitido
    detail: Do início do preenchimento à autorização na SEFAZ
  - value: 2 min
    label: de tempo médio de suporte
    detail: Métrica pública divulgada pelo produto

technologies:
  - React
  - TypeScript
  - Next.js
  - Vite
  - Zustand
  - TanStack Query
  - React Hook Form
  - Zod
  - Styled Components
  - Material UI
  - Vitest
  - Cypress
  - Sentry

cover:
  image: ../../assets/projects/simplescte.webp
  alt: Página inicial do SimplesCTe mostrando a plataforma de emissão de CT-e e MDF-e.

links:
  - url: https://simplescte.com.br
    label: Visitar o produto
    kind: website
---

## O contexto

Transporte de carga é um setor onde tempo parado é prejuízo direto. Cada minuto que um
motorista passa brigando com um formulário é um minuto que o caminhão não está rodando —
e isso define completamente as prioridades de design do produto.

## Meu papel

Atuei no front-end da plataforma, com foco no fluxo de emissão e na experiência mobile.
Foi o projeto que mais me ensinou sobre o custo real da fricção de interface: aqui, uma
etapa a menos no formulário não é um detalhe de UX, é receita para o cliente.
