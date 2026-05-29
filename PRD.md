# PRD — Jogo Educativo de Futebol

## Visão de produto

Jogo web educativo offline para crianças de 8 anos praticarem **leitura, escrita e matemática** com tema de **futebol**. A criança escolhe um jogador, joga 3 minigames (um por eixo), ganha moedas que viram itens cosméticos (chuteira, camisa, troféu) e progride numa carreira fictícia. 100% local — abre com duplo clique no navegador, sem cadastro, sem internet, sem propaganda.

## Stack

- HTML5 + CSS3 + JavaScript vanilla (sem framework, sem build)
- localStorage do navegador para salvar progresso
- Ativos visuais via CSS/SVG inline e/ou emojis (sem dependência de imagens externas)
- Áudio via Web Audio API (efeitos sonoros simples gerados em código) ou arquivos pequenos em `assets/sounds/`

## Estrutura de diretórios alvo

```
jogo/
├── index.html
├── css/
│   ├── style.css
│   └── theme-futebol.css
├── js/
│   ├── main.js
│   ├── storage.js
│   ├── audio.js
│   ├── ui.js
│   ├── games/
│   │   ├── leitura.js
│   │   ├── escrita.js
│   │   └── matematica.js
│   └── data/
│       ├── leitura-exercicios.js
│       ├── escrita-exercicios.js
│       └── matematica-exercicios.js
├── assets/
│   └── (svg/emoji/sons quando necessário)
├── tests/
│   └── (testes unitários simples em JS puro ou via runner mínimo)
└── README.md
```

## Sprint 1 — Backlog técnico

- [x] Criar `index.html` com estrutura básica, meta tags, viewport mobile-friendly e carregamento dos CSS/JS principais
- [x] Criar `css/style.css` com reset, tipografia legível para criança (fonte grande, espaçamento generoso, contraste alto) e layout responsivo desktop+tablet
- [x] Criar `css/theme-futebol.css` com paleta verde-grama/branco/dourado, decorações sutis (linhas de campo, bola estilizada em SVG inline)
- [x] Implementar `js/storage.js` com funções `salvar(chave, valor)`, `carregar(chave)`, `limpar()`, `existeProgresso()` usando localStorage com fallback gracioso quando indisponível
- [x] Implementar `js/audio.js` com efeitos sonoros simples (acerto, erro suave, gol, moeda) gerados via Web Audio API; opção de mute persistente
- [x] Implementar `js/ui.js` com helpers para criar telas, botões grandes acessíveis, modais e transições suaves entre telas
- [x] Implementar tela inicial (menu) com botões grandes: "Jogar", "Loja", "Continuar" (visível só se há progresso salvo) e "Apagar progresso" (com confirmação)
- [x] Implementar tela de escolha/customização inicial de personagem-jogador (nome digitado pela criança, escolha entre 4 avatares simples em SVG/emoji, escolha de cor do uniforme)
- [x] Criar banco de dados de exercícios de **leitura** em `js/data/leitura-exercicios.js`: 20+ pequenas narrações curtas sobre partidas/jogadores fictícios, cada uma com 1-3 perguntas de múltipla escolha (4 alternativas), graduadas em dificuldade
- [x] Implementar minigame de **leitura** em `js/games/leitura.js`: apresenta narração, exibe perguntas, valida resposta, dá feedback positivo, contabiliza acertos e moedas
- [x] Criar banco de dados de exercícios de **escrita** em `js/data/escrita-exercicios.js`: 20+ frases sobre futebol com lacuna a completar (palavra ou letra faltando), incluindo ortografia básica de 8 anos (acentos, ç, lh, nh, etc.)
- [x] Implementar minigame de **escrita** em `js/games/escrita.js`: exibe frase com lacuna, recebe input do jogador, valida ignorando maiúsculas/acentos opcionalmente, dá dicas progressivas em caso de erro, contabiliza moedas
- [x] Criar banco de dados de exercícios de **matemática** em `js/data/matematica-exercicios.js`: 20+ problemas contextualizados (ex: "Time A fez 3 gols, Time B fez 5, quantos gols no total?"), cobrindo soma, subtração e multiplicação até tabuada do 5
- [x] Implementar minigame de **matemática** em `js/games/matematica.js`: apresenta problema, recebe resposta numérica, valida, dá dica em caso de erro, contabiliza moedas
- [x] Implementar sistema central de **moedas e pontuação** persistido via `storage.js`: cada acerto gera N moedas (escalando com dificuldade), exibido em todas as telas com ícone
- [x] Implementar **loja cosmética** com 3 categorias (chuteira, camisa, troféu) e 4-6 itens por categoria, com preço em moedas; itens comprados ficam visíveis no avatar do personagem na tela inicial e durante o jogo
- [x] Implementar tela de **progresso/estatísticas**: total de exercícios feitos por eixo, acertos/erros, moedas acumuladas, itens desbloqueados
- [x] Implementar **embaralhamento e não-repetição** de exercícios dentro de uma sessão para evitar enfado
- [x] Implementar **feedback positivo elaborado**: animações curtas de comemoração ao acertar (bola entrando no gol, confete CSS), mensagens encorajadoras ao errar (sem barulho negativo)
- [x] Implementar **escolha de eixo** na tela de jogo (criança decide se quer leitura, escrita ou matemática naquela sessão)
- [x] Implementar **dificuldade adaptativa simples**: se errar 3 seguidos no eixo, próximo exercício vem mais fácil; se acertar 5 seguidos, próximo vem mais difícil
- [x] Implementar **acessibilidade**: navegação por teclado, foco visível, atributos ARIA básicos, contraste WCAG AA, suporte a redução de movimento (`prefers-reduced-motion`) — skip link, foco gerenciado em troca de tela (foca o `.tela__titulo` para anunciar a nova seção), `aria-live` global removido do `<main>` (substituído por `tabindex="-1"`), supressão de outline em foco programático
- [x] Implementar **suporte a touch** para tablet (botões grandes, sem hover dependente) — botões já com `touch-action: manipulation`, alvos ≥ 48px (`--alvo-toque`); adicionados overrides `@media (hover: none)` para `.botao--futebol`, `.botao--perigo` e `.loja__aba` (estados :hover de cor/borda) que ficavam presos após tap em iOS Safari; `:active` com leve scale-down em `.opcao-avatar`/`.opcao-cor`/`.loja__aba` para feedback de toque; `touch-action: manipulation` + `user-select: none` em `.opcao-avatar`/`.opcao-cor`; `background-attachment: scroll` no body em `(pointer: coarse)` para evitar scroll travado em iOS
- [x] Adicionar **testes unitários** em `tests/` para storage, validação de respostas, embaralhamento, sistema de moedas e dificuldade adaptativa — runner mínimo em Node puro (`tests/run.js`, sem dependências externas) com fixture de `localStorage` em memória; arquivos `tests/storage.test.js`, `tests/moedas.test.js`, `tests/dificuldade.test.js`, `tests/embaralhamento.test.js` (cobrindo `Historico` + Fisher-Yates) e `tests/validacao-respostas.test.js` (escrita: `normalizarTexto`/`removerAcentos`/`compararResposta` por dificuldade/`calcularMoedas`; matemática: `normalizarEntrada`/`parseResposta`/`compararResposta`/`dicaDirecao`/`calcularMoedas`; integridade dos bancos)
- [x] Criar `README.md` com instruções leigas: como abrir o jogo (duplo clique no `index.html`), como apagar progresso, como o jogo funciona, dicas para responsáveis
- [ ] Validação final: abrir o jogo num navegador, jogar uma sessão completa de cada minigame, verificar persistência, confirmar que tudo funciona offline

## Concluídas

- [x] Criar `index.html` com estrutura básica, meta tags, viewport mobile-friendly e carregamento dos CSS/JS principais
- [x] Criar `css/style.css` com reset, tipografia legível para criança (fonte grande, espaçamento generoso, contraste alto) e layout responsivo desktop+tablet
- [x] Criar `css/theme-futebol.css` com paleta verde-grama/branco/dourado, decorações sutis (linhas de campo, bola estilizada em SVG inline)
- [x] Implementar `js/storage.js` com funções `salvar(chave, valor)`, `carregar(chave)`, `limpar()`, `existeProgresso()` usando localStorage com fallback gracioso quando indisponível
- [x] Implementar `js/audio.js` com efeitos sonoros simples (acerto, erro suave, gol, moeda) gerados via Web Audio API; opção de mute persistente
- [x] Implementar `js/ui.js` com helpers para criar telas, botões grandes acessíveis, modais e transições suaves entre telas
- [x] Implementar tela inicial (menu) com botões grandes: "Jogar", "Loja", "Continuar" (visível só se há progresso salvo) e "Apagar progresso" (com confirmação)
- [x] Implementar tela de escolha/customização inicial de personagem-jogador (nome digitado pela criança, escolha entre 4 avatares simples em SVG/emoji, escolha de cor do uniforme)
- [x] Criar banco de dados de exercícios de **leitura** em `js/data/leitura-exercicios.js`: 20+ pequenas narrações curtas sobre partidas/jogadores fictícios, cada uma com 1-3 perguntas de múltipla escolha (4 alternativas), graduadas em dificuldade
- [x] Implementar minigame de **leitura** em `js/games/leitura.js`: apresenta narração, exibe perguntas, valida resposta, dá feedback positivo, contabiliza acertos e moedas
- [x] Criar banco de dados de exercícios de **escrita** em `js/data/escrita-exercicios.js`: 20+ frases sobre futebol com lacuna a completar (palavra ou letra faltando), incluindo ortografia básica de 8 anos (acentos, ç, lh, nh, etc.)
- [x] Implementar minigame de **escrita** em `js/games/escrita.js`: exibe frase com lacuna, recebe input do jogador, valida ignorando maiúsculas/acentos opcionalmente, dá dicas progressivas em caso de erro, contabiliza moedas
- [x] Criar banco de dados de exercícios de **matemática** em `js/data/matematica-exercicios.js`: 20+ problemas contextualizados (ex: "Time A fez 3 gols, Time B fez 5, quantos gols no total?"), cobrindo soma, subtração e multiplicação até tabuada do 5
- [x] Implementar minigame de **matemática** em `js/games/matematica.js`: apresenta problema, recebe resposta numérica, valida, dá dica em caso de erro, contabiliza moedas
- [x] Implementar sistema central de **moedas e pontuação** persistido via `storage.js`: cada acerto gera N moedas (escalando com dificuldade), exibido em todas as telas com ícone
- [x] Implementar **loja cosmética** com 3 categorias (chuteira, camisa, troféu) e 4-6 itens por categoria, com preço em moedas; itens comprados ficam visíveis no avatar do personagem na tela inicial e durante o jogo
- [x] Implementar tela de **progresso/estatísticas**: total de exercícios feitos por eixo, acertos/erros, moedas acumuladas, itens desbloqueados
- [x] Implementar **embaralhamento e não-repetição** de exercícios dentro de uma sessão para evitar enfado
- [x] Implementar **feedback positivo elaborado**: animações curtas de comemoração ao acertar (bola entrando no gol, confete CSS), mensagens encorajadoras ao errar (sem barulho negativo)
- [x] Implementar **escolha de eixo** na tela de jogo (criança decide se quer leitura, escrita ou matemática naquela sessão)
- [x] Implementar **dificuldade adaptativa simples**: se errar 3 seguidos no eixo, próximo exercício vem mais fácil; se acertar 5 seguidos, próximo vem mais difícil
- [x] Implementar **acessibilidade**: navegação por teclado, foco visível, atributos ARIA básicos, contraste WCAG AA, suporte a redução de movimento (`prefers-reduced-motion`) — skip link "Pular para o jogo", foco gerenciado em troca de tela (foca o `.tela__titulo` para anunciar a nova seção), `aria-live` global removido do `<main>`, `<main tabindex="-1">` para foco programático, supressão de outline em foco programático
- [x] Implementar **suporte a touch** para tablet (botões grandes, sem hover dependente) — `touch-action: manipulation` em todos os elementos interativos, alvos ≥ 48px, overrides `@media (hover: none)` para reverter hover preso em iOS Safari (`.botao`/`--secundario`/`--perigo`/`--futebol`, `.loja__aba`, `.opcao-avatar`/`.opcao-cor`), feedback `:active` com scale-down em opções e abas, `background-attachment: scroll` em `(pointer: coarse)` para destravar scroll em iOS
- [x] Implementar **suporte a touch** para tablet (botões grandes, sem hover dependente) — `touch-action: manipulation` em todos os elementos interativos (botões, abas, opções de avatar/cor), alvos ≥ 48px via `--alvo-toque`/`--alvo-toque-grande`, overrides `@media (hover: none)` para reverter hover preso em iOS Safari (`.botao`, `.botao--secundario`, `.botao--perigo`, `.botao--futebol`, `.loja__aba`, `.opcao-avatar`/`.opcao-cor`), feedback `:active` com scale-down em opções e abas, `background-attachment: scroll` em `(pointer: coarse)` para destravar scroll em iOS
- [x] Adicionar **testes unitários** em `tests/` — runner mínimo em Node puro (`tests/run.js`) com fixture de `localStorage` em memória; arquivos `tests/storage.test.js`, `tests/moedas.test.js`, `tests/dificuldade.test.js`, `tests/embaralhamento.test.js` e `tests/validacao-respostas.test.js`
- [x] Criar `README.md` com instruções leigas: como abrir o jogo (duplo clique em `index.html`), como apagar progresso (botão dedicado no menu ou via DevTools do navegador), como o jogo funciona (3 eixos + moedas + loja cosmética), recursos pedagógicos (dificuldade adaptativa, não-repetição, feedback positivo), dicas para responsáveis (sessões curtas, tela de progresso, sem propaganda/compras), solução de problemas (tela em branco, som, modo anônimo, sincronização) e estrutura técnica para desenvolvedores

## Sprint 2 — Eixo Reconto (recomendação neuropsicológica)

**Motivação:** O laudo do usuário-alvo aponta reconto narrativo limítrofe (P7, comparado a 9 anos), apesar de compreensão literal/inferencial e leitura de palavras no topo. A neuropsicóloga recomendou estimular a **produção** de reconto: identificar personagens, problema, tentativa de solução, desfecho e ideia central. Múltipla escolha (reconhecimento) não treina isso — daí um eixo novo de produção oral.

- [x] Criar `js/games/reconto-avaliacao.js`: lógica pura e testável — `normalizar` (sem acento/pontuação/caixa), `contemTermo` com **coringa de radical** (`venc*`) e limite de palavra (sem falso positivo "téo"⊄"teoria"), `avaliarElemento`, `avaliarReconto` (mapa dos 5 elementos + `presentes`/`completo`) e `calcularMoedas` (base por dificuldade × elementos + bônus de reconto completo). Expõe `ELEMENTOS`/`ORDEM_ELEMENTOS`.
- [x] Criar `js/data/reconto-exercicios.js`: banco de **50 histórias** ricas calibradas para ~9 anos (17 fáceis / 17 médias / 16 difíceis), cada uma com narração de estrutura narrativa completa, `ideiaCentralTexto` e gabarito por elemento (termos + sinônimos com radicais). Validação automática: média de 4,92/5 elementos disparados pela própria narração.
- [x] Criar `js/games/reconto-voz.js`: wrapper de **Web Speech API** (SpeechRecognition pt-BR, contínuo, reinício em pausa) + **MediaRecorder** opcional (reescuta). Erros mapeados em mensagens amigáveis; em erro fatal não finaliza (deixa o fallback de texto assumir). No-op gracioso em Node/sem suporte.
- [x] Implementar minigame `js/games/reconto.js` (1 história/sessão): ler história (com TTS opcional "Ouvir") → gravar reconto livre (ou digitar, em navegador sem transcrição) → avaliar → **dicas dirigidas** para cada elemento faltante (pergunta + nova gravação curta, com "Pular") → tela final com medalhas dos 5 elementos, moedas, ideia central de referência, reescuta do áudio e transcrição (metacognição). Integra Moedas, Dificuldade adaptativa (acerto = ≥3/5), Histórico (não-repetição) e Comemoração.
- [x] Integração: 4º cartão "Contar Histórias" em `js/escolha-eixo.js`; eixo `reconto` na tela de Progresso (`js/progresso.js`); scripts e `?v=4` em `index.html`; estilos do reconto em `css/style.css` (medalhas, gravador pulsante, transcrição ao vivo, textarea de fallback, `prefers-reduced-motion`).
- [x] Testes `tests/reconto.test.js` (20 casos): normalização, detecção com radical/limite de palavra, avaliação por elemento e do reconto, pontuação, `classificarAcerto`, `escolherExercicios`, no-op de voz e integridade do banco (50, ids únicos, 5 elementos, distribuição, auto-detecção ≥4,5/5). Suíte total: 162 testes verdes.
- [x] **Exceção consciente ao "100% offline":** o reconto exige microfone + transcrição (secure context + internet). Documentado no README; jogo publicado em GitHub Pages (HTTPS) onde funciona. Demais eixos seguem offline em `file://`.
- [ ] Eixo "Olho de Águia" (atenção a detalhes visuais) — próxima entrega.
