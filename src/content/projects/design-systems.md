---
title: Design Systems multiproduto
tagline: Duas bibliotecas de componentes servindo produtos distintos, com release automatizado e deploy 84% mais rápido.
category: design-system
year: 2024
role: Mantenedor & Desenvolvedor Front-end
context: SBSistemas · Smarten Venture Builder
featured: true
order: 3
confidential: true

summary: >-
  Fui responsável pela manutenção e evolução de dois design systems consumidos por
  múltiplos produtos da empresa, incluindo a definição de padrões com o time e a
  reformulação do pipeline de publicação das bibliotecas.

problem: >-
  Com vários produtos sendo desenvolvidos em paralelo, cada time resolvia os mesmos
  problemas de interface de um jeito diferente. Botões, tabelas e formulários divergiam
  entre sistemas da mesma empresa, o que gerava retrabalho, inconsistência visual e uma
  curva de aprendizado desnecessária para o usuário que utilizava mais de um produto.
  Publicar uma correção na biblioteca levava 25 minutos, o que desestimulava mudanças
  pequenas e incrementais.

solution: >-
  Tratei o design system como produto, não como pasta compartilhada: contratos de
  componente estáveis, versionamento previsível, documentação de uso e um pipeline de
  release automatizado. Reduzi o tempo de publicação de 25 para 4 minutos atacando o
  gargalo do build e do processo de CI — o que mudou o comportamento do time, porque
  passou a valer a pena corrigir detalhes pequenos em vez de acumulá-los.

challenges:
  - >-
    Evoluir a API dos componentes sem quebrar os produtos que já os consumiam, adotando
    depreciação gradual em vez de mudanças abruptas.
  - >-
    Equilibrar flexibilidade e consistência: componentes rígidos demais são contornados
    com gambiarra, flexíveis demais deixam de ser um sistema.
  - >-
    Construir consenso entre desenvolvedores de times diferentes sobre padrões de
    estrutura de código e escolha de bibliotecas — trabalho de comunicação tanto quanto
    de engenharia.
  - >-
    Encurtar o ciclo de publicação sem abrir mão das verificações de qualidade da
    pipeline.

results:
  - value: −84%
    label: no tempo de deploy
    detail: Publicação da biblioteca caiu de 25 para 4 minutos
  - value: "2"
    label: design systems mantidos
    detail: Consumidos por múltiplos produtos em produção
  - value: "1"
    label: linguagem visual
    detail: Padrões unificados de componentes e bibliotecas entre os times

technologies:
  - React
  - TypeScript
  - Styled Components
  - Emotion
  - Material UI
  - Monorepo
  - GitLab CI/CD
  - Vitest
  - Jest

cover:
  image: ../../assets/projects/design-systems.png
  alt: Representação abstrata de um design system com componentes de interface conectados.
---

## Por que isso importa

Design system é um dos poucos investimentos de front-end cujo retorno é medível em duas
frentes ao mesmo tempo: o produto fica mais consistente para o usuário e o time entrega
mais rápido. A parte difícil quase nunca é técnica — é manter o sistema vivo depois que o
entusiasmo inicial passa.

## O que eu levei desse projeto

Que a métrica mais honesta de um design system não é quantos componentes ele tem, mas
quantas vezes o time escolheu usá-lo em vez de escrever CSS do zero. Reduzir o tempo de
publicação para 4 minutos foi, na prática, uma decisão de adoção.
