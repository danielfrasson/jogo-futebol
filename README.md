# Jogo de Futebol — Leitura, Escrita e Matemática

Jogo educativo de futebol para crianças de **8 anos** praticarem **leitura, escrita e matemática**. Funciona **100% offline**, no navegador, sem instalação, sem cadastro, sem internet, sem propaganda.

---

## Como abrir o jogo

1. Abra a pasta do jogo no seu computador.
2. Dê **duplo clique** no arquivo `index.html`.
3. O jogo abre no seu navegador padrão (Chrome, Firefox, Edge, Safari — qualquer um recente serve).
4. Pronto! É só jogar.

> Não precisa de internet. Não precisa instalar nada. Não precisa criar conta.

Se o duplo clique abrir o arquivo num editor de texto em vez do navegador, clique com o **botão direito** sobre `index.html` → **Abrir com** → escolha o seu navegador.

---

## Como o jogo funciona

A criança cria um personagem-jogador (escolhe nome, avatar e cor do uniforme) e treina três habilidades:

- **Leitura** — lê uma narração curta de futebol e responde perguntas de múltipla escolha.
- **Escrita** — completa frases com a palavra ou letra que falta, treinando ortografia (acentos, ç, lh, nh, etc.).
- **Matemática** — resolve problemas contextualizados (somas, subtrações e tabuada até o 5).

A cada acerto a criança ganha **moedas**, que podem ser gastas na **loja cosmética** em itens visuais para o avatar (chuteira, camisa, troféu). O jogo também guarda **estatísticas** de quantos exercícios ela fez, quantos acertou e quais itens já desbloqueou.

### Recursos pedagógicos

- **Dificuldade adaptativa**: se a criança erra muitas vezes seguidas, o próximo exercício vem mais fácil; se acerta muitas seguidas, sobe de nível.
- **Não-repetição**: o jogo evita repetir os mesmos exercícios em sessões seguidas, mantendo a variedade.
- **Feedback positivo**: comemoração com confete e animação de gol ao acertar; mensagens encorajadoras (sem som ou cor agressiva) ao errar — o erro é tratado como parte natural do aprendizado.
- **Sem pressão de tempo**: a criança responde no ritmo dela.
- **Acessibilidade**: navegação por teclado, foco visível, contraste alto, suporte a leitores de tela e respeito a `prefers-reduced-motion` (animações reduzidas para quem tem sensibilidade a movimento).

---

## Como apagar o progresso

Tudo que o jogo guarda (perfil, moedas, itens da loja, estatísticas) fica salvo **localmente** no navegador, em `localStorage`. Para zerar:

### Opção 1 — Pelo próprio jogo (recomendado)

1. Na tela inicial, clique em **"Apagar progresso"**.
2. Confirme no modal que aparece.
3. Tudo volta ao zero — a criança pode criar um novo personagem do começo.

> O botão **"Apagar progresso"** só aparece quando há progresso para apagar.

### Opção 2 — Pelo navegador

Se preferir limpar tudo manualmente:

- **Chrome/Edge**: abra o jogo, pressione `F12` → aba **Application** → **Local Storage** → clique com botão direito no item da página e escolha **Clear**.
- **Firefox**: `F12` → aba **Armazenamento** → **Armazenamento local** → botão direito → **Excluir tudo**.
- Ou simplesmente limpe os dados do site pelo menu de privacidade do navegador.

---

## Dicas para responsáveis

- **Sessões curtas**: 10–15 minutos por vez funcionam melhor que sessões longas. O jogo não tem cronômetro nem cobra tempo de tela.
- **Acompanhe sem corrigir na hora**: deixe a criança errar. As mensagens do jogo já são encorajadoras e a dificuldade adaptativa cuida do nível. Comente depois, com calma.
- **Tela de Progresso**: acessível pelo menu (aparece após a primeira sessão). Mostra quantos exercícios foram feitos por eixo, taxa de acerto e itens da loja desbloqueados — bom para conversar com a criança sobre o que está mais fácil ou mais difícil.
- **Loja cosmética**: as moedas só servem para itens visuais (chuteira, camisa, troféu). Não há compras com dinheiro real, não há "premium", não há propaganda.
- **Tablet**: o jogo funciona em tablets com toque (alvos grandes, sem necessidade de teclado físico). Em celulares pequenos pode ficar apertado — tablet ou desktop é o ideal.
- **Som**: há efeitos sonoros simples (acerto, erro suave, gol, moeda). O áudio só inicia depois do primeiro toque/clique (regra dos navegadores). Se quiser desativar, basta colocar o navegador no mudo — o jogo não tem narração que dependa de som para ser jogado.

---

## Solução de problemas

- **A tela aparece em branco**: confirme que o JavaScript está habilitado no navegador. Se o arquivo abriu no editor de texto, abra-o explicitamente com o navegador (botão direito → Abrir com).
- **O som não toca**: clique uma vez em qualquer botão. Os navegadores só liberam áudio após uma interação do usuário.
- **Os itens da loja sumiram**: se a criança usou o navegador no modo anônimo/privativo, o progresso não é salvo. Use uma janela normal.
- **Mudei de navegador e perdi tudo**: o progresso fica gravado no navegador específico em que foi feito. Não há sincronização entre navegadores nem entre dispositivos — é proposital, para manter o jogo simples e sem internet.

---

## Estrutura técnica (para desenvolvedores)

Stack: HTML5 + CSS3 + JavaScript vanilla. Zero dependências, zero build, zero framework.

```
jogo/
├── index.html              # ponto de entrada
├── css/
│   ├── style.css           # base, tipografia, layout
│   └── theme-futebol.css   # paleta verde-grama, decorações
├── js/
│   ├── main.js             # orquestrador
│   ├── storage.js          # localStorage com fallback em memória
│   ├── audio.js            # Web Audio API (efeitos gerados em código)
│   ├── ui.js               # fábrica de telas, modais, focus trap
│   ├── moedas.js           # saldo central + estatísticas por eixo
│   ├── historico.js        # não-repetição cross-sessão
│   ├── dificuldade.js      # adaptativa por eixo (3 erros desce, 5 acertos sobe)
│   ├── jogador.js          # perfil (nome, avatar, cor)
│   ├── loja.js             # itens cosméticos
│   ├── progresso.js        # tela de estatísticas
│   ├── escolha-eixo.js     # menu de minigame
│   ├── comemoracao.js      # confete + animação de gol
│   ├── games/              # minigames de leitura, escrita, matemática
│   └── data/               # bancos de exercícios (24 por eixo)
└── tests/
    ├── run.js              # runner mínimo em Node puro, sem dependências
    └── *.test.js           # testes unitários
```

Para rodar os testes:

```
node tests/run.js
```

Sem `package.json`, sem `npm install` — Node puro basta.

---

## Licença e uso

Projeto pessoal, uso educativo. Sente-se à vontade para adaptar para a sua família ou turma.
