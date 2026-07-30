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

## ✅ 2. Formulário de contato — resolvido

O formulário está **100% funcional** via Web3Forms, com:
- [x] Conta Web3Forms criada (acesso_key configurado na Vercel e `.env.example`)
- [x] Envio de e-mail sem página sair (via `fetch`, sem reload)
- [x] Toast de confirmação: *"Obrigado pelo contato! Responderei assim que possível."*
- [x] Fallback `mailto:` mantido (quando sem endpoint configurado)
- [x] PostHog logging de erros e submissões bem-sucedidas

Detalhes:
- [`ContactSection.astro`](src/presentation/components/organisms/ContactSection.astro) — form com progressive enhancement
- [`contact-form.ts`](src/presentation/scripts/contact-form.ts) — validação + fetch + PostHog capture
- [`Toast.astro`](src/presentation/components/atoms/Toast.astro) + [`toast.ts`](src/presentation/scripts/toast.ts) — notificações site-wide

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

## ✅ 5. Números de deploy — confirmado

Confirmado: 25 → 4 min (design system) e 15 → 3 min (produto) — os valores do currículo em
PDF — estão corretos. A menção a "75% de aumento no monorepo" do `Profile.pdf` continua fora
do site (nunca chegou a ser confirmada).

---

## ✅ 6. Stack tecnológica — confirmado

Confirmado como corretos: Node.js, Astro, Vercel, GitHub, Kotlin, Go, HeroUI, Emotion,
Testing Library. `Monorepo` e `Desenvolvimento assistido por IA` foram **removidos** (não
confirmados). Adicionados: **Bun**, **Elysia**, **TanStack Router**, **React Router**.

`core: true` agora reflete o que você apontou como principal: Node.js, Elysia, GitHub,
GitLab CI/CD, e todo o ecossistema React (HeroUI, Emotion, Testing Library, Material UI,
React Hook Form, Zustand, TanStack Query, TanStack Router, React Router) — além do que já
era core (React, TypeScript, Python, FastAPI, PostgreSQL, Grafana, Playwright, Cypress etc.).

- [ ] Bun e Elysia não aparecem em nenhuma experiência cadastrada
      ([`src/content/experience/*.yaml`](src/content/experience/)) — se forem usados num
      job específico (ex.: back-end do produto próprio de gestão escolar), vale adicionar lá
      também para dar contexto de onde essa experiência vem.

---

## ✅ 7. Foto de perfil — resolvido

Herdada do GitHub via [`scripts/fetch-avatar.mjs`](scripts/fetch-avatar.mjs) (`pnpm avatar`)
e commitada em `src/assets/avatar.png` — mesmo princípio do currículo em PDF: buscada uma vez,
guardada no repositório, sem dependência de rede em tempo de execução. Aparece na seção
"Sobre", acima dos dados rápidos.

- [ ] Se atualizar a foto do GitHub, rode `pnpm avatar` de novo para atualizar o arquivo local.

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
- [ ] Se preferir manter a arte gerada, rode `pnpm run covers` após qualquer ajuste no script.

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

## 🟡 10. Ajustes de posicionamento — rascunho aplicado, revise a voz

Você confirmou: disponível para conversas, cargo "Software Engineer", direção geral
apontando para **arquitetura de software, back-end e DevOps** (ainda em definição). Como
você pediu sugestões, apliquei um rascunho em vez de só listar a pergunta — **revise o texto,
é a parte mais "sua" do site**.

- [x] **Disponibilidade.** Mantida `selective`; nota atualizada removendo a ênfase específica
      em "produto e front-end", substituída por "arquitetura de software, back-end e DevOps".
- [x] **Cargo.** Mantido "Software Engineer".
- [ ] **Headline (rascunho).** *"Software Engineer — atuo de soluções específicas a
      arquiteturas complexas que precisam escalar."* Campo `headline` em
      [`src/content/profile/main.yaml`](src/content/profile/main.yaml), marcado com um
      comentário `RASCUNHO` no arquivo.
- [ ] **Especialidades (rascunho).** Adicionei "Arquitetura de software" e "Back-end &
      Automação"; troquei "DevOps para front-end" por "DevOps" (mais amplo, já que hoje isso é
      trabalho real no Sicredi, não só apoio ao front-end). Campo `specialties`.
- [ ] **Objetivos (rascunho).** Reescrevi os dois primeiros para apontar para arquitetura de
      software e DevOps na prática; mantive "levar o produto próprio ao mercado" como está.
      Campo `goals`.
- [ ] **Nova área de atuação.** Adicionei um 5º card "Arquitetura & Back-end" em `focusAreas`,
      mantendo os 4 originais (ainda reais e válidos) em vez de apagar sua trajetória de
      front-end.
- [x] **Frase do hero.** Confirmada sem alteração — já combina bem com "soluções que precisam
      escalar".
- [x] **Telefone — respondendo sua pergunta.** Não, não seria prudente deixá-lo público. Um
      número pessoal exposto atrai ligação/SMS/WhatsApp indesejado, e você já tem e-mail,
      LinkedIn e formulário como canais — quem realmente quer falar com você usa um desses.
      Além disso, **encontrei um problema**: mesmo sem aparecer visualmente, o campo `phone`
      estava sendo emitido no JSON-LD (dado estruturado lido por buscadores/scrapers), ou seja,
      já estava público de fato. Removi essa emissão — o telefone agora não aparece em lugar
      nenhum acessível a terceiros. O campo continua no YAML caso queira usá-lo só
      internamente.
- [ ] Revisar os 3 parágrafos da bio (campo `bio`) — ainda pendente, por sua conta.

---

## ✅ 11. PDF do currículo — agora gerado a partir dos dados do site

O PDF em português (`/curriculo/makley-trichez-cv-pt-br.pdf`) deixou de ser um arquivo
enviado manualmente do Google Drive e passou a ser **gerado no build**, a partir das mesmas
entidades que alimentam a página `/curriculo` online (Profile, Experience, Education,
Stack). Isso elimina o problema de o PDF e a página ficarem dessincronizados — agora existe
só uma fonte de verdade para o conteúdo do currículo.

- [x] Gerado via [`src/pages/curriculo/makley-trichez-cv-pt-br.pdf.ts`](src/pages/curriculo/makley-trichez-cv-pt-br.pdf.ts),
      layout definido em [`src/presentation/pdf/resume-document.ts`](src/presentation/pdf/resume-document.ts)
- [x] Roda apenas no build (site 100% estático) — nenhum custo por requisição

O PDF em inglês continua sendo o arquivo manual em `public/curriculo/makley-trichez-cv-en-us.pdf`,
já que o conteúdo do site só existe em português. Se quiser essa versão gerada também, seria
necessário traduzir o conteúdo de `src/content/**` — fora do escopo por enquanto.

Se quiser ajustar o **visual** do PDF gerado (fontes, tamanhos, quebras de seção), edite
`resume-document.ts` — hoje ele fica em 3 páginas, o que é razoável dado o volume real de
experiências e stack, mas dá para compactar se preferir 1-2 páginas.

---

## ✅ 12. Opcionais

- [x] **Analytics: PostHog.** Implementado em
      [`src/presentation/scripts/analytics.ts`](src/presentation/scripts/analytics.ts),
      carregado só se `PUBLIC_POSTHOG_KEY` estiver definida. O `import()` do `posthog-js` é
      dinâmico e condicional — confirmei no build que, sem a chave, a lib **nem entra** no
      bundle (o Rollup elimina o código morto por trás do `return` antecipado). Zero custo
      até você ligar.
      - [ ] Criar um projeto em [posthog.com](https://posthog.com), copiar a chave em
            *Project Settings → Project API Key* e definir `PUBLIC_POSTHOG_KEY` (e
            `PUBLIC_POSTHOG_HOST` se o projeto não for na região "us").
      - Tentei rodar o wizard oficial (`npx @posthog/wizard@latest`) que você indicou, mas ele
        exige Node ≥22.22 (a máquina tinha 22.19) **e** login/API key na sua conta PostHog —
        não tenho como autenticar por você. Implementei manualmente o mesmo resultado.
- [ ] **Internacionalização (inglês + espanhol).** Ver seção dedicada abaixo — é grande
      demais para entrar de forma solta aqui.
- [x] **Não atualizar o Astro agora.** Mantido em 5.18, como confirmado.

---

## 🟡 13. Internacionalização (i18n) — inglês e espanhol

Você marcou como importante, mas isso é um projeto à parte, não um ajuste pontual. Vale
entender o tamanho antes de começar:

- O Astro tem roteamento i18n nativo (`/en/`, `/es/` como prefixo, ou domínios/subdomínios
  separados), então a parte de **infraestrutura de rotas** é resolvida.
- O que realmente dá trabalho: **todo texto de interface está em português, direto no
  código** de cada componente — títulos de seção, rótulos de botão, textos de estado do
  formulário, mensagens de erro, tudo. Isso precisaria migrar para um dicionário de traduções
  central antes de qualquer coisa.
- **Todo o conteúdo** em [`src/content/`](src/content/) (perfil, 7 projetos, 4 experiências,
  formação, stack) precisaria existir em 3 versões — ou traduzido por mim (rascunho, você
  revisa) ou por você.
- SEO precisa de `hreflang` por página e possivelmente sitemaps por idioma.
- O currículo em PDF gerado ([item 11](#-11-pdf-do-currículo--agora-gerado-a-partir-dos-dados-do-site))
  precisaria gerar uma versão por idioma também.

Isso é facilmente a maior tarefa pendente deste documento — bem maior que qualquer item
anterior. Recomendo tratar como uma iniciativa própria, não uma tarefa de revisão de
conteúdo. Quando quiser começar, me diga e eu preparo um plano específico (extensão do
schema de conteúdo, estrutura do dicionário de UI, e se as traduções PT→EN/ES ficam por
minha conta como rascunho ou se você vai fornecer).

---

## ✅ 14. Extras

- [x] **npm → pnpm.** `package-lock.json` removido, `pnpm-lock.yaml` gerado, todos os
      comandos no README/scripts atualizados. `packageManager` fixado em `package.json`
      para o corepack usar a versão certa.
- [x] **Front-end Pleno → Sênior.** Campo `seniority` em
      [`02-sbsistemas.yaml`](src/content/experience/02-sbsistemas.yaml). Propaga sozinho
      para o currículo online e o PDF gerado (nenhum outro lugar tinha o texto hardcoded).
- [x] **"22 mil+ clientes" → "22 mil+ usuários impactados".** Você notou que "clientes" dava
      a entender que eram seus clientes — eram usuários dos sistemas em que você trabalhou
      como funcionário. Corrigido na estatística do hero e no card de Open Graph.
- [ ] **Item 3 dos Extras ("Alterar") veio sem conteúdo** — a mensagem terminou em
      "3. Alterar" sem o resto da frase. Me diga o que faltou que eu aplico.

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
pnpm run build
```
