/*
 * tools/reconto-fragmentos/01-facil.js — 30 histórias FÁCEIS do eixo Reconto.
 *
 * Calibração: ~8-9 anos. Enredo linear, frases curtas, vocabulário simples.
 * Cada história marca os 5 elementos da gramática da história (personagens,
 * problema, tentativa, desfecho, ideia central) e traz um gabarito de termos
 * com coringa de radical "*" para tolerar conjugações.
 *
 * Validar com: node tools/checar-fragmento.js tools/reconto-fragmentos/01-facil.js
 */
module.exports = [
  {
    id: 'rec001',
    dificuldade: 'facil',
    titulo: 'A virada do Estrela',
    narracao: 'O time Estrela estava perdendo de dois a zero no primeiro tempo. A capitã Helena reuniu as amigas e disse para ninguém desistir. No segundo tempo elas treinaram a marcação e marcaram um gol, depois outro. No fim, o Estrela venceu de tres a dois e todas comemoraram abraçadas.',
    ideiaCentralTexto: 'Não desistir, mesmo quando o jogo está difícil, pode mudar tudo.',
    elementos: {
      personagens: { termos: ['Helena', 'capit*', 'Estrela', 'amig*', 'time'] },
      problema: { termos: ['perd*', 'dois a zero', 'primeiro tempo', 'atras*'] },
      tentativa: { termos: ['reun*', 'trein*', 'marc*', 'nao desist*'] },
      desfecho: { termos: ['venc*', 'tres a dois', 'comemor*', 'ganh*'] },
      ideiaCentral: { termos: ['nao desist*', 'desist*', 'persist*', 'esforc*'] }
    }
  },
  {
    id: 'rec002',
    dificuldade: 'facil',
    titulo: 'O goleiro com medo',
    narracao: 'Pedro era goleiro, mas tinha muito medo de defender pênaltis. Um dia o treinador Marcos ficou depois do treino só para ajudar o menino a praticar. Pedro defendeu vinte chutes seguidos e foi perdendo o medo aos poucos. No jogo de domingo, ele pegou o pênalti e garantiu a vitória do time.',
    ideiaCentralTexto: 'Praticar com a ajuda de alguém ajuda a vencer o medo.',
    elementos: {
      personagens: { termos: ['Pedro', 'goleir*', 'Marcos', 'treinador'] },
      problema: { termos: ['medo', 'penalti*', 'penaltis', 'defend*'] },
      tentativa: { termos: ['trein*', 'ajud*', 'pratic*', 'defend*'] },
      desfecho: { termos: ['pegou', 'vitoria', 'garant*', 'defend*'] },
      ideiaCentral: { termos: ['pratic*', 'ajud*', 'medo', 'super*'] }
    }
  },
  {
    id: 'rec003',
    dificuldade: 'facil',
    titulo: 'A bola perdida',
    narracao: 'No meio do treino, a bola caiu dentro de um mato bem alto e sumiu. As crianças ficaram tristes porque sem bola não dava para jogar. Então o Lucas teve uma ideia e todos procuraram juntos no mato, passo a passo. A Bia encontrou a bola embaixo de uma folha e o treino continuou feliz.',
    ideiaCentralTexto: 'Procurar juntos resolve o problema mais rápido.',
    elementos: {
      personagens: { termos: ['Lucas', 'Bia', 'criancas', 'crianc*'] },
      problema: { termos: ['bola', 'sumiu', 'mato', 'tristes'] },
      tentativa: { termos: ['ideia', 'procur*', 'junt*', 'mato'] },
      desfecho: { termos: ['encontrou', 'achou', 'continuou', 'feliz'] },
      ideiaCentral: { termos: ['junt*', 'procur*', 'ajud*', 'equipe'] }
    }
  },
  {
    id: 'rec004',
    dificuldade: 'facil',
    titulo: 'A chuva no jogo',
    narracao: 'O time do Caio estava jogando quando começou a cair uma chuva muito forte. O campo ficou escorregadio e ninguém conseguia correr direito. O treinador pediu calma e mandou todos jogarem com passes curtos. Assim o time se adaptou, fez um gol no fim e ganhou a partida mesmo na chuva.',
    ideiaCentralTexto: 'Saber se adaptar aos imprevistos ajuda a vencer.',
    elementos: {
      personagens: { termos: ['Caio', 'treinador', 'time', 'goleir*'] },
      problema: { termos: ['chuva', 'escorregadio', 'campo', 'correr'] },
      tentativa: { termos: ['calma', 'passes curtos', 'adapt*', 'passe*'] },
      desfecho: { termos: ['gol', 'ganhou', 'venc*', 'partida'] },
      ideiaCentral: { termos: ['adapt*', 'calma', 'imprevist*', 'paciencia'] }
    }
  },
  {
    id: 'rec005',
    dificuldade: 'facil',
    titulo: 'O primeiro gol da Manu',
    narracao: 'A Manu era nova no time e ainda não tinha feito nenhum gol. Ela ficava nervosa toda vez que a bola chegava perto do gol adversário. Sua amiga Clara a incentivou e treinou as finalizações com ela depois da aula. No jogo seguinte, a Manu chutou forte e marcou o seu primeiro gol, muito feliz.',
    ideiaCentralTexto: 'Com apoio dos amigos e treino, a gente conquista o que quer.',
    elementos: {
      personagens: { termos: ['Manu', 'Clara', 'amiga', 'amig*'] },
      problema: { termos: ['nervosa', 'nenhum gol', 'nova', 'medo'] },
      tentativa: { termos: ['incentiv*', 'trein*', 'finaliza*', 'ajud*'] },
      desfecho: { termos: ['marcou', 'primeiro gol', 'chutou', 'feliz'] },
      ideiaCentral: { termos: ['apoio', 'trein*', 'incentiv*', 'conquist*'] }
    }
  },
  {
    id: 'rec006',
    dificuldade: 'facil',
    titulo: 'O novo colega',
    narracao: 'Um menino chamado Theo chegou na escola e queria muito jogar futebol. No primeiro dia ele ficou sozinho no canto, com vergonha de pedir para entrar. A Júlia percebeu e convidou o Theo para o time dela na hora do recreio. Theo jogou muito bem, fez amigos e nunca mais ficou de fora.',
    ideiaCentralTexto: 'Convidar quem está sozinho faz todo mundo se sentir bem.',
    elementos: {
      personagens: { termos: ['Theo', 'Julia', 'menino', 'colega'] },
      problema: { termos: ['sozinho', 'vergonha', 'canto', 'fora'] },
      tentativa: { termos: ['convidou', 'percebeu', 'convid*', 'chamou'] },
      desfecho: { termos: ['jogou', 'amigos', 'amig*', 'time'] },
      ideiaCentral: { termos: ['convid*', 'inclu*', 'amizade', 'acolh*'] }
    }
  },
  {
    id: 'rec007',
    dificuldade: 'facil',
    titulo: 'A chuteira furada',
    narracao: 'No dia do campeonato, o Rafa viu que a sua chuteira estava furada e rasgada. Ele ficou preocupado porque achava que não ia poder jogar daquele jeito. Seu amigo Nando ofereceu um par de chuteiras reserva que tinha na mochila. Rafa calçou as chuteiras emprestadas, entrou em campo e fez o gol da vitória.',
    ideiaCentralTexto: 'Um amigo que ajuda na hora certa faz toda a diferença.',
    elementos: {
      personagens: { termos: ['Rafa', 'Nando', 'amigo', 'amig*'] },
      problema: { termos: ['chuteira', 'furada', 'rasgada', 'preocupado'] },
      tentativa: { termos: ['ofereceu', 'emprest*', 'reserva', 'ajud*'] },
      desfecho: { termos: ['gol', 'vitoria', 'entrou', 'jogar'] },
      ideiaCentral: { termos: ['ajud*', 'amizade', 'amig*', 'generos*'] }
    }
  },
  {
    id: 'rec008',
    dificuldade: 'facil',
    titulo: 'O pênalti decisivo',
    narracao: 'O jogo estava empatado e a árbitra marcou um pênalti para o time da Lia. Todo mundo ficou nervoso porque aquele chute podia decidir a partida. A Lia respirou fundo, lembrou do que treinou e mirou bem no canto. Ela chutou com calma, fez o gol e o time dela ganhou o campeonato.',
    ideiaCentralTexto: 'Respirar fundo e manter a calma ajuda nas horas difíceis.',
    elementos: {
      personagens: { termos: ['Lia', 'arbitra', 'time', 'goleir*'] },
      problema: { termos: ['empatado', 'penalti', 'nervoso', 'decidir'] },
      tentativa: { termos: ['respirou', 'calma', 'mirou', 'lembrou'] },
      desfecho: { termos: ['gol', 'ganhou', 'campeonato', 'venc*'] },
      ideiaCentral: { termos: ['calma', 'respir*', 'concentr*', 'tranquil*'] }
    }
  },
  {
    id: 'rec009',
    dificuldade: 'facil',
    titulo: 'O mascote do time',
    narracao: 'O time tinha um cachorro mascote chamado Pipoca que assistia a todos os treinos. Um dia o Pipoca fugiu para dentro do campo e parou bem no meio do jogo. As crianças pararam, chamaram o cachorro com carinho e o tiraram do gramado. Depois disso o jogo voltou e o Pipoca virou o xodó do time.',
    ideiaCentralTexto: 'Tratar os animais com carinho deixa todo mundo mais feliz.',
    elementos: {
      personagens: { termos: ['Pipoca', 'cachorro', 'mascote', 'criancas'] },
      problema: { termos: ['fugiu', 'campo', 'parou', 'meio do jogo'] },
      tentativa: { termos: ['chamaram', 'carinho', 'tiraram', 'cham*'] },
      desfecho: { termos: ['voltou', 'xodo', 'feliz', 'time'] },
      ideiaCentral: { termos: ['carinho', 'cuid*', 'anima*', 'cuidar'] }
    }
  },
  {
    id: 'rec010',
    dificuldade: 'facil',
    titulo: 'O passe para o amigo',
    narracao: 'O Davi estava sozinho na frente do gol e podia chutar para fazer o ponto. Mas ele viu que o seu amigo Igor estava em uma posição muito melhor. Em vez de chutar, o Davi tocou a bola de passe para o Igor com cuidado. O Igor fez o gol e os dois comemoraram juntos a jogada de equipe.',
    ideiaCentralTexto: 'Jogar pensando no time vale mais do que brilhar sozinho.',
    elementos: {
      personagens: { termos: ['Davi', 'Igor', 'amigo', 'amig*'] },
      problema: { termos: ['sozinho', 'chutar', 'gol', 'decis*'] },
      tentativa: { termos: ['passe', 'tocou', 'pass*', 'bola'] },
      desfecho: { termos: ['gol', 'comemoraram', 'comemor*', 'equipe'] },
      ideiaCentral: { termos: ['equipe', 'junt*', 'time', 'partilh*'] }
    }
  },
  {
    id: 'rec011',
    dificuldade: 'facil',
    titulo: 'A goleira pequena',
    narracao: 'A Bianca queria ser goleira, mas era a menor de todas e tinha medo de não alcançar a bola. Algumas crianças disseram que ela não daria conta de pegar os chutes altos. O treinador acreditou nela e treinou saltos e reflexos todos os dias. No jogo, a Bianca fez defesas incríveis e provou que tamanho não importa.',
    ideiaCentralTexto: 'O tamanho não decide o valor de alguém; o esforço sim.',
    elementos: {
      personagens: { termos: ['Bianca', 'goleir*', 'treinador', 'criancas'] },
      problema: { termos: ['menor', 'medo', 'alcancar', 'chutes altos'] },
      tentativa: { termos: ['acreditou', 'trein*', 'saltos', 'reflexos'] },
      desfecho: { termos: ['defesas', 'provou', 'defend*', 'incriveis'] },
      ideiaCentral: { termos: ['esforc*', 'tamanho', 'acredit*', 'super*'] }
    }
  },
  {
    id: 'rec012',
    dificuldade: 'facil',
    titulo: 'O fair play do Léo',
    narracao: 'Durante a partida, o Léo viu que um jogador do outro time caiu e se machucou no chão. A bola estava sobrando para ele fazer um gol fácil naquele momento. Mesmo assim, o Léo jogou a bola para fora para o menino ser atendido. O juiz e a torcida bateram palmas para o gesto bonito do Léo.',
    ideiaCentralTexto: 'Respeitar o adversário é mais importante do que ganhar.',
    elementos: {
      personagens: { termos: ['Leo', 'jogador', 'juiz', 'menino'] },
      problema: { termos: ['caiu', 'machucou', 'chao', 'machuc*'] },
      tentativa: { termos: ['fora', 'jogou', 'parou', 'atendid*'] },
      desfecho: { termos: ['palmas', 'torcida', 'gesto', 'bater*'] },
      ideiaCentral: { termos: ['respeit*', 'fair play', 'adversario', 'cuid*'] }
    }
  },
  {
    id: 'rec013',
    dificuldade: 'facil',
    titulo: 'O time da escola',
    narracao: 'A turma do quarto ano queria montar um time para o festival de futebol da escola. O problema é que faltavam jogadores e ninguém queria ser o goleiro. A professora Ana sugeriu que cada um jogasse um pouco em cada posição. Assim todos participaram, o time ficou completo e ganhou a medalha de participação.',
    ideiaCentralTexto: 'Quando todos ajudam, dá para resolver qualquer falta.',
    elementos: {
      personagens: { termos: ['Ana', 'professora', 'turma', 'time'] },
      problema: { termos: ['faltavam', 'goleiro', 'jogadores', 'falt*'] },
      tentativa: { termos: ['sugeriu', 'posic*', 'rodi*', 'particip*'] },
      desfecho: { termos: ['completo', 'medalha', 'ganhou', 'particip*'] },
      ideiaCentral: { termos: ['ajud*', 'junt*', 'equipe', 'colabor*'] }
    }
  },
  {
    id: 'rec014',
    dificuldade: 'facil',
    titulo: 'O sol muito quente',
    narracao: 'No torneio de verão, fazia um calor enorme e as crianças estavam ficando cansadas. O Murilo sentiu muita sede e quase desistiu de jogar no segundo tempo. O treinador parou tudo e mandou todos beberem água e descansarem na sombra. Depois da pausa, o time voltou com energia e conseguiu empatar a partida.',
    ideiaCentralTexto: 'Cuidar do corpo e descansar na hora certa é importante.',
    elementos: {
      personagens: { termos: ['Murilo', 'treinador', 'criancas', 'time'] },
      problema: { termos: ['calor', 'cansadas', 'sede', 'cansad*'] },
      tentativa: { termos: ['agua', 'descans*', 'pausa', 'sombra'] },
      desfecho: { termos: ['energia', 'empatar', 'voltou', 'empat*'] },
      ideiaCentral: { termos: ['cuid*', 'descans*', 'agua', 'saude'] }
    }
  },
  {
    id: 'rec015',
    dificuldade: 'facil',
    titulo: 'O irmão na arquibancada',
    narracao: 'O João ia jogar a final, mas estava triste porque achava que ninguém da família viria. Ele olhava para a arquibancada vazia e ficava cada vez mais desanimado. De repente, o seu irmão mais velho chegou correndo com a mãe para torcer. Animado por eles, o João jogou muito bem e o time levantou o troféu.',
    ideiaCentralTexto: 'O apoio da família dá força para a gente dar o melhor.',
    elementos: {
      personagens: { termos: ['Joao', 'irmao', 'mae', 'familia'] },
      problema: { termos: ['triste', 'arquibancada', 'desanimado', 'ninguem'] },
      tentativa: { termos: ['chegou', 'torcer', 'correndo', 'torc*'] },
      desfecho: { termos: ['jogou', 'trofeu', 'levantou', 'venc*'] },
      ideiaCentral: { termos: ['apoio', 'familia', 'torc*', 'forca'] }
    }
  },
  {
    id: 'rec016',
    dificuldade: 'facil',
    titulo: 'A regra do jogo',
    narracao: 'A Sara era nova no futebol e não sabia muito bem as regras da partida. Ela pegou a bola com a mão sem querer e o juiz marcou falta contra o time. Em vez de brigar, a Sara pediu para o capitão explicar a regra direitinho. Ela aprendeu rápido, não errou mais e ajudou o time a ganhar o jogo.',
    ideiaCentralTexto: 'Não ter vergonha de perguntar ajuda a gente a aprender.',
    elementos: {
      personagens: { termos: ['Sara', 'juiz', 'capitao', 'time'] },
      problema: { termos: ['regras', 'mao', 'falta', 'errou'] },
      tentativa: { termos: ['perguntar', 'explicar', 'pergunt*', 'aprend*'] },
      desfecho: { termos: ['aprendeu', 'ganhar', 'ajudou', 'aprend*'] },
      ideiaCentral: { termos: ['pergunt*', 'aprend*', 'duvida', 'humild*'] }
    }
  },
  {
    id: 'rec017',
    dificuldade: 'facil',
    titulo: 'O empate justo',
    narracao: 'Dois times de amigos jogavam no parque e a partida estava muito disputada. Faltando pouco tempo, o placar empatado deixou todo mundo nervoso e cansado. Em vez de discutir, eles combinaram de terminar o jogo no empate e voltar no outro dia. Todos apertaram as mãos, ficaram amigos e marcaram a revanche para o sábado.',
    ideiaCentralTexto: 'Às vezes um acordo justo vale mais do que ganhar de qualquer jeito.',
    elementos: {
      personagens: { termos: ['amigos', 'times', 'criancas', 'time'] },
      problema: { termos: ['empatado', 'nervoso', 'disputada', 'cansado'] },
      tentativa: { termos: ['combinaram', 'acordo', 'combin*', 'terminar'] },
      desfecho: { termos: ['maos', 'amigos', 'revanche', 'apert*'] },
      ideiaCentral: { termos: ['acordo', 'respeit*', 'amizade', 'justo'] }
    }
  },
  {
    id: 'rec018',
    dificuldade: 'facil',
    titulo: 'A perna machucada',
    narracao: 'O Vitor era o melhor atacante, mas torceu o pé e não pôde jogar a semifinal. O time ficou preocupado, achando que sem ele não conseguiria vencer o jogo. Então os outros jogadores se uniram e treinaram bastante para cobrir a falta dele. O time jogou unido, fez dois gols e ganhou a vaga para a grande final.',
    ideiaCentralTexto: 'Um time forte não depende de uma só pessoa.',
    elementos: {
      personagens: { termos: ['Vitor', 'atacante', 'time', 'jogadores'] },
      problema: { termos: ['torceu', 'machuc*', 'preocupado', 'falt*'] },
      tentativa: { termos: ['uniram', 'trein*', 'uni*', 'cobrir'] },
      desfecho: { termos: ['gols', 'ganhou', 'final', 'venc*'] },
      ideiaCentral: { termos: ['equipe', 'uni*', 'junt*', 'time'] }
    }
  },
  {
    id: 'rec019',
    dificuldade: 'facil',
    titulo: 'O treino na garagem',
    narracao: 'O Enzo queria muito treinar, mas estava chovendo e não dava para ir ao campo. Ele ficou chateado porque tinha um jogo importante no fim de semana. Então o seu pai ajudou a montar um treino de embaixadinhas dentro da garagem. Enzo praticou bastante, melhorou o controle de bola e foi muito bem no jogo.',
    ideiaCentralTexto: 'Sempre dá um jeito de treinar, basta ter vontade.',
    elementos: {
      personagens: { termos: ['Enzo', 'pai', 'menino', 'familia'] },
      problema: { termos: ['chovendo', 'chateado', 'chuva', 'campo'] },
      tentativa: { termos: ['ajudou', 'embaixadinhas', 'trein*', 'pratic*'] },
      desfecho: { termos: ['melhorou', 'controle', 'jogo', 'melhor*'] },
      ideiaCentral: { termos: ['trein*', 'vontade', 'esforc*', 'jeito'] }
    }
  },
  {
    id: 'rec020',
    dificuldade: 'facil',
    titulo: 'A torcida amiga',
    narracao: 'O time da Pietra estava perdendo e os jogadores começaram a ficar cabisbaixos. A arquibancada inteira viu a tristeza e resolveu cantar bem alto para animar. As crianças ouviram a torcida, levantaram a cabeça e correram com mais vontade. No último minuto, a Pietra fez o gol de empate e a festa foi enorme.',
    ideiaCentralTexto: 'Uma palavra de incentivo pode mudar o ânimo de alguém.',
    elementos: {
      personagens: { termos: ['Pietra', 'torcida', 'criancas', 'time'] },
      problema: { termos: ['perdendo', 'cabisbaixos', 'tristeza', 'perd*'] },
      tentativa: { termos: ['cantar', 'animar', 'anim*', 'incentiv*'] },
      desfecho: { termos: ['gol', 'empate', 'festa', 'empat*'] },
      ideiaCentral: { termos: ['incentiv*', 'anim*', 'apoio', 'torc*'] }
    }
  },
  {
    id: 'rec021',
    dificuldade: 'facil',
    titulo: 'O chute torto',
    narracao: 'O Gabriel sempre chutava a bola torta e mandava para muito longe do gol. Os colegas riam um pouco e ele ficava com vergonha de tentar de novo. O treinador mostrou com calma como posicionar o pé na hora do chute. Gabriel treinou a mira várias vezes e marcou um lindo gol no jogo seguinte.',
    ideiaCentralTexto: 'Com paciência para corrigir os erros, a gente melhora.',
    elementos: {
      personagens: { termos: ['Gabriel', 'treinador', 'colegas', 'menino'] },
      problema: { termos: ['torta', 'vergonha', 'longe', 'errava'] },
      tentativa: { termos: ['mostrou', 'calma', 'trein*', 'mira'] },
      desfecho: { termos: ['marcou', 'gol', 'melhor*', 'acert*'] },
      ideiaCentral: { termos: ['pacien*', 'trein*', 'corrig*', 'melhor*'] }
    }
  },
  {
    id: 'rec022',
    dificuldade: 'facil',
    titulo: 'A camisa trocada',
    narracao: 'No dia do jogo, os dois times chegaram com camisas da mesma cor azul. Ficou difícil saber quem era de cada lado e a partida não podia começar. O treinador teve a ideia de pegar uns coletes amarelos no armário da escola. Um time vestiu os coletes, todos se reconheceram e o jogo aconteceu numa boa.',
    ideiaCentralTexto: 'Uma ideia simples pode resolver um problema de repente.',
    elementos: {
      personagens: { termos: ['treinador', 'times', 'jogadores', 'time'] },
      problema: { termos: ['mesma cor', 'azul', 'dificil', 'camisas'] },
      tentativa: { termos: ['ideia', 'coletes', 'amarelos', 'pegar'] },
      desfecho: { termos: ['vestiu', 'reconheceram', 'jogo', 'aconteceu'] },
      ideiaCentral: { termos: ['ideia', 'solu*', 'criativ*', 'jeito'] }
    }
  },
  {
    id: 'rec023',
    dificuldade: 'facil',
    titulo: 'O gol de cabeça',
    narracao: 'A Alice nunca tinha feito um gol de cabeça e achava aquilo muito difícil. Toda vez que a bola vinha pelo alto, ela desviava com medo de se machucar. A treinadora Carla explicou como acertar a bola com a testa sem dor. Alice tentou no treino, perdeu o medo e fez um gol de cabeça na partida.',
    ideiaCentralTexto: 'Enfrentar o medo com a técnica certa traz bons resultados.',
    elementos: {
      personagens: { termos: ['Alice', 'Carla', 'treinadora', 'menina'] },
      problema: { termos: ['cabeca', 'medo', 'dificil', 'desviava'] },
      tentativa: { termos: ['explicou', 'testa', 'trein*', 'tentou'] },
      desfecho: { termos: ['gol', 'perdeu o medo', 'marcou', 'super*'] },
      ideiaCentral: { termos: ['medo', 'tecnic*', 'enfrent*', 'super*'] }
    }
  },
  {
    id: 'rec024',
    dificuldade: 'facil',
    titulo: 'O atraso do ônibus',
    narracao: 'O time ia viajar para um campeonato, mas o ônibus quebrou e atrasou demais. As crianças ficaram aflitas, com medo de chegar tarde e perder o jogo. Os pais se juntaram e levaram todo mundo de carro até o estádio a tempo. O time chegou correndo, entrou em campo no último minuto e ganhou a partida.',
    ideiaCentralTexto: 'Quando as pessoas se unem, dá para superar qualquer atraso.',
    elementos: {
      personagens: { termos: ['time', 'criancas', 'pais', 'familia'] },
      problema: { termos: ['onibus', 'quebrou', 'atrasou', 'aflitas'] },
      tentativa: { termos: ['juntaram', 'carro', 'levaram', 'junt*'] },
      desfecho: { termos: ['chegou', 'ganhou', 'campo', 'venc*'] },
      ideiaCentral: { termos: ['uni*', 'junt*', 'ajud*', 'equipe'] }
    }
  },
  {
    id: 'rec025',
    dificuldade: 'facil',
    titulo: 'A vez da reserva',
    narracao: 'A Duda quase nunca jogava e ficava sempre no banco como reserva do time. Ela treinava muito, mas achava que nunca teria a sua chance de jogar. Um dia uma colega se cansou e o treinador chamou a Duda para entrar. Ela aproveitou a oportunidade, fez um gol importante e virou titular do time.',
    ideiaCentralTexto: 'Continuar se esforçando garante estar pronto quando a chance chega.',
    elementos: {
      personagens: { termos: ['Duda', 'treinador', 'reserva', 'time'] },
      problema: { termos: ['banco', 'reserva', 'nunca jogava', 'chance'] },
      tentativa: { termos: ['treinava', 'entrar', 'trein*', 'chamou'] },
      desfecho: { termos: ['gol', 'titular', 'aproveitou', 'marc*'] },
      ideiaCentral: { termos: ['esforc*', 'chance', 'pronto', 'persist*'] }
    }
  },
  {
    id: 'rec026',
    dificuldade: 'facil',
    titulo: 'O cadarço solto',
    narracao: 'No meio da corrida, o cadarço da chuteira do Bento se soltou e ele tropeçou. Ele caiu bem na hora em que ia chutar a bola para o gol adversário. Sem reclamar, o Bento amarrou o cadarço firme e voltou para a jogada. Logo depois ele recebeu um passe, chutou com força e fez o gol da vitória.',
    ideiaCentralTexto: 'Levantar depois de cair e continuar é o que importa.',
    elementos: {
      personagens: { termos: ['Bento', 'menino', 'time', 'jogador'] },
      problema: { termos: ['cadarco', 'soltou', 'tropecou', 'caiu'] },
      tentativa: { termos: ['amarrou', 'voltou', 'amarr*', 'levantou'] },
      desfecho: { termos: ['gol', 'vitoria', 'chutou', 'marc*'] },
      ideiaCentral: { termos: ['levant*', 'continu*', 'nao desist*', 'super*'] }
    }
  },
  {
    id: 'rec027',
    dificuldade: 'facil',
    titulo: 'A bola na poça',
    narracao: 'Depois da chuva, uma poça de água enorme se formou bem no meio do campo. A bola parava na poça toda hora e ficava difícil tocar para os amigos. O Téo pegou um balde e, com a ajuda da turma, tirou a água da poça. Com o campo seco, o jogo fluiu melhor e o time do Téo venceu animado.',
    ideiaCentralTexto: 'Resolver o problema junto deixa o jogo melhor para todos.',
    elementos: {
      personagens: { termos: ['Teo', 'turma', 'amigos', 'time'] },
      problema: { termos: ['poca', 'agua', 'campo', 'dificil'] },
      tentativa: { termos: ['balde', 'tirou', 'ajud*', 'turma'] },
      desfecho: { termos: ['seco', 'venceu', 'venc*', 'melhor'] },
      ideiaCentral: { termos: ['junt*', 'ajud*', 'equipe', 'resolv*'] }
    }
  },
  {
    id: 'rec028',
    dificuldade: 'facil',
    titulo: 'O grito do treinador',
    narracao: 'O time da Nina estava nervoso porque o jogo decisivo ia começar logo. Os jogadores tremiam de tanto medo de errar na frente da torcida grande. O treinador reuniu todos e disse, com carinho, que era só para se divertirem. Mais leves e sorrindo, eles jogaram solto, marcaram três gols e ganharam fácil.',
    ideiaCentralTexto: 'Jogar por diversão tira a pressão e ajuda a render melhor.',
    elementos: {
      personagens: { termos: ['Nina', 'treinador', 'time', 'jogadores'] },
      problema: { termos: ['nervoso', 'medo', 'tremiam', 'errar'] },
      tentativa: { termos: ['reuniu', 'carinho', 'divert*', 'reun*'] },
      desfecho: { termos: ['gols', 'ganharam', 'jogaram', 'venc*'] },
      ideiaCentral: { termos: ['divert*', 'pressao', 'leves', 'tranquil*'] }
    }
  },
  {
    id: 'rec029',
    dificuldade: 'facil',
    titulo: 'O empréstimo de jogador',
    narracao: 'O time vermelho chegou para o jogo com um jogador a menos do que precisava. Sem o número certo de crianças, a partida quase não pôde acontecer. O capitão do time azul ofereceu um dos seus amigos para completar o adversário. Com os dois times completos, todos jogaram felizes e o jogo terminou empatado.',
    ideiaCentralTexto: 'Ajudar até o adversário mostra um grande espírito esportivo.',
    elementos: {
      personagens: { termos: ['capitao', 'times', 'jogador', 'amigos'] },
      problema: { termos: ['a menos', 'faltava', 'completa*', 'falt*'] },
      tentativa: { termos: ['ofereceu', 'emprest*', 'completar', 'amigo'] },
      desfecho: { termos: ['completos', 'jogaram', 'empatado', 'felizes'] },
      ideiaCentral: { termos: ['ajud*', 'respeit*', 'espirito esportivo', 'fair play'] }
    }
  },
  {
    id: 'rec030',
    dificuldade: 'facil',
    titulo: 'A festa do gol',
    narracao: 'O time tinha um costume de comemorar todos os gols com uma dança bem engraçada. Mas um dia eles esqueceram a dança e ficaram tristes depois de marcar. A Yasmin propôs que todos inventassem uma comemoração nova bem ali na hora. Eles criaram uma dança nova, riram muito e o time ganhou o jogo bem animado.',
    ideiaCentralTexto: 'A criatividade transforma um problema em um momento divertido.',
    elementos: {
      personagens: { termos: ['Yasmin', 'time', 'criancas', 'jogadores'] },
      problema: { termos: ['esqueceram', 'danca', 'tristes', 'esquec*'] },
      tentativa: { termos: ['propos', 'inventassem', 'invent*', 'nova'] },
      desfecho: { termos: ['criaram', 'riram', 'ganhou', 'animado'] },
      ideiaCentral: { termos: ['criativ*', 'invent*', 'divert*', 'jeito'] }
    }
  }
];
