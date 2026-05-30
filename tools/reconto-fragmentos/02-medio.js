/*
 * tools/reconto-fragmentos/02-medio.js — Fragmento de histórias de RECONTO (médio).
 *
 * 35 histórias de futebol, dificuldade 'medio' (ids rec031..rec065), calibradas
 * para ~10-11 anos: NITIDAMENTE mais difíceis que o nível básico. Cada enredo tem
 * DOIS fios narrativos (um problema principal + uma complicação secundária), mais
 * personagens nomeados, vocabulário mais rico e 6-8 frases — a criança precisa
 * organizar mais informação ao recontar.
 *
 * Cada história traz a narração e um "gabarito" (elementos) com os termos que
 * caracterizam os 5 elementos do reconto. A avaliação (js/games/reconto-avaliacao.js)
 * considera um elemento presente quando a transcrição contém >= "minimo" (padrão 1)
 * termos distintos. Termos aceitam coringa de radical: "venc*" casa venceu/venceram.
 *
 * NÃO edite à mão fora deste fragmento; o banco final é montado por
 * tools/montar-reconto.js. Valide com:
 *   node tools/checar-fragmento.js tools/reconto-fragmentos/02-medio.js
 */
'use strict';

module.exports = [
  {
    id: 'rec031',
    dificuldade: 'medio',
    titulo: 'A capitã e o gramado encharcado',
    narracao: 'A capitã Helena liderava o time Tempestade na final, mas a chuva forte deixou o gramado encharcado e a bola não rolava direito. Para piorar, a goleira Rita torceu o tornozelo e precisou sair machucada. Helena reuniu as colegas e mudou a estratégia: passes curtos no chão e a lateral Duda foi improvisada no gol. Todas se esforçaram e marcaram a marcação com paciência. No fim, o Tempestade venceu por 1 a 0 com um gol de cabeça. Helena mostrou que uma boa liderança adapta o plano quando tudo dá errado.',
    ideiaCentralTexto: 'Uma boa líder adapta o plano e mantém a equipe unida diante dos imprevistos.',
    elementos: {
      personagens: { termos: ['Helena', 'capit*', 'Rita', 'goleir*', 'Duda', 'time'] },
      problema: { termos: ['chuva', 'encharcado', 'gramado', 'tornozelo', 'machucada', 'machuc*'] },
      tentativa: { termos: ['reuniu', 'reun*', 'estrategia', 'passes', 'esforc*', 'improvis*'] },
      desfecho: { termos: ['venceu', 'venc*', 'gol', '1 a 0', 'cabeca'] },
      ideiaCentral: { termos: ['lideranca', 'lider*', 'adapt*', 'unid*', 'equipe', 'junt*'] }
    }
  },
  {
    id: 'rec032',
    dificuldade: 'medio',
    titulo: 'O atacante que aprendeu a passar',
    narracao: 'Bruno era o atacante mais veloz do time Foguete, mas só pensava em fazer gol sozinho e nunca passava a bola. Por causa disso, os colegas ficavam parados e o time perdia muitas chances. Um dia o treinador Sérgio mostrou um vídeo e pediu que Bruno tentasse dar assistências aos amigos. No jogo seguinte, Bruno passou para a Lara, que marcou, e depois para o Téo, que ampliou o placar. O Foguete venceu por 3 a 1 e todos comemoraram juntos. Bruno entendeu que dividir a bola faz o time inteiro brilhar.',
    ideiaCentralTexto: 'Dividir a bola e jogar em equipe rende mais do que tentar tudo sozinho.',
    elementos: {
      personagens: { termos: ['Bruno', 'atacante', 'Sergio', 'treinador', 'Lara', 'Teo'] },
      problema: { termos: ['sozinho', 'nunca passava', 'parados', 'perdia', 'perd*', 'chances'] },
      tentativa: { termos: ['treinador', 'video', 'assistencias', 'passou', 'pass*', 'tent*'] },
      desfecho: { termos: ['venceu', 'venc*', '3 a 1', 'marcou', 'comemoraram', 'comemor*'] },
      ideiaCentral: { termos: ['dividir', 'equipe', 'junt*', 'compartilh*', 'time', 'ajud*'] }
    }
  },
  {
    id: 'rec033',
    dificuldade: 'medio',
    titulo: 'A jogadora cadeirante no campeonato',
    narracao: 'Mariana adorava futebol, mas usava cadeira de rodas e achava que nunca poderia entrar em campo com a turma. A professora Cláudia descobriu o futebol adaptado e organizou um treino para todos jogarem juntos. No começo alguns colegas tinham vergonha e não sabiam como ajudar, o que deixou Mariana triste. Então o capitão Igor convidou a turma a treinar as regras novas e a torcer pela amiga. No campeonato da escola, Mariana fez um gol de pênalti e a arquibancada inteira gritou. Ela provou que incluir quem é diferente deixa o esporte muito melhor.',
    ideiaCentralTexto: 'Incluir quem é diferente torna o esporte mais justo e mais bonito para todos.',
    elementos: {
      personagens: { termos: ['Mariana', 'Claudia', 'professora', 'Igor', 'capit*'] },
      problema: { termos: ['cadeira', 'vergonha', 'triste', 'nunca poderia', 'sozinha', 'diferente'] },
      tentativa: { termos: ['adaptado', 'organizou', 'organiz*', 'treino', 'trein*', 'convidou', 'regras'] },
      desfecho: { termos: ['gol', 'penalti', 'gritou', 'campeonato', 'comemor*', 'venc*'] },
      ideiaCentral: { termos: ['incluir', 'inclu*', 'diferente', 'junt*', 'respeit*', 'todos'] }
    }
  },
  {
    id: 'rec034',
    dificuldade: 'medio',
    titulo: 'O pênalti da honestidade',
    narracao: 'No último minuto da final, o zagueiro Rafael caiu na área e o juiz marcou pênalti a favor do time dele, o Leões. Só que Rafael sabia que tinha se jogado de propósito e ninguém o havia derrubado. Ele ficou dividido: cobrar o pênalti garantiria o título, mas seria uma trapaça. Rafael chamou o árbitro e contou a verdade, mesmo com os colegas reclamando. O juiz voltou atrás e o jogo terminou empatado, indo para os pênaltis de verdade, que os Leões venceram. No fim, todos ficaram orgulhosos porque Rafael escolheu o fair play.',
    ideiaCentralTexto: 'Ser honesto vale mais do que ganhar com trapaça.',
    elementos: {
      personagens: { termos: ['Rafael', 'zagueiro', 'juiz', 'arbitro', 'Leoes', 'time'] },
      problema: { termos: ['penalti', 'jogado', 'proposito', 'trapaca', 'dividido', 'mentir*'] },
      tentativa: { termos: ['chamou', 'contou', 'verdade', 'honest*', 'arbitro', 'voltou atras'] },
      desfecho: { termos: ['empatado', 'penaltis', 'venceram', 'venc*', 'orgulhosos', 'titulo'] },
      ideiaCentral: { termos: ['honest*', 'fair play', 'verdade', 'trapaca', 'justo', 'etic*'] }
    }
  },
  {
    id: 'rec035',
    dificuldade: 'medio',
    titulo: 'A rivalidade que virou amizade',
    narracao: 'Os times do bairro, Estrela e Cometa, viviam brigando e nunca se cumprimentavam depois dos jogos. A goleira Paula, do Estrela, e o capitão Léo, do Cometa, eram os que mais provocavam um ao outro. Numa partida, um temporal alagou o campo e os dois times ficaram presos no mesmo vestiário esperando passar. Sem ter o que fazer, começaram a conversar e descobriram que gostavam das mesmas músicas e jogadas. Quando a chuva parou, decidiram fazer um amistoso só por diversão, sem placar. A partir daquele dia, a rivalidade virou respeito e Paula e Léo viraram grandes amigos.',
    ideiaCentralTexto: 'Conhecer melhor o outro transforma rivalidade em respeito e amizade.',
    elementos: {
      personagens: { termos: ['Paula', 'goleir*', 'Leo', 'capit*', 'Estrela', 'Cometa'] },
      problema: { termos: ['brigando', 'provocavam', 'rivalidade', 'temporal', 'alagou', 'presos'] },
      tentativa: { termos: ['conversar', 'convers*', 'descobriram', 'amistoso', 'diversao', 'vestiario'] },
      desfecho: { termos: ['respeito', 'amigos', 'amizade', 'amig*', 'parou', 'junt*'] },
      ideiaCentral: { termos: ['respeit*', 'amizade', 'amig*', 'rivalidade', 'conhec*', 'uni*'] }
    }
  },
  {
    id: 'rec036',
    dificuldade: 'medio',
    titulo: 'O treino na quadra emprestada',
    narracao: 'O time Andorinha não tinha campo próprio e treinava num terreno cheio de buracos e pedras. Por causa disso, vários jogadores se machucavam e a treinadora Vera ficava preocupada. A capitã Sofia teve a ideia de pedir a quadra da escola emprestada nos fins de semana. A turma juntou dinheiro de uma rifa para comprar bolas novas e cones. Com um lugar seguro para treinar, o time melhorou rápido e chegou à final da liga. O Andorinha levantou o troféu e aprendeu que com organização e união se conquista até o que parecia impossível.',
    ideiaCentralTexto: 'Com organização e união, um grupo conquista até o que parecia impossível.',
    elementos: {
      personagens: { termos: ['Vera', 'treinador*', 'Sofia', 'capit*', 'Andorinha', 'time'] },
      problema: { termos: ['buracos', 'pedras', 'machucavam', 'machuc*', 'preocupada', 'terreno'] },
      tentativa: { termos: ['ideia', 'emprestada', 'rifa', 'juntou', 'junt*', 'quadra', 'comprar'] },
      desfecho: { termos: ['final', 'trofeu', 'melhorou', 'venc*', 'conquist*', 'levantou'] },
      ideiaCentral: { termos: ['organiz*', 'uni*', 'junt*', 'equipe', 'esforc*', 'impossivel'] }
    }
  },
  {
    id: 'rec037',
    dificuldade: 'medio',
    titulo: 'A estratégia contra o time mais forte',
    narracao: 'O pequeno time Centelha precisava enfrentar o Trovão, que era muito mais alto e mais forte. O capitão Davi sabia que no jogo físico eles não teriam chance nenhuma. Então o treinador Otávio bolou um plano: jogar com a bola sempre no chão e correr nos espaços vazios. Durante a semana eles treinaram passes rápidos e a meia Nina decorou os movimentos. No jogo, o Centelha cansou o adversário com toques curtos e a Nina marcou o gol da vitória nos minutos finais. O time provou que inteligência e estratégia podem vencer a força bruta.',
    ideiaCentralTexto: 'Inteligência e estratégia podem superar a força bruta.',
    elementos: {
      personagens: { termos: ['Davi', 'capit*', 'Otavio', 'treinador', 'Nina', 'Centelha'] },
      problema: { termos: ['mais forte', 'mais alto', 'sem chance', 'fisico', 'Trovao', 'forca'] },
      tentativa: { termos: ['plano', 'estrategia', 'treinaram', 'trein*', 'passes', 'espacos', 'chao'] },
      desfecho: { termos: ['marcou', 'gol', 'vitoria', 'venc*', 'cansou', 'finais'] },
      ideiaCentral: { termos: ['inteligencia', 'estrategia', 'esperto', 'plano', 'pensar', 'forca'] }
    }
  },
  {
    id: 'rec038',
    dificuldade: 'medio',
    titulo: 'O goleiro que perdeu a confiança',
    narracao: 'Depois de falhar num gol bobo, o goleiro Tomás perdeu toda a confiança e começou a tremer só de ver a bola chegar. Os adversários perceberam e passaram a chutar de longe para testá-lo, o que deixou o time Raio nervoso. A treinadora Bia chamou Tomás para uma conversa e treinou com ele defesas fáceis para ele lembrar do que sabia fazer. Aos poucos, com apoio dos colegas, Tomás voltou a confiar em si mesmo. No jogo decisivo, ele defendeu um pênalti difícil e segurou o empate. Tomás descobriu que errar faz parte e que recomeçar com apoio devolve a coragem.',
    ideiaCentralTexto: 'Errar faz parte; com apoio e treino é possível recuperar a confiança.',
    elementos: {
      personagens: { termos: ['Tomas', 'goleir*', 'Bia', 'treinador*', 'Raio', 'time'] },
      problema: { termos: ['falhar', 'falh*', 'confianca', 'tremer', 'nervoso', 'errar'] },
      tentativa: { termos: ['conversa', 'convers*', 'treinou', 'trein*', 'apoio', 'defesas'] },
      desfecho: { termos: ['defendeu', 'defend*', 'penalti', 'empate', 'segurou', 'venc*'] },
      ideiaCentral: { termos: ['errar', 'confianca', 'apoio', 'coragem', 'recomec*', 'tent*'] }
    }
  },
  {
    id: 'rec039',
    dificuldade: 'medio',
    titulo: 'A bola furada antes da final',
    narracao: 'Na manhã da grande final, o time Vento descobriu que a única bola boa estava furada e nenhuma loja perto estava aberta. O capitão Murilo ficou desesperado, porque sem bola não haveria jogo. A meia Clara lembrou que o vovô dela consertava câmaras de bicicleta e talvez soubesse remendar a bola. Os dois pedalaram até a casa do vovô Antônio, que colou o furo com um remendo caprichado. Eles voltaram correndo e a bola aguentou a partida inteira, que o Vento venceu nos pênaltis. A turma aprendeu que pensar com calma e pedir ajuda resolve quase qualquer imprevisto.',
    ideiaCentralTexto: 'Diante de um imprevisto, pensar com calma e pedir ajuda quase sempre resolve.',
    elementos: {
      personagens: { termos: ['Murilo', 'capit*', 'Clara', 'Antonio', 'vovo', 'Vento'] },
      problema: { termos: ['furada', 'furo', 'sem bola', 'desesperado', 'fechada', 'imprevisto'] },
      tentativa: { termos: ['lembrou', 'remendar', 'remendo', 'consertava', 'colou', 'pedalaram', 'ajuda'] },
      desfecho: { termos: ['aguentou', 'venceu', 'venc*', 'penaltis', 'voltaram', 'jogo'] },
      ideiaCentral: { termos: ['calma', 'ajuda', 'ajud*', 'imprevisto', 'pensar', 'resolv*'] }
    }
  },
  {
    id: 'rec040',
    dificuldade: 'medio',
    titulo: 'A líder que aprendeu a ouvir',
    narracao: 'A capitã Júlia era muito boa de bola, mas gritava com as colegas e decidia tudo sozinha. Por isso, o time Aurora estava desunido e várias meninas pensavam em desistir. A treinadora Sandra conversou com Júlia e sugeriu que ela ouvisse as ideias das companheiras antes de cada jogo. Na reunião seguinte, Júlia perguntou a opinião da Bruna e da Lia e montou a tática junto com elas. O time se sentiu valorizado, jogou unido e venceu o clássico por 2 a 1. Júlia entendeu que uma boa líder também sabe ouvir e respeitar o grupo.',
    ideiaCentralTexto: 'Liderar bem é também ouvir e respeitar as ideias do grupo.',
    elementos: {
      personagens: { termos: ['Julia', 'capit*', 'Sandra', 'treinador*', 'Bruna', 'Lia'] },
      problema: { termos: ['gritava', 'sozinha', 'desunido', 'desistir', 'desist*', 'brigava'] },
      tentativa: { termos: ['conversou', 'convers*', 'ouvisse', 'ouvir', 'opiniao', 'ideias', 'perguntou'] },
      desfecho: { termos: ['unido', 'venceu', 'venc*', '2 a 1', 'classico', 'valorizado'] },
      ideiaCentral: { termos: ['ouvir', 'respeit*', 'lideranca', 'lider*', 'grupo', 'junt*'] }
    }
  },
  {
    id: 'rec041',
    dificuldade: 'medio',
    titulo: 'O menino que não enxergava bem',
    narracao: 'Caio amava futebol, mas enxergava pouco e sempre errava a direção do passe, o que fazia alguns colegas rirem dele. O treinador Paulo percebeu o problema e descobriu que Caio precisava de óculos esportivos. Enquanto o óculos não chegava, a turma teve a ideia de chamar o nome de quem estava livre para Caio passar pelo som. A capitã Manu organizou os gritos e todos treinaram a se comunicar em campo. Quando o óculos chegou, Caio já tinha melhorado muito e deu o passe para o gol do título. O time descobriu que ajudar um colega faz todo mundo jogar melhor.',
    ideiaCentralTexto: 'Quando o grupo se adapta para ajudar um colega, todos jogam melhor.',
    elementos: {
      personagens: { termos: ['Caio', 'Paulo', 'treinador', 'Manu', 'capit*', 'time'] },
      problema: { termos: ['enxergava', 'errava', 'rirem', 'pouco', 'oculos', 'direcao'] },
      tentativa: { termos: ['ideia', 'chamar', 'nome', 'som', 'comunicar', 'gritos', 'organizou'] },
      desfecho: { termos: ['melhorado', 'melhor*', 'passe', 'gol', 'titulo', 'venc*'] },
      ideiaCentral: { termos: ['ajudar', 'ajud*', 'adapt*', 'junt*', 'inclu*', 'colega'] }
    }
  },
  {
    id: 'rec042',
    dificuldade: 'medio',
    titulo: 'A treinadora e a regra justa',
    narracao: 'O time Falcão tinha muitos jogadores e a treinadora Renata percebeu que os mesmos titulares jogavam sempre, enquanto Léo e Duda ficavam só no banco. Isso deixava o grupo dividido e os reservas desanimados. Renata criou uma regra: todo mundo jogaria pelo menos um tempo em cada partida. No começo alguns titulares reclamaram, achando que iam perder mais. Mas com mais gente rodando, o time ficou descansado e Duda marcou um gol importante na semifinal. O Falcão chegou à final unido e entendeu que tratar todos com justiça fortalece a equipe.',
    ideiaCentralTexto: 'Tratar todos com justiça e dar oportunidade a cada um fortalece a equipe.',
    elementos: {
      personagens: { termos: ['Renata', 'treinador*', 'Leo', 'Duda', 'Falcao', 'time'] },
      problema: { termos: ['titulares', 'banco', 'dividido', 'desanimados', 'reservas', 'sempre'] },
      tentativa: { termos: ['regra', 'jogaria', 'rodando', 'oportunidade', 'tempo', 'criou'] },
      desfecho: { termos: ['marcou', 'gol', 'semifinal', 'final', 'unido', 'venc*'] },
      ideiaCentral: { termos: ['justica', 'justo', 'oportunidade', 'equipe', 'todos', 'junt*'] }
    }
  },
  {
    id: 'rec043',
    dificuldade: 'medio',
    titulo: 'O sol que cegava o goleiro',
    narracao: 'No segundo tempo da semifinal, o sol bateu de frente no gol e o goleiro Vitor não conseguia ver os chutes. O adversário aproveitou e quase virou o jogo com dois arremates perigosos. O capitão Enzo pediu tempo e, junto com o treinador, decidiu trocar o esquema e marcar o atacante bem longe da área. A zagueira Pietra passou a cortar os cruzamentos antes que chegassem ao gol ofuscado. Com a defesa reorganizada, o time Sol Nascente segurou o resultado e venceu por 2 a 1. Eles aprenderam que ler o problema e mudar o plano a tempo evita o desastre.',
    ideiaCentralTexto: 'Ler o problema a tempo e mudar o plano evita que tudo dê errado.',
    elementos: {
      personagens: { termos: ['Vitor', 'goleir*', 'Enzo', 'capit*', 'Pietra', 'zagueir*'] },
      problema: { termos: ['sol', 'ofuscado', 'nao conseguia ver', 'cegava', 'perigosos', 'virou'] },
      tentativa: { termos: ['tempo', 'trocar', 'esquema', 'marcar', 'cortar', 'reorganiz*'] },
      desfecho: { termos: ['segurou', 'venceu', 'venc*', '2 a 1', 'resultado', 'defesa'] },
      ideiaCentral: { termos: ['adapt*', 'plano', 'estrategia', 'mudar', 'pensar', 'junt*'] }
    }
  },
  {
    id: 'rec044',
    dificuldade: 'medio',
    titulo: 'A irmã caçula no time dos grandes',
    narracao: 'Bia era a mais nova do time e os jogadores maiores achavam que ela era fraca demais para jogar na final. Seu irmão Gabriel, o capitão, ficava dividido entre proteger a irmã e escalar quem o grupo queria. A treinadora Marta resolveu fazer um teste justo e cronometrou a velocidade de todos. Para surpresa de muitos, Bia foi a mais rápida e ainda driblava muito bem. Gabriel a escalou e, no jogo, Bia deu três assistências que levaram o time Relâmpago ao título. Todos aprenderam que não se deve julgar alguém pelo tamanho ou pela idade.',
    ideiaCentralTexto: 'Não se julga alguém pelo tamanho ou pela idade; cada um tem seu valor.',
    elementos: {
      personagens: { termos: ['Bia', 'Gabriel', 'capit*', 'Marta', 'treinador*', 'irma'] },
      problema: { termos: ['mais nova', 'fraca', 'julgavam', 'dividido', 'tamanho', 'idade'] },
      tentativa: { termos: ['teste', 'cronometrou', 'velocidade', 'justo', 'driblava', 'escalou'] },
      desfecho: { termos: ['rapida', 'assistencias', 'titulo', 'venc*', 'levaram', 'gol'] },
      ideiaCentral: { termos: ['julgar', 'valor', 'idade', 'tamanho', 'respeit*', 'capaz'] }
    }
  },
  {
    id: 'rec045',
    dificuldade: 'medio',
    titulo: 'O torcedor que invadiu o campo',
    narracao: 'Durante a decisão, um torcedor nervoso invadiu o campo para reclamar do juiz e a partida foi interrompida. O capitão Heitor, do time Aurora, e a capitã Lis, do time rival, temeram que o jogo fosse cancelado e ninguém levasse o troféu. Em vez de brigar, os dois capitães foram juntos conversar com o torcedor e pediram calma com educação. A segurança acompanhou o homem para fora e o juiz pôde recomeçar a partida. No fim, o Aurora venceu nos pênaltis, mas os dois times se cumprimentaram pelo bom exemplo. Eles mostraram que resolver conflitos com diálogo é melhor do que com briga.',
    ideiaCentralTexto: 'Conflitos se resolvem melhor com diálogo e calma do que com briga.',
    elementos: {
      personagens: { termos: ['Heitor', 'capit*', 'Lis', 'juiz', 'torcedor', 'Aurora'] },
      problema: { termos: ['invadiu', 'interrompida', 'nervoso', 'cancelado', 'reclamar', 'conflito'] },
      tentativa: { termos: ['conversar', 'convers*', 'calma', 'educacao', 'pediram', 'dialogo', 'junt*'] },
      desfecho: { termos: ['recomecar', 'venceu', 'venc*', 'penaltis', 'cumprimentaram', 'trofeu'] },
      ideiaCentral: { termos: ['dialogo', 'calma', 'conflito', 'paz', 'respeit*', 'convers*'] }
    }
  },
  {
    id: 'rec046',
    dificuldade: 'medio',
    titulo: 'A goleira surda e os sinais',
    narracao: 'Laís era uma ótima goleira, mas era surda e não escutava os gritos da defesa durante o jogo. Por isso, às vezes ela saía do gol na hora errada e o time Cometa levava gols fáceis. O capitão Nando teve a ideia de criar sinais com as mãos para avisar a Laís sobre cada jogada. A turma treinou os gestos a semana inteira e a meia Sofia ajudou a Laís a decorar tudo. No campeonato, os sinais funcionaram, Laís defendeu um pênalti decisivo e o Cometa foi campeão. O time aprendeu que existem muitos jeitos de se comunicar e incluir um amigo.',
    ideiaCentralTexto: 'Existem muitos jeitos de se comunicar e incluir um amigo na equipe.',
    elementos: {
      personagens: { termos: ['Lais', 'goleir*', 'Nando', 'capit*', 'Sofia', 'Cometa'] },
      problema: { termos: ['surda', 'nao escutava', 'gritos', 'hora errada', 'fáceis', 'gols'] },
      tentativa: { termos: ['sinais', 'maos', 'gestos', 'treinou', 'trein*', 'decorar', 'avisar'] },
      desfecho: { termos: ['defendeu', 'defend*', 'penalti', 'campeao', 'venc*', 'funcionaram'] },
      ideiaCentral: { termos: ['comunicar', 'incluir', 'inclu*', 'junt*', 'jeitos', 'ajud*'] }
    }
  },
  {
    id: 'rec047',
    dificuldade: 'medio',
    titulo: 'O capitão lesionado e o substituto tímido',
    narracao: 'A uma semana da final, o capitão Diego machucou o joelho e não poderia jogar de jeito nenhum. O time Trovão ficou abalado, pois ele era o melhor jogador e o líder de todos. Diego decidiu treinar o tímido Vini para assumir a faixa de capitão e passou todas as suas dicas. Vini tinha medo de falhar e quase desistiu, mas Diego ficou na beira do campo o incentivando. No jogo, Vini liderou os colegas, marcou de cabeça e o Trovão venceu por 1 a 0. A equipe entendeu que um bom líder prepara outros para brilharem também.',
    ideiaCentralTexto: 'Um bom líder prepara e incentiva os outros para que também possam brilhar.',
    elementos: {
      personagens: { termos: ['Diego', 'capit*', 'Vini', 'time', 'Trovao', 'lider*'] },
      problema: { termos: ['machucou', 'machuc*', 'joelho', 'abalado', 'medo', 'desistiu'] },
      tentativa: { termos: ['treinar', 'trein*', 'dicas', 'incentivando', 'incentiv*', 'preparou', 'apoio'] },
      desfecho: { termos: ['liderou', 'lider*', 'marcou', 'venceu', 'venc*', '1 a 0'] },
      ideiaCentral: { termos: ['lider*', 'preparar', 'incentiv*', 'ensin*', 'apoio', 'junt*'] }
    }
  },
  {
    id: 'rec048',
    dificuldade: 'medio',
    titulo: 'A enchente e o mutirão do bairro',
    narracao: 'Uma enchente alagou o campinho do bairro e encheu tudo de lama poucos dias antes do torneio. As crianças do time Garra ficaram tristes, achando que o campeonato seria cancelado. A capitã Yara reuniu a turma e propôs um mutirão para limpar o campo com pás, baldes e a ajuda dos vizinhos. Até o senhor Joaquim, dono da padaria, emprestou ferramentas e levou pão para todos. Depois de dois dias de trabalho duro, o campo ficou limpo e o torneio aconteceu, com o Garra vencendo a final. O bairro inteiro aprendeu que quando a comunidade se une, qualquer obstáculo é superado.',
    ideiaCentralTexto: 'Quando a comunidade se une, qualquer obstáculo pode ser superado.',
    elementos: {
      personagens: { termos: ['Yara', 'capit*', 'Joaquim', 'vizinhos', 'Garra', 'time'] },
      problema: { termos: ['enchente', 'alagou', 'lama', 'tristes', 'cancelado', 'obstaculo'] },
      tentativa: { termos: ['mutirao', 'limpar', 'pas', 'baldes', 'ajuda', 'trabalho', 'reuniu'] },
      desfecho: { termos: ['limpo', 'torneio', 'venceu', 'venc*', 'aconteceu', 'final'] },
      ideiaCentral: { termos: ['comunidade', 'uni*', 'junt*', 'ajud*', 'equipe', 'superado'] }
    }
  },
  {
    id: 'rec049',
    dificuldade: 'medio',
    titulo: 'A estrela que aprendeu humildade',
    narracao: 'Téo era o craque do time Veloz e estava cheio de si depois de sair numa reportagem do jornal da escola. Ele começou a chegar atrasado nos treinos e a desprezar os colegas, achando que ganharia sozinho. Por causa disso, o time perdeu a sintonia e tomou uma goleada feia na estreia. A treinadora Olga conversou em particular e mostrou a Téo como ele havia magoado os amigos. Arrependido, Téo pediu desculpas, voltou a treinar sério e ajudou os companheiros. No jogo seguinte, o Veloz jogou unido de novo e venceu de virada por 4 a 3. Téo aprendeu que talento sem humildade não leva ninguém longe.',
    ideiaCentralTexto: 'Talento sem humildade não leva longe; respeitar os colegas é essencial.',
    elementos: {
      personagens: { termos: ['Teo', 'craque', 'Olga', 'treinador*', 'Veloz', 'time'] },
      problema: { termos: ['cheio de si', 'atrasado', 'desprezar', 'goleada', 'sozinho', 'magoado'] },
      tentativa: { termos: ['conversou', 'convers*', 'desculpas', 'arrependido', 'treinar', 'trein*', 'ajudou'] },
      desfecho: { termos: ['unido', 'venceu', 'venc*', 'virada', '4 a 3', 'comemor*'] },
      ideiaCentral: { termos: ['humildade', 'respeit*', 'desculp*', 'junt*', 'talento', 'amigos'] }
    }
  },
  {
    id: 'rec050',
    dificuldade: 'medio',
    titulo: 'O apito que falhou',
    narracao: 'No meio da partida, o apito do juiz Ramiro quebrou e ninguém sabia quando parar as jogadas, gerando confusão no campo. Os jogadores continuavam correndo mesmo quando a bola saía e quase houve uma briga entre o time Sol e o time Lua. A capitã Helô teve a ideia de usar a sineta do lanche da escola como apito improvisado. O professor Caio buscou a sineta e o juiz Ramiro voltou a comandar o jogo direitinho. A partida terminou em paz, com empate, e os dois times agradeceram a solução criativa. Todos perceberam que uma ideia simples e a calma podem salvar uma situação difícil.',
    ideiaCentralTexto: 'Uma ideia simples e a calma podem salvar uma situação difícil.',
    elementos: {
      personagens: { termos: ['Ramiro', 'juiz', 'Helo', 'capit*', 'Caio', 'professor'] },
      problema: { termos: ['apito', 'quebrou', 'confusao', 'briga', 'falhou', 'parar'] },
      tentativa: { termos: ['ideia', 'sineta', 'improvisado', 'improvis*', 'buscou', 'voltou', 'usar'] },
      desfecho: { termos: ['empate', 'paz', 'terminou', 'agradeceram', 'solucao', 'comandar'] },
      ideiaCentral: { termos: ['ideia', 'calma', 'criativa', 'simples', 'resolv*', 'pensar'] }
    }
  },
  {
    id: 'rec051',
    dificuldade: 'medio',
    titulo: 'A jogadora estrangeira',
    narracao: 'Aicha chegou de outro país e entrou no time Estrela, mas falava pouco português e se sentia muito sozinha. Nos treinos, ela não entendia as instruções da treinadora e errava as jogadas combinadas. O capitão Léo teve a ideia de desenhar as táticas num quadro com setas e bonequinhos para todos entenderem. A meia Duda também aprendeu algumas palavras na língua de Aicha para deixá-la mais à vontade. Logo Aicha se integrou, fez amigos e marcou um golaço na final que deu o título ao Estrela. A turma aprendeu que acolher quem vem de longe enriquece todo o grupo.',
    ideiaCentralTexto: 'Acolher quem vem de longe e de outra cultura enriquece todo o grupo.',
    elementos: {
      personagens: { termos: ['Aicha', 'Leo', 'capit*', 'Duda', 'Estrela', 'time'] },
      problema: { termos: ['outro pais', 'pouco portugues', 'sozinha', 'nao entendia', 'errava', 'lingua'] },
      tentativa: { termos: ['ideia', 'desenhar', 'quadro', 'setas', 'palavras', 'aprendeu', 'taticas'] },
      desfecho: { termos: ['integrou', 'amigos', 'golaco', 'titulo', 'venc*', 'marcou'] },
      ideiaCentral: { termos: ['acolher', 'inclu*', 'diferente', 'junt*', 'respeit*', 'cultura'] }
    }
  },
  {
    id: 'rec052',
    dificuldade: 'medio',
    titulo: 'O empate que valia a final',
    narracao: 'O time Coragem precisava só de um empate para chegar à final, mas estava perdendo de 1 a 0 e o tempo acabava. O zagueiro Otávio queria subir para atacar, enquanto a capitã Nina achava arriscado deixar a defesa aberta. O treinador Bento bolou um meio-termo: Otávio subiria só nas bolas paradas e voltaria correndo depois. Nos minutos finais, num escanteio ensaiado, Otávio subiu, cabeceou e empatou o jogo. O time Coragem segurou o 1 a 1 e garantiu a vaga na decisão. Eles aprenderam que ouvir todos os lados e combinar um plano equilibrado dá certo.',
    ideiaCentralTexto: 'Ouvir todos os lados e combinar um plano equilibrado leva ao bom resultado.',
    elementos: {
      personagens: { termos: ['Otavio', 'zagueir*', 'Nina', 'capit*', 'Bento', 'treinador'] },
      problema: { termos: ['perdendo', 'perd*', '1 a 0', 'tempo acabava', 'arriscado', 'aberta'] },
      tentativa: { termos: ['plano', 'meio-termo', 'subiria', 'escanteio', 'ensaiado', 'combinar', 'bolou'] },
      desfecho: { termos: ['empatou', 'empate', '1 a 1', 'cabeceou', 'vaga', 'segurou'] },
      ideiaCentral: { termos: ['ouvir', 'equilibrado', 'combinar', 'junt*', 'plano', 'acordo'] }
    }
  },
  {
    id: 'rec053',
    dificuldade: 'medio',
    titulo: 'A torcida organizada das crianças',
    narracao: 'O time Foguete jogava sempre sem ninguém na arquibancada e os jogadores ficavam desanimados pelo silêncio. A goleira Sofia reparou que os irmãos menores da turma adoravam futebol mas ficavam em casa. Ela e o capitão Murilo tiveram a ideia de organizar uma torcida só de crianças, com bandeiras e tambores feitos de lata. No dia do jogo, a torcida fez uma festa nas arquibancadas e animou o time inteiro. Empurrado pelo apoio, o Foguete jogou com vontade e venceu o clássico por 3 a 0. Todos perceberam que o apoio da torcida e da família dá uma força enorme.',
    ideiaCentralTexto: 'O apoio da torcida e da família dá uma força enorme para a equipe.',
    elementos: {
      personagens: { termos: ['Sofia', 'goleir*', 'Murilo', 'capit*', 'Foguete', 'time'] },
      problema: { termos: ['sem ninguem', 'desanimados', 'silencio', 'arquibancada', 'vazia', 'casa'] },
      tentativa: { termos: ['ideia', 'torcida', 'bandeiras', 'tambores', 'organizar', 'animou', 'festa'] },
      desfecho: { termos: ['venceu', 'venc*', '3 a 0', 'classico', 'vontade', 'apoio'] },
      ideiaCentral: { termos: ['apoio', 'torcida', 'familia', 'forca', 'junt*', 'incentiv*'] }
    }
  },
  {
    id: 'rec054',
    dificuldade: 'medio',
    titulo: 'O gol mal anulado',
    narracao: 'No fim do jogo, o atacante Rui fez um gol lindo, mas o juiz anulou por engano achando que era impedimento. Os colegas do time Raio ficaram furiosos e queriam abandonar a partida em protesto. O capitão Téo, porém, pediu calma e foi conversar com o juiz com respeito, explicando a jogada. O bandeirinha Clara confirmou que Rui não estava impedido e o juiz, humilde, validou o gol. O Raio venceu por 1 a 0 e o juiz parabenizou o capitão pela postura educada. A turma aprendeu que reclamar com respeito funciona mais do que brigar.',
    ideiaCentralTexto: 'Reclamar com respeito e calma funciona mais do que brigar.',
    elementos: {
      personagens: { termos: ['Rui', 'atacante', 'Teo', 'capit*', 'juiz', 'Clara'] },
      problema: { termos: ['anulou', 'engano', 'impedimento', 'furiosos', 'abandonar', 'protesto'] },
      tentativa: { termos: ['calma', 'conversar', 'convers*', 'respeito', 'explicando', 'confirmou', 'educad*'] },
      desfecho: { termos: ['validou', 'venceu', 'venc*', '1 a 0', 'parabenizou', 'gol'] },
      ideiaCentral: { termos: ['respeit*', 'calma', 'dialogo', 'educad*', 'convers*', 'paz'] }
    }
  },
  {
    id: 'rec055',
    dificuldade: 'medio',
    titulo: 'A ponte quebrada e o caminho longo',
    narracao: 'No dia da final, a ponte que levava ao estádio quebrou e o time Estrela corria o risco de chegar atrasado e perder por ausência. O motorista do ônibus, seu Jorge, ficou nervoso sem saber por onde ir. A capitã Lia lembrou de uma trilha pela mata que o avô dela usava e mostrou o caminho no mapa do celular. O time desceu do ônibus e foi a pé com as chuteiras na mão, atravessando o atalho a tempo. Chegaram suados mas inteiros, e o Estrela venceu a final nos pênaltis. Eles aprenderam que conhecer bem o próprio lugar ajuda a achar uma saída.',
    ideiaCentralTexto: 'Conhecer bem o próprio lugar e manter a calma ajuda a achar uma saída.',
    elementos: {
      personagens: { termos: ['Jorge', 'motorista', 'Lia', 'capit*', 'Estrela', 'time'] },
      problema: { termos: ['ponte', 'quebrou', 'atrasado', 'nervoso', 'ausencia', 'perder'] },
      tentativa: { termos: ['trilha', 'mata', 'atalho', 'caminho', 'mapa', 'lembrou', 'pe'] },
      desfecho: { termos: ['chegaram', 'venceu', 'venc*', 'penaltis', 'tempo', 'final'] },
      ideiaCentral: { termos: ['conhec*', 'calma', 'saida', 'lugar', 'resolv*', 'esperto'] }
    }
  },
  {
    id: 'rec056',
    dificuldade: 'medio',
    titulo: 'O treino na chuva e a gripe',
    narracao: 'O time Trovão treinou debaixo de chuva forte para se preparar e vários jogadores acabaram com gripe na véspera da final. A treinadora Sara ficou preocupada porque sobraram poucos atletas saudáveis. O capitão Davi propôs chamar os reservas que quase nunca jogavam e treiná-los rápido nas posições novas. Durante dois dias, os titulares passaram suas dicas pelo telefone para os reservas se prepararem. No jogo, o time misturado se ajudou em campo e a reserva Pietra marcou o gol da vitória por 2 a 1. O Trovão entendeu que confiar e dar chance a todos salva a equipe nas horas difíceis.',
    ideiaCentralTexto: 'Confiar nos colegas e dar chance a todos salva a equipe nas horas difíceis.',
    elementos: {
      personagens: { termos: ['Sara', 'treinador*', 'Davi', 'capit*', 'Pietra', 'Trovao'] },
      problema: { termos: ['gripe', 'doentes', 'preocupada', 'poucos', 'chuva', 'vespera'] },
      tentativa: { termos: ['reservas', 'chamar', 'treina', 'trein*', 'dicas', 'posicoes', 'preparar'] },
      desfecho: { termos: ['marcou', 'gol', 'vitoria', 'venc*', '2 a 1', 'ajudou'] },
      ideiaCentral: { termos: ['confiar', 'chance', 'todos', 'junt*', 'equipe', 'ajud*'] }
    }
  },
  {
    id: 'rec057',
    dificuldade: 'medio',
    titulo: 'A promessa ao amigo doente',
    narracao: 'Lucas, o artilheiro do time Cometa, estava internado no hospital e não poderia ver a final do campeonato. Seu melhor amigo, o capitão Pedro, prometeu que dedicaria a vitória a ele. No jogo, porém, o Cometa começou perdendo de 2 a 0 e o time ficou desanimado e quase desistiu. Pedro lembrou a turma da promessa feita ao Lucas e todos jogaram com o coração até o último minuto. Eles viraram para 3 a 2 e gravaram um vídeo da taça mandando um abraço para o amigo no hospital. A história mostrou que a amizade e uma boa motivação fazem a gente não desistir.',
    ideiaCentralTexto: 'A amizade e uma boa motivação fazem a gente não desistir.',
    elementos: {
      personagens: { termos: ['Lucas', 'artilheiro', 'Pedro', 'capit*', 'Cometa', 'amigo'] },
      problema: { termos: ['internado', 'hospital', 'perdendo', 'perd*', '2 a 0', 'desistiu'] },
      tentativa: { termos: ['promessa', 'dedicaria', 'lembrou', 'coracao', 'jogaram', 'motiv*'] },
      desfecho: { termos: ['viraram', 'virada', '3 a 2', 'taca', 'venc*', 'abraco'] },
      ideiaCentral: { termos: ['amizade', 'amig*', 'motiv*', 'nao desist*', 'junt*', 'esforc*'] }
    }
  },
  {
    id: 'rec058',
    dificuldade: 'medio',
    titulo: 'O placar errado',
    narracao: 'O time Garra achava que ia empatar a partida, mas o placar do estádio estava com defeito e marcava um número errado. Por causa disso, os jogadores relaxaram e quase deixaram o adversário virar o jogo de verdade. A meia Bia foi a primeira a perceber o erro e avisou a capitã Olga na hora. Olga reuniu o time e explicou que precisavam de mais um gol para de fato vencer. Com a informação certa, o Garra atacou, a Bia marcou e o time ganhou por 2 a 1. Eles aprenderam que conferir a informação antes de comemorar evita um grande engano.',
    ideiaCentralTexto: 'Conferir a informação antes de comemorar evita um engano que custa caro.',
    elementos: {
      personagens: { termos: ['Bia', 'meia', 'Olga', 'capit*', 'Garra', 'time'] },
      problema: { termos: ['placar', 'defeito', 'errado', 'relaxaram', 'virar', 'engano'] },
      tentativa: { termos: ['percebeu', 'avisou', 'reuniu', 'explicou', 'informacao', 'conferir'] },
      desfecho: { termos: ['marcou', 'gol', 'ganhou', 'venc*', '2 a 1', 'atacou'] },
      ideiaCentral: { termos: ['conferir', 'informacao', 'atencao', 'verific*', 'cuidado', 'certo'] }
    }
  },
  {
    id: 'rec059',
    dificuldade: 'medio',
    titulo: 'A capitã que dividiu o prêmio',
    narracao: 'O time Aurora venceu o torneio e ganhou um prêmio em dinheiro, mas a capitã Manu recebeu sozinha o troféu e o envelope. Alguns jogadores acharam que ela ia ficar com tudo e começaram a desconfiar e a brigar. Manu, em vez de guardar o dinheiro, reuniu a turma e propôs decidir juntos como usar o prêmio. A treinadora Vera ajudou a votar e o grupo escolheu comprar uniformes novos e bolas para todos. Com a confiança restaurada, o Aurora seguiu unido e venceu o torneio seguinte também. A história mostrou que partilhar e decidir em grupo fortalece a confiança.',
    ideiaCentralTexto: 'Partilhar e decidir em grupo fortalece a confiança entre os colegas.',
    elementos: {
      personagens: { termos: ['Manu', 'capit*', 'Vera', 'treinador*', 'Aurora', 'time'] },
      problema: { termos: ['premio', 'sozinha', 'desconfiar', 'brigar', 'dinheiro', 'ficar com tudo'] },
      tentativa: { termos: ['reuniu', 'juntos', 'votar', 'propos', 'decidir', 'partilh*', 'dividir'] },
      desfecho: { termos: ['uniformes', 'unido', 'venceu', 'venc*', 'confianca', 'comprar'] },
      ideiaCentral: { termos: ['partilh*', 'dividir', 'confianca', 'junt*', 'grupo', 'compartilh*'] }
    }
  },
  {
    id: 'rec060',
    dificuldade: 'medio',
    titulo: 'O atacante adversário machucado',
    narracao: 'Na final, o atacante do time rival, chamado Gael, caiu sozinho e torceu o braço bem feio perto do gol do time Leão. Os jogadores do Leão poderiam aproveitar para atacar enquanto o adversário estava no chão. Mas a capitã Sofia mandou todos pararem e chamou o socorro para cuidar do Gael. A médica Rita entrou no campo e levou o menino com cuidado para fora. Quando o jogo voltou, o Leão venceu por 2 a 1 e os dois times se abraçaram no fim. Todos viram que respeitar o adversário machucado é mais importante do que qualquer gol.',
    ideiaCentralTexto: 'Respeitar o adversário e cuidar de quem se machuca vale mais que qualquer gol.',
    elementos: {
      personagens: { termos: ['Gael', 'atacante', 'Sofia', 'capit*', 'Rita', 'medica'] },
      problema: { termos: ['caiu', 'torceu', 'braco', 'machucado', 'machuc*', 'chao'] },
      tentativa: { termos: ['pararem', 'socorro', 'cuidar', 'chamou', 'entrou', 'ajud*'] },
      desfecho: { termos: ['venceu', 'venc*', '2 a 1', 'abracaram', 'voltou', 'fora'] },
      ideiaCentral: { termos: ['respeit*', 'cuidar', 'fair play', 'adversario', 'junt*', 'ajud*'] }
    }
  },
  {
    id: 'rec061',
    dificuldade: 'medio',
    titulo: 'A goleira e o medo do escuro',
    narracao: 'O jogo decisivo do time Vento foi marcado para a noite, mas a goleira Duda tinha muito medo do escuro e do barulho dos refletores. Quando uma das luzes do estádio apagou, ela travou de medo e quase tomou um gol fácil. A capitã Lia percebeu e foi até o gol segurar a mão da amiga e acalmá-la. O treinador Bento pediu para os colegas ficarem perto da área protegendo a goleira. Mais tranquila, Duda defendeu o pênalti final e o Vento venceu o campeonato. Ela aprendeu que com o apoio dos amigos dá para enfrentar até os próprios medos.',
    ideiaCentralTexto: 'Com o apoio dos amigos é possível enfrentar até os próprios medos.',
    elementos: {
      personagens: { termos: ['Duda', 'goleir*', 'Lia', 'capit*', 'Bento', 'treinador'] },
      problema: { termos: ['medo', 'escuro', 'noite', 'travou', 'apagou', 'barulho'] },
      tentativa: { termos: ['percebeu', 'segurar', 'mao', 'acalma', 'apoio', 'perto', 'protegendo'] },
      desfecho: { termos: ['defendeu', 'defend*', 'penalti', 'venceu', 'venc*', 'campeonato'] },
      ideiaCentral: { termos: ['apoio', 'amigos', 'medo', 'coragem', 'junt*', 'ajud*'] }
    }
  },
  {
    id: 'rec062',
    dificuldade: 'medio',
    titulo: 'O time sem treinador',
    narracao: 'Na véspera do torneio, o treinador do time Relâmpago precisou viajar de urgência e as crianças ficaram sem ninguém para orientar. O grupo entrou em pânico, achando que não saberia se organizar sozinho em campo. A capitã Yara propôs que cada jogador ensinasse uma jogada que sabia fazer bem para os outros. O experiente Léo mostrou a marcação, a Pietra ensinou os passes e juntos montaram a estratégia. No torneio, o Relâmpago se virou sem treinador, jogou unido e ganhou a final por 3 a 2. Eles descobriram que, trabalhando em equipe, conseguem resolver problemas sozinhos.',
    ideiaCentralTexto: 'Trabalhando em equipe, um grupo consegue resolver problemas até sozinho.',
    elementos: {
      personagens: { termos: ['Yara', 'capit*', 'Leo', 'Pietra', 'Relampago', 'time'] },
      problema: { termos: ['sem treinador', 'viajar', 'panico', 'sozinho', 'orientar', 'urgencia'] },
      tentativa: { termos: ['ensinasse', 'ensin*', 'jogada', 'passes', 'estrategia', 'montaram', 'propos'] },
      desfecho: { termos: ['venceu', 'venc*', 'ganhou', '3 a 2', 'unido', 'final'] },
      ideiaCentral: { termos: ['equipe', 'junt*', 'uni*', 'resolv*', 'ajud*', 'colabor*'] }
    }
  },
  {
    id: 'rec063',
    dificuldade: 'medio',
    titulo: 'A aposta que deu errado',
    narracao: 'Antes do clássico, o capitão Ravi, do time Sol, apostou com os colegas que faria três gols sozinho e provocou bastante o time Lua. No jogo, ele forçou jogadas individuais para ganhar a aposta e acabou perdendo a bola várias vezes. Por causa disso, o Sol começou perdendo de 2 a 0 e os colegas ficaram bravos com Ravi. No intervalo, a treinadora Nina conversou e Ravi pediu desculpas, prometendo jogar para o time. No segundo tempo, ele passou para os amigos, deu duas assistências e o Sol virou para 3 a 2. Ravi aprendeu que se exibir atrapalha, e que o jogo é sempre do coletivo.',
    ideiaCentralTexto: 'Querer se exibir atrapalha; o jogo é sempre do coletivo, não de um só.',
    elementos: {
      personagens: { termos: ['Ravi', 'capit*', 'Nina', 'treinador*', 'Sol', 'time'] },
      problema: { termos: ['apostou', 'aposta', 'provocou', 'individuais', 'perdendo', 'perd*'] },
      tentativa: { termos: ['conversa', 'convers*', 'desculpas', 'prometendo', 'passou', 'assistencias'] },
      desfecho: { termos: ['virou', 'virada', '3 a 2', 'venc*', 'segundo tempo', 'gol'] },
      ideiaCentral: { termos: ['coletivo', 'equipe', 'junt*', 'exibir', 'humildade', 'time'] }
    }
  },
  {
    id: 'rec064',
    dificuldade: 'medio',
    titulo: 'A chuva de granizo na decisão',
    narracao: 'No meio da decisão, começou a cair granizo e o juiz precisou parar o jogo com o time Garra ganhando de 1 a 0. A capitã Helena temia que, ao voltar, o time esfriasse e o Cometa empatasse. Para manter o grupo aquecido e concentrado, ela puxou alongamentos e revisou a marcação no vestiário enquanto esperavam. O treinador Caio também passou água e palavras de incentivo para todos não perderem o foco. Quando o granizo parou, o Garra voltou ligado, segurou o 1 a 0 e foi campeão. Eles aprenderam que manter a calma e a concentração nas pausas faz diferença.',
    ideiaCentralTexto: 'Manter a calma e a concentração mesmo nas pausas faz toda a diferença.',
    elementos: {
      personagens: { termos: ['Helena', 'capit*', 'Caio', 'treinador', 'Garra', 'time'] },
      problema: { termos: ['granizo', 'parar', 'esfriasse', 'empatasse', 'pausa', 'foco'] },
      tentativa: { termos: ['alongamentos', 'revisou', 'marcacao', 'incentivo', 'concentrad*', 'aquecido'] },
      desfecho: { termos: ['voltou', 'segurou', '1 a 0', 'campeao', 'venc*', 'ligado'] },
      ideiaCentral: { termos: ['calma', 'concentracao', 'foco', 'paciencia', 'junt*', 'controle'] }
    }
  },
  {
    id: 'rec065',
    dificuldade: 'medio',
    titulo: 'O uniforme trocado',
    narracao: 'No dia do jogo, os times Estrela e Cometa chegaram com uniformes da mesma cor azul, e ninguém conseguia distinguir os jogadores em campo. O juiz avisou que, sem cores diferentes, a partida teria que ser cancelada. A capitã Lis, do Estrela, lembrou que tinha coletes laranja guardados no armário do ginásio. Ela e o capitão Téo, do Cometa, foram juntos buscar os coletes e dividir entre um dos times. Com as cores resolvidas, o jogo aconteceu, terminou empatado e os dois capitães se cumprimentaram. Eles mostraram que resolver um problema juntos é melhor do que desistir do jogo.',
    ideiaCentralTexto: 'Resolver um problema juntos, mesmo entre rivais, é melhor do que desistir.',
    elementos: {
      personagens: { termos: ['Lis', 'capit*', 'Teo', 'juiz', 'Estrela', 'Cometa'] },
      problema: { termos: ['uniformes', 'mesma cor', 'azul', 'distinguir', 'cancelada', 'iguais'] },
      tentativa: { termos: ['coletes', 'laranja', 'lembrou', 'buscar', 'juntos', 'dividir', 'armario'] },
      desfecho: { termos: ['empatado', 'aconteceu', 'cumprimentaram', 'resolvidas', 'jogo', 'terminou'] },
      ideiaCentral: { termos: ['juntos', 'junt*', 'resolv*', 'colabor*', 'rivais', 'ajud*'] }
    }
  }
];
