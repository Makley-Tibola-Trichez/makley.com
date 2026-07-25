# Conteúdo pendente

Tudo neste arquivo foi **inferido, aproximado ou deixado em branco** porque não constava
nos PDFs enviados (`Profile.pdf` do LinkedIn e `CV - PT-BR.pdf`). Nada aqui impede o site
de rodar — ele está completo e funcional —, mas cada item abaixo melhora a precisão ou
destrava uma funcionalidade.

Marque com `[x]` conforme for resolvendo.

**Legenda de prioridade**
🔴 Bloqueia o lançamento · 🟡 Importante antes de divulgar · 🟢 Refinamento

---

## 🔴 1. Domínio e publicação

- [ ] **Confirmar o domínio final.** Está configurado como `https://makley.com`.
      Isso afeta URLs canônicas, `sitemap.xml`, `robots.txt` e as imagens de Open Graph.
      - Arquivo: [`src/config/site.ts`](src/config/site.ts) → `DEFAULT_URL`
      - Ou defina a variável de ambiente `PUBLIC_SITE_URL` no serviço de hospedagem.
- [ ] **Escolher a hospedagem** (Vercel, Netlify, Cloudflare Pages). O projeto gera
      HTML estático — qualquer uma serve, sem configuração especial.
      Comando de build: `npm run build` · Diretório de saída: `dist`

---

## 🔴 2. Formulário de contato

O formulário **funciona hoje** abrindo o cliente de e-mail do visitante (`mailto:`), mas o
ideal é receber as mensagens direto na caixa de entrada.

- [ ] Criar uma conta gratuita em [Formspree](https://formspree.io),
      [Web3Forms](https://web3forms.com) ou [Basin](https://usebasin.com).
- [ ] Definir a variável de ambiente `PUBLIC_CONTACT_ENDPOINT` com a URL do endpoint.

Sem essa variável o site continua no modo `mailto:` — nunca fica quebrado.
Detalhes da implementação: [`src/presentation/components/organisms/ContactSection.astro`](src/presentation/components/organisms/ContactSection.astro)

---

## 🟡 3. Datas e emissores das certificações

O `Profile.pdf` lista as certificações **sem data e sem instituição emissora**. Preenchi com
datas aproximadas para que a timeline tenha ordenação — **todas precisam ser confirmadas**.
Cada arquivo tem um comentário `# ATENÇÃO` no topo.

| Item | Arquivo | O que falta |
|---|---|---|
| JavaScript (Intermediate) | [`03-hackerrank-javascript-intermediate.yaml`](src/content/education/03-hackerrank-javascript-intermediate.yaml) | Mês/ano reais · confirmar se é HackerRank |
| React (Basic) | [`04-hackerrank-react-basic.yaml`](src/content/education/04-hackerrank-react-basic.yaml) | Mês/ano reais · confirmar se é HackerRank |
| JavaScript (Basic) | [`05-hackerrank-javascript-basic.yaml`](src/content/education/05-hackerrank-javascript-basic.yaml) | Mês/ano reais · confirmar se é HackerRank |
| Desenvolvimento Web Completo | [`06-desenvolvimento-web-completo.yaml`](src/content/education/06-desenvolvimento-web-completo.yaml) | **Instituição emissora** (Udemy? Alura?) e período |
| Acolhe IMED 2022.2 | [`07-acolhe-imed.yaml`](src/content/education/07-acolhe-imed.yaml) | Mês exato · confirmar o nome da instituição |
| Artigo científico (LLMs) | [`02-artigo-llm-mobile.yaml`](src/content/education/02-artigo-llm-mobile.yaml) | Período real da pesquisa · link público, se houver |

- [ ] Confirmar todas as datas acima.
- [ ] Se as certificações do HackerRank tiverem link individual, substituir a URL genérica
      do perfil pelo link do certificado (campo `credentialUrl`).

---

## 🟡 4. Experiência no Sicredi

O `Profile.pdf` traz o cargo e o período, mas **nenhuma descrição de atividades**. Escrevi um
resumo conservador e genérico que precisa ser substituído pelo real.

- [ ] Reescrever `summary`, `responsibilities` e `technologies` em
      [`src/content/experience/01-sicredi.yaml`](src/content/experience/01-sicredi.yaml)
- [ ] Adicionar resultados concretos em `achievements` (números convencem muito mais que
      descrições de tarefas)
- [ ] **Confirmar a localização.** O PDF diz "Forchetta, RS"; usei "Rio Grande do Sul, Brasil".
- [ ] **Confirmar a entidade.** O PDF lista "Sicredi" e "Sicredi Aliança" como dois cargos
      simultâneos — tratei como uma experiência só. Se forem distintas, duplique o arquivo.

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
Hoje são: React, TypeScript, Next.js, Astro, JavaScript, APIs REST, GitLab CI/CD, Git, Cypress.

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
