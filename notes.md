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

