# Notas — Projeto Jogo Educativo de Futebol

Projeto: jogo educativo para criança de 8 anos praticar **leitura, escrita e matemática** com tema de **futebol**.

Modo de execução: autônomo (usuário pediu para não pausar com perguntas; decisões razoáveis registradas com justificativa).

---

## Passo 1 — Local do projeto

- Diretório: `D:/Usuário/Documentos/Projetos Claude/jogo`
- Status: já existia, estava vazio (apenas `desktop.ini` do Windows)
- Decisão autônoma: usar o diretório atual (já nomeado "jogo", é o destino óbvio)

## Passo 2 — Instalação Ralph

- Scripts copiados para: `D:/Usuário/Documentos/Projetos Claude/jogo/.ralph/`
- 11 arquivos: ralph-bundle, ralph-deadcode, ralph-duplication, ralph-entropy, ralph-flaky, ralph-linting, ralph-pipeline, ralph-prd, ralph-test-coverage, ralph-types, ralph-vulnerability
- `chmod +x` aplicado em todos

## Passo 3 — Descoberta de negócio (decidido autonomamente)

### Problema e usuário
- **Quem**: criança de 8 anos.
- **Dor**: praticar leitura, escrita e matemática de forma divertida, sem parecer "lição de casa".
- **Como é resolvido hoje**: apostilas, jogos genéricos sem tema, apps com paywalls e propaganda.

### Proposta de valor
- Jogo **temático de futebol** que combina os três eixos (leitura/escrita/matemática) em uma narrativa de carreira: a criança evolui um jogador/time conforme acerta exercícios.
- Sem propaganda, sem cadastro, sem pagamento. Roda local no navegador.
- Em português do Brasil, com vocabulário e dificuldade adequados a 8 anos.

### Escopo MVP
**Dia 1 (essencial)**:
- Tela inicial com escolha de personagem-jogador.
- 3 minigames, um por eixo:
  - **Leitura**: interpretação de pequenas narrações de jogo + perguntas de múltipla escolha.
  - **Escrita**: completar palavras/frases sobre futebol (lacunas, ortografia básica).
  - **Matemática**: contas simples (soma, subtração, multiplicação até tabuada do 5) com contexto de futebol (gols, pontos, jogadores).
- Sistema de pontuação que vira "moedas" para "comprar" itens cosméticos (chuteira, camisa, troféu).
- Salvamento local automático (localStorage).
- Feedback positivo audiovisual (sem barulhos negativos para erro — apenas dica e nova tentativa).

**Pode esperar (nice-to-have)**:
- Multiplayer.
- Conteúdo gerado por IA.
- Customização avançada de personagem.
- Acompanhamento por responsável (relatórios).
- Mais eixos (ciências, história).

### Métricas de sucesso
- Criança consegue jogar **sozinha**, sem precisar de ajuda do adulto para entender as instruções.
- Cada minigame tem **pelo menos 20 exercícios** distintos (conteúdo suficiente para várias sessões).
- Sessão típica de 10-15 min sem ficar repetitivo.
- Nada trava, nada some, progresso persiste entre sessões.

### Restrições
- Roda **offline** no navegador (criança pode jogar sem internet).
- Nenhum dado pessoal é coletado (sem LGPD em jogo — sem cadastro, sem servidor).
- Funciona em desktop e tablet (mouse + touch).
- Gratuito, sem propaganda.

## Passo 4 — Infraestrutura (decidido autonomamente)

Como é jogo local, infantil, sem backend nem dados pessoais, escolhi a stack **mais simples possível**:

| Decisão | Escolha | Justificativa |
|---|---|---|
| Linguagem | HTML5 + CSS3 + JavaScript vanilla | Zero dependências, abre com duplo clique, sem build, sem npm, sem node — qualquer navegador moderno roda. |
| Framework | Nenhum | Projeto pequeno; framework seria overhead. Reduz superfície de bugs. |
| Build tool | Nenhum | Arquivos servidos direto. Mais fácil de manter para usuário não-programador. |
| Hospedagem | Local (file://) ou GitHub Pages futuramente | Custo zero. |
| Banco | localStorage do navegador | Salva progresso sem servidor. Suficiente para single-user. |
| Auth | Nenhuma | Não há conta nem login. |
| Pagamentos | Nenhum | Gratuito. |
| Integrações | Nenhuma | 100% offline. |
| CI/CD | Nenhum | Projeto local. |
| Observabilidade | Console do navegador (suficiente para esse escopo) | Sem servidor, sem custo. |
| Domínio | Não aplicável | Roda local. |

**Sprint 0 fica essencialmente vazia** — nenhuma conta, credencial ou serviço externo precisa ser criado. Esta é a maior vantagem de escolher stack local: o usuário não-programador não precisa lidar com cadastros, planos, API keys.

## Passo 5 — Plano de ação

### Sprint 0 (usuário) — VAZIA

Nenhuma ação necessária do usuário. Não há contas a criar, planos a contratar, domínios a registrar nem credenciais a gerar. Stack 100% local.

### Sprint 1 (Claude via pipeline Ralph) — registrada em `PRD.md`

Tarefas técnicas implementadas pela pipeline.

## Passo 6 — PRD.md gravado

- Arquivo: `PRD.md`
- 25 tarefas no backlog técnico, ordenadas por dependência
- Stack documentada (HTML/CSS/JS vanilla, localStorage)

## Passo 7 — Sprint 0

- **Vazia, conforme planejado**: stack 100% local não exige nenhuma conta, plano, credencial, domínio ou serviço externo.
- `.gitignore` criado (inclui `.env.local` por segurança, mesmo que não seja usado neste projeto).
- Nenhuma credencial coletada.

## Passo 8 — Pipeline disparada

- Configuração: `pipeline.conf` com budgets dobrados conforme protocolo
- `types` removida (vanilla JS sem checador estático)
- 9 loops totais, 212 iterações máximas (provavelmente menos na prática — loops como `vulnerability` e `deadcode` saem cedo num projeto novo)

| Loop | Budget | Justificativa |
|---|---|---|
| prd | 60 | 25 tarefas × 1.2 × 2 |
| vulnerability | 6 | sem dependências externas |
| deadcode | 10 | projeto novo |
| linting | 30 | vários arquivos JS |
| duplication | 20 | conservador |
| entropy | 30 | conservador |
| test-coverage | 40 | meta de cobertura razoável |
| flaky | 6 | projeto novo, pouco flake |
| bundle | 10 | sem build, pequeno escopo |

## Relatório final (Passo 9)

- **Início**: 2026-05-08T16:26:27-03:00
- **Fim**: 2026-05-08T20:55:30-03:00
- **Duração**: ~4h29min
- **Status global**: 8 de 9 loops COMPLETE; 1 INCOMPLETE (`deadcode`)

### Resumo do que foi entregue

**Arquivos do jogo** (44 arquivos no total, fora `.ralph/`):

- `index.html` — entry point (abre com duplo clique no navegador)
- `README.md` — instruções para responsável (124 linhas)
- `css/`: `style.css`, `theme-futebol.css`
- `js/` (núcleo): `main.js`, `storage.js`, `audio.js`, `ui.js`, `jogador.js`, `moedas.js`, `loja.js`, `progresso.js`, `historico.js`, `comemoracao.js`, `dificuldade.js`, `escolha-eixo.js`
- `js/utils/`: `embaralhar.js`
- `js/games/`: `leitura.js`, `escrita.js`, `matematica.js`, `cabecalho-sessao.js`, `dificuldade-adaptativa.js`, `feedback-exercicio.js`, `sessao-bootstrap.js`, `sessao-resumo.js`
- `js/data/`: `leitura-exercicios.js`, `escrita-exercicios.js`, `matematica-exercicios.js`
- `tests/` (10 arquivos): `run.js` (runner) + `storage.test.js`, `dificuldade.test.js`, `embaralhamento.test.js`, `historico.test.js`, `jogador.test.js`, `loja.test.js`, `moedas.test.js`, `progresso.test.js`, `validacao-respostas.test.js`

Backlog do PRD: **51 de 52 tarefas concluídas** (a única pendente é "Validação final" — uma criança de carne e osso jogar e confirmar — coisa que só você pode fazer).

### Status detalhado de cada loop

| # | Loop | Status | Usadas | Budget | Restantes | Sugestão p/ próxima |
|---|------|--------|--------|--------|-----------|--------------------|
| 1 | prd | COMPLETE | 26 | 60 | 34 | 31 |
| 2 | vulnerability | COMPLETE | 1 | 6 | 5 | 6 |
| 3 | deadcode | **INCOMPLETE** | 10 | 10 | 0 | **15** |
| 4 | linting | COMPLETE | 1 | 30 | 29 | 6 |
| 5 | duplication | COMPLETE | 8 | 20 | 12 | 13 |
| 6 | entropy | COMPLETE | 7 | 30 | 23 | 12 |
| 7 | test-coverage | COMPLETE | 4 | 40 | 36 | 9 |
| 8 | flaky | COMPLETE | 1 | 6 | 5 | 6 |
| 9 | bundle | COMPLETE | 1 | 10 | 9 | 6 |

### Observações acumuladas durante o protocolo

- **Stack 100% local foi a decisão certa**: zero contas, zero credenciais, zero custo recorrente. Sprint 0 ficou totalmente vazia, o que é incomum mas é o efeito colateral positivo de escolher o stack mais simples possível.
- **Pipeline rodou de forma sub-ótima do diretório `Scripts Ralph/`**: a primeira tentativa, rodando os scripts a partir do próprio `.ralph/` do projeto, falhou porque `cp` reclamou ao copiar arquivo sobre ele mesmo. Isso é um pequeno bug ergonômico do orquestrador — bom registrar como ideia de melhoria do `Scripts Ralph/`.
- **Loops `vulnerability`, `linting`, `flaky`, `bundle` saíram em 1 iteração**: confirmação de que num projeto vanilla sem dependências e sem build a maioria dos loops de qualidade tem pouco a fazer. Os budgets para essas etapas podem ser bem reduzidos numa próxima rodada.
- **Loop `deadcode` ficou INCOMPLETE com remoções razoáveis**: 9-10 constantes/funções exportadas que o sub-Claude verificou como totalmente sem uso. As justificativas registradas em `deadcode-progress.txt` são meticulosas (cada remoção tem grep abrangente confirmando zero chamadores). Para uma próxima rodada, sugestão de budget é 15.
- **Os loops escreveram dentro de funções/classes que não existiam ao escrever o PRD original**: por exemplo, surgiram `js/games/sessao-bootstrap.js`, `js/games/feedback-exercicio.js`, `js/historico.js` e `js/utils/embaralhar.js` — o sub-Claude reorganizou em módulos reutilizáveis em vez de duplicar lógica. Isso é desejável.

### Questões remanescentes

- [ ] **Validação final humana**: você precisa abrir o `index.html` no navegador, jogar uma sessão de cada minigame (leitura, escrita, matemática) e confirmar que tudo funciona como esperado pra criança de 8 anos. Inclui: progresso salva entre sessões, sons funcionam, loja abre, moedas acumulam, dificuldade adaptativa muda, animações de comemoração rodam.
- [ ] **`deadcode` rodar mais uma rodada com budget 15**: o loop encontrou pelo menos 1 candidato remanescente (`EscolhaEixo.EIXOS`) que não conseguiu remover. Se quiser, podemos rodar `bash .ralph/ralph-deadcode.sh 15` separadamente.
- [ ] **Rodar os testes não foi possível durante a pipeline**: o sub-Claude registrou nas notas que `node` ficou bloqueado por permissão dentro do ambiente isolado dele. Isso significa que os testes nunca foram efetivamente executados — só escritos. Vale rodar manualmente: `node tests/run.js` (a partir da raiz do projeto), ou eu posso fazer isso pra você.
- [ ] **Sem repositório Git**: o protocolo registrou que o projeto não é um repo Git (`Is a git repository: false`). Se quiser versionar o trabalho, precisa de `git init` + commit inicial.

### Próximos passos sugeridos

1. **Iniciar o servidor local** (`python -m http.server 8000` na pasta `jogo/`) e abrir `http://localhost:8000` no navegador para a primeira jogada de teste.
2. Sentar com a criança de 8 anos e ver na prática se o jogo agrada e se o vocabulário/dificuldade está adequado. Anotar atritos.
3. Rodar `node tests/run.js` para confirmar que a suíte passa.
4. Se for compartilhar, considerar `git init` e publicar como GitHub Pages (gratuito).
5. (opcional) rodar `bash .ralph/ralph-deadcode.sh 15` para limpar os ~1-2 itens remanescentes de código morto.

---

# Evolução neuropsicológica (2026-05-30)

Contexto: o jogo passou a ser usado pelo **Benjamin** (filho do Daniel, 7a 11m no laudo, **Altas Habilidades**). O laudo neuropsicológico apontou dois pontos a nivelar com o potencial superior dele, que viraram o roteiro desta evolução:

1. **Reconto narrativo** (limítrofe, P7 comparado a 9 anos): praticar a **produção** de reconto — identificar personagens, problema, tentativa de solução, desfecho e ideia central. (A compreensão por reconhecimento/múltipla escolha ele já domina — P>70.)
2. **Atenção a detalhes visuais** (recomendação oral da neuropsicóloga; ponto mais baixo do laudo, ponderado 11).

Hospedagem passou a ser **GitHub Pages** (HTTPS): `https://danielfrasson.github.io/jogo-futebol/` (repo `danielfrasson/jogo-futebol`, branch `main`). O jogo é publicado a cada `push`.

## Entrega A — Novo eixo "Contar Histórias" (Reconto)

4º eixo, focado na recomendação 1. Fluxo (1 história por sessão): ler a história (com TTS "Ouvir" opcional) → **recontar falando no microfone** (Web Speech API transcreve em pt-BR) → avaliação automática dos **5 elementos** (medalhas) → **dicas dirigidas** para cada elemento faltante ("O que essa história ensina?") com nova chance de falar só aquela parte (scaffolding) → tela final com medalhas, moedas, ideia central de referência, **reescuta do áudio** e a **transcrição** (metacognição).

Decisões alinhadas com o Daniel (via perguntas):
- Reconto **oral** com transcrição (preferência dele); como o jogo está online em HTTPS, microfone + voz funcionam sem servidor local.
- Banco de **histórias ricas** calibradas para ~9 anos; **avaliação flexível + dicas**; **1 história por sessão** (reconto é cognitivamente pesado).

Arquitetura (vanilla, IIFE, mesmo padrão dos outros eixos):
- `js/games/reconto-avaliacao.js` — lógica pura testável: normalização, detecção por termo com **coringa de radical** (`venc*` casa venceu/venceram) e limite de palavra (sem falso positivo "téo"⊄"teoria"), avaliação por elemento e do reconto, pontuação (base por dificuldade × elementos + bônus de reconto completo).
- `js/games/reconto-voz.js` — wrapper de **SpeechRecognition** (pt-BR, contínuo, reinício em pausa) + **MediaRecorder** (reescuta). Fallback gracioso: navegador sem transcrição (ex.: Firefox) → digitar.
- `js/games/reconto.js` — UI/orquestração do minigame.
- `js/data/reconto-exercicios.js` — banco (começou com 50; depois 100 — ver Entrega B).
- Integração: 4º cartão em `js/escolha-eixo.js`; eixo `reconto` na tela de Progresso (`js/progresso.js`); estilos em `css/style.css` (medalhas, gravador pulsante, transcrição ao vivo, fallback, `prefers-reduced-motion`); scripts em `index.html`.

**Exceção consciente ao princípio "100% offline":** o reconto exige microfone + transcrição (secure context + internet). Os demais eixos seguem offline em `file://`. Documentado no README.

## Correção — transcrição duplicada (Web Speech API)

Sintoma relatado pelo Daniel após testar: a transcrição **repetia as mesmas palavras inúmeras vezes** (texto confuso) e a avaliação marcava como "faltou" o que o Benjamin disse (consequência do texto embolado).

Causa raiz: o acúmulo dos resultados finais usava `event.resultIndex`, que em vários navegadores (**Chrome Android** em especial) não avança de forma confiável, e o reinício automático após pausa reemitia o mesmo trecho.

Correção em duas camadas:
- **Raiz** (`reconto-voz.js`): reconstruir os finais da sessão a cada `onresult` (iterando de 0, sem somar) e "commitar" uma vez por sessão antes de reiniciar. Verificado por simulação dos eventos reproduzindo o padrão do mobile.
- **Rede de segurança** (`reconto-avaliacao.js`): função pura `colapsarRepeticoes` (colapsa blocos de 1..6 palavras repetidos em sequência, tolerante a acento/pontuação/caixa) aplicada antes de avaliar e no texto exibido (`reconto.js`).

## Entrega B — Viés da leitura + expansão do reconto (com agentes paralelos)

A pedido do Daniel, e para agilizar sem sobrecarregar o contexto, usei **5 agentes especializados em paralelo** (1 para a leitura + 4 para o reconto).

**B1 — Viés das alternativas na leitura.** O Benjamin descobriu que acertava a interpretação "chutando pela alternativa mais longa". Medição confirmou viés severo: a correta era a **mais longa em 98%** das 1125 perguntas e estava no **índice 1 em 85%** (nunca no índice 3).
- Correção no gerador `tools/gerar-bancos.js` (distratores reescritos como frases completas; `equilibrarComprimento` alonga o maior distrator em ~70% das perguntas via PRNG seeded, sem inverter o viés; posição da correta randomizada) + `embaralharPergunta` em runtime no `js/games/leitura.js` (embaralha as alternativas remapeando `correta`).
- Resultado (verificado de forma independente): correta-mais-longa **98% → 22,9%**; comprimento médio correta **64→72** vs distrator **32→71** (diferença 0,7 char); posição **uniforme** `{0:283,1:276,2:262,3:304}`. Banco regenerado com IDs estáveis; escrita/matemática **byte-idênticos**.
- Teste de regressão: `tests/leitura-vies.test.js` (falha se o viés voltar).

**B2 — Reconto: 50 → 100 histórias.** 30 fáceis + 35 médias + 35 difíceis = **70 mais difíceis** que o nível anterior (~10-13 anos, com reviravoltas e dilemas morais — para desafiar de verdade as Altas Habilidades).
- Pipeline reproduzível para gerar em paralelo sem conflito: cada agente escreve um fragmento em `tools/reconto-fragmentos/NN.js`; `tools/checar-fragmento.js` valida cada fragmento (schema + auto-detecção ≥4/5); `tools/montar-reconto.js` valida o conjunto (ids únicos, distribuição, NUL) e **gera** `js/data/reconto-exercicios.js`.
- Auto-detecção média **4,95/5**. Teste de integridade atualizado (100, ≥70 médio+difícil).

## Estado atual do projeto (2026-05-30)

- **4 eixos**: Leitura, Escrita, Matemática, **Reconto (Contar Histórias)**.
- **Reconto**: 100 histórias (30/35/35). Microfone/voz exigem Chrome/Edge (ou Safari); Firefox cai para digitar.
- **Leitura**: sem viés de comprimento nem de posição.
- **Testes**: `node tests/run.js` → **174 verdes**.
- **Publicado** em GitHub Pages, cache `?v=8` (commit `a4fa373`).
- Histórico de commits desta evolução: `5bbaf57` (eixo reconto) → `5e1c584` (fix duplicação) → `a4fa373` (viés leitura + 100 histórias).

## Próximos passos

1. **Validação com o Benjamin** (Daniel): testar o reconto (transcrição limpa? avaliação justa? histórias difíceis no ponto certo de desafio?) e a leitura (ele acha algum novo "atalho"?). Dar refresh forçado (Ctrl+F5 / puxar no celular) na primeira vez.
2. **Eixo "Olho de Águia" (atenção a detalhes visuais)** — recomendação 2, ainda **não iniciado**. Decidido com o Daniel: várias mecânicas misturadas ("o que mudou?", "encontre o intruso", "3 diferenças", "memória visual"), usando emojis/SVG (sem precisar de artista). Fazer **depois** da validação do reconto.
3. Conforme o retorno do uso real: afinar a tolerância da avaliação do reconto e/ou a calibração das histórias difíceis.
4. (manutenção) para ampliar o reconto no futuro, basta adicionar/editar fragmentos em `tools/reconto-fragmentos/` e rodar `node tools/montar-reconto.js`.

