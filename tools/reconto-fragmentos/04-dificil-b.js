/*
 * tools/reconto-fragmentos/04-dificil-b.js
 *
 * Fragmento de histórias de RECONTO — dificuldade DIFÍCIL (lote B).
 * IDs rec084 a rec100 (17 histórias).
 *
 * Calibração: ~11-13 anos. Enredos de futebol com reviravoltas, subtramas,
 * ironia e dilemas morais abstratos (ética, liderança, perdão, sacrifício,
 * identidade, justiça). Cada história traz um gabarito (`elementos`) com
 * termos (radicais com * para conjugações) que a avaliação automática procura
 * na fala transcrita da criança ao recontar cada um dos 5 elementos.
 *
 * Validado por: node tools/checar-fragmento.js tools/reconto-fragmentos/04-dificil-b.js
 */
'use strict';

module.exports = [
  {
    id: 'rec084',
    dificuldade: 'dificil',
    titulo: 'O gol que ninguém viu',
    narracao: 'No último minuto da final, a zagueira Helena cabeceou para dentro do gol, mas a bola bateu na trave, voltou e foi afastada antes de o juiz enxergar. A torcida jurava que tinha entrado; o árbitro, sem certeza, mandou seguir o jogo. Helena sabia, no fundo, que a bola não havia cruzado a linha por inteiro. No intervalo, em vez de comemorar a reclamação do time, ela procurou o árbitro e contou que a dúvida da torcida não tinha fundamento. O técnico ficou furioso, achando que ela jogou o título fora. A partida terminou empatada e foi para os pênaltis. Helena converteu a cobrança decisiva e o time venceu mesmo assim. No fim, todos entenderam que a honestidade dela valia mais que um gol duvidoso.',
    ideiaCentralTexto: 'A honestidade vale mais do que uma vitória conquistada na dúvida.',
    elementos: {
      personagens: { termos: ['helena', 'zagueir*', 'arbitro', 'juiz', 'torcida', 'tecnic*'] },
      problema: { termos: ['trave', 'duvida', 'nao havia cruzado', 'linha', 'reclam*'] },
      tentativa: { termos: ['procurou', 'contou', 'honest*', 'arbitro', 'sem fundamento'] },
      desfecho: { termos: ['penaltis', 'convert*', 'venceu', 'empat*', 'entender*'] },
      ideiaCentral: { termos: ['honest*', 'verdade', 'sincer*', 'vale mais', 'duvid*'] }
    }
  },
  {
    id: 'rec085',
    dificuldade: 'dificil',
    titulo: 'A braçadeira pesada',
    narracao: 'Quando o capitão se machucou, o técnico entregou a braçadeira a Rafael, o jogador mais quieto do elenco. No primeiro jogo como líder, dois veteranos discutiram em campo e quase saíram no soco diante de todos. Rafael percebeu que gritar ordens só pioraria a briga. Em vez disso, ele parou o treino, ouviu cada um separadamente e admitiu que também errava sob pressão. Os veteranos, surpresos com a humildade do novo capitão, pediram desculpas um ao outro. A partir dali o vestiário ficou mais unido e o time engatou uma sequência de vitórias. Rafael aprendeu que liderar não é mandar, e sim ouvir. A braçadeira deixou de pesar quando ele entendeu o que ela significava.',
    ideiaCentralTexto: 'Liderar de verdade é ouvir e unir, não apenas dar ordens.',
    elementos: {
      personagens: { termos: ['rafael', 'capit*', 'tecnic*', 'veteran*', 'jogador*', 'lider*'] },
      problema: { termos: ['discut*', 'briga', 'machuc*', 'soco', 'pressao'] },
      tentativa: { termos: ['parou', 'ouviu', 'admitiu', 'humild*', 'desculpa*'] },
      desfecho: { termos: ['unid*', 'vitoria*', 'sequencia', 'aprend*', 'desculp*'] },
      ideiaCentral: { termos: ['lider*', 'ouvir', 'humild*', 'unir', 'mandar'] }
    }
  },
  {
    id: 'rec086',
    dificuldade: 'dificil',
    titulo: 'O apito imparcial',
    narracao: 'Marcos era árbitro e, naquela tarde, apitava o jogo do time em que seu próprio filho jogava. No segundo tempo, o filho dele cometeu uma falta clara dentro da área adversária. A plateia era pequena e talvez ninguém cobrasse nada se ele deixasse passar. Marcos sentiu o coração apertar, mas levou o apito à boca e marcou o pênalti contra o próprio time do menino. O adversário converteu e venceu a partida. No vestiário, o filho chegou emburrado, achando que o pai o havia traído. Marcos explicou que ser justo exigia tratar todos do mesmo jeito, inclusive quem ele amava. Anos depois, já adulto, o filho admitiu que aquele apito tinha sido a lição mais importante da vida dele.',
    ideiaCentralTexto: 'A imparcialidade exige tratar todos igualmente, mesmo quem amamos.',
    elementos: {
      personagens: { termos: ['marcos', 'arbitro', 'juiz', 'filho', 'pai', 'adversari*'] },
      problema: { termos: ['falta', 'penalti', 'dentro da area', 'traido', 'emburrado'] },
      tentativa: { termos: ['apito', 'marcou', 'justo', 'explic*', 'mesmo jeito'] },
      desfecho: { termos: ['convert*', 'venceu', 'admitiu', 'licao', 'adulto'] },
      ideiaCentral: { termos: ['justo', 'imparc*', 'igual*', 'honest*', 'tratar todos'] }
    }
  },
  {
    id: 'rec087',
    dificuldade: 'dificil',
    titulo: 'A camisa do rival',
    narracao: 'O artilheiro Téo recebeu uma proposta milionária para trocar de clube justamente antes da decisão contra o maior rival. A diretoria do seu time não tinha como cobrir o valor e liberou a saída. Téo, porém, lembrou de quando era garoto e a torcida pagou sua viagem para o primeiro torneio. Em vez de assinar logo, ele pediu para jogar a final antes de partir. Na decisão, marcou o gol da vitória contra o rival e só então vestiu a camisa do outro clube. Muitos o chamaram de mercenário; outros, de leal. Téo respondeu que gratidão e ambição podiam caminhar juntas, desde que a ordem fosse respeitada. A história mostrou que retribuir quem nos ajudou não é fraqueza, e sim caráter.',
    ideiaCentralTexto: 'A gratidão a quem nos ajudou deve vir antes da ambição pessoal.',
    elementos: {
      personagens: { termos: ['teo', 'artilheir*', 'diretoria', 'torcida', 'rival', 'clube'] },
      problema: { termos: ['proposta', 'trocar de clube', 'saida', 'mercenari*', 'milionari*'] },
      tentativa: { termos: ['pediu para jogar', 'lembrou', 'gratidao', 'final', 'retribu*'] },
      desfecho: { termos: ['marcou', 'vitoria', 'vestiu', 'leal', 'carater'] },
      ideiaCentral: { termos: ['gratidao', 'leal*', 'retribu*', 'carater', 'ambicao'] }
    }
  },
  {
    id: 'rec088',
    dificuldade: 'dificil',
    titulo: 'O banco de reservas',
    narracao: 'Lucas era o maior goleador do colégio, mas no campeonato decisivo o técnico o deixou no banco e escalou Davi, um menino tímido que mal jogava. A escola inteira estranhou a decisão e cobrou explicações. O técnico revelou que Davi tinha treinado em segredo durante meses, enquanto Lucas faltava aos treinos confiando só no talento. No início do jogo, Lucas fervia de raiva no banco, mas aos poucos percebeu o esforço silencioso do colega. Quando entrou no segundo tempo, em vez de roubar a cena, deu o passe que Davi finalizou para o gol do título. Os dois ergueram a taça juntos. Lucas entendeu que talento sem dedicação não basta, e que reconhecer o trabalho do outro também é vencer.',
    ideiaCentralTexto: 'O talento não substitui a dedicação, e reconhecer o esforço alheio é uma vitória.',
    elementos: {
      personagens: { termos: ['lucas', 'davi', 'tecnic*', 'goleador*', 'colega', 'escola'] },
      problema: { termos: ['banco', 'deixou no banco', 'raiva', 'faltava', 'estranh*'] },
      tentativa: { termos: ['treinad*', 'esforco', 'passe', 'entrou', 'percebeu'] },
      desfecho: { termos: ['gol', 'titulo', 'taca', 'venc*', 'entendeu'] },
      ideiaCentral: { termos: ['dedicacao', 'esforco', 'talento', 'reconhec*', 'trabalho'] }
    }
  },
  {
    id: 'rec089',
    dificuldade: 'dificil',
    titulo: 'A aposta secreta',
    narracao: 'Antes da semifinal, descobriu-se que o atacante Bruno havia feito uma aposta de dinheiro com um torcedor sobre quantos gols faria. Pelas regras do clube, apostar no próprio desempenho era proibido e dava suspensão. Bruno podia esconder tudo, já que ninguém tinha provas. Atormentado, ele procurou o presidente e confessou antes do jogo, mesmo sabendo que ficaria de fora da partida mais importante do ano. O time perdeu a semifinal sem o artilheiro e muitos o culparam. Porém, a comissão elogiou sua coragem de assumir o erro e o manteve no elenco. No ano seguinte, agora respeitado pela sinceridade, Bruno liderou a equipe ao título. Ele aprendeu que confessar uma falha dói, mas mentir custa muito mais caro.',
    ideiaCentralTexto: 'Assumir o próprio erro é difícil, mas esconder a verdade custa mais caro.',
    elementos: {
      personagens: { termos: ['bruno', 'atacante', 'presidente', 'torcedor*', 'artilheir*', 'time'] },
      problema: { termos: ['aposta', 'proibid*', 'suspensao', 'esconder', 'falha'] },
      tentativa: { termos: ['confess*', 'procurou', 'assumir', 'coragem', 'sinceridade'] },
      desfecho: { termos: ['perdeu', 'elogi*', 'manteve', 'titulo', 'aprend*'] },
      ideiaCentral: { termos: ['verdade', 'assumir', 'sincer*', 'honest*', 'mentir'] }
    }
  },
  {
    id: 'rec090',
    dificuldade: 'dificil',
    titulo: 'O pênalti perdido de propósito',
    narracao: 'No jogo beneficente, o craque Igor ganhou um pênalti nos minutos finais contra um time de crianças de um abrigo que sonhava em vencer ao menos uma vez. Converter seria fácil e garantiria a goleada do seu time profissional. Igor olhou para a alegria nervosa do pequeno goleiro adversário e tomou uma decisão estranha. Ele chutou de propósito para fora, deixando o placar como estava. Alguns colegas o criticaram por não respeitar o jogo; outros entenderam o gesto. As crianças do abrigo seguraram o empate e comemoraram como se fosse uma final de Copa. Igor explicou que naquele dia o importante não era o resultado, e sim a felicidade de quem raramente tinha motivos para sorrir. A generosidade dele virou notícia maior que qualquer gol.',
    ideiaCentralTexto: 'Há momentos em que a generosidade vale mais do que vencer.',
    elementos: {
      personagens: { termos: ['igor', 'craque', 'goleir*', 'criancas', 'abrigo', 'adversari*'] },
      problema: { termos: ['penalti', 'goleada', 'sonhava em vencer', 'decisao', 'placar'] },
      tentativa: { termos: ['chutou', 'para fora', 'de proposito', 'gesto', 'deixando'] },
      desfecho: { termos: ['empate', 'comemor*', 'felicidade', 'noticia', 'seguraram'] },
      ideiaCentral: { termos: ['generos*', 'bondade', 'vale mais', 'felicidade', 'vencer'] }
    }
  },
  {
    id: 'rec091',
    dificuldade: 'dificil',
    titulo: 'A herança do treinador',
    narracao: 'O velho treinador Salomão anunciou que se aposentaria e precisava escolher entre dois auxiliares para o seu lugar. Vítor era brilhante taticamente, mas arrogante; Pedro era simples, porém tratava cada jogador com afeto. Todos esperavam que o cargo fosse para o mais talentoso. Para decidir, Salomão deu a cada um a missão de treinar os garotos mais fracos do clube por um mês. Vítor desistiu na primeira semana, dizendo que eram caso perdido. Pedro insistiu, descobriu o que cada menino fazia bem e transformou o grupo. No fim do prazo, os garotos antes desprezados venceram um amistoso difícil. Salomão escolheu Pedro e disse que um bom líder não é quem brilha sozinho, mas quem faz os outros crescerem.',
    ideiaCentralTexto: 'Um bom líder se mede por sua capacidade de fazer os outros crescerem.',
    elementos: {
      personagens: { termos: ['salomao', 'vitor', 'pedro', 'treinador*', 'auxiliar*', 'garotos'] },
      problema: { termos: ['aposentar*', 'escolher', 'arrogante', 'caso perdido', 'desistiu'] },
      tentativa: { termos: ['treinar', 'insistiu', 'descobriu', 'transformou', 'afeto'] },
      desfecho: { termos: ['venceram', 'escolheu', 'amistoso', 'cresc*', 'disse'] },
      ideiaCentral: { termos: ['lider*', 'humild*', 'fazer os outros', 'cresc*', 'paciencia'] }
    }
  },
  {
    id: 'rec092',
    dificuldade: 'dificil',
    titulo: 'O gêmeo do gol',
    narracao: 'Os gêmeos André e Caio eram idênticos e jogavam no mesmo time, mas só André tinha sido inscrito no campeonato. Numa rodada decisiva, André machucou o tornozelo na véspera e ninguém mais poderia substituí-lo a tempo. Caio se ofereceu para entrar em campo fingindo ser o irmão, e quase ninguém notaria a troca. Os dois ficaram a noite inteira pensando se valia a pena trapacear para garantir a classificação. De manhã, decidiram contar a verdade à arbitragem em vez de enganar todo mundo. O time foi punido com a ausência de André, mas jogou com honestidade e, contra todas as previsões, empatou e avançou pelo saldo. Os gêmeos descobriram que uma vitória limpa, mesmo improvável, dorme melhor à noite do que um título sujo.',
    ideiaCentralTexto: 'Uma conquista honesta vale mais do que um título obtido com trapaça.',
    elementos: {
      personagens: { termos: ['andre', 'caio', 'gemeos', 'irmao', 'arbitr*', 'time'] },
      problema: { termos: ['machucou', 'tornozelo', 'fingindo', 'trapac*', 'enganar'] },
      tentativa: { termos: ['contar a verdade', 'decidiram', 'honest*', 'arbitr*', 'verdade'] },
      desfecho: { termos: ['punid*', 'empatou', 'avancou', 'saldo', 'descobriram'] },
      ideiaCentral: { termos: ['honest*', 'verdade', 'trapac*', 'limp*', 'vitoria limpa'] }
    }
  },
  {
    id: 'rec093',
    dificuldade: 'dificil',
    titulo: 'A entrevista perigosa',
    narracao: 'Depois de uma derrota dura, a meia Fernanda foi cercada por repórteres que queriam que ela culpasse a goleira pelos gols sofridos. Era a saída fácil: jogar a responsabilidade na colega e salvar a própria imagem. Fernanda, no entanto, lembrou que a goleira tinha defendido sozinha vários ataques antes da falha. Diante das câmeras, ela assumiu que o time inteiro errou e que ninguém perde ou ganha sozinho. A goleira, que assistia tremendo de medo, sentiu-se protegida pela companheira. A imprensa estranhou, esperando polêmica, mas a torcida valorizou a atitude. Naquela semana o grupo treinou mais unido do que nunca e reagiu no campeonato. Fernanda mostrou que defender um colega na hora difícil cria laços que nenhuma vitória sozinha consegue.',
    ideiaCentralTexto: 'Defender um companheiro na hora difícil fortalece o time mais do que culpar alguém.',
    elementos: {
      personagens: { termos: ['fernanda', 'goleir*', 'reporter*', 'imprensa', 'meia', 'colega'] },
      problema: { termos: ['derrota', 'culpasse', 'falha', 'responsabilidade', 'polemica'] },
      tentativa: { termos: ['assumiu', 'time inteiro', 'proteg*', 'defend*', 'ninguem sozinho'] },
      desfecho: { termos: ['unid*', 'reagiu', 'valoriz*', 'lacos', 'treinou'] },
      ideiaCentral: { termos: ['lealdade', 'companheir*', 'defend*', 'unir', 'culpar'] }
    }
  },
  {
    id: 'rec094',
    dificuldade: 'dificil',
    titulo: 'O placar adulterado',
    narracao: 'O time juvenil descobriu que, na tabela oficial, alguém havia somado três pontos a mais para a equipe deles por engano de digitação. Com aqueles pontos extras, eles terminariam em primeiro sem precisar jogar a última rodada. O capitão Otávio sabia que bastava ficar calado e o erro nunca seria notado. Mas ele reuniu o grupo e perguntou se queriam ser campeões por um número falso. Após muita discussão, decidiram avisar a organização sobre o equívoco a favor deles mesmos. Tiveram que disputar a rodada final e quase perderam o título por isso. No último lance, marcaram o gol que valeu a taça de forma legítima. Otávio disse que ser campeão de mentira seria como ganhar um troféu vazio.',
    ideiaCentralTexto: 'Vencer com base numa mentira é vazio; a vitória só tem valor quando é legítima.',
    elementos: {
      personagens: { termos: ['otavio', 'capit*', 'time', 'organizacao', 'grupo', 'juvenil'] },
      problema: { termos: ['pontos a mais', 'engano', 'erro', 'falso', 'calado'] },
      tentativa: { termos: ['avisar', 'decidiram', 'reuniu', 'equivoco', 'disputar'] },
      desfecho: { termos: ['marcaram', 'taca', 'titulo', 'legitim*', 'disse'] },
      ideiaCentral: { termos: ['honest*', 'legitim*', 'mentira', 'merec*', 'verdade'] }
    }
  },
  {
    id: 'rec095',
    dificuldade: 'dificil',
    titulo: 'O adversário no chão',
    narracao: 'Na disputa do título, o zagueiro Nuno tinha o caminho livre para o gol decisivo quando viu o atacante rival cair desacordado atrás dele, sem que o juiz percebesse. Ele podia seguir e marcar, garantindo a taça para o seu time. Em vez disso, Nuno chutou a bola para fora e correu para socorrer o adversário caído. O jogo foi paralisado e o rapaz, atendido a tempo, passou bem. A jogada perdida custou caro: o time de Nuno empatou e ficou com o vice-campeonato. Parte da torcida o criticou por abrir mão do gol. Mas o pai do jogador socorrido procurou Nuno para agradecer por ter colocado uma vida acima de um troféu. Nuno respondeu que nenhuma taça valeria a saúde de outra pessoa.',
    ideiaCentralTexto: 'A vida e a segurança de uma pessoa valem mais do que qualquer troféu.',
    elementos: {
      personagens: { termos: ['nuno', 'zagueir*', 'adversari*', 'rival', 'juiz', 'atacante'] },
      problema: { termos: ['caido', 'desacordado', 'gol decisivo', 'socorr*', 'taca'] },
      tentativa: { termos: ['chutou', 'para fora', 'socorrer', 'paralisad*', 'correu'] },
      desfecho: { termos: ['empatou', 'vice', 'agradecer', 'passou bem', 'criticou'] },
      ideiaCentral: { termos: ['vida', 'solidari*', 'acima de', 'trofeu', 'respeit*'] }
    }
  },
  {
    id: 'rec096',
    dificuldade: 'dificil',
    titulo: 'A promessa do treino',
    narracao: 'A jovem Sofia sonhava em ser titular, mas o técnico exigiu que ela escolhesse: faltar à formatura da irmã para um treino extra ou perder a vaga no jogo da vida. Todos diziam que uma chance assim não voltaria. Sofia ponderou durante dias e percebeu que a irmã estivera ao seu lado em cada derrota e cada lesão. Ela decidiu ir à formatura e abrir mão do treino, aceitando ficar no banco. O técnico, irritado, cumpriu a ameaça e a deixou de fora. No entanto, ao ver a lealdade de Sofia à família, uma olheira de outro clube ofereceu a ela uma proposta justamente por causa do caráter. Sofia entendeu que algumas oportunidades não valem o preço de abandonar quem amamos.',
    ideiaCentralTexto: 'Nenhuma oportunidade vale a pena se o preço é abandonar quem amamos.',
    elementos: {
      personagens: { termos: ['sofia', 'irma', 'tecnic*', 'olheir*', 'familia', 'titular'] },
      problema: { termos: ['escolher', 'faltar', 'formatura', 'perder a vaga', 'ameaca'] },
      tentativa: { termos: ['decidiu', 'ponderou', 'abrir mao', 'ir a formatura', 'lealdade'] },
      desfecho: { termos: ['banco', 'proposta', 'ofereceu', 'carater', 'entendeu'] },
      ideiaCentral: { termos: ['familia', 'lealdade', 'amamos', 'oportunidade', 'preco'] }
    }
  },
  {
    id: 'rec097',
    dificuldade: 'dificil',
    titulo: 'O técnico de dois times',
    narracao: 'Por uma confusão de contratos, o treinador Henrique acabou comandando, na mesma rodada, dois clubes que se enfrentariam entre si pela liderança. Cada diretoria queria que ele entregasse os segredos do outro lado para garantir a vitória. Henrique percebeu que trair qualquer um dos grupos destruiria sua reputação para sempre. Ele reuniu os presidentes e propôs renunciar a um dos cargos antes do jogo, em vez de manipular o confronto. Abriu mão do salário maior para preservar a justiça da partida. O clube que ele deixou ficou bravo, dizendo que perdeu uma vantagem. Mas no longo prazo Henrique tornou-se o treinador mais procurado do país, pois todos confiavam nele. A história provou que a reputação construída com integridade vale mais que qualquer atalho.',
    ideiaCentralTexto: 'A integridade constrói uma reputação que vale mais do que qualquer atalho.',
    elementos: {
      personagens: { termos: ['henrique', 'treinador*', 'tecnic*', 'presidente*', 'diretoria', 'clubes'] },
      problema: { termos: ['dois clubes', 'segredos', 'trair', 'confusao', 'manipular'] },
      tentativa: { termos: ['renunciar', 'propos', 'abriu mao', 'reuniu', 'preservar'] },
      desfecho: { termos: ['procurad*', 'confiavam', 'reputacao', 'bravo', 'provou'] },
      ideiaCentral: { termos: ['integridade', 'reputacao', 'honest*', 'confianca', 'atalho'] }
    }
  },
  {
    id: 'rec098',
    dificuldade: 'dificil',
    titulo: 'A bola de ouro dividida',
    narracao: 'No fim da temporada, dois colegas do mesmo time, Tiago e Mateus, disputavam o prêmio de melhor jogador, que só um poderia receber. A imprensa apontava Tiago como favorito por ter mais gols, embora Mateus tivesse dado quase todos os passes para esses gols. Durante a votação, Tiago notou que o trabalho do amigo estava sendo ignorado pelos jornalistas. Em vez de aproveitar a fama sozinho, ele subiu ao palco e declarou publicamente que o prêmio pertencia aos dois. Sugeriu dividir o troféu e o reconhecimento com Mateus diante de todos. Alguns acharam exagero, mas o gesto comoveu o vestiário. Os dois passaram a jogar ainda mais entrosados na temporada seguinte. Tiago mostrou que reconhecer quem nos ajuda a brilhar é maior do que qualquer prêmio individual.',
    ideiaCentralTexto: 'Reconhecer quem nos ajuda a brilhar é mais nobre do que receber a glória sozinho.',
    elementos: {
      personagens: { termos: ['tiago', 'mateus', 'colega*', 'jornalist*', 'imprensa', 'amigo'] },
      problema: { termos: ['premio', 'so um', 'ignorad*', 'favorito', 'fama'] },
      tentativa: { termos: ['declarou', 'dividir', 'subiu ao palco', 'reconhec*', 'pertencia aos dois'] },
      desfecho: { termos: ['comoveu', 'entrosad*', 'gesto', 'mostrou', 'troféu'] },
      ideiaCentral: { termos: ['reconhec*', 'humild*', 'generos*', 'gloria', 'dividir'] }
    }
  },
  {
    id: 'rec099',
    dificuldade: 'dificil',
    titulo: 'O perdão no túnel',
    narracao: 'Anos antes, numa entrada violenta, o zagueiro Caetano havia quebrado a perna do atacante Vinícius e encerrado a carreira dele cedo. Os dois nunca mais se falaram, e Vinícius carregava um ódio enorme. O destino quis que Vinícius, agora treinador, recebesse Caetano como reforço no clube que comandava. No túnel do estádio, antes do primeiro treino, os dois se encararam em silêncio pesado. Caetano pediu desculpas sinceras, dizendo que se arrependia daquele lance todos os dias. Vinícius poderia se vingar barrando o jogador, mas escolheu perdoar e dar uma chance ao antigo rival. Juntos, técnico e zagueiro levaram o time pequeno a um título inesperado. Vinícius confessou que guardar rancor o havia machucado mais do que a antiga lesão, e que o perdão finalmente o libertou.',
    ideiaCentralTexto: 'O perdão liberta quem o concede mais do que o rancor jamais poderia.',
    elementos: {
      personagens: { termos: ['caetano', 'vinicius', 'zagueir*', 'atacante', 'treinador*', 'rival'] },
      problema: { termos: ['quebrado a perna', 'odio', 'rancor', 'vingar', 'lesao'] },
      tentativa: { termos: ['desculpas', 'perdoar', 'escolheu', 'arrepend*', 'chance'] },
      desfecho: { termos: ['titulo', 'libertou', 'juntos', 'confessou', 'inesperad*'] },
      ideiaCentral: { termos: ['perdao', 'perdoar', 'rancor', 'libert*', 'odio'] }
    }
  },
  {
    id: 'rec100',
    dificuldade: 'dificil',
    titulo: 'O último a sair',
    narracao: 'O goleiro veterano Ângelo descobriu que o garoto Léo, sua jovem promessa reserva, seria dispensado por falta de espaço no elenco. Ângelo ainda era titular e poderia simplesmente cuidar da própria vaga até a aposentadoria. Em vez disso, ele percebeu que Léo tinha um talento raro que o clube estava prestes a desperdiçar. Ângelo procurou a diretoria e propôs algo inédito: pediu para encerrar a carreira mais cedo, abrindo a vaga para o menino seguir no time. Muitos não entenderam por que um ídolo abriria mão de seus últimos jogos. Léo assumiu o gol, brilhou e anos depois virou capitão e ídolo da torcida. Quando ergueu seu primeiro troféu, dedicou tudo ao veterano que cedera o lugar. Ângelo provou que o verdadeiro legado de alguém é o caminho que ele abre para os que vêm depois.',
    ideiaCentralTexto: 'O maior legado de uma pessoa é abrir caminho para quem vem depois.',
    elementos: {
      personagens: { termos: ['angelo', 'leo', 'goleir*', 'diretoria', 'veteran*', 'reserva'] },
      problema: { termos: ['dispensad*', 'falta de espaco', 'desperdic*', 'vaga', 'reserva'] },
      tentativa: { termos: ['propos', 'encerrar a carreira', 'abrindo a vaga', 'procurou', 'abriria mao'] },
      desfecho: { termos: ['brilhou', 'capit*', 'idolo', 'trofeu', 'dedicou'] },
      ideiaCentral: { termos: ['legado', 'generos*', 'sacrif*', 'abrir caminho', 'altruis*'] }
    }
  }
];
