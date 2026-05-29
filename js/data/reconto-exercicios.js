/*
 * js/data/reconto-exercicios.js — Banco de histórias para o eixo "Reconto"
 *
 * 50 histórias narrativas curtas de futebol, calibradas para ~9 anos, cada uma
 * escrita PROPOSITALMENTE com os cinco elementos da "gramática da história"
 * bem marcados: personagens, problema, tentativa de solução, desfecho e ideia
 * central. O objetivo é treinar a PRODUÇÃO de reconto (recomendação clínica do
 * usuário-alvo), não o reconhecimento.
 *
 * Cada item traz, além da narração, um "gabarito" (`elementos`) com os termos
 * que caracterizam cada elemento NAQUELA história. A avaliação automática
 * (js/games/reconto-avaliacao.js) considera um elemento "presente" quando a
 * transcrição da fala da criança contém pelo menos `minimo` (padrão 1) termos
 * distintos daquele elemento. Os termos aceitam coringa de radical com "*"
 * (ex.: "venc*" casa venceu/venceram/vencer), para tolerar conjugações.
 *
 * `ideiaCentralTexto` é a moral em texto corrido — usada como referência no
 * feedback (e como apoio para o responsável), nunca para pontuar.
 *
 * Dificuldade modula a complexidade do enredo/vocabulário (não a idade-alvo):
 *   facil   → enredo linear, frases curtas
 *   medio   → mais detalhes e personagens
 *   dificil → reviravolta/subtrama, vocabulário mais rico
 *
 * Expõe `RecontoExercicios` em window.RecontoExercicios (e module.exports):
 *   RecontoExercicios.DIFICULDADES            → ['facil','medio','dificil']
 *   RecontoExercicios.EXERCICIOS              → array
 *   RecontoExercicios.obterPorId(id)          → objeto|null
 *   RecontoExercicios.filtrar({dificuldade?}) → array
 *   RecontoExercicios.contar({dificuldade?})  → number
 */
(function (global) {
  'use strict';

  var DIFICULDADES = ['facil', 'medio', 'dificil'];

  var EXERCICIOS = [
    // ===================== FÁCEIS (enredo linear) =====================
    {
      id: 'rec001',
      dificuldade: 'facil',
      titulo: 'A virada da Aurora',
      narracao: 'O time Aurora estava perdendo de 2 a 0 no primeiro tempo. A capitã Sofia reuniu as amigas no vestiário e disse para ninguém desistir. No segundo tempo elas marcaram um gol, depois outro, e enfim o terceiro. O Aurora venceu de 3 a 2 e todas comemoraram abraçadas.',
      ideiaCentralTexto: 'Não desistir, mesmo quando parece difícil, pode mudar o jogo.',
      elementos: {
        personagens: { termos: ['Sofia', 'capit*', 'Aurora', 'amig*', 'time'] },
        problema: { termos: ['perd*', '2 a 0', 'dois a zero', 'atras*'] },
        tentativa: { termos: ['reun*', 'vestiario', 'nao desist*', 'convers*', 'marc*'] },
        desfecho: { termos: ['venc*', 'ganh*', 'vir*', '3 a 2', 'tres a dois', 'comemor*'] },
        ideiaCentral: { termos: ['nao desist*', 'desist*', 'persist*', 'nunca desist*', 'esforc*'] }
      }
    },
    {
      id: 'rec002',
      dificuldade: 'facil',
      titulo: 'O goleiro com medo',
      narracao: 'Pedro era goleiro, mas tinha muito medo de defender pênaltis. Um dia o treinador Marcos ficou depois do treino só para ajudá-lo a praticar. Pedro defendeu vinte chutes seguidos e foi perdendo o medo. No jogo de domingo, ele pegou o pênalti que garantiu a vitória do time.',
      ideiaCentralTexto: 'Praticar com ajuda de alguém ajuda a vencer o medo.',
      elementos: {
        personagens: { termos: ['Pedro', 'goleir*', 'Marcos', 'treinador'] },
        problema: { termos: ['medo', 'penalti', 'penaltis'] },
        tentativa: { termos: ['pratic*', 'trein*', 'ajud*', 'depois do treino', 'vinte chutes'] },
        desfecho: { termos: ['defend*', 'peg*', 'venc*', 'ganh*', 'vitoria', 'sem medo', 'perd* o medo'] },
        ideiaCentral: { termos: ['pratic*', 'trein*', 'medo', 'ajud*', 'coragem'] }
      }
    },
    {
      id: 'rec003',
      dificuldade: 'facil',
      titulo: 'A chuteira perdida',
      narracao: 'No dia do campeonato, Lucas não achava sua chuteira em lugar nenhum. Ele procurou na mochila, embaixo da cama e no carro. Sua irmã Bia teve uma ideia e olhou no cesto de roupa suja, onde a chuteira estava escondida. Lucas chegou bem na hora e jogou a partida inteira.',
      ideiaCentralTexto: 'Manter a calma e procurar com método resolve o problema; e a ajuda da família faz diferença.',
      elementos: {
        personagens: { termos: ['Lucas', 'Bia', 'irma'] },
        problema: { termos: ['chuteira', 'perd*', 'nao achava', 'sumi*'] },
        tentativa: { termos: ['procur*', 'olh*', 'mochila', 'cama', 'ideia', 'cesto'] },
        desfecho: { termos: ['achou', 'encontr*', 'na hora', 'jog*', 'escondid*'] },
        ideiaCentral: { termos: ['calma', 'procur*', 'ajud*', 'familia', 'organiz*'] }
      }
    },
    {
      id: 'rec004',
      dificuldade: 'facil',
      titulo: 'O novato tímido',
      narracao: 'Caio entrou novo no time e ficava sempre quieto num canto. Os colegas perceberam que ele estava sozinho e o chamaram para jogar no meio deles. Caio sorriu, foi para o campo e fez um passe lindo para o gol. No fim do treino, ele já tinha feito vários amigos.',
      ideiaCentralTexto: 'Acolher quem é novo faz todo mundo se sentir parte do time.',
      elementos: {
        personagens: { termos: ['Caio', 'novato', 'novo', 'colegas', 'time'] },
        problema: { termos: ['timid*', 'quieto', 'sozinho', 'canto'] },
        tentativa: { termos: ['chamaram', 'chamar', 'convid*', 'perceb*', 'jogar junto'] },
        desfecho: { termos: ['sorriu', 'amig*', 'passe', 'gol', 'parte do time'] },
        ideiaCentral: { termos: ['acolh*', 'amizade', 'amig*', 'incluir', 'junt*', 'receb*'] }
      }
    },
    {
      id: 'rec005',
      dificuldade: 'facil',
      titulo: 'Treino na chuva',
      narracao: 'Começou a chover forte pouco antes do treino. As crianças acharam que iam para casa, mas a treinadora Helena disse que treinar na chuva também ensina. Eles correram, escorregaram na lama e riram muito. No fim, todos aprenderam a jogar mesmo com o campo molhado.',
      ideiaCentralTexto: 'Encarar a dificuldade pode virar aprendizado e diversão.',
      elementos: {
        personagens: { termos: ['Helena', 'treinador*', 'criancas', 'crianca'] },
        problema: { termos: ['chuva', 'chov*', 'lama', 'molhad*'] },
        tentativa: { termos: ['trein*', 'correram', 'jog*', 'pratic*'] },
        desfecho: { termos: ['aprend*', 'riram', 'diversao', 'divert*', 'consegui*'] },
        ideiaCentral: { termos: ['dificuldade', 'aprend*', 'encar*', 'enfrent*', 'chuva'] }
      }
    },
    {
      id: 'rec006',
      dificuldade: 'facil',
      titulo: 'A bola no telhado',
      narracao: 'Durante a brincadeira, a bola voou e ficou presa no telhado da escola. As crianças ficaram tristes porque era a única bola. Então Rafael pegou uma vassoura comprida e, com cuidado, empurrou a bola para baixo. Todos comemoraram e voltaram a jogar felizes.',
      ideiaCentralTexto: 'Uma boa ideia e um pouco de paciência resolvem problemas.',
      elementos: {
        personagens: { termos: ['Rafael', 'criancas', 'crianca'] },
        problema: { termos: ['bola', 'telhado', 'presa', 'unica bola'] },
        tentativa: { termos: ['vassoura', 'empurr*', 'ideia', 'cuidado', 'peg*'] },
        desfecho: { termos: ['desceu', 'comemor*', 'volt*', 'consegui*', 'felizes', 'feliz'] },
        ideiaCentral: { termos: ['ideia', 'paciencia', 'criativ*', 'resolv*', 'pensar'] }
      }
    },
    {
      id: 'rec007',
      dificuldade: 'facil',
      titulo: 'O passe em vez do gol',
      narracao: 'Tiago adorava fazer gols e nunca passava a bola. Num jogo, ele percebeu que sua amiga Lara estava livre e com chance melhor. Pela primeira vez, Tiago passou a bola para ela. Lara fez o gol e os dois entenderam que jogar juntos é melhor.',
      ideiaCentralTexto: 'Dividir a bola e jogar em equipe vale mais que brilhar sozinho.',
      elementos: {
        personagens: { termos: ['Tiago', 'Lara', 'amiga', 'amig*'] },
        problema: { termos: ['nunca passava', 'nao passava', 'sozinho', 'so queria gol'] },
        tentativa: { termos: ['passou', 'passe', 'perceb*', 'divid*'] },
        desfecho: { termos: ['gol', 'fez o gol', 'junt*', 'entender*', 'equipe'] },
        ideiaCentral: { termos: ['equipe', 'junt*', 'divid*', 'passar', 'compartilh*', 'time'] }
      }
    },
    {
      id: 'rec008',
      dificuldade: 'facil',
      titulo: 'A capitã da semana',
      narracao: 'Toda semana a treinadora escolhia um capitão diferente. Naquela semana foi a vez de Manu, que ficou nervosa porque é o capitão quem fala com o juiz. Ela respirou fundo e conversou com calma quando houve uma dúvida no jogo. O juiz concordou, e Manu descobriu que conseguia ser líder.',
      ideiaCentralTexto: 'Todo mundo pode aprender a liderar quando tem a chance e coragem.',
      elementos: {
        personagens: { termos: ['Manu', 'capit*', 'treinador*', 'juiz'] },
        problema: { termos: ['nervos*', 'fala com o juiz', 'medo', 'duvida'] },
        tentativa: { termos: ['respir*', 'convers*', 'calma', 'falou'] },
        desfecho: { termos: ['concord*', 'consegui*', 'lider', 'liderar', 'descobr*'] },
        ideiaCentral: { termos: ['lideranc*', 'lider', 'coragem', 'liderar', 'chance'] }
      }
    },
    {
      id: 'rec009',
      dificuldade: 'facil',
      titulo: 'O sol forte',
      narracao: 'Era um dia de muito calor e as crianças estavam cansadas no meio do jogo. O treinador Bruno parou a partida e mandou todos beberem água na sombra. Depois de descansar um pouco, o time voltou com mais energia. Eles jogaram melhor e ainda fizeram dois gols.',
      ideiaCentralTexto: 'Cuidar do corpo e descansar na hora certa ajuda a render mais.',
      elementos: {
        personagens: { termos: ['Bruno', 'treinador', 'criancas', 'time'] },
        problema: { termos: ['calor', 'sol', 'cansad*', 'sede'] },
        tentativa: { termos: ['agua', 'beber*', 'sombra', 'descans*', 'parou'] },
        desfecho: { termos: ['energia', 'melhor', 'gols', 'gol', 'volt*'] },
        ideiaCentral: { termos: ['cuidar', 'descans*', 'agua', 'corpo', 'saude'] }
      }
    },
    {
      id: 'rec010',
      dificuldade: 'facil',
      titulo: 'A torcida da vovó',
      narracao: 'A vovó de Nina nunca tinha visto um jogo de futebol. Nina ficou com vergonha de errar na frente dela. Mas a vovó gritou e torceu tanto que Nina foi ficando animada. No fim, Nina fez um gol e correu para abraçar a vovó na arquibancada.',
      ideiaCentralTexto: 'O apoio de quem amamos nos dá coragem para tentar.',
      elementos: {
        personagens: { termos: ['Nina', 'vovo', 'avo'] },
        problema: { termos: ['vergonha', 'medo de errar', 'nervos*'] },
        tentativa: { termos: ['torceu', 'torc*', 'gritou', 'apoi*', 'animad*'] },
        desfecho: { termos: ['gol', 'abrac*', 'consegui*', 'feliz'] },
        ideiaCentral: { termos: ['apoio', 'apoi*', 'torc*', 'coragem', 'familia', 'amor'] }
      }
    },
    {
      id: 'rec011',
      dificuldade: 'facil',
      titulo: 'O uniforme esquecido',
      narracao: 'Davi chegou ao jogo e percebeu que tinha esquecido a camisa do time em casa. Ele ficou preocupado porque sem o uniforme não podia entrar. Seu colega Gabriel tinha uma camisa reserva na mochila e emprestou. Davi jogou, fez uma assistência e agradeceu muito o amigo.',
      ideiaCentralTexto: 'Amigos que se ajudam resolvem qualquer apuro.',
      elementos: {
        personagens: { termos: ['Davi', 'Gabriel', 'colega', 'amig*'] },
        problema: { termos: ['esquec*', 'camisa', 'uniforme', 'sem uniforme'] },
        tentativa: { termos: ['emprest*', 'reserva', 'ajud*', 'mochila'] },
        desfecho: { termos: ['jog*', 'assistencia', 'agradec*', 'consegui*'] },
        ideiaCentral: { termos: ['ajud*', 'amizade', 'amig*', 'emprest*', 'generos*'] }
      }
    },
    {
      id: 'rec012',
      dificuldade: 'facil',
      titulo: 'O cachorro no campo',
      narracao: 'No meio do jogo, um cachorrinho entrou correndo no campo atrás da bola. As crianças não conseguiam continuar e ficaram sem saber o que fazer. A pequena Alice chamou o cachorro com calma e o levou para fora com um biscoito. O jogo recomeçou e o cachorro virou o mascote do time.',
      ideiaCentralTexto: 'Com calma e gentileza se resolve até o imprevisto mais engraçado.',
      elementos: {
        personagens: { termos: ['Alice', 'cachorr*', 'criancas', 'mascote'] },
        problema: { termos: ['cachorr*', 'campo', 'atras da bola', 'interromp*', 'parou'] },
        tentativa: { termos: ['chamou', 'chamar', 'calma', 'biscoito', 'levou'] },
        desfecho: { termos: ['recomec*', 'volt*', 'mascote', 'fora', 'consegui*'] },
        ideiaCentral: { termos: ['calma', 'gentil*', 'paciencia', 'imprevisto', 'carinho'] }
      }
    },
    {
      id: 'rec013',
      dificuldade: 'facil',
      titulo: 'O time pequeno',
      narracao: 'O time da escolinha era pequeno e ia enfrentar um time bem maior. Os adversários eram mais altos e fortes, e as crianças ficaram com medo. O treinador disse que eles eram rápidos e deviam tocar muito a bola. Correndo e passando, o time pequeno empatou o jogo e saiu de cabeça erguida.',
      ideiaCentralTexto: 'Cada um tem sua força; usar o que você tem de melhor faz diferença.',
      elementos: {
        personagens: { termos: ['time', 'escolinha', 'treinador', 'adversari*', 'criancas'] },
        problema: { termos: ['pequen*', 'maior', 'altos', 'fortes', 'medo'] },
        tentativa: { termos: ['rapid*', 'tocar', 'passa*', 'correndo', 'velocidade'] },
        desfecho: { termos: ['empat*', 'cabeca erguida', 'orgulho', 'consegui*'] },
        ideiaCentral: { termos: ['forca', 'qualidade', 'melhor', 'usar o que tem', 'rapid*'] }
      }
    },
    {
      id: 'rec014',
      dificuldade: 'facil',
      titulo: 'A defensora que queria atacar',
      narracao: 'Júlia jogava na defesa, mas só queria fazer gols como as atacantes. Ela vivia abandonando sua posição e o time levava gols por trás. A treinadora explicou que defender bem também ganha jogos. Júlia passou a defender com capricho, o time parou de sofrer gols e venceu.',
      ideiaCentralTexto: 'Toda posição é importante; fazer bem o seu papel ajuda o time.',
      elementos: {
        personagens: { termos: ['Julia', 'defesa', 'defensora', 'treinador*', 'time'] },
        problema: { termos: ['abandon*', 'posicao', 'so queria gol', 'levava gols', 'sofr*'] },
        tentativa: { termos: ['defend*', 'capricho', 'explic*', 'ficar na posicao'] },
        desfecho: { termos: ['venc*', 'ganh*', 'parou de sofrer', 'consegui*'] },
        ideiaCentral: { termos: ['posicao', 'papel', 'importante', 'defend*', 'funcao', 'time'] }
      }
    },
    {
      id: 'rec015',
      dificuldade: 'facil',
      titulo: 'O despertador mudo',
      narracao: 'No dia da final, o despertador de Enzo não tocou e ele acordou atrasado. Correndo, ele se arrumou e o pai o levou voando até o campo. Enzo chegou no fim do primeiro tempo e entrou suado, mas decidido. Mesmo cansado da correria, ele fez o gol da vitória.',
      ideiaCentralTexto: 'Mesmo começando atrasado, dá para virar o jogo com esforço.',
      elementos: {
        personagens: { termos: ['Enzo', 'pai'] },
        problema: { termos: ['despertador', 'atrasad*', 'atraso', 'nao tocou', 'acordou tarde'] },
        tentativa: { termos: ['correndo', 'arrum*', 'levou', 'corr*', 'rapido'] },
        desfecho: { termos: ['gol', 'vitoria', 'venc*', 'consegui*', 'chegou'] },
        ideiaCentral: { termos: ['esforc*', 'nao desist*', 'atraso', 'recuper*', 'tentar'] }
      }
    },
    {
      id: 'rec016',
      dificuldade: 'facil',
      titulo: 'A trave teimosa',
      narracao: 'Theo chutava e a bola sempre batia na trave, sem entrar. Ele ficou frustrado e quis parar de tentar. O amigo Vitor disse para ele mirar no canto em vez do meio. Theo mudou a mira, chutou de novo e a bola entrou no fundo do gol.',
      ideiaCentralTexto: 'Mudar a estratégia depois de errar pode trazer o acerto.',
      elementos: {
        personagens: { termos: ['Theo', 'Vitor', 'amigo'] },
        problema: { termos: ['trave', 'nao entrava', 'nao entra', 'frustrad*', 'errava'] },
        tentativa: { termos: ['mir*', 'canto', 'mud*', 'tent*', 'dica'] },
        desfecho: { termos: ['entrou', 'gol', 'consegui*', 'acert*'] },
        ideiaCentral: { termos: ['mud*', 'estrategia', 'tentar de novo', 'ajust*', 'persist*'] }
      }
    },
    {
      id: 'rec017',
      dificuldade: 'facil',
      titulo: 'O adversário caído',
      narracao: 'No meio da partida, um jogador do outro time caiu e se machucou no joelho. Em vez de aproveitar para fazer gol, Miguel parou e chamou ajuda. Os dois times esperaram o menino ser atendido. Quando ele se levantou, todos bateram palmas e o jogo continuou em paz.',
      ideiaCentralTexto: 'Respeito e cuidado com o outro valem mais do que vencer.',
      elementos: {
        personagens: { termos: ['Miguel', 'adversari*', 'jogador', 'menino', 'times'] },
        problema: { termos: ['caiu', 'machuc*', 'joelho', 'lesion*'] },
        tentativa: { termos: ['parou', 'chamou ajuda', 'esper*', 'ajud*', 'socorr*'] },
        desfecho: { termos: ['levantou', 'palmas', 'continuou', 'atendid*', 'paz'] },
        ideiaCentral: { termos: ['respeito', 'respeit*', 'cuidado', 'cuidar', 'gentil*', 'fair play'] }
      }
    },

    // ===================== MÉDIAS (mais detalhes) =====================
    {
      id: 'rec018',
      dificuldade: 'medio',
      titulo: 'O treinador que ficou doente',
      narracao: 'Na véspera do torneio, o treinador Sérgio ficou gripado e não pôde comparecer. O time ficou perdido, sem saber quem ia montar a escalação. A capitã Helena reuniu todos e dividiu as funções: cada um cuidaria de uma parte do jogo. Eles se organizaram sozinhos, com calma e respeito, e conseguiram um empate corajoso. No fim, ligaram para o treinador contando que tinham dado conta.',
      ideiaCentralTexto: 'Quando se organizam e se ajudam, as pessoas conseguem resolver até sem o líder por perto.',
      elementos: {
        personagens: { termos: ['Sergio', 'treinador', 'Helena', 'capit*', 'time'] },
        problema: { termos: ['doente', 'gripad*', 'gripe', 'nao pode', 'perdid*', 'sem treinador'] },
        tentativa: { termos: ['reun*', 'divid*', 'organiz*', 'funco*', 'funcao', 'escalac*'] },
        desfecho: { termos: ['empat*', 'consegui*', 'deram conta', 'ligaram', 'sozinhos'] },
        ideiaCentral: { termos: ['organiz*', 'equipe', 'junt*', 'colabor*', 'uni*', 'responsab*'] }
      }
    },
    {
      id: 'rec019',
      dificuldade: 'medio',
      titulo: 'A bola no rio',
      narracao: 'O time jogava num campo perto de um rio quando um chute mandou a bola direto para a água. A correnteza começou a levar a bola para longe e todos se desesperaram. Lucas correu pela margem enquanto Bia foi buscar um galho comprido. Juntos, eles alcançaram a bola e puxaram para a terra firme. O time aprendeu que pensar rápido e dividir tarefas resolve emergências.',
      ideiaCentralTexto: 'Pensar rápido e dividir tarefas resolve até uma emergência.',
      elementos: {
        personagens: { termos: ['Lucas', 'Bia', 'time'] },
        problema: { termos: ['rio', 'agua', 'correnteza', 'bola', 'levou', 'desesper*'] },
        tentativa: { termos: ['correu', 'margem', 'galho', 'junt*', 'busc*', 'puxar*'] },
        desfecho: { termos: ['alcanc*', 'peg*', 'salv*', 'terra firme', 'consegui*'] },
        ideiaCentral: { termos: ['pensar rapido', 'divid*', 'tarefa', 'junt*', 'equipe', 'agir'] }
      }
    },
    {
      id: 'rec020',
      dificuldade: 'medio',
      titulo: 'O dia de neblina',
      narracao: 'Numa manhã fria, uma neblina espessa cobriu o campo e quase não dava para ver a bola. As crianças tropeçavam e ninguém achava os companheiros. O goleiro Otávio teve a ideia de todos se chamarem pelo nome em voz alta. Assim, guiados pela voz uns dos outros, eles conseguiram tocar a bola e até marcar. Quando a neblina passou, perceberam que tinham aprendido a confiar na comunicação.',
      ideiaCentralTexto: 'Comunicação e confiança ajudam o time mesmo quando não dá para ver tudo.',
      elementos: {
        personagens: { termos: ['Otavio', 'goleir*', 'criancas', 'companheir*'] },
        problema: { termos: ['neblina', 'nevoeiro', 'nao via', 'nao dava para ver', 'tropec*', 'fria'] },
        tentativa: { termos: ['chamar pelo nome', 'voz', 'falar', 'comunic*', 'ideia', 'gritar'] },
        desfecho: { termos: ['marc*', 'gol', 'consegui*', 'guiad*', 'tocar a bola'] },
        ideiaCentral: { termos: ['comunic*', 'confi*', 'falar', 'equipe', 'ajud*', 'voz'] }
      }
    },
    {
      id: 'rec021',
      dificuldade: 'medio',
      titulo: 'O menino que não falava português',
      narracao: 'Chegou ao time um menino chamado Hiro, que tinha vindo de longe e não falava português. Ele se sentia sozinho porque não entendia as combinações do jogo. Marina teve a ideia de combinar sinais com as mãos para indicar as jogadas. Aos poucos, Hiro entendeu tudo e fez uma dupla incrível com Marina. Eles descobriram que dá para se entender mesmo sem falar a mesma língua.',
      ideiaCentralTexto: 'A vontade de incluir o outro derruba até a barreira da língua.',
      elementos: {
        personagens: { termos: ['Hiro', 'Marina', 'menino', 'time'] },
        problema: { termos: ['nao falava', 'portugues', 'lingua', 'sozinho', 'nao entendia'] },
        tentativa: { termos: ['sinais', 'maos', 'combin*', 'gestos', 'ideia', 'ensin*'] },
        desfecho: { termos: ['entendeu', 'dupla', 'junt*', 'consegui*', 'amig*'] },
        ideiaCentral: { termos: ['inclu*', 'amizade', 'amig*', 'entender', 'aceit*', 'junt*'] }
      }
    },
    {
      id: 'rec022',
      dificuldade: 'medio',
      titulo: 'A luz que apagou',
      narracao: 'O jogo era à noite e, de repente, toda a iluminação do campo apagou. As arquibancadas ficaram no escuro e o jogo precisou parar. Os pais tiveram a ideia de acender as lanternas dos celulares apontando para o gramado. Com aquela luzinha de todo mundo junto, o time conseguiu bater o pênalti final. O jogo terminou com uma vitória iluminada pela torcida.',
      ideiaCentralTexto: 'Quando cada um faz sua pequena parte, juntos resolvem o problema.',
      elementos: {
        personagens: { termos: ['pais', 'time', 'torcida', 'jogadores'] },
        problema: { termos: ['luz', 'apagou', 'escuro', 'iluminac*', 'parou'] },
        tentativa: { termos: ['lanterna', 'celular', 'acend*', 'ideia', 'apont*'] },
        desfecho: { termos: ['penalti', 'venc*', 'ganh*', 'vitoria', 'consegui*', 'gol'] },
        ideiaCentral: { termos: ['junt*', 'cada um', 'pequena parte', 'uni*', 'colabor*', 'ajud*'] }
      }
    },
    {
      id: 'rec023',
      dificuldade: 'medio',
      titulo: 'O capitão que zoava',
      narracao: 'Rodrigo era o melhor jogador, mas zoava os colegas que erravam. Aos poucos, o time foi ficando triste e jogando cada vez pior. Numa partida, Rodrigo errou um gol fácil e ninguém riu dele; pelo contrário, o incentivaram. Ele entendeu como o apoio era melhor que a zoação e pediu desculpas. A partir daí, o time voltou a jogar feliz e a ganhar.',
      ideiaCentralTexto: 'Apoiar é melhor que humilhar; o respeito faz o time crescer.',
      elementos: {
        personagens: { termos: ['Rodrigo', 'capit*', 'colegas', 'time'] },
        problema: { termos: ['zoava', 'zoac*', 'caco*', 'humilh*', 'triste', 'pior'] },
        tentativa: { termos: ['incentiv*', 'apoi*', 'nao riu', 'desculp*', 'entendeu'] },
        desfecho: { termos: ['desculp*', 'feliz', 'ganh*', 'venc*', 'volt*', 'mud*'] },
        ideiaCentral: { termos: ['respeito', 'respeit*', 'apoi*', 'nao humilh*', 'gentil*', 'companheir*'] }
      }
    },
    {
      id: 'rec024',
      dificuldade: 'medio',
      titulo: 'Os gêmeos e o juiz',
      narracao: 'Os gêmeos Léo e Téo eram idênticos e jogavam no mesmo time. Quando Léo levou um cartão amarelo, o juiz se confundiu e quase expulsou Téo por engano. Os meninos, honestos, explicaram quem era quem para o juiz. O juiz agradeceu a sinceridade e corrigiu o erro. O jogo seguiu justo e os gêmeos ganharam fama de honestos.',
      ideiaCentralTexto: 'Ser honesto, mesmo quando dava para se aproveitar, constrói confiança.',
      elementos: {
        personagens: { termos: ['Leo', 'Teo', 'gemeos', 'juiz'] },
        problema: { termos: ['confund*', 'identic*', 'cartao', 'engano', 'expuls*', 'errad*'] },
        tentativa: { termos: ['explic*', 'honest*', 'sincer*', 'contar a verdade', 'quem era quem'] },
        desfecho: { termos: ['corrig*', 'agradec*', 'justo', 'fama', 'consegui*'] },
        ideiaCentral: { termos: ['honest*', 'sincer*', 'verdade', 'confianc*', 'justic*'] }
      }
    },
    {
      id: 'rec025',
      dificuldade: 'medio',
      titulo: 'A jogadora cadeirante',
      narracao: 'Valentina usava cadeira de rodas e adorava futebol, mas achava que nunca poderia participar. O time decidiu nomeá-la treinadora-assistente, encarregada da tática. Ela estudou os adversários e sugeriu uma marcação nova durante o intervalo. A ideia de Valentina funcionou e o time virou o placar no segundo tempo. Todos comemoraram dizendo que a vitória tinha sido dela também.',
      ideiaCentralTexto: 'Todo mundo pode contribuir de um jeito; participar não é só correr em campo.',
      elementos: {
        personagens: { termos: ['Valentina', 'cadeira de rodas', 'cadeirante', 'time', 'assistente'] },
        problema: { termos: ['nao poderia', 'nao podia jogar', 'cadeira', 'de fora', 'achava que nao'] },
        tentativa: { termos: ['tatica', 'estud*', 'sugeriu', 'marcac*', 'ideia', 'analis*'] },
        desfecho: { termos: ['vir*', 'venc*', 'ganh*', 'funcionou', 'consegui*', 'comemor*'] },
        ideiaCentral: { termos: ['contribu*', 'particip*', 'todos', 'inclu*', 'cada um', 'jeito'] }
      }
    },
    {
      id: 'rec026',
      dificuldade: 'medio',
      titulo: 'A bola murcha',
      narracao: 'No dia do amistoso, a única bola do time estava murcha e não havia bomba de ar. As crianças ficaram desanimadas, achando que não dariam jogar. O zelador da escola lembrou que tinha uma bomba de bicicleta na garagem. Eles adaptaram o bico, encheram a bola e a partida aconteceu. O time aprendeu que quase sempre existe uma solução se a gente procura.',
      ideiaCentralTexto: 'Quase sempre há uma solução quando a gente não desiste de procurar.',
      elementos: {
        personagens: { termos: ['zelador', 'criancas', 'time'] },
        problema: { termos: ['murcha', 'bola', 'sem ar', 'sem bomba', 'desanim*'] },
        tentativa: { termos: ['bomba', 'bicicleta', 'garagem', 'adapt*', 'ench*', 'lembrou'] },
        desfecho: { termos: ['ench*', 'jog*', 'aconteceu', 'consegui*', 'partida'] },
        ideiaCentral: { termos: ['solucao', 'resolv*', 'procur*', 'nao desist*', 'criativ*', 'jeito'] }
      }
    },
    {
      id: 'rec027',
      dificuldade: 'medio',
      titulo: 'O medo da torcida',
      narracao: 'Antes da final, Bruno olhou para a arquibancada cheia e travou de nervoso. Ele sentia o coração disparar e pensou em não entrar em campo. A irmã mais velha disse para ele olhar só para a bola, e não para a multidão. Bruno focou na bola, esqueceu o público e jogou a melhor partida da vida. Ele descobriu que dá para domar o nervoso prestando atenção numa coisa de cada vez.',
      ideiaCentralTexto: 'Focar numa coisa de cada vez ajuda a controlar o nervosismo.',
      elementos: {
        personagens: { termos: ['Bruno', 'irma'] },
        problema: { termos: ['medo', 'nervos*', 'torcida', 'arquibancada', 'travou', 'multidao', 'publico'] },
        tentativa: { termos: ['olhar para a bola', 'foc*', 'concentr*', 'respir*', 'dica'] },
        desfecho: { termos: ['jog*', 'melhor partida', 'consegui*', 'super*', 'venc*'] },
        ideiaCentral: { termos: ['foc*', 'concentr*', 'nervos*', 'calma', 'uma coisa de cada vez', 'control*'] }
      }
    },
    {
      id: 'rec028',
      dificuldade: 'medio',
      titulo: 'A goleira destemida',
      narracao: 'O time só tinha jogadores de linha e ninguém queria ser goleiro. Sem goleiro, eles levavam gols fáceis e estavam perdendo feio. Então a pequena Cecília se ofereceu, mesmo nunca tendo jogado na posição. Ela se jogou em todas as bolas e fez defesas impressionantes. O time parou de sofrer gols e arrancou um empate emocionante.',
      ideiaCentralTexto: 'Coragem para tentar o que ninguém quer pode salvar o time.',
      elementos: {
        personagens: { termos: ['Cecilia', 'goleir*', 'time'] },
        problema: { termos: ['ninguem queria', 'sem goleiro', 'levavam gols', 'perdendo', 'sofr*'] },
        tentativa: { termos: ['ofereceu', 'se jogou', 'defes*', 'tent*', 'coragem'] },
        desfecho: { termos: ['empat*', 'parou de sofrer', 'consegui*', 'defend*'] },
        ideiaCentral: { termos: ['coragem', 'tentar', 'volunt*', 'ajud*', 'enfrent*'] }
      }
    },
    {
      id: 'rec029',
      dificuldade: 'medio',
      titulo: 'A foto sem o Davi',
      narracao: 'Depois de ganhar o campeonato, o time foi tirar a foto com o troféu. Só na hora de ver a imagem é que perceberam: o Davi, que tinha feito o gol, não estava na foto. Em vez de deixar pra lá, todos voltaram para a quadra e chamaram o Davi. Tiraram a foto de novo, agora com o time completo e abraçado. Eles entenderam que nenhuma conquista vale a pena se alguém fica de fora.',
      ideiaCentralTexto: 'Uma conquista só é completa quando ninguém fica de fora.',
      elementos: {
        personagens: { termos: ['Davi', 'time'] },
        problema: { termos: ['foto', 'nao estava', 'ficou de fora', 'faltava', 'esquec*'] },
        tentativa: { termos: ['volt*', 'chamaram', 'chamar', 'de novo', 'refizeram'] },
        desfecho: { termos: ['foto', 'completo', 'abrac*', 'junt*', 'consegui*'] },
        ideiaCentral: { termos: ['ninguem de fora', 'inclu*', 'junt*', 'equipe', 'todos', 'companheir*'] }
      }
    },
    {
      id: 'rec030',
      dificuldade: 'medio',
      titulo: 'O amuleto perdido',
      narracao: 'Otávio só jogava bem se estivesse com suas meias da sorte vermelhas. No dia da final, ele esqueceu as meias e entrou em pânico, achando que ia jogar mal. A treinadora explicou que a sorte estava nos pés dele, não nas meias. Otávio respirou, confiou em si mesmo e jogou com meias comuns. Ele fez dois gols e percebeu que o talento sempre foi dele.',
      ideiaCentralTexto: 'A confiança vem de você mesmo, não de um objeto de sorte.',
      elementos: {
        personagens: { termos: ['Otavio', 'treinador*'] },
        problema: { termos: ['amuleto', 'meias', 'sorte', 'esquec*', 'panico', 'sem as meias'] },
        tentativa: { termos: ['explic*', 'respir*', 'confi*', 'acreditar', 'em si'] },
        desfecho: { termos: ['gols', 'gol', 'jogou bem', 'consegui*', 'percebeu', 'talento'] },
        ideiaCentral: { termos: ['confianc*', 'confi*', 'acreditar', 'em si', 'talento', 'voce mesmo'] }
      }
    },
    {
      id: 'rec031',
      dificuldade: 'medio',
      titulo: 'O time com um a menos',
      narracao: 'Logo no começo, um jogador do time de Antônia foi expulso por uma falta dura. Eles ficaram com um jogador a menos e o adversário aproveitou para pressionar. Antônia organizou a defesa e pediu que todos corressem em dobro para cobrir os espaços. Lutando muito, o time segurou o empate até o apito final. Eles saíram exaustos, mas orgulhosos de ter resistido juntos.',
      ideiaCentralTexto: 'Esforço coletivo e organização superam até a desvantagem.',
      elementos: {
        personagens: { termos: ['Antonia', 'time', 'jogador', 'adversari*'] },
        problema: { termos: ['expuls*', 'um a menos', 'falta', 'pressionar', 'desvantagem'] },
        tentativa: { termos: ['organiz*', 'defesa', 'correr', 'cobrir', 'dobro', 'lut*'] },
        desfecho: { termos: ['empat*', 'segur*', 'resist*', 'consegui*', 'orgulho*'] },
        ideiaCentral: { termos: ['esforc*', 'junt*', 'organiz*', 'equipe', 'uni*', 'coletiv*'] }
      }
    },
    {
      id: 'rec032',
      dificuldade: 'medio',
      titulo: 'A promessa do irmão menor',
      narracao: 'Felipe levava o irmão menor, Joca, para assistir os treinos toda semana. Joca era pequeno e ficava triste por só pegar as bolas que saíam do campo. Felipe prometeu que, quando Joca crescesse, treinaria com ele todo dia. Por enquanto, ele começou a ensinar embaixadinhas ao irmão no quintal. Joca ficou radiante e os dois criaram um laço ainda mais forte.',
      ideiaCentralTexto: 'Dedicar tempo a quem amamos vale mais que qualquer troféu.',
      elementos: {
        personagens: { termos: ['Felipe', 'Joca', 'irmao'] },
        problema: { termos: ['pequeno', 'triste', 'so pegava bola', 'nao jogava', 'de fora'] },
        tentativa: { termos: ['promet*', 'ensin*', 'embaixadinha', 'quintal', 'trein*'] },
        desfecho: { termos: ['radiante', 'feliz', 'laco', 'junt*', 'consegui*'] },
        ideiaCentral: { termos: ['tempo', 'amor', 'familia', 'irmao', 'dedic*', 'carinho'] }
      }
    },
    {
      id: 'rec033',
      dificuldade: 'medio',
      titulo: 'A rival que virou amiga',
      narracao: 'Sara e Duda jogavam em times rivais e viviam discutindo nos jogos. Numa partida, as duas se chocaram e caíram juntas no chão. Em vez de brigar, começaram a rir da situação e se ajudaram a levantar. Descobriram que tinham os mesmos gostos e marcaram de treinar juntas no fim de semana. A rivalidade virou uma amizade que deixou as duas melhores jogadoras.',
      ideiaCentralTexto: 'Um rival pode virar amigo quando deixamos o orgulho de lado.',
      elementos: {
        personagens: { termos: ['Sara', 'Duda', 'rival', 'rivais'] },
        problema: { termos: ['rival*', 'discut*', 'briga*', 'choc*', 'caira*'] },
        tentativa: { termos: ['riram', 'ajud*', 'levantar', 'convers*', 'trein* junt*'] },
        desfecho: { termos: ['amizade', 'amig*', 'junt*', 'melhor*', 'consegui*'] },
        ideiaCentral: { termos: ['amizade', 'amig*', 'rival', 'orgulho', 'respeit*', 'junt*'] }
      }
    },
    {
      id: 'rec034',
      dificuldade: 'medio',
      titulo: 'O gol contra',
      narracao: 'Numa jogada confusa, Lucas chutou para o próprio gol sem querer e fez um gol contra. Ele ficou arrasado e queria sair de campo de vergonha. Os colegas o abraçaram e disseram que erro acontece com qualquer um. Determinado a compensar, Lucas correu o jogo todo e fez o gol de empate no fim. Ele aprendeu que um erro não define o jogador, e sim o que ele faz depois.',
      ideiaCentralTexto: 'Um erro não define você; o que importa é o que você faz depois.',
      elementos: {
        personagens: { termos: ['Lucas', 'colegas', 'time'] },
        problema: { termos: ['gol contra', 'errou', 'erro', 'vergonha', 'arrasad*', 'sem querer'] },
        tentativa: { termos: ['abrac*', 'incentiv*', 'correr', 'compens*', 'determin*', 'tent*'] },
        desfecho: { termos: ['empat*', 'gol', 'consegui*', 'aprendeu', 'recuper*'] },
        ideiaCentral: { termos: ['erro', 'errar', 'nao define', 'depois', 'recuper*', 'tentar de novo'] }
      }
    },

    // ===================== DIFÍCEIS (reviravolta / vocabulário rico) =====================
    {
      id: 'rec035',
      dificuldade: 'dificil',
      titulo: 'A regra esquecida',
      narracao: 'O pequeno time da Vila perdeu uma decisão por um detalhe: o árbitro tinha aplicado uma regra errada num escanteio. O presidente do clube, estudioso de regulamentos antigos, percebeu o equívoco e levou o caso à federação. Depois de muita insistência e documentos, conseguiu provar que a regra usada não existia mais. A federação determinou que a partida fosse refeita do zero. No jogo remarcado, agora com a regra correta, o time da Vila venceu por 3 a 2 e comemorou a justiça.',
      ideiaCentralTexto: 'Conhecimento e persistência podem corrigir uma injustiça.',
      elementos: {
        personagens: { termos: ['presidente', 'arbitro', 'juiz', 'federacao', 'time', 'vila'] },
        problema: { termos: ['regra errada', 'perd*', 'injust*', 'equivoc*', 'detalhe', 'escanteio'] },
        tentativa: { termos: ['percebeu', 'levou o caso', 'federacao', 'provar', 'document*', 'insist*', 'estud*'] },
        desfecho: { termos: ['refeit*', 'remarc*', 'venc*', 'ganh*', '3 a 2', 'justic*', 'consegui*'] },
        ideiaCentral: { termos: ['persist*', 'conhecimento', 'justic*', 'nao desist*', 'estud*', 'insist*'] }
      }
    },
    {
      id: 'rec036',
      dificuldade: 'dificil',
      titulo: 'O caderno do treinador',
      narracao: 'Por trinta anos, o velho treinador Vicente guardava um caderninho que consultava antes de cada decisão importante. Ninguém sabia o que havia nele, e isso virou uma lenda no clube. Quando Vicente se aposentou, entregou o caderno para a jovem técnica Renata. Curiosa, ela abriu e encontrou uma única frase repetida em todas as páginas: "Escute seus jogadores". Renata passou a conversar mais com o time, que jogou unido como nunca e conquistou o campeonato.',
      ideiaCentralTexto: 'Ouvir as pessoas é o segredo de uma boa liderança.',
      elementos: {
        personagens: { termos: ['Vicente', 'Renata', 'treinador', 'tecnica', 'time'] },
        problema: { termos: ['caderno', 'segredo', 'mistério', 'misterio', 'nao sabia', 'lenda'] },
        tentativa: { termos: ['abriu', 'entregou', 'escutar', 'escute', 'convers*', 'ouvir'] },
        desfecho: { termos: ['unido', 'conquist*', 'campeonato', 'venc*', 'ganh*', 'consegui*'] },
        ideiaCentral: { termos: ['ouvir', 'escut*', 'lideranc*', 'convers*', 'atencao', 'pessoas'] }
      }
    },
    {
      id: 'rec037',
      dificuldade: 'dificil',
      titulo: 'O discurso travado',
      narracao: 'Marcela foi eleita a melhor jogadora do torneio e teria de discursar na premiação. Apesar de craque com a bola, ela tinha pavor de falar em público e ficou muda no microfone. O técnico, ao perceber, sugeriu que ela falasse como se conversasse só com as amigas. Marcela imaginou que estava no vestiário e as palavras finalmente saíram, simples e sinceras. A plateia se emocionou, e ela descobriu que coragem se aprende aos poucos, em qualquer campo.',
      ideiaCentralTexto: 'A coragem para enfrentar nossos medos se aprende aos poucos.',
      elementos: {
        personagens: { termos: ['Marcela', 'tecnico', 'treinador'] },
        problema: { termos: ['discurso', 'falar em publico', 'pavor', 'medo', 'muda', 'travou', 'microfone'] },
        tentativa: { termos: ['sugeriu', 'imagin*', 'como se', 'convers*', 'amigas', 'respir*', 'vestiario'] },
        desfecho: { termos: ['falou', 'palavras sairam', 'emocion*', 'consegui*', 'descobriu', 'super*'] },
        ideiaCentral: { termos: ['coragem', 'medo', 'enfrent*', 'aos poucos', 'super*', 'public*'] }
      }
    },
    {
      id: 'rec038',
      dificuldade: 'dificil',
      titulo: 'A final adiada',
      narracao: 'A grande final foi interrompida por uma tempestade quando o placar estava empatado. Muitos achavam que o jogo seria decidido na moeda, o que parecia injusto. A organização decidiu remarcar a partida para a semana seguinte, no mesmo ponto em que parou. Durante a espera, os dois times treinaram bastante e a ansiedade tomou conta de todos. No dia do retorno, o time visitante manteve a calma, marcou no fim e levantou a taça com méritos.',
      ideiaCentralTexto: 'Paciência e preparo durante a espera fazem a diferença na hora certa.',
      elementos: {
        personagens: { termos: ['times', 'organizac*', 'time visitante', 'jogadores'] },
        problema: { termos: ['tempestade', 'interromp*', 'adiad*', 'empat*', 'parou', 'chuva'] },
        tentativa: { termos: ['remarc*', 'trein*', 'esper*', 'prepar*', 'calma', 'pratic*'] },
        desfecho: { termos: ['marcou', 'gol', 'taca', 'venc*', 'ganh*', 'consegui*', 'levantou'] },
        ideiaCentral: { termos: ['paciencia', 'prepar*', 'calma', 'esper*', 'persist*', 'foc*'] }
      }
    },
    {
      id: 'rec039',
      dificuldade: 'dificil',
      titulo: 'O jogador que ouvia com os olhos',
      narracao: 'Daniel era surdo e se comunicava por língua de sinais, mas amava futebol como ninguém. No começo, o time não sabia como combinar as jogadas com ele durante a partida. A capitã Bianca criou um código de gestos e cores de braçadeira para cada estratégia. Daniel, atento aos detalhes visuais, passou a antecipar as jogadas melhor que todos. O time campeão descobriu que existem muitas formas de se comunicar e que cada diferença é uma força.',
      ideiaCentralTexto: 'As diferenças, quando acolhidas, viram a maior força do time.',
      elementos: {
        personagens: { termos: ['Daniel', 'Bianca', 'capit*', 'time'] },
        problema: { termos: ['surdo', 'sinais', 'nao sabia', 'comunic*', 'combinar', 'como'] },
        tentativa: { termos: ['codigo', 'gestos', 'cores', 'bracadeira', 'criou', 'estrategia', 'visual'] },
        desfecho: { termos: ['antecip*', 'campe*', 'venc*', 'consegui*', 'descobriu', 'melhor'] },
        ideiaCentral: { termos: ['diferenc*', 'forca', 'inclu*', 'comunic*', 'acolh*', 'respeit*'] }
      }
    },
    {
      id: 'rec040',
      dificuldade: 'dificil',
      titulo: 'A decisão do pênalti',
      narracao: 'Nos minutos finais da semifinal, o time ganhou um pênalti que valia a vaga. O artilheiro Igor, que sempre batia, estava com a perna machucada e mancando. Ele teve que decidir entre arriscar a batida ou confiar a cobrança a outra pessoa. Engolindo o orgulho, Igor entregou a bola para a estreante Vivi, que treinava pênaltis havia meses. Vivi bateu firme no canto, marcou o gol da classificação e correu para abraçar Igor, o verdadeiro herói da escolha.',
      ideiaCentralTexto: 'Confiar nos outros e deixar o orgulho de lado pode ser a decisão mais corajosa.',
      elementos: {
        personagens: { termos: ['Igor', 'Vivi', 'artilheiro', 'time', 'estreante'] },
        problema: { termos: ['penalti', 'machuc*', 'mancando', 'perna', 'decidir', 'orgulho'] },
        tentativa: { termos: ['entregou', 'confi*', 'passou a bola', 'escolh*', 'deixou bater'] },
        desfecho: { termos: ['marcou', 'gol', 'classific*', 'venc*', 'abrac*', 'consegui*'] },
        ideiaCentral: { termos: ['confi*', 'orgulho', 'humild*', 'equipe', 'confianc*', 'coragem'] }
      }
    },
    {
      id: 'rec041',
      dificuldade: 'dificil',
      titulo: 'O treino secreto',
      narracao: 'Cauã era o mais lento do time e quase nunca era escalado para jogar. Sem contar a ninguém, ele passou a treinar corrida escondido na praça toda madrugada. Os meses se passaram e o time, desfalcado numa final, precisou colocá-lo em campo. Para a surpresa de todos, Cauã disparava como um foguete e deu três assistências. Ele revelou seu treino secreto e ensinou que o esforço silencioso sempre dá frutos.',
      ideiaCentralTexto: 'O esforço dedicado, mesmo quando ninguém vê, traz resultado.',
      elementos: {
        personagens: { termos: ['Caua', 'time'] },
        problema: { termos: ['lento', 'nao era escalado', 'banco', 'reserva', 'nunca jogava'] },
        tentativa: { termos: ['trein*', 'escondid*', 'corrida', 'praca', 'madrugada', 'secret*', 'pratic*'] },
        desfecho: { termos: ['assistencia', 'rapido', 'disparava', 'surpresa', 'consegui*', 'revelou'] },
        ideiaCentral: { termos: ['esforc*', 'dedicac*', 'trein*', 'silencioso', 'persist*', 'resultado'] }
      }
    },
    {
      id: 'rec042',
      dificuldade: 'dificil',
      titulo: 'A comemoração exagerada',
      narracao: 'Após marcar um gol bonito, Léo correu provocando os adversários e debochando deles. O técnico o tirou do jogo e explicou que humilhar o outro mancha qualquer vitória. Arrependido, Léo procurou os adversários no fim da partida para pedir desculpas. Os meninos aceitaram e até elogiaram a coragem dele em reconhecer o erro. Léo entendeu que respeitar o adversário é tão importante quanto saber comemorar.',
      ideiaCentralTexto: 'Comemorar é bom, mas respeitar o adversário é essencial.',
      elementos: {
        personagens: { termos: ['Leo', 'tecnico', 'treinador', 'adversari*'] },
        problema: { termos: ['comemor*', 'provoc*', 'deboch*', 'humilh*', 'exager*', 'manch*'] },
        tentativa: { termos: ['explic*', 'desculp*', 'procur*', 'arrepend*', 'reconhec*'] },
        desfecho: { termos: ['aceit*', 'elogi*', 'entendeu', 'desculp*', 'consegui*', 'mud*'] },
        ideiaCentral: { termos: ['respeito', 'respeit*', 'adversari*', 'humild*', 'fair play', 'gentil*'] }
      }
    },
    {
      id: 'rec043',
      dificuldade: 'dificil',
      titulo: 'O capitão que queria desistir',
      narracao: 'Depois de três derrotas seguidas, o capitão Murilo pensou seriamente em largar o time. Ele sentia que a culpa era toda dele e que não servia para liderar. A treinadora mostrou-lhe os vídeos dos jogos, em que ele aparecia incentivando todo mundo. Murilo percebeu que liderança não é só vencer, mas manter o grupo de pé nas dificuldades. Ele continuou, o time reagiu nas rodadas seguintes e terminou o campeonato em terceiro lugar, orgulhoso.',
      ideiaCentralTexto: 'Liderar é também manter as pessoas firmes nos momentos difíceis.',
      elementos: {
        personagens: { termos: ['Murilo', 'capit*', 'treinador*', 'time'] },
        problema: { termos: ['desist*', 'largar', 'derrota*', 'culpa', 'nao servia', 'perd*'] },
        tentativa: { termos: ['videos', 'mostrou', 'incentiv*', 'percebeu', 'continuou', 'refletir'] },
        desfecho: { termos: ['reagiu', 'terceiro', 'consegui*', 'orgulho*', 'continuou', 'terminou'] },
        ideiaCentral: { termos: ['lideranc*', 'nao desist*', 'persist*', 'grupo', 'dificuldade', 'manter'] }
      }
    },
    {
      id: 'rec044',
      dificuldade: 'dificil',
      titulo: 'A goleira e a tempestade de areia',
      narracao: 'O time viajou para jogar numa cidade litorânea e enfrentou um vento forte que levantava areia. A goleira Núbia mal conseguia abrir os olhos para ver a bola chegando. Em vez de reclamar, ela pediu óculos de natação emprestados a um torcedor. Com os óculos, Núbia voltou a enxergar e fez defesas decisivas na vitória. O time celebrou a criatividade que transformou um problemão numa solução simples.',
      ideiaCentralTexto: 'Criatividade transforma um problemão em solução simples.',
      elementos: {
        personagens: { termos: ['Nubia', 'goleir*', 'time', 'torcedor'] },
        problema: { termos: ['vento', 'areia', 'tempestade', 'nao via', 'olhos', 'enxerg*'] },
        tentativa: { termos: ['oculos', 'natacao', 'emprest*', 'ideia', 'pediu', 'adapt*'] },
        desfecho: { termos: ['defes*', 'venc*', 'ganh*', 'consegui*', 'enxerg*', 'celebr*'] },
        ideiaCentral: { termos: ['criativ*', 'solucao', 'resolv*', 'ideia', 'adapt*', 'jeito'] }
      }
    },
    {
      id: 'rec045',
      dificuldade: 'dificil',
      titulo: 'O mistério das chuteiras trocadas',
      narracao: 'Antes da final, vários jogadores reclamaram que suas chuteiras sumiram do vestiário. A desconfiança cresceu e alguns acusaram o time adversário de sabotagem. A capitã Letícia, calma, resolveu investigar antes de culpar qualquer um. Ela descobriu que o roupeiro tinha trocado as etiquetas sem querer ao organizar tudo. As chuteiras voltaram aos donos, o mal-entendido se desfez e os times se cumprimentaram antes de um jogo justo.',
      ideiaCentralTexto: 'Investigar antes de acusar evita injustiças e mal-entendidos.',
      elementos: {
        personagens: { termos: ['Leticia', 'capit*', 'roupeiro', 'time', 'adversari*'] },
        problema: { termos: ['chuteiras', 'sumiram', 'desconfianc*', 'acus*', 'sabotagem', 'misterio'] },
        tentativa: { termos: ['investig*', 'descobriu', 'calma', 'antes de culpar', 'procur*'] },
        desfecho: { termos: ['etiquetas', 'trocad*', 'voltaram', 'desfez', 'cumpriment*', 'consegui*', 'justo'] },
        ideiaCentral: { termos: ['investig*', 'nao acus*', 'calma', 'justic*', 'verdade', 'pensar antes'] }
      }
    },
    {
      id: 'rec046',
      dificuldade: 'dificil',
      titulo: 'A última partida do veterano',
      narracao: 'Seu Antônio, o zelador de oitenta anos, tinha sido jogador do clube na juventude. No aniversário do time, os jovens decidiram realizar o sonho dele de jogar uma última vez. Eles organizaram uma partida festiva e o colocaram para bater uma falta ensaiada. Com as pernas trêmulas mas o coração firme, Seu Antônio acertou um golaço no ângulo. A torcida chorou de emoção e ele disse que aquele tinha sido o dia mais feliz da sua vida.',
      ideiaCentralTexto: 'Realizar o sonho de alguém é um presente que emociona a todos.',
      elementos: {
        personagens: { termos: ['Antonio', 'zelador', 'veterano', 'time', 'jovens'] },
        problema: { termos: ['oitenta anos', 'idoso', 'velho', 'sonho', 'ultima vez', 'nunca mais'] },
        tentativa: { termos: ['organiz*', 'partida', 'falta', 'colocaram', 'realizar', 'homenage*'] },
        desfecho: { termos: ['golaco', 'gol', 'acertou', 'emocao', 'chorou', 'feliz', 'consegui*'] },
        ideiaCentral: { termos: ['sonho', 'realizar', 'emocao', 'presente', 'carinho', 'respeito'] }
      }
    },
    {
      id: 'rec047',
      dificuldade: 'dificil',
      titulo: 'O placar eletrônico maluco',
      narracao: 'Num torneio importante, o placar eletrônico começou a marcar pontos errados e confundiu todo mundo. A torcida brigava, achando que o time tinha sido roubado de uma vitória. Em vez de discutir, o capitão Théo pediu para conferirem a súmula escrita pelo árbitro. A súmula mostrava o resultado verdadeiro, diferente do painel quebrado. O equívoco foi corrigido com tranquilidade e o torneio seguiu sem brigas, baseado na verdade dos registros.',
      ideiaCentralTexto: 'Buscar a fonte confiável acalma os ânimos e revela a verdade.',
      elementos: {
        personagens: { termos: ['Theo', 'capit*', 'arbitro', 'juiz', 'torcida', 'time'] },
        problema: { termos: ['placar', 'errad*', 'confund*', 'brig*', 'quebrad*', 'roubad*'] },
        tentativa: { termos: ['sumula', 'conferir', 'verific*', 'pediu', 'calma', 'registr*'] },
        desfecho: { termos: ['corrig*', 'verdade', 'seguiu', 'sem brigas', 'consegui*', 'tranquil*'] },
        ideiaCentral: { termos: ['verdade', 'calma', 'conferir', 'fonte', 'confi*', 'pensar antes'] }
      }
    },
    {
      id: 'rec048',
      dificuldade: 'dificil',
      titulo: 'A ponte para o campo',
      narracao: 'A escola de uma vila ribeirinha só chegava ao campo de futebol atravessando um riacho. Numa enchente, a ponte velha de madeira foi levada pela água e as crianças ficaram sem treinar. Em vez de aceitar, os moradores se juntaram num mutirão para construir uma ponte nova. Cada família trouxe tábuas, pregos e o que tinha, trabalhando junto por dias. Quando a ponte ficou pronta, as crianças voltaram a jogar e entenderam o valor da comunidade.',
      ideiaCentralTexto: 'Quando a comunidade se une por um objetivo, nada a detém.',
      elementos: {
        personagens: { termos: ['moradores', 'criancas', 'familia', 'comunidade', 'vila'] },
        problema: { termos: ['ponte', 'enchente', 'riacho', 'levada', 'sem treinar', 'agua'] },
        tentativa: { termos: ['mutirao', 'construir', 'junt*', 'tabuas', 'trabalh*', 'uni*'] },
        desfecho: { termos: ['pronta', 'voltaram', 'jog*', 'consegui*', 'nova ponte'] },
        ideiaCentral: { termos: ['comunidade', 'uni*', 'junt*', 'mutirao', 'colabor*', 'objetivo'] }
      }
    },
    {
      id: 'rec049',
      dificuldade: 'dificil',
      titulo: 'O troféu rachado',
      narracao: 'Depois de uma temporada inteira, o time finalmente conquistou o tão sonhado troféu. Na comemoração, porém, o troféu escorregou das mãos e rachou ao bater no chão. Houve um silêncio triste, até que a treinadora Paula sorriu e disse algo inesperado. Ela lembrou que o valor não estava no objeto, mas em tudo que viveram juntos para chegar ali. O time guardou o troféu rachado com orgulho, como prova de uma jornada que ninguém poderia quebrar.',
      ideiaCentralTexto: 'O verdadeiro valor está na jornada vivida, não no objeto conquistado.',
      elementos: {
        personagens: { termos: ['Paula', 'treinador*', 'time'] },
        problema: { termos: ['trofeu', 'rachou', 'quebr*', 'caiu', 'escorreg*', 'triste'] },
        tentativa: { termos: ['sorriu', 'lembrou', 'disse', 'explic*', 'valor', 'jornada'] },
        desfecho: { termos: ['guardou', 'orgulho', 'junt*', 'consegui*', 'prova', 'aprend*'] },
        ideiaCentral: { termos: ['jornada', 'valor', 'junt*', 'caminho', 'memoria', 'experiencia', 'nao e o objeto'] }
      }
    },
    {
      id: 'rec050',
      dificuldade: 'dificil',
      titulo: 'A última temporada da turma',
      narracao: 'Era o último campeonato daquela turma antes de todos mudarem de escola. Eles sabiam que, ganhando ou perdendo, aquela seria a despedida do time que cresceu junto. Determinados a aproveitar cada minuto, treinaram sorrindo e cuidaram uns dos outros como nunca. Na final, perderam nos pênaltis, mas não houve lágrimas de tristeza, e sim de gratidão. Eles entenderam que a amizade construída valia muito mais do que qualquer taça.',
      ideiaCentralTexto: 'A amizade que construímos vale mais do que qualquer vitória.',
      elementos: {
        personagens: { termos: ['turma', 'time', 'amigos', 'colegas'] },
        problema: { termos: ['ultima', 'despedida', 'mudar de escola', 'fim', 'separar', 'adeus'] },
        tentativa: { termos: ['aproveit*', 'trein*', 'junt*', 'cuidaram', 'sorr*', 'curtir'] },
        desfecho: { termos: ['perderam', 'penaltis', 'gratidao', 'amizade', 'consegui*', 'gratos'] },
        ideiaCentral: { termos: ['amizade', 'amig*', 'junt*', 'vale mais', 'gratidao', 'memoria'] }
      }
    }
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
    for (var j = 0; j < EXERCICIOS.length; j++) {
      if (EXERCICIOS[j].dificuldade === dificuldade) { saida.push(EXERCICIOS[j]); }
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

  global.RecontoExercicios = api;
  if (typeof module !== 'undefined' && module.exports) { module.exports = api; }
})(typeof window !== 'undefined' ? window : globalThis);
