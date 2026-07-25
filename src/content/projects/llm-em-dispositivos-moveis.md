---
title: LLMs em dispositivos móveis
tagline: Pesquisa acadêmica sobre a viabilidade real de executar grandes modelos de linguagem direto no celular.
category: pesquisa
year: 2024
role: Autor
context: Atitus Educação · Ciência da Computação
featured: false
order: 6

summary: >-
  Artigo científico conduzido durante a graduação, investigando se — e sob quais condições
  — grandes modelos de linguagem podem ser executados localmente em smartphones, sem
  depender de inferência na nuvem.

problem: >-
  A adoção de modelos de linguagem foi construída em cima de inferência na nuvem, o que
  traz três limitações difíceis de ignorar: custo por requisição, latência dependente de
  rede e o envio de dados potencialmente sensíveis do usuário para servidores de terceiros.
  Executar o modelo no próprio dispositivo resolveria os três problemas de uma vez — a
  questão é se o hardware de um celular comum dá conta.

solution: >-
  A pesquisa avaliou a viabilidade dessa execução local, considerando as restrições reais
  do dispositivo: memória disponível, capacidade de processamento, consumo de bateria e o
  impacto das técnicas de quantização sobre a qualidade das respostas.

challenges:
  - >-
    Delimitar o que "viável" significa em termos mensuráveis, e não como impressão
    subjetiva de desempenho.
  - >-
    Comparar modelos e níveis de quantização sob critérios consistentes, isolando o efeito
    de cada variável.
  - >-
    Trabalhar com um campo em movimento acelerado, onde parte da bibliografia envelhece
    durante a própria escrita do artigo.

results:
  - value: "1"
    label: artigo científico
    detail: Conduzido e defendido durante a graduação em Ciência da Computação
  - value: On-device
    label: foco da pesquisa
    detail: Inferência local como alternativa a custo, latência e exposição de dados

technologies:
  - Inteligência Artificial
  - LLMs
  - Quantização de modelos
  - Pesquisa aplicada

cover:
  image: ../../assets/projects/llm-em-dispositivos-moveis.png
  alt: Representação abstrata de um modelo de linguagem sendo executado em um dispositivo móvel.
---

## Por que este tema

Escolhi o assunto em um momento em que quase toda a discussão sobre modelos de linguagem
girava em torno de escala e de infraestrutura de nuvem. A pergunta oposta — quanto dá para
fazer com o que o usuário já tem no bolso — parecia mais interessante e, olhando em
retrospecto, envelheceu bem.

> O acesso público ao artigo ainda não está configurado. Assim que estiver, o link será
> publicado aqui.
