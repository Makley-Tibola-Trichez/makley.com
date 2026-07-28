# Conteúdo pendente

Tudo neste arquivo foi **inferido, aproximado ou deixado em branco** porque não constava
nos PDFs enviados (`Profile.pdf` do LinkedIn e `CV - PT-BR.pdf`). Nada aqui impede o site
de rodar — ele está completo e funcional —, mas cada item abaixo melhora a precisão ou
destrava uma funcionalidade.

Marque com `[x]` conforme for resolvendo.

**Legenda de prioridade**
🔴 Bloqueia o lançamento · 🟡 Importante antes de divulgar · 🟢 Refinamento

---

## ✅ 1. Domínio e publicação — resolvido

Domínio definido como `https://makley.com.br`, já publicado na Vercel.
- [x] `DEFAULT_URL` atualizado em [`src/config/site.ts`](src/config/site.ts)

Se a Vercel usar um domínio diferente do de produção em algum ambiente de preview, defina
`PUBLIC_SITE_URL` nas variáveis de ambiente desse ambiente específico — o valor padrão do
código só vale quando essa variável não existe.

---

## 🔴 2. Formulário de contato

O formulário **funciona hoje** abrindo o cliente de e-mail do visitante (`mailto:`), mas isso
adiciona fricção: o visitante precisa sair do site, ter um cliente de e-mail configurado, e
ainda apertar "enviar" manualmente. Em vários navegadores/SOs isso simplesmente não abre nada
visível. Com um endpoint de verdade, a mensagem sai direto pro seu e-mail sem o visitante sair
da página — e para um recrutador testando o site, um formulário que "só funciona" é mais um
sinal de cuidado técnico.

- [ ] Criar uma conta gratuita em [Formspree](https://formspree.io),
      [Web3Forms](https://web3forms.com) ou [Basin](https://usebasin.com) (5 minutos de setup).
- [ ] Definir a variável de ambiente `PUBLIC_CONTACT_ENDPOINT` com a URL do endpoint (na Vercel:
      Project Settings → Environment Variables).

Sem essa variável o site continua no modo `mailto:` — nunca fica quebrado.
Detalhes da implementação: [`src/presentation/components/organisms/ContactSection.astro`](src/presentation/components/organisms/ContactSection.astro)

---

## 🟡 3. Datas das certificações

Os links de cada certificado/curso já foram adicionados (`credentialUrl`), incluindo o
repositório do artigo de LLM no GitHub. O que ainda falta é só a **data exata** — as
certificações do HackerRank e da Udemy não expõem a data de emissão na página pública do
certificado, então os meses abaixo continuam aproximados.

| Item | Arquivo | O que falta |
|---|---|---|
| JavaScript (Intermediate) | [`03-hackerrank-javascript-intermediate.yaml`](src/content/education/03-hackerrank-javascript-intermediate.yaml) | Mês/ano reais |
| React (Basic) | [`04-hackerrank-react-basic.yaml`](src/content/education/04-hackerrank-react-basic.yaml) | Mês/ano reais |
| JavaScript (Basic) | [`05-hackerrank-javascript-basic.yaml`](src/content/education/05-hackerrank-javascript-basic.yaml) | Mês/ano reais |
| Desenvolvimento Web Completo (Udemy) | [`06-desenvolvimento-web-completo.yaml`](src/content/education/06-desenvolvimento-web-completo.yaml) | Período real do curso |
| Artigo científico (LLMs) | [`02-artigo-llm-mobile.yaml`](src/content/education/02-artigo-llm-mobile.yaml) | Período real da pesquisa |

O Acolhe IMED 2022.2 ficou sem `credentialUrl` — o link enviado é uma ação de impressão de
documento que exige sessão autenticada, não é adequado como link público. Se preferir manter
o item, tudo bem deixá-lo sem link (é o que está hoje).

- [ ] Confirmar as datas acima, se possível.

---

## ✅ 4. Experiência no Sicredi — resolvido

Reescrita com as atividades reais: desenvolvimento de sistemas na Sicredi Aliança, com foco
em APIs (Python/FastAPI) e automação de rotinas via API e RPA (Playwright), usando
Databricks, Denodo, PostgreSQL, Grafana, Prefect, CronJob e UV, em arquitetura de
microsserviços.
- [x] `summary`, `responsibilities` e `technologies` atualizados em
      [`src/content/experience/01-sicredi.yaml`](src/content/experience/01-sicredi.yaml)
- [x] Todas as tecnologias novas foram adicionadas à seção Stack
      ([`src/content/stack/main.yaml`](src/content/stack/main.yaml))

Ainda em aberto, se quiser deixar mais forte:
- [ ] `achievements` está vazio nesse arquivo — se tiver algum número concreto (ex.: "reduziu
      X horas/mês de trabalho manual do setor Y"), adicionar ali tem mais impacto do que
      descrições de tarefa.

---

## 🟡 5. Divergência nos números de deploy

As duas fontes discordam. Usei os do **currículo em PDF** (mais recente):

| Fonte | Design system | Produto |
|---|---|---|
| `CV - PT-BR.pdf` ✅ usado | 25 → 4 min | 15 → 3 min |
| `Profile.pdf` (LinkedIn) | 20 → 5 min | 25 → 3 min |

O `Profile.pdf` também cita "aumento de 75% na velocidade de implantação do monorepo",
que não aparece no currículo e **não foi incluída** no site.

- [ ] Confirmar quais números estão corretos e alinhar as duas fontes.
- [ ] Decidir se a métrica do monorepo entra.
- Arquivos afetados: [`02-sbsistemas.yaml`](src/content/experience/02-sbsistemas.yaml),
  [`design-systems.md`](src/content/projects/design-systems.md),
  [`migracao-next-vite.md`](src/content/projects/migracao-next-vite.md),
  [`main.yaml`](src/content/profile/main.yaml) (estatística do hero)

---

## 🟡 6. Stack tecnológica — revisar antes de publicar

Montei a lista a partir dos dois PDFs e **completei com tecnologias prováveis** para um
perfil do seu nível. Listar algo que você não domina é o pior risco possível num portfólio:
é a primeira coisa que um entrevistador testa.

**Revise item a item em [`src/content/stack/main.yaml`](src/content/stack/main.yaml).**

Itens que **inferi** e que você deve confirmar ou remover:

- [ ] `Node.js` — não aparece em nenhum PDF
- [ ] `Astro` — incluí porque este site usa
- [ ] `Vercel` — inferido
- [ ] `GitHub` como ferramenta (os PDFs citam GitLab CI no trabalho)
- [ ] `Monorepo` — citado no `Profile.pdf`, confirmar o nível de envolvimento
- [ ] `Desenvolvimento assistido por IA` — inferido
- [ ] `Kotlin` e `Go` — constam no currículo; confirmar se está confortável em entrevista
- [ ] `HeroUI`, `Emotion`, `Testing Library` — confirmar

Revise também a marcação `core: true` (as tecnologias em destaque no topo da seção).
Hoje são: React, TypeScript, Next.js, Astro, JavaScript, APIs REST, GitLab CI/CD, Git, Cypress,
Python, FastAPI, PostgreSQL, Grafana, Playwright (as últimas cinco vieram do Sicredi).

Também foram adicionados a partir da experiência do Sicredi: Databricks, Denodo, Prefect,
CronJob, UV, Microsserviços e RPA. Confira se `core: true` está bem distribuído — hoje o
destaque ficou meio dividido entre front-end e o trabalho mais recente de back-end/automação
no Sicredi, o que é fiel à sua trajetória, mas vale revisar se é a mensagem que você quer
passar.

---

## 🟡 7. Foto de perfil

O site foi desenhado para funcionar **sem foto** (usa um monograma). Uma foto profissional
aumenta a conexão com recrutadores.

- [ ] Adicionar `src/assets/avatar.jpg` (mínimo 800×800, quadrada, fundo neutro)
- [ ] Descomentar/preencher o campo `avatar` em
      [`src/content/profile/main.yaml`](src/content/profile/main.yaml):
      ```yaml
      avatar:
        image: ../../assets/avatar.jpg
        alt: Foto de Makley Tibola Trichez, desenvolvedor de software.
      ```

---

## 🟢 8. Imagens dos projetos

As 7 capas são **arte abstrata gerada por script** ([`scripts/generate-covers.mjs`](scripts/generate-covers.mjs)),
não capturas de tela. Foi uma decisão deliberada: três dos projetos são produtos fechados de
um empregador, e republicar a interface deles não é uma decisão sua. O conjunto gerado também
fica visualmente mais coeso do que prints em recortes diferentes.

- [ ] **Se tiver autorização da SBSistemas**, substituir por capturas reais de AgroNota e
      SimplesCTe — o impacto é maior. Formato: **1200×750** (proporção 16:10), em
      `src/assets/projects/`, mantendo o mesmo nome do arquivo. O layout não muda.
- [ ] Adicionar galeria (`gallery`) nos estudos de caso, se tiver mais imagens.
- [ ] Se preferir manter a arte gerada, rode `npm run covers` após qualquer ajuste no script.

---

## 🟢 9. Textos dos estudos de caso

Escrevi os textos de problema/solução/desafios a partir dos PDFs e das páginas públicas dos
produtos. **A técnica está correta, mas a voz é minha, não a sua.**

- [ ] Reler os 7 arquivos em [`src/content/projects/`](src/content/projects/) e ajustar o tom
- [ ] **Corrigir qualquer detalhe técnico impreciso** — descrevi os desafios com base no que é
      típico desses domínios, não no que você viveu. Isso é o mais importante desta lista:
      você precisa conseguir defender cada frase numa entrevista.
- [ ] Confirmar se pode citar publicamente que trabalhou nesses produtos (NDA)
- [ ] `gestao-escolar.md`: adicionar nome, marca e link quando o produto for público
- [ ] `llm-em-dispositivos-moveis.md`: adicionar o link do artigo, se publicado
- [ ] `portfolio.md`: adicionar o link do repositório no GitHub, se for torná-lo público

---

## 🟢 10. Ajustes de posicionamento

- [ ] **Status de disponibilidade.** Está como `selective` ("Aberto a conversas selecionadas"),
      porque você está empregado no Sicredi. Se estiver buscando ativamente, mude para `open`.
      Campo `availability` em [`src/content/profile/main.yaml`](src/content/profile/main.yaml).
- [ ] **Cargo exibido.** Usei "Software Engineer" (do LinkedIn). O currículo diz
      "Desenvolvedor Front-end Pleno". Escolha o que quer projetar — o site inteiro usa
      o campo `title`.
- [ ] **Headline desatualizada frente ao trabalho atual.** O campo `headline`
      ("...especializado em front-end, design systems e performance") ainda descreve o perfil
      dos anos na SBSistemas. Seu trabalho mais recente no Sicredi é back-end/automação
      (Python, FastAPI, RPA) — bem diferente. Vale decidir conscientemente: manter o
      posicionamento front-end (se é para onde quer voltar) ou ampliar a headline para refletir
      que você também atua em back-end e automação. Campo em
      [`src/content/profile/main.yaml`](src/content/profile/main.yaml).
- [ ] **Frase do hero.** "Construo produtos digitais que *escalam* para milhares de pessoas."
      Campo `heroStatement` (a palavra em `emphasis` vira serifa itálica).
- [ ] **Telefone.** Está no schema.org mas não aparece visualmente. Se quiser exibi-lo,
      me avise — é uma linha na seção de contato.
- [ ] Revisar os 3 parágrafos da bio (campo `bio`).

---

## 🟢 11. Opcionais

- [ ] **Analytics sem cookies** (Plausible/Umami): definir `PUBLIC_ANALYTICS_SRC` e
      `PUBLIC_ANALYTICS_DOMAIN`. Sem elas, nenhum script de rastreamento é carregado.
- [ ] **Versão em inglês.** A arquitetura suporta i18n (o Astro tem roteamento por idioma
      nativo), mas exigiria duplicar o conteúdo. O PDF em inglês já está disponível para
      download em `/curriculo`.
- [ ] **Atualizar o Astro.** O projeto usa Astro 5.18 (estável e verificado). Existe uma
      versão major mais recente; a migração deve ser feita com calma e testada, não às
      pressas antes de publicar.

---

## Como editar o conteúdo

Nenhum item acima exige mexer em componentes ou em código de layout. Todo o conteúdo vive em
arquivos de texto validados no build:

```
src/content/
├── profile/main.yaml          # nome, bio, contatos, estatísticas, redes
├── projects/*.md              # um arquivo por projeto (frontmatter + estudo de caso)
├── experience/*.yaml          # um arquivo por experiência profissional
├── education/*.yaml           # um arquivo por formação/certificação/evento
└── stack/main.yaml            # todas as tecnologias, agrupadas por categoria
```

Se algum campo obrigatório estiver errado ou faltando, **o build falha com uma mensagem
explicando exatamente qual arquivo e qual campo** — nunca vai para o ar quebrado.

```bash
npm run build
```
