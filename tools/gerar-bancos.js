#!/usr/bin/env node
/*
 * tools/gerar-bancos.js — Gera os 3 bancos com 500 itens cada.
 *
 * Uso:  node tools/gerar-bancos.js
 *
 * Estratégia:
 *  - Matemática: contextos × geradores numéricos (4 ops × 3 níveis).
 *  - Escrita:    palavras curadas × frases-modelo (~150 palavras × ~3-5 frases).
 *  - Leitura:    arquétipos narrativos × variações de slots (24 × ~20).
 *
 * O PRNG é seeded → saída determinística entre rodadas. Para regenerar com
 * variedade diferente, mude SEED no topo.
 */
'use strict';

const fs = require('fs');
const path = require('path');

const RAIZ = path.resolve(__dirname, '..');
const DIR_DATA = path.join(RAIZ, 'js', 'data');

const SEED = 20260508;

// ------------------------------ PRNG ------------------------------

function mulberry32(s) {
  return function () {
    s = (s + 0x6D2B79F5) >>> 0;
    let t = s;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}
const r = mulberry32(SEED);
const ri = (a, b) => Math.floor(r() * (b - a + 1)) + a;
const rp = (arr) => arr[Math.floor(r() * arr.length)];
const padId = (n) => String(n).padStart(3, '0');

// ============================================================
// MATEMÁTICA — 500 itens (100 fácil + 175 médio + 225 difícil)
// ============================================================

const CTX_SOMA = [
  (a, b) => `A torcida vendeu ${a} ingressos no sábado e ${b} no domingo. Quantos ingressos ao todo?`,
  (a, b) => `O Time Aurora marcou ${a} pontos na temporada passada e somou mais ${b} este ano. Quantos pontos no total?`,
  (a, b) => `O estádio recebeu ${a} torcedores no jogo de ida e ${b} no de volta. Quantos torcedores nas duas partidas?`,
  (a, b) => `O clube vendeu ${a} camisas em julho e ${b} em agosto. Quantas camisas no total?`,
  (a, b) => `A escolinha matriculou ${a} alunos pela manhã e ${b} à tarde. Quantos alunos juntos?`,
  (a, b) => `O depósito tem ${a} bolas oficiais e ${b} de treino. Quantas bolas ao todo?`,
  (a, b) => `O Time Lua tem ${a} sócios na sede e ${b} nos núcleos do interior. Quantos sócios no total?`,
  (a, b) => `Foram doadas ${a} medalhas para o torneio e ${b} para a copinha. Quantas medalhas ao todo?`,
  (a, b) => `O ônibus levou ${a} torcedores na ida e ${b} na volta. Quantos passageiros no dia?`,
  (a, b) => `A loja oficial tinha ${a} chuteiras na vitrine e ${b} no estoque. Quantas chuteiras no total?`,
  (a, b) => `O atacante deu ${a} chutes ao gol no primeiro tempo e ${b} no segundo. Quantos chutes na partida?`,
  (a, b) => `O canal do clube somou ${a} visualizações no primeiro mês e ${b} no segundo. Quantas visualizações ao todo?`,
];

const CTX_SUB = [
  (a, b) => `O estádio aguenta ${a} torcedores. Foram apenas ${b}. Quantos lugares ficaram vazios?`,
  (a, b) => `O time tinha ${a} ingressos para vender. Já foram ${b}. Quantos restam?`,
  (a, b) => `A meta era reunir ${a} sócios. Já são ${b}. Quantos faltam para a meta?`,
  (a, b) => `O depósito tinha ${a} bolas. Foram emprestadas ${b}. Quantas continuam no depósito?`,
  (a, b) => `O ônibus tem ${a} km até o estádio. Já rodou ${b}. Quantos faltam?`,
  (a, b) => `A loja tinha ${a} camisas no estoque. Vendeu ${b}. Quantas sobraram?`,
  (a, b) => `Foram convidados ${a} torcedores para o evento. Apareceram ${b}. Quantos faltaram?`,
  (a, b) => `O treinador planejou ${a} jogadas. Conseguiu aplicar ${b}. Quantas ainda não foram tentadas?`,
  (a, b) => `A campanha tinha ${a} reais para chuteiras. Já gastou ${b}. Quanto sobra no caixa?`,
  (a, b) => `A federação tinha ${a} figurinhas para distribuir. Já mandou ${b}. Quantas restam?`,
  (a, b) => `O time perdia por ${a} pontos. Recuperou ${b}. Quantos pontos faltam ainda?`,
];

const CTX_MULT = [
  (a, b) => `Cada caixa guarda ${b} bolas. O depósito tem ${a} caixas cheias. Quantas bolas no total?`,
  (a, b) => `Cada arquibancada tem ${b} cadeiras e o estádio tem ${a} arquibancadas iguais. Quantas cadeiras ao todo?`,
  (a, b) => `A escolinha tem ${a} turmas e cada uma tem ${b} alunos. Quantos alunos no total?`,
  (a, b) => `Cada chuteira custa ${b} reais. O time vai comprar ${a} pares. Quantos reais vai gastar?`,
  (a, b) => `Cada ônibus leva ${b} torcedores. A torcida fretou ${a} ônibus. Quantos torcedores foram?`,
  (a, b) => `Cada estádio do circuito tem ${b} cadeiras VIP. São ${a} estádios. Quantas cadeiras VIP ao todo?`,
  (a, b) => `O torneio tem ${a} grupos com ${b} times em cada um. Quantos times participam?`,
  (a, b) => `Cada figurinha custa ${b} centavos. O Léo quer ${a} figurinhas. Quantos centavos vai gastar?`,
  (a, b) => `O estádio recebe ${a} ônibus de torcedores em cada jogo. Cada ônibus traz ${b} pessoas. Quantas pessoas chegam por jogo?`,
  (a, b) => `Cada caixa de medalhas tem ${b} unidades. A copinha encomendou ${a} caixas. Quantas medalhas ao todo?`,
  (a, b) => `Cada série de treino dura ${b} minutos. O treino tem ${a} séries. Quantos minutos no treino todo?`,
];

const CTX_DIV = [
  (a, b) => `O técnico precisa dividir ${a} jogadores em ${b} times iguais. Quantos jogadores em cada time?`,
  (a, b) => `A copinha vai entregar ${a} medalhas igualmente entre ${b} times finalistas. Quantas para cada time?`,
  (a, b) => `O clube comprou ${a} chuteiras para distribuir igualmente em ${b} categorias. Quantas chuteiras por categoria?`,
  (a, b) => `O torneio reúne ${a} jogadores divididos em ${b} grupos iguais. Quantos jogadores em cada grupo?`,
  (a, b) => `A confederação tem ${a} bolas para distribuir entre ${b} escolinhas parceiras. Quantas bolas para cada uma?`,
  (a, b) => `O ônibus levou ${a} pessoas em ${b} viagens iguais. Quantas pessoas por viagem?`,
  (a, b) => `O patrocinador entregou ${a} camisas a ${b} clubes parceiros, igualmente. Quantas camisas para cada clube?`,
  (a, b) => `O clube tem ${a} pontos somados em ${b} partidas. Qual a média de pontos por partida?`,
  (a, b) => `A escola distribuiu ${a} ingressos igualmente entre ${b} turmas. Quantos ingressos para cada turma?`,
  (a, b) => `A loja tem ${a} reais para investir em ${b} categorias de produtos. Quanto para cada categoria?`,
  (a, b) => `O auditório tem ${a} cadeiras dispostas em ${b} fileiras iguais. Quantas cadeiras por fileira?`,
];

function genMatNum(diff, op) {
  if (diff === 'facil') {
    if (op === 'soma') return [ri(100, 499), ri(100, 499)];
    if (op === 'subtracao') { const a = ri(500, 999), b = ri(100, a - 1); return [a, b]; }
    if (op === 'multiplicacao') return [ri(2, 9), ri(11, 30)];
    const b = ri(2, 9), q = ri(2, 12); return [b * q, b];
  }
  if (diff === 'medio') {
    if (op === 'soma') return [ri(1000, 49999), ri(1000, 49999)];
    if (op === 'subtracao') { const a = ri(10000, 99999), b = ri(1000, a - 1); return [a, b]; }
    if (op === 'multiplicacao') return [ri(11, 30), ri(11, 30)];
    const b = ri(2, 9), q = ri(20, 110); return [b * q, b];
  }
  if (op === 'soma') return [ri(100000, 499999), ri(100000, 499999)];
  if (op === 'subtracao') { const a = ri(500000, 999999), b = ri(100000, a - 1); return [a, b]; }
  if (op === 'multiplicacao') return [ri(100, 499), ri(11, 99)];
  // divisao: b∈[4,9] (evita "divide por 2" trivial), a sempre 4+ dígitos
  { const b = ri(4, 9), q = ri(250, 1500); return [b * q, b]; }
}

const computeOp = (op, a, b) => ({
  soma: a + b,
  subtracao: a - b,
  multiplicacao: a * b,
  divisao: a / b
}[op]);

const dicaMat = (op, a, b) => {
  const sigla = { soma: '+', subtracao: '−', multiplicacao: '×', divisao: '÷' }[op];
  return `Use a operação ${sigla}: ${a} ${sigla} ${b}.`;
};

function gerarMatematica() {
  const items = [];
  const dist = { facil: 100, medio: 175, dificil: 225 };
  const ctxs = { soma: CTX_SOMA, subtracao: CTX_SUB, multiplicacao: CTX_MULT, divisao: CTX_DIV };
  let id = 0;
  for (const diff of ['facil', 'medio', 'dificil']) {
    const total = dist[diff];
    const por = Math.floor(total / 4);
    const ops = ['soma', 'subtracao', 'multiplicacao', 'divisao'];
    let count = total;
    for (let i = 0; i < ops.length; i++) {
      const op = ops[i];
      const n = (i === ops.length - 1) ? count : por;
      count -= n;
      for (let j = 0; j < n; j++) {
        const [a, b] = genMatNum(diff, op);
        const ctx = rp(ctxs[op]);
        items.push({
          id: 'mat' + padId(++id),
          dificuldade: diff,
          operacao: op,
          enunciado: ctx(a, b),
          resposta: computeOp(op, a, b),
          dica: dicaMat(op, a, b)
        });
      }
    }
  }
  return items;
}

// ============================================================
// ESCRITA — 500 itens (100 fácil + 175 médio + 225 difícil)
// ============================================================

// Cada palavra: [resposta, dica, foco, frases…]. Frases têm "___" pra lacuna.

const ESC_FACIL = [
  ['juiz', 'Quem comanda a partida e mostra os cartões. É a autoridade dentro de campo.', 'começa com J (não G)', [
    'O ___ apitou o início da partida.',
    'O ___ tirou o cartão amarelo do bolso.',
    'O ___ encerrou o jogo com firmeza.',
    'O ___ pediu confirmação do bandeirinha.',
  ]],
  ['agitação', 'É o que toma conta da torcida nos minutos finais.', 'tem Ç no meio', [
    'A torcida fez muita ___ no estádio.',
    'A ___ tomou conta da arquibancada no fim do jogo.',
    'A ___ ficou maior depois do gol decisivo.',
    'O técnico pediu calma para conter a ___ do banco.',
  ]],
  ['área', 'Lugar grande perto do gol, onde o pênalti é cobrado.', 'leva acento (´) na 1ª sílaba', [
    'O atacante entrou na ___ adversária.',
    'A bola sobrou dentro da ___ do goleiro.',
    'O zagueiro afastou o perigo de dentro da ___.',
    'A jogada começou bem fora da ___ pequena.',
  ]],
  ['grama', 'Plantinha verde que cobre o campo de futebol.', 'começa com GR', [
    'A ___ do estádio era de verdade, não artificial.',
    'A ___ estava molhada por causa da chuva.',
    'O jardineiro cuidou da ___ a manhã toda.',
    'A bola correu mais rápido na ___ recém-cortada.',
  ]],
  ['experimentou', 'Verbo no passado: pegou para testar antes de usar.', 'começa com EX (som "eis")', [
    'O Léo ___ a chuteira nova antes do jogo.',
    'A goleira ___ uma luva diferente no aquecimento.',
    'O atacante ___ um chute no ângulo, só pra ver.',
    'A técnica ___ uma marcação nova no treino.',
  ]],
  ['enfeite', 'O que se coloca em cima de um bolo para deixar bonito.', 'começa com EN, depois F', [
    'O ___ do bolo de aniversário era do time.',
    'O ___ da festa era em formato de bola.',
    'O troféu tem um ___ dourado no topo.',
    'A camisa ganhou um ___ especial pela final.',
  ]],
  ['incrível', 'Quando algo é tão impressionante que parece mentira.', 'leva acento (´) no meio', [
    'A goleira pulou e fez uma defesa ___.',
    'O atacante deu um chute ___ de muito longe.',
    'O drible foi ___ — ninguém esperava aquilo.',
    'A virada do segundo tempo foi ___.',
  ]],
  ['visitante', 'Como se chama o time que viaja para jogar fora de casa.', 'começa com V', [
    'O time ___ fez uma viagem longa de ônibus.',
    'A torcida ___ ocupou só uma arquibancada.',
    'O time ___ entrou em campo aplaudido pela sua torcida.',
    'O ___ marcou logo no primeiro minuto.',
  ]],
  ['gincana', 'Brincadeira com várias provas e disputas.', 'começa com GI', [
    'A escolinha organizou uma ___ no fim de semana.',
    'A ___ teve provas de chute, drible e velocidade.',
    'O time ganhou a ___ da escola.',
    'A ___ atraiu crianças de várias turmas.',
  ]],
  ['girafa', 'Animal de pescoço longuíssimo.', 'começa com GI', [
    'A mascote do time é uma ___ que torce vestida de uniforme.',
    'O zagueiro alto foi apelidado de ___.',
    'A ___ apareceu no desenho que o Léo fez do estádio.',
    'A ___ é tão alta que enxerga o jogo de longe.',
  ]],
  ['ágil', 'Que se move com leveza e rapidez.', 'leva acento (´) na 1ª sílaba', [
    'A goleira é muito ___ entre os postes.',
    'O ponteiro ___ ultrapassou três adversários.',
    'O time treina para ficar mais ___ na transição.',
    'O jovem atacante é o mais ___ do elenco.',
  ]],
  ['café', 'Bebida quente da manhã, escura.', 'leva acento (´) no fim', [
    'O técnico tomou um ___ antes do treino.',
    'O ___ da manhã do time é cheio de proteínas.',
    'O senhor Pereira vendia ___ na entrada do estádio.',
    'A reunião começou com um ___ aceso.',
  ]],
  ['cipó', 'Planta longa que se enrola pelas árvores.', 'leva acento (´) no fim', [
    'O ___ pendurado parecia uma corda no parquinho do clube.',
    'O atacante driblou como se desviasse de um ___.',
    'O treinador comparou a marcação a um ___ que prende o adversário.',
    'O ___ passa pelos galhos da árvore atrás do estádio.',
  ]],
  ['nível', 'Grau ou patamar de dificuldade.', 'leva acento (´) no meio', [
    'O ___ do treino subiu nesta semana.',
    'O ___ do campeonato exige muita dedicação.',
    'A jogadora atingiu o ___ avançado da escolinha.',
    'O ___ da partida estava bem alto.',
  ]],
  ['fácil', 'Oposto de difícil.', 'leva acento (´) no meio', [
    'O exercício do treino estava ___ hoje.',
    'Não foi ___ vencer o adversário, mas o time conseguiu.',
    'A jogada ficou mais ___ depois da troca de posições.',
    'O treino estava tão ___ que a turma terminou cedo.',
  ]],
  ['açaí', 'Fruta roxa típica do norte, virou tigela com granola.', 'tem Ç e termina com acento', [
    'Depois do treino, o time tomou ___ na lanchonete.',
    'O ___ é a sobremesa preferida da Lara.',
    'A barraca de ___ ficou cheia depois do jogo.',
    'O técnico aprovou o ___ no cardápio do clube.',
  ]],
  ['pátio', 'Espaço aberto da escola ou do clube.', 'leva acento (´) na 1ª sílaba', [
    'O ___ da escolinha tem traves de madeira.',
    'O time treinou no ___ porque o campo estava molhado.',
    'O ___ ficou cheio depois do treino.',
    'A escolinha pintou o ___ com as cores do clube.',
  ]],
  ['ônibus', 'Veículo grande que leva muitas pessoas.', 'leva acento (^) na 1ª sílaba', [
    'O ___ do time saiu cedo pra cidade vizinha.',
    'A torcida fretou um ___ inteiro para o jogo.',
    'O ___ levou o time direto até o estádio.',
    'O motorista do ___ é torcedor do time há vinte anos.',
  ]],
  ['exato', 'Quando bate certinho, sem sobra nem falta.', 'X com som de Z', [
    'O cronômetro marcou o tempo ___ do gol.',
    'O técnico pediu o passe no momento ___.',
    'O placar mostra o número ___ de gols.',
    'O ___ minuto da virada ficou famoso.',
  ]],
  ['exemplo', 'Algo que serve de modelo para os outros.', 'X com som de Z', [
    'O capitão deu ___ de respeito pelo adversário.',
    'A jogadora é ___ de dedicação para a turma.',
    'O treino de hoje é um bom ___ de organização.',
    'O técnico pediu ao time que fosse ___ de educação.',
  ]],
  ['casa', 'Lugar onde a gente mora.', 'S entre vogais com som de Z', [
    'O time joga em ___ no fim de semana.',
    'A torcida da ___ encheu o estádio.',
    'A jogadora levou o troféu para mostrar em ___.',
    'O técnico mora numa ___ perto do clube.',
  ]],
  ['asa', 'Parte do corpo de pássaros.', 'S entre vogais com som de Z', [
    'O escudo do clube tem uma ___ desenhada.',
    'O atacante voa pela ___ esquerda do campo.',
    'A goleira pareceu ter ___ no salto da defesa.',
    'A ___ do estádio fica cheia em jogo decisivo.',
  ]],
  ['justiça', 'Quando cada um recebe o que merece.', 'tem Ç no meio', [
    'O juiz fez ___ ao marcar o pênalti.',
    'A ___ do jogo depende de quem aplica as regras.',
    'O resultado foi uma ___ pelo esforço do time.',
    'A torcida pediu ___ depois do lance polêmico.',
  ]],
  ['herói', 'Quem faz algo extraordinário.', 'leva acento (´) no fim', [
    'O atacante virou ___ do campeonato com o gol no fim.',
    'A goleira foi a ___ da partida ao defender o pênalti.',
    'O ___ do jogo ganhou os aplausos da torcida.',
    'O reserva entrou e virou ___ da noite.',
  ]],
  ['avô', 'Pai do pai ou da mãe.', 'leva chapeuzinho (^)', [
    'O ___ levou o neto ao primeiro jogo da vida.',
    'O ___ guarda a camisa da década passada como tesouro.',
    'O Téo herdou a paixão pelo time do ___.',
    'O ___ contou histórias do time campeão de antigamente.',
  ]],
];

const ESC_MEDIO = [
  ['campeão', 'Quem ganha o campeonato no fim de tudo.', 'termina com ÃO (com til ~)', [
    'O ___ entrou em campo aplaudido pela torcida.',
    'O ___ levantou a taça com lágrimas nos olhos.',
    'O time virou ___ no último minuto.',
    'O ___ deu uma volta olímpica no estádio.',
    'O ___ agradeceu a torcida no microfone.',
  ]],
  ['capitã', 'É a líder do time, no feminino. Usa a faixa no braço.', 'termina com Ã (com til ~)', [
    'A Helena é a ___ do time e usa a faixa no braço.',
    'A ___ orientou as colegas durante a partida.',
    'A ___ recebeu o troféu nas mãos.',
    'A ___ falou com a juíza no centro do campo.',
    'A ___ liderou o aquecimento do time.',
  ]],
  ['manhã', 'Período do dia entre o nascer do sol e o meio-dia.', 'tem NH e termina com Ã', [
    'O treino é toda ___ bem cedinho.',
    'A ___ amanheceu fria, mas o treino não parou.',
    'A ___ do jogo decisivo foi de pura ansiedade.',
    'A escolinha treina sempre de ___.',
    'A ___ começou com aquecimento na grama.',
  ]],
  ['irmão', 'Filho do mesmo pai e da mesma mãe.', 'termina com ÃO (com til ~)', [
    'O ___ mais velho levou o caçula ao primeiro treino.',
    'O Téo herdou a chuteira do ___.',
    'O ___ do atacante também joga no time.',
    'O ___ da goleira torce nas arquibancadas todo jogo.',
    'O ___ veio de longe pra assistir à final.',
  ]],
  ['coração', 'Órgão que bate no peito da gente.', 'termina com ÃO (com til ~)', [
    'O ___ do atacante batia forte antes do pênalti.',
    'A torcida joga com o ___ todo jogo.',
    'O time tem ___ — não desiste nunca.',
    'A goleira segurou o gol com o ___ na mão.',
    'O técnico falou ao ___ dos jogadores antes da decisão.',
  ]],
  ['balão', 'Bola de festa cheia de ar.', 'termina com ÃO (com til ~)', [
    'O ___ vermelho enfeitou a festa do título.',
    'A criança soltou o ___ no fim do jogo.',
    'O atacante chutou tão alto que a bola virou um ___.',
    'O ___ azul flutuou pelo estádio depois da virada.',
    'O ___ estourou e assustou a turma.',
  ]],
  ['cidadão', 'Pessoa que vive numa cidade ou país.', 'termina com ÃO (com til ~)', [
    'Cada ___ tem direito a ver o jogo do seu time.',
    'O torcedor é um ___ apaixonado pelo clube.',
    'O ___ comum também é parte da história do time.',
    'O ___ que mora perto do estádio escuta a torcida.',
    'O técnico falou que cada jogador é antes de tudo um ___.',
  ]],
  ['ninho', 'Casinha que o pássaro faz para os filhotes.', 'tem NH', [
    'Tinha um ___ de andorinha em cima da trave.',
    'O ___ no canto da cobertura é proteção dos pombos.',
    'O ___ apareceu de novo na primavera.',
    'O ___ é da mesma andorinha do ano passado.',
    'O zelador cuidou pra não derrubar o ___.',
  ]],
  ['sonho', 'O que a gente vê dormindo, ou um desejo grande.', 'tem NH', [
    'Era um ___ antigo da Letícia chegar à seleção.',
    'O time correu atrás do ___ do título.',
    'O ___ da torcida se realizou na final.',
    'O atacante teve um ___ com o gol da vitória.',
    'O ___ do jogador é jogar profissional um dia.',
  ]],
  ['vinho', 'Bebida feita de uva.', 'tem NH', [
    'A camisa cor de ___ é a mais bonita do clube.',
    'O escudo tem uma listra cor de ___.',
    'O patrocinador trouxe uma garrafa de ___ pro brinde.',
    'A bandeira tem detalhe em cor de ___.',
    'O técnico brindou a vitória com um copo de ___.',
  ]],
  ['vergonha', 'Sentimento de quem fez algo errado.', 'tem NH', [
    'O atacante sentiu ___ depois do pênalti perdido.',
    'O time não passou ___ na decisão.',
    'A torcida não queria sair do estádio com ___.',
    'O zagueiro pediu desculpas, sem ___ alguma.',
    'A reserva escondeu a ___ atrás de um sorriso.',
  ]],
  ['filho', 'Criança em relação aos pais.', 'tem LH', [
    'O ___ do técnico também treina na escolinha.',
    'O ___ mais velho da Bia foi torcer junto.',
    'O ___ do goleiro herdou as luvas do pai.',
    'O ___ da capitã segurou a faixa no fim do jogo.',
    'O ___ do treinador desenhou o escudo do clube.',
  ]],
  ['melhor', 'O mais bom, o mais alto em qualidade.', 'tem LH', [
    'A Letícia é a ___ jogadora do time.',
    'Esse foi o ___ jogo da temporada.',
    'O treino de hoje foi o ___ do mês.',
    'A nova chuteira é a ___ que ele já usou.',
    'O time quer ser o ___ do estado.',
  ]],
  ['milho', 'Cereal amarelo que vira pipoca.', 'tem LH', [
    'O ___ da pipoca do estádio é especial.',
    'A torcida come pipoca de ___ durante o jogo.',
    'O ___ do campo do clube é colhido em janeiro.',
    'A barraca vende espigas de ___ na entrada.',
    'O cheiro de ___ assado tomou conta do estádio.',
  ]],
  ['alho', 'Tempero que dá sabor à comida.', 'tem LH', [
    'O cheiro de ___ saiu da cozinha do clube.',
    'A receita do tempero leva ___ e cebola.',
    'O cozinheiro do time não esquece o ___.',
    'O ___ caiu na panela de feijão do almoço.',
    'O atacante prefere a comida sem muito ___.',
  ]],
  ['assistência', 'Quando uma jogadora passa a bola e a outra faz o gol, esse passe se chama ___.', 'tem SS e leva acento (´)', [
    'A jogadora deu uma ___ esperta para a colega.',
    'A ___ saiu do meio-campo direto pro atacante.',
    'A ___ veio de uma jogada ensaiada no treino.',
    'A ___ valeu mais que o próprio gol.',
    'A ___ entrou para a história do campeonato.',
  ]],
  ['mais', 'Quando alguma coisa é maior, mais rápida ou mais alta do que outra.', 'MAIS de comparação (não "mas")', [
    'O time corre ___ rápido que o adversário.',
    'A nova chuteira ajuda a chutar ___ forte.',
    'A goleira saltou ___ alto que o atacante.',
    'O treino foi ___ longo do que o normal.',
    'O placar mostrava ___ de cinco gols já.',
  ]],
  ['mau', 'Quando alguém tem o jeito oposto de "bom".', 'MAU oposto de "bom" (não "mal")', [
    'O zagueiro foi ___ e levou cartão amarelo.',
    'O lance ___ foi marcado pelo juiz.',
    'O comportamento ___ rendeu suspensão.',
    'O ___ humor do treinador passou depois do gol.',
    'O ___ tempo atrapalhou o treino.',
  ]],
  ['trouxe', 'Verbo "trazer" no passado: "Ele ___ a chuteira nova". Soa como "sse", mas a letra é outra.', 'verbo TRAZER no passado', [
    'O Marcelo ___ o time do colégio com sucesso.',
    'A capitã ___ a faixa nova para o jogo.',
    'O treinador ___ uma novidade tática.',
    'O torcedor ___ uma faixa enorme de casa.',
    'A goleira ___ as luvas novas direto da loja.',
  ]],
  ['saiu', 'Verbo "sair" no passado.', 'tem hiato (a-i-u)', [
    'O atacante ___ machucado no aquecimento.',
    'O técnico ___ do campo direto pro vestiário.',
    'O torcedor ___ do estádio comemorando.',
    'A bola ___ pela linha de fundo.',
    'A jogadora ___ de campo aplaudida pela torcida.',
  ]],
  ['caiu', 'Verbo "cair" no passado.', 'tem hiato (a-i-u)', [
    'O atacante ___ na grande área e o juiz marcou pênalti.',
    'A bola ___ exatamente nos pés da capitã.',
    'O troféu ___ da prateleira durante a comemoração.',
    'O zagueiro ___ duro depois da dividida.',
    'A torcida ficou em pé quando a bola ___ na rede.',
  ]],
  ['saída', 'Onde a gente sai, ou o início de uma jogada.', 'tem hiato (a-í) com acento', [
    'A ___ de bola deu certo logo no primeiro lance.',
    'O ônibus do time esperou na ___ do estádio.',
    'A ___ rápida pelo lado direito surpreendeu o adversário.',
    'A torcida formou fila na ___ depois do jogo.',
    'A ___ pelo túnel ficou cheia de jornalistas.',
  ]],
  ['faísca', 'Centelha pequena que pode virar fogo.', 'tem hiato com acento (a-í)', [
    'A virada começou com uma ___ de raça do reserva.',
    'A jogada saiu como uma ___: rápida e brilhante.',
    'A torcida acendeu ___ de emoção a cada gol.',
    'A ___ do atacante mudou o jogo no segundo tempo.',
    'A ___ entre os dois times pegou fogo na decisão.',
  ]],
  ['juízo', 'Bom senso, capacidade de pensar com clareza.', 'tem hiato (u-í) com acento', [
    'A jogadora teve ___ ao escolher a hora certa de chutar.',
    'O técnico pediu ___ pros jogadores antes da decisão.',
    'O ___ do veterano salvou o time da expulsão.',
    'O atacante perdeu o ___ por um momento e foi expulso.',
    'A capitã chamou o time pra ter mais ___ no segundo tempo.',
  ]],
  ['ambulância', 'Carro que leva machucados pro hospital.', 'leva acento (^) na sílaba LÂN', [
    'A ___ ficou pronta na lateral do campo o jogo todo.',
    'A ___ levou o jogador machucado pro hospital.',
    'A ___ não precisou ser usada no jogo de hoje.',
    'O som da ___ silenciou a torcida por um instante.',
    'A ___ chegou rápido depois da pancada.',
  ]],
  ['confiança', 'Sentimento de acreditar em alguém ou em si mesmo.', 'tem Ç e termina com Ã', [
    'A ___ do time cresceu depois da vitória.',
    'A capitã passa ___ pras companheiras em campo.',
    'A ___ do técnico no reserva foi recompensada.',
    'A ___ da torcida nunca abandonou o time.',
    'A ___ no goleiro é fundamental para o time defender bem.',
  ]],
  ['arrastou', 'Verbo "arrastar" no passado.', 'tem RR no meio', [
    'O atacante ___ o adversário pra fora da jogada.',
    'A torcida ___ o time todo até a vitória com os gritos.',
    'O zagueiro ___ a bola até a linha de fundo.',
    'A jogada se ___ até o último minuto.',
    'O cansaço se ___ até o apito final.',
  ]],
  ['corrida', 'Quando a gente vai em alta velocidade.', 'tem RR no meio', [
    'A ___ do atacante deixou o zagueiro pra trás.',
    'A ___ contra o tempo terminou no apito final.',
    'A ___ pra finalizar começou no meio-campo.',
    'A ___ pelo título mobilizou toda a torcida.',
    'A ___ do reserva pra entrar foi engraçada.',
  ]],
  ['terra', 'Solo, chão de barro.', 'tem RR no meio', [
    'A bola caiu na ___ batida do campinho.',
    'A poeira da ___ subiu durante a chuteirada.',
    'A ___ do beco onde a Bia treinava era dura.',
    'A grama foi plantada por cima da ___ adubada.',
    'A ___ molhada deixou o jogo mais lento.',
  ]],
  ['correu', 'Verbo "correr" no passado.', 'tem RR no meio', [
    'O atacante ___ atrás da bola sem parar.',
    'O treinador ___ pra abraçar o jogador.',
    'A goleira ___ pra fora da área pra cortar a jogada.',
    'O reserva ___ pra dentro de campo cheio de vontade.',
    'A torcida ___ pra abraçar os jogadores na saída.',
  ]],
  ['carro', 'Veículo de quatro rodas.', 'tem RR no meio', [
    'O ___ do técnico chegou cedo no estacionamento.',
    'O ___ da delegação saiu antes dos torcedores.',
    'O ___ azul da goleira ficou famoso no clube.',
    'O ___ vermelho do patrocinador desfilou na pré-temporada.',
    'O ___ do time foi enfeitado para a comemoração.',
  ]],
  ['fechou', 'Verbo "fechar" no passado.', 'tem CH', [
    'A goleira ___ o gol como um cadeado.',
    'O zagueiro ___ a marcação no atacante.',
    'O técnico ___ a defesa nos minutos finais.',
    'O treino ___ com um sprint cansativo.',
    'A loja oficial ___ depois do último jogo.',
  ]],
  ['bicho', 'Animal qualquer.', 'tem CH', [
    'A torcida grita "vai, ___!" toda vez que o time avança.',
    'O ___ no escudo do time é um lobo.',
    'O ___ que apareceu no campo foi um cachorrinho perdido.',
    'O ___ esculpido no troféu é um leão.',
    'O ___ de pelúcia da mascote ficou famoso.',
  ]],
  ['chave', 'Objeto que abre porta.', 'tem CH', [
    'A ___ do vestiário sumiu antes do jogo.',
    'A ___ do troféu ficou guardada com o capitão.',
    'O técnico tem a ___ do material esportivo.',
    'A jogada-___ veio do meio-campo.',
    'A ___ do sucesso foi a marcação pressão.',
  ]],
  ['peixe', 'Animal que vive na água.', 'tem X', [
    'O escudo do time tem um ___ saltando.',
    'O atacante driblou como um ___ na rede.',
    'O cardápio do time tem ___ duas vezes na semana.',
    'O ___ do uniforme aparece bordado em prata.',
    'O ___ apareceu nos cartazes da torcida.',
  ]],
];

const ESC_DIFICIL = [
  ['técnico', 'Quem ensina o time e decide as jogadas durante a partida.', 'leva acento na 1ª sílaba', [
    'O ___ explicou a nova tática para o time.',
    'O ___ assistente passou as instruções no intervalo.',
    'O ___ chamou o reserva para entrar.',
    'O ___ pediu calma na hora da pressão.',
    'O ___ comemorou o título no centro do campo.',
  ]],
  ['pênalti', 'Cobrança especial bem perto do gol, depois de falta dentro da área.', 'leva chapeuzinho (^) na 1ª sílaba', [
    'O juiz marcou um ___ no último minuto da partida.',
    'O ___ saiu numa jogada polêmica.',
    'O atacante perdeu o ___ com um chute no travessão.',
    'A goleira defendeu o ___ decisivo.',
    'O ___ foi cobrado de forma magistral.',
  ]],
  ['véspera', 'É o dia anterior a um evento — a ___ da final é o dia antes da final.', 'leva acento na 1ª sílaba', [
    'O torneio acontece toda ___ no segundo semestre.',
    'A ___ do jogo foi de tensão no vestiário.',
    'A ___ de Natal teve treino especial.',
    'A ___ da final ficou marcada por chuva forte.',
    'A ___ da viagem foi cheia de preparativos.',
  ]],
  ['sólido', 'Que é firme, consistente.', 'leva acento na 1ª sílaba', [
    'O time tem um sistema defensivo ___.',
    'O ___ esquema tático foi mantido até o fim.',
    'O zagueiro tem um ___ histórico de defesas.',
    'O ___ argumento da capitã convenceu o juiz.',
    'O ___ trabalho da técnica deu frutos.',
  ]],
  ['número', 'Símbolo que representa quantidade.', 'leva acento na 1ª sílaba', [
    'O ___ 10 da camisa é o mais cobiçado do time.',
    'O ___ de torcedores no estádio foi recorde.',
    'O ___ da chuteira do atacante é 38.',
    'O ___ do jogo fica registrado na súmula.',
    'O ___ do dia foi a virada espetacular.',
  ]],
  ['lâmpada', 'Bulbo que ilumina.', 'leva acento (^) na 1ª sílaba', [
    'A ___ do estádio queimou no segundo tempo.',
    'A ___ do vestiário precisa ser trocada.',
    'A ___ do ônibus do time piscou no caminho.',
    'A ___ acima do gol iluminou o lance.',
    'A ___ do telão balançou com o vento.',
  ]],
  ['pássaro', 'Bicho que voa.', 'leva acento na 1ª sílaba', [
    'Um ___ pousou na trave durante o pênalti.',
    'O ___ vermelho é o símbolo do clube.',
    'O ___ que voa pelo estádio chama atenção da torcida.',
    'O ___ da torcida é um falcão pintado na bandeira.',
    'O ___ no logotipo está com asas abertas.',
  ]],
  ['último', 'Final da fila ou da sequência.', 'leva acento na 1ª sílaba', [
    'O ___ minuto definiu o jogo.',
    'O ___ pênalti decidiu a final.',
    'O ___ treino antes da viagem foi leve.',
    'O ___ jogador a sair do vestiário foi o capitão.',
    'O ___ pedaço da arquibancada estava lotado.',
  ]],
  ['ônibus', 'Veículo grande de transporte coletivo.', 'leva acento (^) na 1ª sílaba', [
    'O ___ do time saiu cedo pra cidade vizinha.',
    'O ___ da torcida levou cem pessoas.',
    'O ___ atrasou e quase fez o time chegar tarde.',
    'O ___ ficou parado no estacionamento do estádio.',
    'O ___ do clube tem o escudo na lateral.',
  ]],
  ['médico', 'Profissional que cuida da saúde.', 'leva acento na 1ª sílaba', [
    'O ___ do clube atendeu o jogador rapidamente.',
    'O ___ liberou o atacante para o jogo decisivo.',
    'O ___ acompanhou o atendimento de campo.',
    'O ___ chefe do clube tem 20 anos de casa.',
    'O ___ pediu repouso pro reserva machucado.',
  ]],
  ['música', 'Som organizado, melodia.', 'leva acento na 1ª sílaba', [
    'A ___ do hino foi cantada por todo o estádio.',
    'A ___ do vestiário animou o aquecimento.',
    'A ___ do entrar em campo é a mesma há anos.',
    'A ___ da torcida nunca pára.',
    'A ___ do trofeu acendeu junto com a luz.',
  ]],
  ['sábado', 'Dia da semana entre sexta e domingo.', 'leva acento na 1ª sílaba', [
    'O treino de ___ começa cedinho.',
    'O jogo de ___ enche o estádio.',
    'O ___ é dia de torcida em massa.',
    'A escolinha tem aula extra todo ___.',
    'O ___ ficou marcado pela final do estadual.',
  ]],
  ['fósforo', 'Pauzinho que faz fogo.', 'leva acento na 1ª sílaba', [
    'A torcida acendeu o ___ no fim do jogo.',
    'O ___ é proibido nas arquibancadas.',
    'O ___ do isqueiro do treinador acabou.',
    'O ___ usado na cerimônia foi gigante.',
    'O ___ caiu da mão do segurança e apagou.',
  ]],
  ['funcionários', 'Pessoas que trabalham num lugar (no plural).', 'plural com acento (´)', [
    'O time tem mais de cem ___ no estádio durante o jogo.',
    'Os ___ chegaram cedo para preparar o gramado.',
    'Os ___ da limpeza recebem o dobro depois de jogo grande.',
    'Os ___ do clube formaram um time próprio.',
    'Os ___ da bilheteria receberam treinamento extra.',
  ]],
  ['invencíveis', 'Times que ninguém consegue derrotar (no plural).', 'plural — termina em "veis" com acento', [
    'O time tem oito ___ em casa nesta temporada.',
    'Os ___ do campeonato perderam só um jogo.',
    'Os ___ do bairro ganharam todos os torneios.',
    'A turma se sentiu ___ depois de cinco vitórias.',
    'Os ___ do colégio levaram a copa.',
  ]],
  ['papéis', 'Folhas para escrever (no plural).', 'plural com acento (´)', [
    'O técnico distribuiu ___ com a tática.',
    'Os ___ do contrato foram assinados ontem.',
    'Os ___ caíram no chão durante o intervalo.',
    'Os ___ da torcida formaram um mosaico no estádio.',
    'Os ___ de jornal mostram a foto da virada.',
  ]],
  ['troféus', 'Premiações brilhantes em forma de copa (no plural).', 'plural com acento (´)', [
    'A vitrine do clube tem trinta ___.',
    'Os ___ ficam expostos no salão principal.',
    'Os ___ foram puxados a brilhar antes da festa.',
    'Os ___ do clube atraem visitantes do mundo todo.',
    'Os ___ menores ficam em uma sala à parte.',
  ]],
  ['fez', 'Verbo "fazer" no passado: "Ele ___ um gol".', 'verbo FAZER no passado (3 letras)', [
    'O atacante driblou e ___ o gol de muito longe.',
    'A capitã ___ um discurso emocionante.',
    'O treinador ___ a substituição certa.',
    'A goleira ___ uma defesa difícil.',
    'O reserva entrou e ___ a diferença.',
  ]],
  ['foi', 'Verbo "ir" no passado: "Ela ___ ao estádio".', 'verbo IR no passado (3 letras)', [
    'A torcida ___ ao estádio em peso.',
    'O atacante ___ o autor do gol da virada.',
    'O treino ___ leve para preservar o time.',
    'O resultado ___ além das expectativas.',
    'A vitória ___ celebrada por dias.',
  ]],
  ['viu', 'Verbo "ver" no passado: "Ele ___ o gol".', 'verbo VER no passado', [
    'O técnico ___ tudo de perto da linha lateral.',
    'A torcida ___ um espetáculo de futebol.',
    'O reserva ___ a chance e entrou pronto.',
    'A goleira ___ a bola subir em câmera lenta.',
    'O bandeirinha ___ o impedimento direitinho.',
  ]],
  ['soube', 'Verbo "saber" no passado: "Ela ___ que o time ganhou".', 'verbo SABER no passado', [
    'O técnico ___ aproveitar a chance da prorrogação.',
    'A capitã ___ liderar o time mesmo sob pressão.',
    'A goleira ___ se posicionar no pênalti.',
    'O atacante ___ o caminho do gol naquele dia.',
    'O torcedor ___ na hora que aquele jogo seria histórico.',
  ]],
  ['pôde', 'Verbo "poder" no passado, com chapeuzinho.', 'leva chapeuzinho (^)', [
    'O atacante ___ chutar com tempo livre.',
    'A goleira não ___ defender o pênalti.',
    'O reserva ___ entrar no segundo tempo.',
    'O capitão ___ falar com o juiz sobre a falta.',
    'A escolinha ___ comemorar o título.',
  ]],
  ['pôs', 'Verbo "pôr" no passado, com chapeuzinho.', 'leva chapeuzinho (^)', [
    'O técnico ___ o reserva em campo.',
    'A capitã ___ a faixa no braço da nova líder.',
    'O zelador ___ a bandeira no mastro.',
    'A torcida ___ todas as faixas pra fora.',
    'O treinador ___ confiança no time inteiro.',
  ]],
  ['nasceu', 'Verbo "nascer" no passado.', 'tem SC', [
    'O ídolo do time ___ no bairro do estádio.',
    'A ideia da nova tática ___ no intervalo.',
    'A jogada ___ na lateral direita do campo.',
    'O atacante ___ no mesmo dia do título antigo.',
    'A virada ___ depois da troca decisiva.',
  ]],
  ['desceu', 'Verbo "descer" no passado.', 'tem SC', [
    'O ônibus do time ___ a serra com cuidado.',
    'O treinador ___ do banco para reclamar.',
    'A torcida ___ a arquibancada cantando.',
    'O troféu ___ até a vitrine principal.',
    'O atacante ___ pra defender no segundo tempo.',
  ]],
  ['excelente', 'Muito bom, ótimo.', 'tem XC', [
    'O treino foi ___ em todos os aspectos.',
    'A goleira teve uma noite ___.',
    'O atacante fez uma temporada ___.',
    'A organização do estádio é ___.',
    'O time terminou em ___ posição no campeonato.',
  ]],
  ['exceção', 'Algo fora da regra.', 'tem XC', [
    'A vitória fora de casa foi uma ___ no ano.',
    'O atacante reserva é uma ___ no padrão do time.',
    'O dia sem treino foi a ___ do mês.',
    'A jogada arriscada foi uma ___ do estilo da equipe.',
    'A entrada gratuita foi uma ___ pra crianças.',
  ]],
  ['dispersou', 'Verbo no passado: quando uma multidão se espalha pra todos os lados.', 'verbo no passado (termina em OU)', [
    'A torcida ___ por causa da chuva forte.',
    'O grupo ___ depois do jogo.',
    'O time se ___ pelo gramado para o aquecimento.',
    'A reunião se ___ rapidamente quando o juiz chegou.',
    'A multidão ___ depois do apito final.',
  ]],
  ['atravessou', 'Verbo no passado: passou de um lado a outro.', 'verbo no passado (termina em OU)', [
    'O atacante ___ a área inteira em corrida.',
    'A bola ___ o gramado em linha reta.',
    'O ônibus ___ a cidade até o estádio.',
    'A torcida ___ a praça em direção ao jogo.',
    'O bandeirinha ___ a linha lateral pra ver melhor.',
  ]],
  ['açúcar', 'Substância doce que vem da cana.', 'tem Ç e leva acento', [
    'A vitamina do café da manhã do time tem pouco ___.',
    'O ___ adoça o suco oferecido aos atletas.',
    'O bolo da festa do título tinha muito ___.',
    'A nutricionista pediu pra reduzir o ___.',
    'O ___ derramou na mesa do vestiário.',
  ]],
  ['lâmina', 'Folha fina de metal cortante.', 'leva chapeuzinho (^) na 1ª sílaba', [
    'A ___ do cortador de grama está afiada.',
    'A ___ da chuteira de ferro foi proibida.',
    'O ferreiro afiou a ___ usada no campo.',
    'A ___ brilhante refletiu o sol da manhã.',
    'A ___ do troféu tem um detalhe gravado.',
  ]],
  ['límpido', 'Que é claro, transparente.', 'leva acento na 1ª sílaba', [
    'O céu ___ acompanhou o jogo decisivo.',
    'O ar ___ deixou o estádio mais bonito.',
    'O olhar ___ da capitã mostrava confiança.',
    'O sorriso ___ do atacante foi capturado pela TV.',
    'O dia ___ atraiu mais torcedores ao estádio.',
  ]],
  ['ímpar', 'Número que não tem par; ou que é único.', 'leva acento na 1ª sílaba', [
    'O 7 é um número ___.',
    'O atacante tem um talento ___.',
    'O torcedor recebeu uma camisa de número ___.',
    'A organização do clube é ___.',
    'A noite ___ ficou na lembrança da torcida.',
  ]],
  ['êxito', 'Sucesso, dar certo.', 'leva chapeuzinho (^) na 1ª sílaba', [
    'A campanha do time foi um ___.',
    'O ___ do treino apareceu no jogo.',
    'O atacante celebrou o ___ do plano tático.',
    'O ___ da torcida em encher o estádio foi total.',
    'O ___ da virada virou exemplo no clube.',
  ]],
  ['ouro', 'Metal precioso, amarelo e brilhante. É a medalha do campeão.', 'tem o som OU no começo', [
    'A medalha de ___ é a mais valiosa do pódio.',
    'O troféu de ___ ficou guardado no cofre.',
    'A linha do escudo é cor de ___.',
    'A camisa especial tinha detalhes em ___.',
    'O capitão recebeu uma faixa cor de ___.',
  ]],
  ['saudade', 'Sentimento de quem lembra com carinho de algo que passou.', 'tem hiato (a-u)', [
    'A torcida sente ___ do antigo treinador.',
    'A ___ dos dias de glória do time é grande.',
    'O capitão tem ___ do estádio cheio.',
    'A ___ aperta na hora do hino antigo.',
    'A ___ do amigo de infância invadiu a roda do treino.',
  ]],
  ['razão', 'Motivo, ou capacidade de pensar com lógica.', 'termina com ÃO (com til ~)', [
    'A ___ da vitória foi a marcação pressão.',
    'O técnico tem ___ ao escalar o reserva.',
    'A ___ do jogo equilibrado foi a defesa cuidadosa.',
    'O capitão usou a ___ na hora certa.',
    'A ___ do empate foi um pênalti polêmico.',
  ]],
  ['propriedade', 'Casa ou terra que pertence a alguém. Ou característica de algo.', 'leva acento (~) em ED?', [
    'A ___ do clube fica perto do centro de treinamento.',
    'A ___ tática do time é a posse de bola.',
    'A ___ rural foi doada para o clube.',
    'A ___ da bola é dividida igualmente em campo.',
    'A ___ é cuidada por um zelador antigo.',
  ]],
];

function gerarEscrita() {
  const items = [];
  let id = 0;
  const dist = { facil: ESC_FACIL, medio: ESC_MEDIO, dificil: ESC_DIFICIL };
  const targets = { facil: 100, medio: 175, dificil: 225 };
  for (const diff of ['facil', 'medio', 'dificil']) {
    const fonte = dist[diff];
    const alvo = targets[diff];
    let pos = 0;
    while (items.filter(x => x.dificuldade === diff).length < alvo) {
      const word = fonte[pos % fonte.length];
      const fraseIdx = Math.floor(pos / fonte.length) % word[3].length;
      const frase = word[3][fraseIdx];
      items.push({
        id: 'esc' + padId(++id),
        dificuldade: diff,
        frase,
        resposta: word[0],
        dica: word[1],
        foco: word[2]
      });
      pos++;
    }
  }
  return items;
}

// ============================================================
// LEITURA — 500 itens (100 fácil + 175 médio + 225 difícil)
// ============================================================
//
// Estratégia: 24 arquétipos narrativos. Cada arquétipo tem narração com slots,
// 1-3 perguntas com slots (ou texto fixo), e listas de variações.
// Distribuição de variações é ajustada para totalizar 500.

const NOMES_F = ['Marina', 'Júlia', 'Helena', 'Beatriz', 'Sofia', 'Letícia', 'Cecília', 'Aurora', 'Isabela', 'Luísa', 'Mariana', 'Clara', 'Bia', 'Lara', 'Joana', 'Rafaela', 'Vitória', 'Camila', 'Carolina', 'Patricia', 'Paula', 'Manuela', 'Alice', 'Antonella', 'Valentina'];
const NOMES_M = ['Téo', 'Caio', 'Murilo', 'Davi', 'Léo', 'Marcelo', 'Roberto', 'Pedro', 'João', 'Lucas', 'Felipe', 'Rafael', 'Thiago', 'Rodrigo', 'Bernardo', 'Arthur', 'Gabriel', 'Daniel', 'Henrique', 'Vinícius', 'Bruno', 'Diego', 'Matheus', 'Marcos', 'Gustavo'];
const TIMES = ['Estrela', 'Lua', 'Cometa', 'Sol', 'Trovão', 'Aurora', 'Eclipse', 'Foguete', 'Furacão', 'Tempestade', 'Tornado', 'Raio', 'Meteoro', 'Galáxia', 'Águia', 'Falcão', 'Leão', 'Tigre', 'Pantera', 'Jaguar', 'Onça', 'Lobo', 'Centauro', 'Pégaso', 'Ipê'];

function pickN(arr, n) {
  const a = arr.slice();
  const out = [];
  for (let i = 0; i < n && a.length; i++) {
    const idx = Math.floor(r() * a.length);
    out.push(a[idx]);
    a.splice(idx, 1);
  }
  return out;
}

const LEI_ARQ = [];

// ── Arquétipo 1 — A goleada (FACIL)
LEI_ARQ.push({
  nivel: 'facil',
  build: () => {
    const nf = rp(NOMES_F), nf2 = rp(NOMES_F);
    const score = ri(3, 6);
    const tempos = [
      'o técnico, encostado na trave, mal precisava dar instruções',
      'a técnica observava de braços cruzados, com um sorriso discreto',
      'o auxiliar nem precisou intervir',
      'a técnica conversava tranquilamente com a auxiliar à beira do gramado',
    ];
    const tempo = rp(tempos);
    return {
      titulo: 'A goleada',
      narracao: `O time da ${nf} abriu o placar logo no primeiro minuto. No fim do primeiro tempo, o painel marcava ${score} a 0. As crianças do banco vibravam a cada nova jogada e ${tempo}.`,
      perguntas: [{
        enunciado: 'Pelo modo como o texto descreve a postura da comissão técnica, o que se pode inferir?',
        alternativas: [
          'Estavam cansados e queriam sair de campo',
          'O time jogava tão bem que mal precisavam intervir',
          'Estavam com raiva dos jogadores',
          'Não sabiam o que fazer naquele momento'
        ],
        correta: 1
      }]
    };
  }
});

// ── 2 — Treino na chuva (FACIL)
LEI_ARQ.push({
  nivel: 'facil',
  build: () => {
    const lemas = [
      'Quem joga bem na lama joga bem em qualquer lugar',
      'Chuva é só água — bola rola igual',
      'Um pouco de água nunca parou ninguém',
      'É na chuva que se separa quem quer dos que só passam',
    ];
    return {
      titulo: 'Treino na chuva',
      narracao: `O céu fechou minutos antes do treino. ${rp(['O técnico', 'A técnica'])} olhou para as nuvens e sorriu: "${rp(lemas)}." Ninguém ia para casa, então.`,
      perguntas: [{
        enunciado: 'A fala revela como a comissão encara as dificuldades. Como podemos descrevê-la?',
        alternativas: [
          'Evita situações desconfortáveis',
          'Vê dificuldade como oportunidade de aprender',
          'Só treina em dias de sol',
          'Não confia nos jogadores'
        ],
        correta: 1
      }]
    };
  }
});

// ── 3 — Mascote do clube (FACIL)
LEI_ARQ.push({
  nivel: 'facil',
  build: () => {
    const nome = rp(['Pelé', 'Garrincha', 'Zico', 'Romário', 'Sócrates', 'Didi']);
    const animal = rp(['cachorro', 'gato', 'papagaio']);
    const lugar = rp(['debaixo do banco de reservas', 'no canto do vestiário', 'na área técnica']);
    return {
      titulo: 'A mascote do clube',
      narracao: `O ${animal} do clube se chamava ${nome} e dormia ${lugar} durante os jogos. Sempre que o time marcava um gol, ele acordava num susto e ${animal === 'papagaio' ? 'gritava' : 'latia'} o jogo todo. A torcida adorava o costume dele.`,
      perguntas: [{
        enunciado: `O texto diz que a torcida "adorava" o costume do ${nome}. Por que esse costume é especial?`,
        alternativas: [
          'Ele era o único permitido no estádio',
          'Ele celebrava cada gol junto com o time, como se fosse torcedor',
          'Ele era mais bonito que outros bichos',
          'Ele tinha um nome diferente'
        ],
        correta: 1
      }]
    };
  }
});

// ── 4 — Pênalti no fim (FACIL)
LEI_ARQ.push({
  nivel: 'facil',
  build: () => {
    const nf = rp(NOMES_F);
    const a = ri(1, 3);
    return {
      titulo: 'Pênalti no fim',
      narracao: `Faltavam dois minutos para o jogo acabar e o placar estava empatado em ${a} a ${a}. O juiz apontou para a marca do pênalti. A ${nf} respirou fundo, encarou a goleira e bateu firme no canto. O time virou o jogo.`,
      perguntas: [{
        enunciado: `O detalhe de a ${nf} "respirar fundo" antes de bater diz o quê sobre o estado dela?`,
        alternativas: [
          'Estava entediada com o jogo',
          'Sentia tensão, mas tentava se controlar',
          'Estava com falta de ar por correr muito',
          'Estava distraída com a torcida'
        ],
        correta: 1
      }]
    };
  }
});

// ── 5 — Capitão revezado (FACIL)
LEI_ARQ.push({
  nivel: 'facil',
  build: () => {
    const sexo = r() < 0.5 ? 'm' : 'f';
    const nome = sexo === 'm' ? rp(NOMES_M) : rp(NOMES_F);
    const cap = sexo === 'm' ? 'capitão' : 'capitã';
    return {
      titulo: `O ${cap} da semana`,
      narracao: `Toda semana, ${rp(['o técnico', 'a técnica'])} escolhia um ${cap} diferente para usar a faixa no braço. Hoje foi a vez ${sexo === 'm' ? 'do' : 'da'} ${nome}. ${sexo === 'm' ? 'Ele' : 'Ela'} ficou orgulhos${sexo === 'm' ? 'o' : 'a'}, mas também nervos${sexo === 'm' ? 'o' : 'a'}: o ${cap} é quem fala com o juiz quando há reclamação.`,
      perguntas: [{
        enunciado: 'O costume da comissão de revezar capitães mostra que ela valoriza o quê?',
        alternativas: [
          'Que todos no time exercitem a liderança',
          'Que apenas o melhor jogador lidere',
          'Que o capitão deve ser o mais velho',
          'Que liderar não é importante'
        ],
        correta: 0
      }]
    };
  }
});

// ── 6 — Eco do estádio (FACIL)
LEI_ARQ.push({
  nivel: 'facil',
  build: () => {
    const objeto = rp(['placa de metal do anúncio', 'torre de iluminação', 'estrutura da arquibancada']);
    return {
      titulo: 'O eco do estádio',
      narracao: `Era um treino fechado, sem nenhum torcedor nas arquibancadas. Mesmo assim, os jogadores escutavam um eco estranho a cada chute na trave. Era a bola batendo na ${objeto}.`,
      perguntas: [{
        enunciado: 'O que normalmente acontece com esse som de eco em jogos com público?',
        alternativas: [
          'É amplificado pelos torcedores',
          'É abafado pelo barulho da arquibancada',
          'É gravado pelos microfones do estádio',
          'É igual com ou sem público'
        ],
        correta: 1
      }]
    };
  }
});

// ── 7 — Cartão amarelo (FACIL)
LEI_ARQ.push({
  nivel: 'facil',
  build: () => {
    const nm = rp(NOMES_M);
    return {
      titulo: 'Cartão amarelo',
      narracao: `O zagueiro chegou atrasado na dividida e derrubou ${nm}, atacante adversário, com força. O juiz não pensou duas vezes: tirou do bolso o cartão amarelo e mostrou. Era a primeira advertência da partida.`,
      perguntas: [{
        enunciado: 'O texto chama o cartão de "primeira advertência". O que essa palavra sugere ao zagueiro?',
        alternativas: [
          'Pode haver outras advertências, e a próxima pode tirá-lo do jogo',
          'Que ele perdeu permanentemente o direito de jogar',
          'Que ele vai ser premiado',
          'Que o jogo terminou'
        ],
        correta: 0
      }]
    };
  }
});

// ── 8 — Aniversário no campo (FACIL)
LEI_ARQ.push({
  nivel: 'facil',
  build: () => {
    const nm = rp(NOMES_M);
    const idade = ri(7, 10);
    return {
      titulo: 'Aniversário no campo',
      narracao: `O ${nm} completou ${idade} anos no mesmo dia da final do campeonato infantil. Os colegas pintaram o uniforme com o número ${idade} nas costas, em letras grandes. Quando ele entrou em campo, todo mundo cantou parabéns na arquibancada.`,
      perguntas: [{
        enunciado: 'Pelo gesto dos colegas, o que se pode dizer sobre o time?',
        alternativas: [
          'Vão sempre vencer juntos',
          'Têm uma amizade que vai além do esporte',
          'Disputam quem é o mais importante',
          'Preferem o aniversário ao jogo'
        ],
        correta: 1
      }]
    };
  }
});

// ── 9 — Reviravolta no 2T (MEDIO)
LEI_ARQ.push({
  nivel: 'medio',
  build: () => {
    const nf = rp(NOMES_F);
    const time = rp(TIMES);
    const placar = ri(2, 4);
    const min1 = ri(35, 42);
    const min2 = 45;
    return {
      titulo: 'A reviravolta',
      narracao: `O Time ${time} perdia de ${placar} a 0 no intervalo. No vestiário, a técnica explicou uma nova forma de marcar o adversário e mudou três jogadoras de posição. No segundo tempo, o time jogou diferente: pressionou a saída de bola, criou chances e empatou aos ${min1} minutos. Aos ${min2}, a ${nf} invadiu a área e marcou o gol da virada num chute de fora do alcance da goleira. O técnico adversário ficou parado, sem entender o que tinha acontecido.`,
      perguntas: [
        {
          enunciado: 'O que as decisões da técnica no intervalo revelam sobre ela?',
          alternativas: [
            'Que esperava o adversário cansar sozinho',
            'Que leu o jogo, identificou o problema e teve coragem de mudar',
            'Que queria castigar as jogadoras por jogarem mal',
            'Que tinha pouca experiência'
          ],
          correta: 1
        },
        {
          enunciado: 'A descrição do técnico adversário "sem entender" sugere o quê sobre a virada?',
          alternativas: [
            'Foi resultado de muita sorte',
            'Foi tão rápida e bem feita que pegou ele de surpresa',
            'Foi injusta',
            'Aconteceu por erro do juiz'
          ],
          correta: 1
        }
      ]
    };
  }
});

// ── 10 — Goleiro distraído (MEDIO)
LEI_ARQ.push({
  nivel: 'medio',
  build: () => {
    const time = rp(TIMES);
    const distracao = rp([
      'olhando os passarinhos no alto da trave',
      'olhando as nuvens passarem',
      'observando o painel eletrônico',
      'admirando os mosaicos da torcida',
    ]);
    const evento = rp([
      'três pombos pousaram no travessão bem na hora do escanteio',
      'um avião cruzou o céu na hora exata da cobrança',
      'o painel piscou bem no momento da finalização',
      'a banda da torcida começou um show no minuto do gol',
    ]);
    return {
      titulo: 'O goleiro distraído',
      narracao: `O goleiro do Time ${time} era conhecido por ficar ${distracao}. Naquele dia, ${evento}. A bola cruzou a área enquanto ele olhava para outro lugar. Quando se deu conta, a bola já estava no fundo da rede. O técnico cobriu o rosto com as mãos e sentou no banco.`,
      perguntas: [
        {
          enunciado: 'A frase "era conhecido por" indica o quê sobre o costume do goleiro?',
          alternativas: [
            'Era a primeira vez que ele se distraía',
            'Era um hábito antigo, que toda a equipe já sabia',
            'Era ordem do treinador',
            'Era parte da estratégia de defesa'
          ],
          correta: 1
        },
        {
          enunciado: 'O gesto do técnico cobrir o rosto e sentar expressa que sentimento?',
          alternativas: [
            'Cansaço físico de gritar',
            'Frustração e desânimo de ver o erro se repetir',
            'Alegria contida pelo jogo bonito',
            'Confusão com as regras do escanteio'
          ],
          correta: 1
        }
      ]
    };
  }
});

// ── 11 — Sorteio do uniforme (MEDIO)
LEI_ARQ.push({
  nivel: 'medio',
  build: () => {
    const time = rp(TIMES);
    const cor = rp(['roxo e branco', 'verde e amarelo', 'azul e branco', 'preto e dourado', 'laranja e cinza']);
    return {
      titulo: 'O sorteio do uniforme',
      narracao: `Antes da decisão, os capitães foram ao centro do campo com o juiz. Sortearam moeda para ver qual time usaria o uniforme principal e qual usaria o reserva. Como deu coroa, o Time ${time} ficou com o uniforme reserva, listrado de ${cor}. Muitos torcedores ficaram surpresos, porque não viam aquela camisa há meses.`,
      perguntas: [
        {
          enunciado: 'O fato de a torcida não ver aquela camisa "há meses" deixa transparecer o quê sobre o time?',
          alternativas: [
            'Mudou de cor recentemente',
            'Costuma usar quase sempre o uniforme principal',
            'A camisa estava perdida no vestiário',
            'Não jogava há meses'
          ],
          correta: 1
        },
        {
          enunciado: 'Por que o autor descreve o sorteio com tantos detalhes?',
          alternativas: [
            'Mostrar como decisões aparentemente pequenas têm tradição e cerimônia',
            'Criticar a regra do sorteio',
            'Confundir o leitor',
            'Preencher o texto'
          ],
          correta: 0
        }
      ]
    };
  }
});

// ── 12 — Vendedor antigo (MEDIO)
LEI_ARQ.push({
  nivel: 'medio',
  build: () => {
    const sobrenome = rp(['Pereira', 'Silva', 'Santos', 'Oliveira', 'Rocha', 'Cunha']);
    const produto = rp(['pipoca', 'amendoim', 'cachorro-quente', 'caldo de cana', 'chocolate quente']);
    const anos = ri(25, 40);
    const nf = rp(NOMES_F);
    return {
      titulo: `${produto[0].toUpperCase() + produto.slice(1)} antes do jogo`,
      narracao: `O senhor ${sobrenome} vendia ${produto} na entrada do estádio há mais de ${anos} anos. Conhecia cada torcedor pelo nome e sabia o time que cada família apoiava. Quando viu a ${nf} chegar com a camisa nova, soltou uma risada: "Hoje você vai ver gol, menina!" A ${nf} pagou ${produto.startsWith('a') ? 'o' : 'a'} ${produto}, agradeceu e correu para o portão antes que o jogo começasse.`,
      perguntas: [
        {
          enunciado: `O detalhe de o senhor ${sobrenome} "conhecer cada torcedor pelo nome" mostra o quê?`,
          alternativas: [
            'Que tem boa memória apenas para nomes',
            'Que existe um vínculo afetivo entre ele e o público',
            'Que é mais velho que os torcedores',
            'Que é parente de todos eles'
          ],
          correta: 1
        },
        {
          enunciado: 'A frase "Hoje você vai ver gol, menina!" tem que tom?',
          alternativas: [
            'Cobrança séria',
            'Provocação raivosa',
            'Brincadeira carinhosa, quase de família',
            'Aviso formal e distante'
          ],
          correta: 2
        }
      ]
    };
  }
});

// ── 13 — Bandeirinha (MEDIO)
LEI_ARQ.push({
  nivel: 'medio',
  build: () => {
    const time = rp(TIMES);
    return {
      titulo: 'Bandeirinha em apuros',
      narracao: `O bandeirinha levantou a bandeira para marcar impedimento, mas a torcida do Time ${time} gritou tão alto que ele se assustou e quase deixou cair. O juiz olhou para ele, pediu calma com a mão, e mandou anular o gol. Os jogadores do Time ${time} reclamaram, mas o juiz foi firme: "Regra é regra, e quem decide aqui sou eu."`,
      perguntas: [
        {
          enunciado: 'O modo como o juiz reage à pressão mostra que ele é...',
          alternativas: [
            'Tímido e inseguro',
            'Equilibrado: respeita o bandeirinha e mantém a regra mesmo sob pressão',
            'Bravo e impaciente',
            'Indeciso e influenciável'
          ],
          correta: 1
        },
        {
          enunciado: 'O que aconteceria se o juiz cedesse à reclamação?',
          alternativas: [
            'O bandeirinha seria substituído',
            'A regra de impedimento perderia força e a autoridade do juiz seria minada',
            'A torcida sairia do estádio',
            'O jogo terminaria de imediato'
          ],
          correta: 1
        }
      ]
    };
  }
});

// ── 14 — Reserva preparado (MEDIO)
LEI_ARQ.push({
  nivel: 'medio',
  build: () => {
    const sexo = r() < 0.5 ? 'm' : 'f';
    const nome = sexo === 'm' ? rp(NOMES_M) : rp(NOMES_F);
    return {
      titulo: 'O reserva surpresa',
      narracao: `${sexo === 'm' ? 'O' : 'A'} ${nome} era reserva havia meses, mas nunca reclamava. Treinava antes de todo mundo chegar e ficava depois do treino batendo bola sozinh${sexo === 'm' ? 'o' : 'a'} contra a parede. Quando o titular se machucou no aquecimento, ${rp(['o técnico', 'a técnica'])} olhou para o banco e chamou ${sexo === 'm' ? 'o' : 'a'} ${nome}. ${sexo === 'm' ? 'Ele' : 'Ela'} entrou tremendo. No primeiro toque, deu o passe da assistência. No segundo, fez o gol da vitória.`,
      perguntas: [
        {
          enunciado: `O hábito ${sexo === 'm' ? 'do' : 'da'} ${nome} de treinar antes e depois revela que tipo de atitude?`,
          alternativas: [
            'Insegurança que tira o sono',
            'Preparo silencioso, esperando pela chance',
            'Vontade de impressionar a comissão',
            'Excesso de competitividade'
          ],
          correta: 1
        },
        {
          enunciado: 'Pelo desempenho, qual é a mensagem implícita?',
          alternativas: [
            'Reservas são sempre piores que titulares',
            'Quando a oportunidade chega, quem se preparou bem aproveita',
            'É melhor ser titular',
            'Treinar sozinho não adianta'
          ],
          correta: 1
        }
      ]
    };
  }
});

// ── 15 — Apito molhado (MEDIO)
LEI_ARQ.push({
  nivel: 'medio',
  build: () => ({
    titulo: 'Apito molhado',
    narracao: `Caía uma chuva fina quando o juiz apitou para o segundo tempo começar. Mas o som do apito saiu fraco, abafado pelas gotas que entraram no apito de plástico. ${rp(['Ele', 'Ela'])} balançou o instrumento, soprou de novo e dessa vez funcionou. Os jogadores riram e voltaram para as posições, prontos para retomar a partida.`,
    perguntas: [
      {
        enunciado: 'A reação dos jogadores rindo, em vez de reclamar, sugere o quê?',
        alternativas: [
          'Estavam zoando o juiz com má intenção',
          'O ambiente era leve e descontraído, sem tensão',
          'Queriam parar o jogo de qualquer jeito',
          'Desconfiavam que o apito estava quebrado de propósito'
        ],
        correta: 1
      },
      {
        enunciado: 'Que ideia o texto comunica sobre imprevistos?',
        alternativas: [
          'Sempre causam discussão',
          'Podem ser resolvidos com paciência e bom humor',
          'Significam que o jogo não pode continuar',
          'São culpa exclusiva do juiz'
        ],
        correta: 1
      }
    ]
  })
});

// ── 16 — Fila do banheiro (MEDIO)
LEI_ARQ.push({
  nivel: 'medio',
  build: () => {
    const nf = rp(NOMES_F);
    const min = ri(8, 14);
    return {
      titulo: 'A fila do banheiro',
      narracao: `No intervalo da grande final, o banheiro do estádio ficou cheio em poucos minutos. A ${nf} precisou esperar mais de ${min} minutos na fila e quase perdeu o início do segundo tempo. Quando voltou correndo para a arquibancada, o jogo já tinha recomeçado e o time dela já marcara o segundo gol. Os torcedores ao redor explicaram rapidinho o que ela tinha perdido.`,
      perguntas: [
        {
          enunciado: 'O fato de torcedores desconhecidos explicarem o gol diz o quê sobre a arquibancada?',
          alternativas: [
            'Lugar competitivo onde cada um cuida de si',
            'Espaço comunitário, onde estranhos compartilham a mesma alegria',
            'A torcida só olha pro próprio celular',
            'Apenas adultos prestam atenção no jogo'
          ],
          correta: 1
        },
        {
          enunciado: `Pelo final do texto, qual provavelmente foi o sentimento da ${nf}?`,
          alternativas: [
            'Alívio porque o time dela estava ganhando',
            'Raiva profunda da fila do banheiro',
            'Vontade de ir embora',
            'Indiferença'
          ],
          correta: 0
        }
      ]
    };
  }
});

// ── 17 — Caderno do treinador (DIFICIL)
LEI_ARQ.push({
  nivel: 'dificil',
  build: () => {
    const nm = rp(NOMES_M);
    const cor = rp(['preto', 'marrom', 'azul-marinho', 'verde-escuro']);
    const anos = ri(15, 30);
    const frase = rp([
      'Confie nos olhos, não nos ouvidos',
      'Quem treina escondido é quem joga grande',
      'Cada jogo é um mundo novo',
      'A defesa começa na cabeça do atacante',
    ]);
    return {
      titulo: 'O segredo do treinador',
      narracao: `Há ${anos} anos o treinador ${nm} guardava um caderninho ${cor} no bolso interno do casaco. Ninguém sabia o que tinha ali dentro — só que ele consultava o caderno toda vez que precisava decidir uma substituição importante. Quando se aposentou, doou o caderno para a nova técnica. Ao abrir, ela encontrou apenas uma frase, repetida em todas as páginas: "${frase}." Demorou meses para entender o que aquilo significava, mas hoje ela diz que aquela linha simples mudou a forma de comandar uma partida.`,
      perguntas: [
        {
          enunciado: `No contexto do texto, qual o significado prático da frase de ${nm}?`,
          alternativas: [
            'Que é uma regra arbitrária do clube',
            'Que é um princípio que a nova técnica precisou viver para entender',
            'Que é uma piada interna',
            'Que era uma regra esquecida do regulamento'
          ],
          correta: 1
        },
        {
          enunciado: `Por que o autor descreve o caderno como tendo "apenas uma frase, repetida em todas as páginas"?`,
          alternativas: [
            'Para mostrar que ${nm} era preguiçoso',
            'Para dar peso à mensagem — quando algo é repetido tantas vezes, vira princípio',
            'Porque ele não sabia escrever outras coisas',
            'Para confundir a nova técnica'
          ],
          correta: 1
        },
        {
          enunciado: 'O fato de a nova técnica levar meses para entender a frase sugere o quê?',
          alternativas: [
            'Que ela não era inteligente',
            'Que sabedoria simples às vezes só faz sentido depois de viver na prática o que ela diz',
            'Que o caderno estava em código',
            'Que a frase tinha vários sentidos contraditórios'
          ],
          correta: 1
        }
      ]
    };
  }
});

// ── 18 — Bola do beco (DIFICIL)
LEI_ARQ.push({
  nivel: 'dificil',
  build: () => {
    const nf = rp(NOMES_F);
    const lugar = rp(['atrás da padaria', 'ao lado da escola', 'do outro lado do mercadinho', 'no fim da rua sem saída']);
    const objeto = rp(['latões de lixo', 'caixas de papelão', 'cones que sobraram da obra', 'pedras pintadas']);
    const anos = ri(15, 25);
    return {
      titulo: 'A bola do beco',
      narracao: `Quando criança, a ${nf} não tinha campo nem chuteira. O time dela era um grupo de cinco crianças que jogava num beco estreito ${lugar}, com uma bola de meia presa por elástico. Os gols eram dois ${objeto}. Hoje, ${anos} anos depois, ela mora num apartamento perto do estádio onde joga como profissional. Sempre que precisa lembrar por que começou, ela pega o ônibus, desce duas paradas antes e atravessa a pé até o beco. A padaria fechou, mas os ${objeto.split(' ').pop()} ainda estão lá.`,
      perguntas: [
        {
          enunciado: `Por que a ${nf} volta ao beco mesmo morando perto de um estádio profissional?`,
          alternativas: [
            'Porque é mais barato treinar lá',
            'Para reconectar com a origem dela e lembrar o que a motivou',
            'Para encontrar a antiga padaria',
            'Porque os objetos servem como gols de treino'
          ],
          correta: 1
        },
        {
          enunciado: 'A imagem de objetos antigos preservados enquanto a padaria fechou funciona como qual ideia?',
          alternativas: [
            'O tempo apaga lugares, mas alguns símbolos permanecem como guardiões da memória',
            'Que ninguém limpa o beco há anos',
            'Que a padaria vai reabrir um dia',
            'Que objetos duram mais que padarias'
          ],
          correta: 0
        },
        {
          enunciado: 'Qual é o tema central do texto?',
          alternativas: [
            'A importância de ser rico para jogar futebol',
            'A relação entre origem humilde e o que dá sentido à carreira',
            'O perigo de jogar em becos',
            'Como crianças se divertem'
          ],
          correta: 1
        }
      ]
    };
  }
});

// ── 19 — Penúltimo segundo (DIFICIL)
LEI_ARQ.push({
  nivel: 'dificil',
  build: () => {
    const nf1 = rp(NOMES_F), nf2 = rp(NOMES_F);
    const time = rp(TIMES);
    return {
      titulo: 'O penúltimo segundo',
      narracao: `O cronômetro do telão marcava 89 minutos e 58 segundos. O Time ${time} precisava de um gol para empatar e seguir no campeonato. A ${nf1} cobrou um escanteio bem fechado, daqueles que só algumas jogadoras conseguem. A bola desviou em três cabeças adversárias antes de bater no peito de uma defensora e voltar para a zaga. Foi quando a ${nf2} apareceu, do nada, e chutou de primeira. O cronômetro mudou para 90 minutos no exato instante em que a bola tocou a rede. Em qualquer outro segundo, o jogo já teria acabado.`,
      perguntas: [
        {
          enunciado: 'Por que o autor escolhe a frase "em qualquer outro segundo, o jogo já teria acabado"?',
          alternativas: [
            'Para criticar o tamanho do tempo regulamentar',
            'Para deixar claro que o gol saiu no instante mais improvável e dramático possível',
            'Porque o cronômetro estava com defeito',
            'Porque o juiz queria encerrar antes da hora'
          ],
          correta: 1
        },
        {
          enunciado: `A descrição da ${nf2} "aparecendo do nada" indica o quê?`,
          alternativas: [
            'Estava escondida no túnel do vestiário',
            'Soube se posicionar exatamente onde ninguém esperava',
            'Foi convocada de última hora',
            'Estava no time adversário'
          ],
          correta: 1
        },
        {
          enunciado: 'Por que o autor enumera tantos detalhes (3 cabeças, peito, retorno) antes do gol?',
          alternativas: [
            'Para mostrar que o adversário foi injusto',
            'Para construir tensão e fazer o leitor sentir como o gol foi improvável',
            'Para confundir quem está lendo',
            'Para explicar a regra de impedimento'
          ],
          correta: 1
        }
      ]
    };
  }
});

// ── 20 — Torcida emprestada (DIFICIL)
LEI_ARQ.push({
  nivel: 'dificil',
  build: () => {
    const time = rp(TIMES);
    return {
      titulo: 'A torcida emprestada',
      narracao: `O Time ${time} jogava longe de casa, em uma cidade pequena onde quase ninguém conhecia o clube. Havia receio de que o estádio ficasse vazio. Mas algo curioso aconteceu: a torcida local, que torcia por outro time, decidiu emprestar a torcida para o Time ${time} naquele dia, porque o adversário em campo era o rival histórico deles. O resultado foi um estádio cheio gritando o nome de jogadores que nunca tinham visto antes. No fim, os jogadores agradeceram com um aplauso longo, e a torcida emprestada respondeu cantando um refrão inventado na hora.`,
      perguntas: [
        {
          enunciado: 'Qual é a real motivação da torcida local?',
          alternativas: [
            'Pura solidariedade pelo time visitante',
            'Apoiar quem está jogando contra o rival histórico deles',
            'Querer aprender com o time visitante',
            'Foram pagos para fazer isso'
          ],
          correta: 1
        },
        {
          enunciado: 'O detalhe de "refrão inventado na hora" sugere o quê?',
          alternativas: [
            'A música tinha sido ensaiada dias antes',
            'Houve uma conexão emocional espontânea entre torcida e jogadores',
            'Ninguém realmente se importava com o resultado',
            'A torcida estava distraída'
          ],
          correta: 1
        },
        {
          enunciado: 'Qual é a ideia principal que o texto comunica?',
          alternativas: [
            'Que rivalidade sempre divide as pessoas',
            'Que torcer pode se rearranjar de formas inesperadas — até inimigos viram aliados temporários',
            'Que estádios em cidades pequenas são sempre vazios',
            'Que jogadores não merecem aplauso'
          ],
          correta: 1
        }
      ]
    };
  }
});

// ── 21 — Camisa do avô (DIFICIL)
LEI_ARQ.push({
  nivel: 'dificil',
  build: () => {
    const nm = rp(NOMES_M);
    return {
      titulo: 'A camisa molhada',
      narracao: `${nm} tinha uma única camisa do time, ganha do avô antes de ele falecer. Lavava com cuidado e usava só nos dias de jogo. No dia da final, esqueceu a camisa estendida no varal — e começou a chover. Quando viu, correu de pijama para a varanda, mas era tarde: a camisa pingava como esponja. Sem outra opção, pegou o secador de cabelo da mãe e ficou meia hora com o aparelho na mão, secando manga por manga, gola por gola. Chegou ao estádio no aperto, mas com a camisa do avô vestida — e fez o gol que classificou o time para a etapa seguinte.`,
      perguntas: [
        {
          enunciado: `Qual é o valor real da camisa para ${nm}?`,
          alternativas: [
            'Material — era a única que ele tinha',
            'Sentimental — era um elo afetivo com o avô que faleceu',
            'Estético — era a mais bonita do guarda-roupa',
            'Prático — era a mais leve para correr'
          ],
          correta: 1
        },
        {
          enunciado: 'O esforço de secar a camisa por meia hora, manga por manga, comunica o quê?',
          alternativas: [
            'Que ele não tinha outras peças de roupa',
            'Que cuidar daquela camisa era cuidar da memória do avô',
            'Pressa para chegar logo no jogo',
            'Que ele não confiava em outras camisas'
          ],
          correta: 1
        },
        {
          enunciado: 'O gol classificatório, depois da saga toda, dá ao texto que tom?',
          alternativas: [
            'De tristeza e melancolia',
            'De recompensa simbólica — esforço afetivo se transformou em vitória esportiva',
            'De crítica ao adversário',
            'De indiferença com o resultado'
          ],
          correta: 1
        }
      ]
    };
  }
});

// ── 22 — Comentarista novato (DIFICIL)
LEI_ARQ.push({
  nivel: 'dificil',
  build: () => {
    const nf1 = rp(NOMES_F), nf2 = rp(NOMES_F);
    const num1 = ri(7, 11), num2 = ri(2, 9);
    return {
      titulo: 'A cobertura inesperada',
      narracao: `O comentarista da rádio era novato e ainda confundia os nomes das jogadoras. Quando a ${nf1} chutou de fora da área, ele anunciou no microfone que era a ${nf2}. Quando a ${nf2} deu a assistência, ele disse que era a ${nf1}. A torcida nas arquibancadas começou a rir, e até as próprias jogadoras escutavam pelos rádios dos torcedores. No intervalo, as duas combinaram uma travessura: a ${nf2} entrou usando a camisa ${num1}, da ${nf1}, e a ${nf1}, a ${num2}, da ${nf2}. O comentarista, sem saber, narrou o segundo tempo todo trocando de novo — só que dessa vez sem errar.`,
      perguntas: [
        {
          enunciado: 'Por que o autor diz que o comentarista "narrou sem errar" depois da troca de camisas?',
          alternativas: [
            'Porque ele finalmente aprendeu os nomes',
            'Porque a confusão dele se anulou: errar duas vezes, do mesmo jeito, virou acerto por coincidência',
            'Porque outro comentarista assumiu o microfone',
            'Porque alguém mostrou uma cola para ele'
          ],
          correta: 1
        },
        {
          enunciado: 'A travessura das jogadoras revela o quê sobre o jeito como elas encaravam o problema?',
          alternativas: [
            'Eram desorganizadas e bagunceiras',
            'Tinham senso de humor e cumplicidade — transformaram um incômodo em piada',
            'Não levavam o jogo a sério',
            'Detestavam o comentarista pessoalmente'
          ],
          correta: 1
        },
        {
          enunciado: 'O texto pode ser lido como uma reflexão sobre o quê?',
          alternativas: [
            'A importância de nunca errar',
            'Como dois erros, em sequência, podem se cancelar e gerar um resultado certo',
            'Por que comentaristas não devem ser novatos',
            'A vida das jogadoras fora do campo'
          ],
          correta: 1
        }
      ]
    };
  }
});

// ── 23 — Bordado (DIFICIL)
LEI_ARQ.push({
  nivel: 'dificil',
  build: () => {
    const nf = rp(['Aurora', 'Antônia', 'Olímpia', 'Otília', 'Zilda', 'Ondina']);
    const titulo = rp(['estadual', 'campeonato regional', 'copa local', 'torneio aberto', 'taça da cidade']);
    const num = ri(8, 15);
    return {
      titulo: 'O bordado da bandeira',
      narracao: `A bandeira do clube era costurada à mão pela dona ${nf} há mais de quarenta anos. Cada estrela bordada representava um título conquistado. Quando o time levantou a taça do ${titulo}, o presidente correu até a casa dela com a notícia, para que ela bordasse a estrela número ${num} antes da festa. A dona ${nf} pegou o tecido, a agulha e a linha dourada — mas, em vez de uma estrela, bordou um pequeno coração. Ninguém entendeu na hora. Anos depois, a neta dela contou: aquele ${titulo} foi o último torneio que o avô assistiu antes de falecer.`,
      perguntas: [
        {
          enunciado: `Por que a dona ${nf} bordou um coração em vez da estrela?`,
          alternativas: [
            'Esqueceu como bordar estrela depois de tantos anos',
            'O presidente pediu por engano',
            'Foi uma homenagem silenciosa ao marido que tinha falecido',
            'Acabou a linha dourada e ela improvisou'
          ],
          correta: 2
        },
        {
          enunciado: 'O texto mostra que o trabalho dela vai além do esportivo. Por quê?',
          alternativas: [
            'Porque ela cobrava muito caro pelos bordados',
            'Porque cada estrela carrega memória, e o coração mistura história do clube com história pessoal',
            'Porque era o único trabalho dela',
            'Porque ela era amiga do presidente'
          ],
          correta: 1
        },
        {
          enunciado: 'A revelação do segredo só anos depois, pela neta, dá ao texto que efeito?',
          alternativas: [
            'Mistério resolvido com afeto, valorizando lutos privados que ninguém viu',
            'Comédia leve sem importância',
            'Crítica à organização do clube',
            'Aventura policial'
          ],
          correta: 0
        }
      ]
    };
  }
});

// ── 24 — Regra esquecida (DIFICIL)
LEI_ARQ.push({
  nivel: 'dificil',
  build: () => {
    const t1 = rp(TIMES), t2 = rp(TIMES.filter(t => t !== rp(TIMES)));
    const placar1 = '0 a 0';
    const fin = ri(50, 60);
    const placar2 = `${ri(3, 5)} a ${ri(2, 4)}`;
    return {
      titulo: 'A regra esquecida',
      narracao: `Havia uma regra antiga, inventada nos anos sessenta, que dizia que se o jogo terminasse exatamente em ${placar1} e os dois times tivessem, juntos, mais de cinquenta finalizações, a partida seria refeita do zero em outro dia. A regra tinha caído no esquecimento, mas continuava no livro oficial. Na semifinal daquele ano, o jogo entre Time ${t1} e Time ${t2} acabou em zero, com ${fin} chutes ao gol somados. O presidente do Time ${t1}, que era estudioso de regras antigas, lembrou na hora. A regra foi aplicada, e o jogo foi remarcado para dois dias depois — desta vez, terminou ${placar2}.`,
      perguntas: [
        {
          enunciado: `O que o detalhe de o presidente "ser estudioso de regras antigas" sugere sobre ele?`,
          alternativas: [
            'Que é apegado ao passado por nostalgia',
            'Que é minucioso e enxerga oportunidades onde os outros não enxergam',
            'Que é amigo do juiz',
            'Que tem sorte'
          ],
          correta: 1
        },
        {
          enunciado: 'A regra ter "caído no esquecimento" mas continuar "no livro oficial" passa qual ideia?',
          alternativas: [
            'Que regras antigas sempre são apagadas',
            'Que regras esquecidas continuam vivas — basta alguém puxar do passado e elas voltam a valer',
            'Que livros oficiais estão sempre desatualizados',
            'Que ninguém respeita a federação'
          ],
          correta: 1
        },
        {
          enunciado: `O contraste entre o ${placar1} do primeiro jogo e o ${placar2} do refeito sugere o quê?`,
          alternativas: [
            'Que o primeiro jogo era melhor',
            'Que dar uma segunda chance pode revelar um jogo totalmente diferente do primeiro',
            'Que a regra é injusta',
            'Que os jogadores trapacearam no jogo refeito'
          ],
          correta: 1
        }
      ]
    };
  }
});

function gerarLeitura() {
  const items = [];
  let id = 0;
  const targets = { facil: 100, medio: 175, dificil: 225 };
  const counts = { facil: 0, medio: 0, dificil: 0 };
  // Distribuir variações entre os arquétipos do mesmo nível.
  const arqsPorNivel = {
    facil: LEI_ARQ.filter(a => a.nivel === 'facil'),
    medio: LEI_ARQ.filter(a => a.nivel === 'medio'),
    dificil: LEI_ARQ.filter(a => a.nivel === 'dificil'),
  };
  for (const nivel of ['facil', 'medio', 'dificil']) {
    const arqs = arqsPorNivel[nivel];
    if (arqs.length === 0) continue;
    while (counts[nivel] < targets[nivel]) {
      const arq = arqs[counts[nivel] % arqs.length];
      const built = arq.build();
      items.push({
        id: 'lei' + padId(++id),
        dificuldade: nivel,
        titulo: built.titulo,
        narracao: built.narracao,
        perguntas: built.perguntas
      });
      counts[nivel]++;
    }
  }
  return items;
}

// ============================================================
// SERIALIZAR como arquivo .js no formato esperado
// ============================================================

function escapeStr(s) {
  return String(s).replace(/\\/g, '\\\\').replace(/'/g, "\\'");
}

function serializarMatematica(items) {
  const ex = items.map(it => {
    return `    { id: '${it.id}', dificuldade: '${it.dificuldade}', operacao: '${it.operacao}', enunciado: '${escapeStr(it.enunciado)}', resposta: ${it.resposta}, dica: '${escapeStr(it.dica)}' }`;
  }).join(',\n');
  return `/*
 * js/data/matematica-exercicios.js — Banco de exercícios de matemática
 * GERADO POR tools/gerar-bancos.js — não edite à mão.
 * Total: ${items.length} exercícios (${items.filter(i=>i.dificuldade==='facil').length} fácil + ${items.filter(i=>i.dificuldade==='medio').length} médio + ${items.filter(i=>i.dificuldade==='dificil').length} difícil).
 */
(function (global) {
  'use strict';

  var DIFICULDADES = ['facil', 'medio', 'dificil'];
  var OPERACOES = ['soma', 'subtracao', 'multiplicacao', 'divisao'];

  var EXERCICIOS = [
${ex}
  ];

  var INDICE_POR_ID = Object.create(null);
  for (var i = 0; i < EXERCICIOS.length; i++) {
    INDICE_POR_ID[EXERCICIOS[i].id] = EXERCICIOS[i];
  }

  function obterPorId(id) {
    if (id === undefined || id === null || id === '') { return null; }
    var encontrado = INDICE_POR_ID[String(id)];
    return encontrado || null;
  }

  function filtrar(opcoes) {
    var op = opcoes || {};
    var dificuldade = op.dificuldade;
    var operacao = op.operacao;
    if (dificuldade && DIFICULDADES.indexOf(dificuldade) === -1) { return []; }
    if (operacao && OPERACOES.indexOf(operacao) === -1) { return []; }
    if (!dificuldade && !operacao) { return EXERCICIOS.slice(); }
    var saida = [];
    for (var i = 0; i < EXERCICIOS.length; i++) {
      var e = EXERCICIOS[i];
      if (dificuldade && e.dificuldade !== dificuldade) { continue; }
      if (operacao && e.operacao !== operacao) { continue; }
      saida.push(e);
    }
    return saida;
  }

  function contar(opcoes) { return filtrar(opcoes).length; }

  var api = {
    DIFICULDADES: DIFICULDADES,
    OPERACOES: OPERACOES,
    EXERCICIOS: EXERCICIOS,
    obterPorId: obterPorId,
    filtrar: filtrar,
    contar: contar
  };

  global.MatematicaExercicios = api;
  if (typeof module !== 'undefined' && module.exports) { module.exports = api; }
})(typeof window !== 'undefined' ? window : globalThis);
`;
}

function serializarEscrita(items) {
  const ex = items.map(it => {
    return `    { id: '${it.id}', dificuldade: '${it.dificuldade}', frase: '${escapeStr(it.frase)}', resposta: '${escapeStr(it.resposta)}', dica: '${escapeStr(it.dica)}', foco: '${escapeStr(it.foco)}' }`;
  }).join(',\n');
  return `/*
 * js/data/escrita-exercicios.js — Banco de exercícios de escrita
 * GERADO POR tools/gerar-bancos.js — não edite à mão.
 * Total: ${items.length} exercícios.
 */
(function (global) {
  'use strict';

  var DIFICULDADES = ['facil', 'medio', 'dificil'];

  var EXERCICIOS = [
${ex}
  ];

  var INDICE_POR_ID = Object.create(null);
  for (var i = 0; i < EXERCICIOS.length; i++) {
    INDICE_POR_ID[EXERCICIOS[i].id] = EXERCICIOS[i];
  }

  function obterPorId(id) {
    if (id === undefined || id === null || id === '') { return null; }
    var encontrado = INDICE_POR_ID[String(id)];
    return encontrado || null;
  }

  function filtrar(opcoes) {
    var op = opcoes || {};
    var dificuldade = op.dificuldade;
    if (dificuldade && DIFICULDADES.indexOf(dificuldade) === -1) { return []; }
    if (!dificuldade) { return EXERCICIOS.slice(); }
    var saida = [];
    for (var i = 0; i < EXERCICIOS.length; i++) {
      if (EXERCICIOS[i].dificuldade === dificuldade) { saida.push(EXERCICIOS[i]); }
    }
    return saida;
  }

  function contar(opcoes) { return filtrar(opcoes).length; }

  var api = {
    DIFICULDADES: DIFICULDADES,
    EXERCICIOS: EXERCICIOS,
    obterPorId: obterPorId,
    filtrar: filtrar,
    contar: contar
  };

  global.EscritaExercicios = api;
  if (typeof module !== 'undefined' && module.exports) { module.exports = api; }
})(typeof window !== 'undefined' ? window : globalThis);
`;
}

function serializarLeitura(items) {
  const ex = items.map(it => {
    const perg = it.perguntas.map(p => {
      const alts = p.alternativas.map(a => `'${escapeStr(a)}'`).join(', ');
      return `        { enunciado: '${escapeStr(p.enunciado)}', alternativas: [${alts}], correta: ${p.correta} }`;
    }).join(',\n');
    return `    {
      id: '${it.id}',
      dificuldade: '${it.dificuldade}',
      titulo: '${escapeStr(it.titulo)}',
      narracao: '${escapeStr(it.narracao)}',
      perguntas: [
${perg}
      ]
    }`;
  }).join(',\n');
  return `/*
 * js/data/leitura-exercicios.js — Banco de exercícios de leitura
 * GERADO POR tools/gerar-bancos.js — não edite à mão.
 * Total: ${items.length} exercícios.
 */
(function (global) {
  'use strict';

  var DIFICULDADES = ['facil', 'medio', 'dificil'];

  var EXERCICIOS = [
${ex}
  ];

  var INDICE_POR_ID = Object.create(null);
  for (var i = 0; i < EXERCICIOS.length; i++) {
    INDICE_POR_ID[EXERCICIOS[i].id] = EXERCICIOS[i];
  }

  function obterPorId(id) {
    if (id === undefined || id === null || id === '') { return null; }
    var encontrado = INDICE_POR_ID[String(id)];
    return encontrado || null;
  }

  function filtrar(opcoes) {
    var op = opcoes || {};
    var dificuldade = op.dificuldade;
    if (dificuldade && DIFICULDADES.indexOf(dificuldade) === -1) { return []; }
    if (!dificuldade) { return EXERCICIOS.slice(); }
    var saida = [];
    for (var i = 0; i < EXERCICIOS.length; i++) {
      if (EXERCICIOS[i].dificuldade === dificuldade) { saida.push(EXERCICIOS[i]); }
    }
    return saida;
  }

  function contar(opcoes) { return filtrar(opcoes).length; }

  var api = {
    DIFICULDADES: DIFICULDADES,
    EXERCICIOS: EXERCICIOS,
    obterPorId: obterPorId,
    filtrar: filtrar,
    contar: contar
  };

  global.LeituraExercicios = api;
  if (typeof module !== 'undefined' && module.exports) { module.exports = api; }
})(typeof window !== 'undefined' ? window : globalThis);
`;
}

// ============================================================
// MAIN
// ============================================================

function bumpIndexHtml() {
  const arq = path.join(RAIZ, 'index.html');
  if (!fs.existsSync(arq)) return;
  let html = fs.readFileSync(arq, 'utf8');
  const m = html.match(/\?v=(\d+)/);
  const versaoAtual = m ? parseInt(m[1], 10) : 1;
  const nova = versaoAtual + 1;
  html = html.replace(/\?v=\d+/g, `?v=${nova}`);
  fs.writeFileSync(arq, html);
  return nova;
}

function main() {
  console.log('Gerando bancos…');
  const mat = gerarMatematica();
  const esc = gerarEscrita();
  const lei = gerarLeitura();

  fs.writeFileSync(path.join(DIR_DATA, 'matematica-exercicios.js'), serializarMatematica(mat));
  fs.writeFileSync(path.join(DIR_DATA, 'escrita-exercicios.js'), serializarEscrita(esc));
  fs.writeFileSync(path.join(DIR_DATA, 'leitura-exercicios.js'), serializarLeitura(lei));

  console.log(`✓ Matemática: ${mat.length} itens`);
  console.log(`✓ Escrita:    ${esc.length} itens`);
  console.log(`✓ Leitura:    ${lei.length} itens`);
  console.log(`Total: ${mat.length + esc.length + lei.length} exercícios.`);

  // IDs únicos por banco
  for (const [nome, lista] of [['mat', mat], ['esc', esc], ['lei', lei]]) {
    const ids = new Set();
    for (const it of lista) {
      if (ids.has(it.id)) throw new Error(`Id duplicado em ${nome}: ${it.id}`);
      ids.add(it.id);
    }
  }
  console.log('✓ Sem ids duplicados.');

  const v = bumpIndexHtml();
  if (v) console.log(`✓ index.html: ?v=${v}`);
}

main();
