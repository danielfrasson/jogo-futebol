/*
 * js/data/reconto-exercicios.js — Banco de histórias para o eixo "Reconto"
 * GERADO por tools/montar-reconto.js a partir de tools/reconto-fragmentos/ — não edite à mão.
 * Total: 100 histórias (30 fáceis, 35 médias, 35 difíceis).
 *
 * Cada história traz a narração e um "gabarito" (elementos) com os termos que
 * caracterizam os 5 elementos do reconto. A avaliação (js/games/reconto-avaliacao.js)
 * considera um elemento presente quando a transcrição contém >= "minimo" (padrão 1)
 * termos distintos. Termos aceitam coringa de radical: "venc*" casa venceu/venceram.
 */
(function (global) {
  'use strict';

  var DIFICULDADES = ["facil", "medio", "dificil"];

  var EXERCICIOS = [
  {
    "id": "rec001",
    "dificuldade": "facil",
    "titulo": "A virada do Estrela",
    "narracao": "O time Estrela estava perdendo de dois a zero no primeiro tempo. A capitã Helena reuniu as amigas e disse para ninguém desistir. No segundo tempo elas treinaram a marcação e marcaram um gol, depois outro. No fim, o Estrela venceu de tres a dois e todas comemoraram abraçadas.",
    "ideiaCentralTexto": "Não desistir, mesmo quando o jogo está difícil, pode mudar tudo.",
    "elementos": {
      "personagens": {
        "termos": [
          "Helena",
          "capit*",
          "Estrela",
          "amig*",
          "time"
        ]
      },
      "problema": {
        "termos": [
          "perd*",
          "dois a zero",
          "primeiro tempo",
          "atras*"
        ]
      },
      "tentativa": {
        "termos": [
          "reun*",
          "trein*",
          "marc*",
          "nao desist*"
        ]
      },
      "desfecho": {
        "termos": [
          "venc*",
          "tres a dois",
          "comemor*",
          "ganh*"
        ]
      },
      "ideiaCentral": {
        "termos": [
          "nao desist*",
          "desist*",
          "persist*",
          "esforc*"
        ]
      }
    }
  },
  {
    "id": "rec002",
    "dificuldade": "facil",
    "titulo": "O goleiro com medo",
    "narracao": "Pedro era goleiro, mas tinha muito medo de defender pênaltis. Um dia o treinador Marcos ficou depois do treino só para ajudar o menino a praticar. Pedro defendeu vinte chutes seguidos e foi perdendo o medo aos poucos. No jogo de domingo, ele pegou o pênalti e garantiu a vitória do time.",
    "ideiaCentralTexto": "Praticar com a ajuda de alguém ajuda a vencer o medo.",
    "elementos": {
      "personagens": {
        "termos": [
          "Pedro",
          "goleir*",
          "Marcos",
          "treinador"
        ]
      },
      "problema": {
        "termos": [
          "medo",
          "penalti*",
          "penaltis",
          "defend*"
        ]
      },
      "tentativa": {
        "termos": [
          "trein*",
          "ajud*",
          "pratic*",
          "defend*"
        ]
      },
      "desfecho": {
        "termos": [
          "pegou",
          "vitoria",
          "garant*",
          "defend*"
        ]
      },
      "ideiaCentral": {
        "termos": [
          "pratic*",
          "ajud*",
          "medo",
          "super*"
        ]
      }
    }
  },
  {
    "id": "rec003",
    "dificuldade": "facil",
    "titulo": "A bola perdida",
    "narracao": "No meio do treino, a bola caiu dentro de um mato bem alto e sumiu. As crianças ficaram tristes porque sem bola não dava para jogar. Então o Lucas teve uma ideia e todos procuraram juntos no mato, passo a passo. A Bia encontrou a bola embaixo de uma folha e o treino continuou feliz.",
    "ideiaCentralTexto": "Procurar juntos resolve o problema mais rápido.",
    "elementos": {
      "personagens": {
        "termos": [
          "Lucas",
          "Bia",
          "criancas",
          "crianc*"
        ]
      },
      "problema": {
        "termos": [
          "bola",
          "sumiu",
          "mato",
          "tristes"
        ]
      },
      "tentativa": {
        "termos": [
          "ideia",
          "procur*",
          "junt*",
          "mato"
        ]
      },
      "desfecho": {
        "termos": [
          "encontrou",
          "achou",
          "continuou",
          "feliz"
        ]
      },
      "ideiaCentral": {
        "termos": [
          "junt*",
          "procur*",
          "ajud*",
          "equipe"
        ]
      }
    }
  },
  {
    "id": "rec004",
    "dificuldade": "facil",
    "titulo": "A chuva no jogo",
    "narracao": "O time do Caio estava jogando quando começou a cair uma chuva muito forte. O campo ficou escorregadio e ninguém conseguia correr direito. O treinador pediu calma e mandou todos jogarem com passes curtos. Assim o time se adaptou, fez um gol no fim e ganhou a partida mesmo na chuva.",
    "ideiaCentralTexto": "Saber se adaptar aos imprevistos ajuda a vencer.",
    "elementos": {
      "personagens": {
        "termos": [
          "Caio",
          "treinador",
          "time",
          "goleir*"
        ]
      },
      "problema": {
        "termos": [
          "chuva",
          "escorregadio",
          "campo",
          "correr"
        ]
      },
      "tentativa": {
        "termos": [
          "calma",
          "passes curtos",
          "adapt*",
          "passe*"
        ]
      },
      "desfecho": {
        "termos": [
          "gol",
          "ganhou",
          "venc*",
          "partida"
        ]
      },
      "ideiaCentral": {
        "termos": [
          "adapt*",
          "calma",
          "imprevist*",
          "paciencia"
        ]
      }
    }
  },
  {
    "id": "rec005",
    "dificuldade": "facil",
    "titulo": "O primeiro gol da Manu",
    "narracao": "A Manu era nova no time e ainda não tinha feito nenhum gol. Ela ficava nervosa toda vez que a bola chegava perto do gol adversário. Sua amiga Clara a incentivou e treinou as finalizações com ela depois da aula. No jogo seguinte, a Manu chutou forte e marcou o seu primeiro gol, muito feliz.",
    "ideiaCentralTexto": "Com apoio dos amigos e treino, a gente conquista o que quer.",
    "elementos": {
      "personagens": {
        "termos": [
          "Manu",
          "Clara",
          "amiga",
          "amig*"
        ]
      },
      "problema": {
        "termos": [
          "nervosa",
          "nenhum gol",
          "nova",
          "medo"
        ]
      },
      "tentativa": {
        "termos": [
          "incentiv*",
          "trein*",
          "finaliza*",
          "ajud*"
        ]
      },
      "desfecho": {
        "termos": [
          "marcou",
          "primeiro gol",
          "chutou",
          "feliz"
        ]
      },
      "ideiaCentral": {
        "termos": [
          "apoio",
          "trein*",
          "incentiv*",
          "conquist*"
        ]
      }
    }
  },
  {
    "id": "rec006",
    "dificuldade": "facil",
    "titulo": "O novo colega",
    "narracao": "Um menino chamado Theo chegou na escola e queria muito jogar futebol. No primeiro dia ele ficou sozinho no canto, com vergonha de pedir para entrar. A Júlia percebeu e convidou o Theo para o time dela na hora do recreio. Theo jogou muito bem, fez amigos e nunca mais ficou de fora.",
    "ideiaCentralTexto": "Convidar quem está sozinho faz todo mundo se sentir bem.",
    "elementos": {
      "personagens": {
        "termos": [
          "Theo",
          "Julia",
          "menino",
          "colega"
        ]
      },
      "problema": {
        "termos": [
          "sozinho",
          "vergonha",
          "canto",
          "fora"
        ]
      },
      "tentativa": {
        "termos": [
          "convidou",
          "percebeu",
          "convid*",
          "chamou"
        ]
      },
      "desfecho": {
        "termos": [
          "jogou",
          "amigos",
          "amig*",
          "time"
        ]
      },
      "ideiaCentral": {
        "termos": [
          "convid*",
          "inclu*",
          "amizade",
          "acolh*"
        ]
      }
    }
  },
  {
    "id": "rec007",
    "dificuldade": "facil",
    "titulo": "A chuteira furada",
    "narracao": "No dia do campeonato, o Rafa viu que a sua chuteira estava furada e rasgada. Ele ficou preocupado porque achava que não ia poder jogar daquele jeito. Seu amigo Nando ofereceu um par de chuteiras reserva que tinha na mochila. Rafa calçou as chuteiras emprestadas, entrou em campo e fez o gol da vitória.",
    "ideiaCentralTexto": "Um amigo que ajuda na hora certa faz toda a diferença.",
    "elementos": {
      "personagens": {
        "termos": [
          "Rafa",
          "Nando",
          "amigo",
          "amig*"
        ]
      },
      "problema": {
        "termos": [
          "chuteira",
          "furada",
          "rasgada",
          "preocupado"
        ]
      },
      "tentativa": {
        "termos": [
          "ofereceu",
          "emprest*",
          "reserva",
          "ajud*"
        ]
      },
      "desfecho": {
        "termos": [
          "gol",
          "vitoria",
          "entrou",
          "jogar"
        ]
      },
      "ideiaCentral": {
        "termos": [
          "ajud*",
          "amizade",
          "amig*",
          "generos*"
        ]
      }
    }
  },
  {
    "id": "rec008",
    "dificuldade": "facil",
    "titulo": "O pênalti decisivo",
    "narracao": "O jogo estava empatado e a árbitra marcou um pênalti para o time da Lia. Todo mundo ficou nervoso porque aquele chute podia decidir a partida. A Lia respirou fundo, lembrou do que treinou e mirou bem no canto. Ela chutou com calma, fez o gol e o time dela ganhou o campeonato.",
    "ideiaCentralTexto": "Respirar fundo e manter a calma ajuda nas horas difíceis.",
    "elementos": {
      "personagens": {
        "termos": [
          "Lia",
          "arbitra",
          "time",
          "goleir*"
        ]
      },
      "problema": {
        "termos": [
          "empatado",
          "penalti",
          "nervoso",
          "decidir"
        ]
      },
      "tentativa": {
        "termos": [
          "respirou",
          "calma",
          "mirou",
          "lembrou"
        ]
      },
      "desfecho": {
        "termos": [
          "gol",
          "ganhou",
          "campeonato",
          "venc*"
        ]
      },
      "ideiaCentral": {
        "termos": [
          "calma",
          "respir*",
          "concentr*",
          "tranquil*"
        ]
      }
    }
  },
  {
    "id": "rec009",
    "dificuldade": "facil",
    "titulo": "O mascote do time",
    "narracao": "O time tinha um cachorro mascote chamado Pipoca que assistia a todos os treinos. Um dia o Pipoca fugiu para dentro do campo e parou bem no meio do jogo. As crianças pararam, chamaram o cachorro com carinho e o tiraram do gramado. Depois disso o jogo voltou e o Pipoca virou o xodó do time.",
    "ideiaCentralTexto": "Tratar os animais com carinho deixa todo mundo mais feliz.",
    "elementos": {
      "personagens": {
        "termos": [
          "Pipoca",
          "cachorro",
          "mascote",
          "criancas"
        ]
      },
      "problema": {
        "termos": [
          "fugiu",
          "campo",
          "parou",
          "meio do jogo"
        ]
      },
      "tentativa": {
        "termos": [
          "chamaram",
          "carinho",
          "tiraram",
          "cham*"
        ]
      },
      "desfecho": {
        "termos": [
          "voltou",
          "xodo",
          "feliz",
          "time"
        ]
      },
      "ideiaCentral": {
        "termos": [
          "carinho",
          "cuid*",
          "anima*",
          "cuidar"
        ]
      }
    }
  },
  {
    "id": "rec010",
    "dificuldade": "facil",
    "titulo": "O passe para o amigo",
    "narracao": "O Davi estava sozinho na frente do gol e podia chutar para fazer o ponto. Mas ele viu que o seu amigo Igor estava em uma posição muito melhor. Em vez de chutar, o Davi tocou a bola de passe para o Igor com cuidado. O Igor fez o gol e os dois comemoraram juntos a jogada de equipe.",
    "ideiaCentralTexto": "Jogar pensando no time vale mais do que brilhar sozinho.",
    "elementos": {
      "personagens": {
        "termos": [
          "Davi",
          "Igor",
          "amigo",
          "amig*"
        ]
      },
      "problema": {
        "termos": [
          "sozinho",
          "chutar",
          "gol",
          "decis*"
        ]
      },
      "tentativa": {
        "termos": [
          "passe",
          "tocou",
          "pass*",
          "bola"
        ]
      },
      "desfecho": {
        "termos": [
          "gol",
          "comemoraram",
          "comemor*",
          "equipe"
        ]
      },
      "ideiaCentral": {
        "termos": [
          "equipe",
          "junt*",
          "time",
          "partilh*"
        ]
      }
    }
  },
  {
    "id": "rec011",
    "dificuldade": "facil",
    "titulo": "A goleira pequena",
    "narracao": "A Bianca queria ser goleira, mas era a menor de todas e tinha medo de não alcançar a bola. Algumas crianças disseram que ela não daria conta de pegar os chutes altos. O treinador acreditou nela e treinou saltos e reflexos todos os dias. No jogo, a Bianca fez defesas incríveis e provou que tamanho não importa.",
    "ideiaCentralTexto": "O tamanho não decide o valor de alguém; o esforço sim.",
    "elementos": {
      "personagens": {
        "termos": [
          "Bianca",
          "goleir*",
          "treinador",
          "criancas"
        ]
      },
      "problema": {
        "termos": [
          "menor",
          "medo",
          "alcancar",
          "chutes altos"
        ]
      },
      "tentativa": {
        "termos": [
          "acreditou",
          "trein*",
          "saltos",
          "reflexos"
        ]
      },
      "desfecho": {
        "termos": [
          "defesas",
          "provou",
          "defend*",
          "incriveis"
        ]
      },
      "ideiaCentral": {
        "termos": [
          "esforc*",
          "tamanho",
          "acredit*",
          "super*"
        ]
      }
    }
  },
  {
    "id": "rec012",
    "dificuldade": "facil",
    "titulo": "O fair play do Léo",
    "narracao": "Durante a partida, o Léo viu que um jogador do outro time caiu e se machucou no chão. A bola estava sobrando para ele fazer um gol fácil naquele momento. Mesmo assim, o Léo jogou a bola para fora para o menino ser atendido. O juiz e a torcida bateram palmas para o gesto bonito do Léo.",
    "ideiaCentralTexto": "Respeitar o adversário é mais importante do que ganhar.",
    "elementos": {
      "personagens": {
        "termos": [
          "Leo",
          "jogador",
          "juiz",
          "menino"
        ]
      },
      "problema": {
        "termos": [
          "caiu",
          "machucou",
          "chao",
          "machuc*"
        ]
      },
      "tentativa": {
        "termos": [
          "fora",
          "jogou",
          "parou",
          "atendid*"
        ]
      },
      "desfecho": {
        "termos": [
          "palmas",
          "torcida",
          "gesto",
          "bater*"
        ]
      },
      "ideiaCentral": {
        "termos": [
          "respeit*",
          "fair play",
          "adversario",
          "cuid*"
        ]
      }
    }
  },
  {
    "id": "rec013",
    "dificuldade": "facil",
    "titulo": "O time da escola",
    "narracao": "A turma do quarto ano queria montar um time para o festival de futebol da escola. O problema é que faltavam jogadores e ninguém queria ser o goleiro. A professora Ana sugeriu que cada um jogasse um pouco em cada posição. Assim todos participaram, o time ficou completo e ganhou a medalha de participação.",
    "ideiaCentralTexto": "Quando todos ajudam, dá para resolver qualquer falta.",
    "elementos": {
      "personagens": {
        "termos": [
          "Ana",
          "professora",
          "turma",
          "time"
        ]
      },
      "problema": {
        "termos": [
          "faltavam",
          "goleiro",
          "jogadores",
          "falt*"
        ]
      },
      "tentativa": {
        "termos": [
          "sugeriu",
          "posic*",
          "rodi*",
          "particip*"
        ]
      },
      "desfecho": {
        "termos": [
          "completo",
          "medalha",
          "ganhou",
          "particip*"
        ]
      },
      "ideiaCentral": {
        "termos": [
          "ajud*",
          "junt*",
          "equipe",
          "colabor*"
        ]
      }
    }
  },
  {
    "id": "rec014",
    "dificuldade": "facil",
    "titulo": "O sol muito quente",
    "narracao": "No torneio de verão, fazia um calor enorme e as crianças estavam ficando cansadas. O Murilo sentiu muita sede e quase desistiu de jogar no segundo tempo. O treinador parou tudo e mandou todos beberem água e descansarem na sombra. Depois da pausa, o time voltou com energia e conseguiu empatar a partida.",
    "ideiaCentralTexto": "Cuidar do corpo e descansar na hora certa é importante.",
    "elementos": {
      "personagens": {
        "termos": [
          "Murilo",
          "treinador",
          "criancas",
          "time"
        ]
      },
      "problema": {
        "termos": [
          "calor",
          "cansadas",
          "sede",
          "cansad*"
        ]
      },
      "tentativa": {
        "termos": [
          "agua",
          "descans*",
          "pausa",
          "sombra"
        ]
      },
      "desfecho": {
        "termos": [
          "energia",
          "empatar",
          "voltou",
          "empat*"
        ]
      },
      "ideiaCentral": {
        "termos": [
          "cuid*",
          "descans*",
          "agua",
          "saude"
        ]
      }
    }
  },
  {
    "id": "rec015",
    "dificuldade": "facil",
    "titulo": "O irmão na arquibancada",
    "narracao": "O João ia jogar a final, mas estava triste porque achava que ninguém da família viria. Ele olhava para a arquibancada vazia e ficava cada vez mais desanimado. De repente, o seu irmão mais velho chegou correndo com a mãe para torcer. Animado por eles, o João jogou muito bem e o time levantou o troféu.",
    "ideiaCentralTexto": "O apoio da família dá força para a gente dar o melhor.",
    "elementos": {
      "personagens": {
        "termos": [
          "Joao",
          "irmao",
          "mae",
          "familia"
        ]
      },
      "problema": {
        "termos": [
          "triste",
          "arquibancada",
          "desanimado",
          "ninguem"
        ]
      },
      "tentativa": {
        "termos": [
          "chegou",
          "torcer",
          "correndo",
          "torc*"
        ]
      },
      "desfecho": {
        "termos": [
          "jogou",
          "trofeu",
          "levantou",
          "venc*"
        ]
      },
      "ideiaCentral": {
        "termos": [
          "apoio",
          "familia",
          "torc*",
          "forca"
        ]
      }
    }
  },
  {
    "id": "rec016",
    "dificuldade": "facil",
    "titulo": "A regra do jogo",
    "narracao": "A Sara era nova no futebol e não sabia muito bem as regras da partida. Ela pegou a bola com a mão sem querer e o juiz marcou falta contra o time. Em vez de brigar, a Sara pediu para o capitão explicar a regra direitinho. Ela aprendeu rápido, não errou mais e ajudou o time a ganhar o jogo.",
    "ideiaCentralTexto": "Não ter vergonha de perguntar ajuda a gente a aprender.",
    "elementos": {
      "personagens": {
        "termos": [
          "Sara",
          "juiz",
          "capitao",
          "time"
        ]
      },
      "problema": {
        "termos": [
          "regras",
          "mao",
          "falta",
          "errou"
        ]
      },
      "tentativa": {
        "termos": [
          "perguntar",
          "explicar",
          "pergunt*",
          "aprend*"
        ]
      },
      "desfecho": {
        "termos": [
          "aprendeu",
          "ganhar",
          "ajudou",
          "aprend*"
        ]
      },
      "ideiaCentral": {
        "termos": [
          "pergunt*",
          "aprend*",
          "duvida",
          "humild*"
        ]
      }
    }
  },
  {
    "id": "rec017",
    "dificuldade": "facil",
    "titulo": "O empate justo",
    "narracao": "Dois times de amigos jogavam no parque e a partida estava muito disputada. Faltando pouco tempo, o placar empatado deixou todo mundo nervoso e cansado. Em vez de discutir, eles combinaram de terminar o jogo no empate e voltar no outro dia. Todos apertaram as mãos, ficaram amigos e marcaram a revanche para o sábado.",
    "ideiaCentralTexto": "Às vezes um acordo justo vale mais do que ganhar de qualquer jeito.",
    "elementos": {
      "personagens": {
        "termos": [
          "amigos",
          "times",
          "criancas",
          "time"
        ]
      },
      "problema": {
        "termos": [
          "empatado",
          "nervoso",
          "disputada",
          "cansado"
        ]
      },
      "tentativa": {
        "termos": [
          "combinaram",
          "acordo",
          "combin*",
          "terminar"
        ]
      },
      "desfecho": {
        "termos": [
          "maos",
          "amigos",
          "revanche",
          "apert*"
        ]
      },
      "ideiaCentral": {
        "termos": [
          "acordo",
          "respeit*",
          "amizade",
          "justo"
        ]
      }
    }
  },
  {
    "id": "rec018",
    "dificuldade": "facil",
    "titulo": "A perna machucada",
    "narracao": "O Vitor era o melhor atacante, mas torceu o pé e não pôde jogar a semifinal. O time ficou preocupado, achando que sem ele não conseguiria vencer o jogo. Então os outros jogadores se uniram e treinaram bastante para cobrir a falta dele. O time jogou unido, fez dois gols e ganhou a vaga para a grande final.",
    "ideiaCentralTexto": "Um time forte não depende de uma só pessoa.",
    "elementos": {
      "personagens": {
        "termos": [
          "Vitor",
          "atacante",
          "time",
          "jogadores"
        ]
      },
      "problema": {
        "termos": [
          "torceu",
          "machuc*",
          "preocupado",
          "falt*"
        ]
      },
      "tentativa": {
        "termos": [
          "uniram",
          "trein*",
          "uni*",
          "cobrir"
        ]
      },
      "desfecho": {
        "termos": [
          "gols",
          "ganhou",
          "final",
          "venc*"
        ]
      },
      "ideiaCentral": {
        "termos": [
          "equipe",
          "uni*",
          "junt*",
          "time"
        ]
      }
    }
  },
  {
    "id": "rec019",
    "dificuldade": "facil",
    "titulo": "O treino na garagem",
    "narracao": "O Enzo queria muito treinar, mas estava chovendo e não dava para ir ao campo. Ele ficou chateado porque tinha um jogo importante no fim de semana. Então o seu pai ajudou a montar um treino de embaixadinhas dentro da garagem. Enzo praticou bastante, melhorou o controle de bola e foi muito bem no jogo.",
    "ideiaCentralTexto": "Sempre dá um jeito de treinar, basta ter vontade.",
    "elementos": {
      "personagens": {
        "termos": [
          "Enzo",
          "pai",
          "menino",
          "familia"
        ]
      },
      "problema": {
        "termos": [
          "chovendo",
          "chateado",
          "chuva",
          "campo"
        ]
      },
      "tentativa": {
        "termos": [
          "ajudou",
          "embaixadinhas",
          "trein*",
          "pratic*"
        ]
      },
      "desfecho": {
        "termos": [
          "melhorou",
          "controle",
          "jogo",
          "melhor*"
        ]
      },
      "ideiaCentral": {
        "termos": [
          "trein*",
          "vontade",
          "esforc*",
          "jeito"
        ]
      }
    }
  },
  {
    "id": "rec020",
    "dificuldade": "facil",
    "titulo": "A torcida amiga",
    "narracao": "O time da Pietra estava perdendo e os jogadores começaram a ficar cabisbaixos. A arquibancada inteira viu a tristeza e resolveu cantar bem alto para animar. As crianças ouviram a torcida, levantaram a cabeça e correram com mais vontade. No último minuto, a Pietra fez o gol de empate e a festa foi enorme.",
    "ideiaCentralTexto": "Uma palavra de incentivo pode mudar o ânimo de alguém.",
    "elementos": {
      "personagens": {
        "termos": [
          "Pietra",
          "torcida",
          "criancas",
          "time"
        ]
      },
      "problema": {
        "termos": [
          "perdendo",
          "cabisbaixos",
          "tristeza",
          "perd*"
        ]
      },
      "tentativa": {
        "termos": [
          "cantar",
          "animar",
          "anim*",
          "incentiv*"
        ]
      },
      "desfecho": {
        "termos": [
          "gol",
          "empate",
          "festa",
          "empat*"
        ]
      },
      "ideiaCentral": {
        "termos": [
          "incentiv*",
          "anim*",
          "apoio",
          "torc*"
        ]
      }
    }
  },
  {
    "id": "rec021",
    "dificuldade": "facil",
    "titulo": "O chute torto",
    "narracao": "O Gabriel sempre chutava a bola torta e mandava para muito longe do gol. Os colegas riam um pouco e ele ficava com vergonha de tentar de novo. O treinador mostrou com calma como posicionar o pé na hora do chute. Gabriel treinou a mira várias vezes e marcou um lindo gol no jogo seguinte.",
    "ideiaCentralTexto": "Com paciência para corrigir os erros, a gente melhora.",
    "elementos": {
      "personagens": {
        "termos": [
          "Gabriel",
          "treinador",
          "colegas",
          "menino"
        ]
      },
      "problema": {
        "termos": [
          "torta",
          "vergonha",
          "longe",
          "errava"
        ]
      },
      "tentativa": {
        "termos": [
          "mostrou",
          "calma",
          "trein*",
          "mira"
        ]
      },
      "desfecho": {
        "termos": [
          "marcou",
          "gol",
          "melhor*",
          "acert*"
        ]
      },
      "ideiaCentral": {
        "termos": [
          "pacien*",
          "trein*",
          "corrig*",
          "melhor*"
        ]
      }
    }
  },
  {
    "id": "rec022",
    "dificuldade": "facil",
    "titulo": "A camisa trocada",
    "narracao": "No dia do jogo, os dois times chegaram com camisas da mesma cor azul. Ficou difícil saber quem era de cada lado e a partida não podia começar. O treinador teve a ideia de pegar uns coletes amarelos no armário da escola. Um time vestiu os coletes, todos se reconheceram e o jogo aconteceu numa boa.",
    "ideiaCentralTexto": "Uma ideia simples pode resolver um problema de repente.",
    "elementos": {
      "personagens": {
        "termos": [
          "treinador",
          "times",
          "jogadores",
          "time"
        ]
      },
      "problema": {
        "termos": [
          "mesma cor",
          "azul",
          "dificil",
          "camisas"
        ]
      },
      "tentativa": {
        "termos": [
          "ideia",
          "coletes",
          "amarelos",
          "pegar"
        ]
      },
      "desfecho": {
        "termos": [
          "vestiu",
          "reconheceram",
          "jogo",
          "aconteceu"
        ]
      },
      "ideiaCentral": {
        "termos": [
          "ideia",
          "solu*",
          "criativ*",
          "jeito"
        ]
      }
    }
  },
  {
    "id": "rec023",
    "dificuldade": "facil",
    "titulo": "O gol de cabeça",
    "narracao": "A Alice nunca tinha feito um gol de cabeça e achava aquilo muito difícil. Toda vez que a bola vinha pelo alto, ela desviava com medo de se machucar. A treinadora Carla explicou como acertar a bola com a testa sem dor. Alice tentou no treino, perdeu o medo e fez um gol de cabeça na partida.",
    "ideiaCentralTexto": "Enfrentar o medo com a técnica certa traz bons resultados.",
    "elementos": {
      "personagens": {
        "termos": [
          "Alice",
          "Carla",
          "treinadora",
          "menina"
        ]
      },
      "problema": {
        "termos": [
          "cabeca",
          "medo",
          "dificil",
          "desviava"
        ]
      },
      "tentativa": {
        "termos": [
          "explicou",
          "testa",
          "trein*",
          "tentou"
        ]
      },
      "desfecho": {
        "termos": [
          "gol",
          "perdeu o medo",
          "marcou",
          "super*"
        ]
      },
      "ideiaCentral": {
        "termos": [
          "medo",
          "tecnic*",
          "enfrent*",
          "super*"
        ]
      }
    }
  },
  {
    "id": "rec024",
    "dificuldade": "facil",
    "titulo": "O atraso do ônibus",
    "narracao": "O time ia viajar para um campeonato, mas o ônibus quebrou e atrasou demais. As crianças ficaram aflitas, com medo de chegar tarde e perder o jogo. Os pais se juntaram e levaram todo mundo de carro até o estádio a tempo. O time chegou correndo, entrou em campo no último minuto e ganhou a partida.",
    "ideiaCentralTexto": "Quando as pessoas se unem, dá para superar qualquer atraso.",
    "elementos": {
      "personagens": {
        "termos": [
          "time",
          "criancas",
          "pais",
          "familia"
        ]
      },
      "problema": {
        "termos": [
          "onibus",
          "quebrou",
          "atrasou",
          "aflitas"
        ]
      },
      "tentativa": {
        "termos": [
          "juntaram",
          "carro",
          "levaram",
          "junt*"
        ]
      },
      "desfecho": {
        "termos": [
          "chegou",
          "ganhou",
          "campo",
          "venc*"
        ]
      },
      "ideiaCentral": {
        "termos": [
          "uni*",
          "junt*",
          "ajud*",
          "equipe"
        ]
      }
    }
  },
  {
    "id": "rec025",
    "dificuldade": "facil",
    "titulo": "A vez da reserva",
    "narracao": "A Duda quase nunca jogava e ficava sempre no banco como reserva do time. Ela treinava muito, mas achava que nunca teria a sua chance de jogar. Um dia uma colega se cansou e o treinador chamou a Duda para entrar. Ela aproveitou a oportunidade, fez um gol importante e virou titular do time.",
    "ideiaCentralTexto": "Continuar se esforçando garante estar pronto quando a chance chega.",
    "elementos": {
      "personagens": {
        "termos": [
          "Duda",
          "treinador",
          "reserva",
          "time"
        ]
      },
      "problema": {
        "termos": [
          "banco",
          "reserva",
          "nunca jogava",
          "chance"
        ]
      },
      "tentativa": {
        "termos": [
          "treinava",
          "entrar",
          "trein*",
          "chamou"
        ]
      },
      "desfecho": {
        "termos": [
          "gol",
          "titular",
          "aproveitou",
          "marc*"
        ]
      },
      "ideiaCentral": {
        "termos": [
          "esforc*",
          "chance",
          "pronto",
          "persist*"
        ]
      }
    }
  },
  {
    "id": "rec026",
    "dificuldade": "facil",
    "titulo": "O cadarço solto",
    "narracao": "No meio da corrida, o cadarço da chuteira do Bento se soltou e ele tropeçou. Ele caiu bem na hora em que ia chutar a bola para o gol adversário. Sem reclamar, o Bento amarrou o cadarço firme e voltou para a jogada. Logo depois ele recebeu um passe, chutou com força e fez o gol da vitória.",
    "ideiaCentralTexto": "Levantar depois de cair e continuar é o que importa.",
    "elementos": {
      "personagens": {
        "termos": [
          "Bento",
          "menino",
          "time",
          "jogador"
        ]
      },
      "problema": {
        "termos": [
          "cadarco",
          "soltou",
          "tropecou",
          "caiu"
        ]
      },
      "tentativa": {
        "termos": [
          "amarrou",
          "voltou",
          "amarr*",
          "levantou"
        ]
      },
      "desfecho": {
        "termos": [
          "gol",
          "vitoria",
          "chutou",
          "marc*"
        ]
      },
      "ideiaCentral": {
        "termos": [
          "levant*",
          "continu*",
          "nao desist*",
          "super*"
        ]
      }
    }
  },
  {
    "id": "rec027",
    "dificuldade": "facil",
    "titulo": "A bola na poça",
    "narracao": "Depois da chuva, uma poça de água enorme se formou bem no meio do campo. A bola parava na poça toda hora e ficava difícil tocar para os amigos. O Téo pegou um balde e, com a ajuda da turma, tirou a água da poça. Com o campo seco, o jogo fluiu melhor e o time do Téo venceu animado.",
    "ideiaCentralTexto": "Resolver o problema junto deixa o jogo melhor para todos.",
    "elementos": {
      "personagens": {
        "termos": [
          "Teo",
          "turma",
          "amigos",
          "time"
        ]
      },
      "problema": {
        "termos": [
          "poca",
          "agua",
          "campo",
          "dificil"
        ]
      },
      "tentativa": {
        "termos": [
          "balde",
          "tirou",
          "ajud*",
          "turma"
        ]
      },
      "desfecho": {
        "termos": [
          "seco",
          "venceu",
          "venc*",
          "melhor"
        ]
      },
      "ideiaCentral": {
        "termos": [
          "junt*",
          "ajud*",
          "equipe",
          "resolv*"
        ]
      }
    }
  },
  {
    "id": "rec028",
    "dificuldade": "facil",
    "titulo": "O grito do treinador",
    "narracao": "O time da Nina estava nervoso porque o jogo decisivo ia começar logo. Os jogadores tremiam de tanto medo de errar na frente da torcida grande. O treinador reuniu todos e disse, com carinho, que era só para se divertirem. Mais leves e sorrindo, eles jogaram solto, marcaram três gols e ganharam fácil.",
    "ideiaCentralTexto": "Jogar por diversão tira a pressão e ajuda a render melhor.",
    "elementos": {
      "personagens": {
        "termos": [
          "Nina",
          "treinador",
          "time",
          "jogadores"
        ]
      },
      "problema": {
        "termos": [
          "nervoso",
          "medo",
          "tremiam",
          "errar"
        ]
      },
      "tentativa": {
        "termos": [
          "reuniu",
          "carinho",
          "divert*",
          "reun*"
        ]
      },
      "desfecho": {
        "termos": [
          "gols",
          "ganharam",
          "jogaram",
          "venc*"
        ]
      },
      "ideiaCentral": {
        "termos": [
          "divert*",
          "pressao",
          "leves",
          "tranquil*"
        ]
      }
    }
  },
  {
    "id": "rec029",
    "dificuldade": "facil",
    "titulo": "O empréstimo de jogador",
    "narracao": "O time vermelho chegou para o jogo com um jogador a menos do que precisava. Sem o número certo de crianças, a partida quase não pôde acontecer. O capitão do time azul ofereceu um dos seus amigos para completar o adversário. Com os dois times completos, todos jogaram felizes e o jogo terminou empatado.",
    "ideiaCentralTexto": "Ajudar até o adversário mostra um grande espírito esportivo.",
    "elementos": {
      "personagens": {
        "termos": [
          "capitao",
          "times",
          "jogador",
          "amigos"
        ]
      },
      "problema": {
        "termos": [
          "a menos",
          "faltava",
          "completa*",
          "falt*"
        ]
      },
      "tentativa": {
        "termos": [
          "ofereceu",
          "emprest*",
          "completar",
          "amigo"
        ]
      },
      "desfecho": {
        "termos": [
          "completos",
          "jogaram",
          "empatado",
          "felizes"
        ]
      },
      "ideiaCentral": {
        "termos": [
          "ajud*",
          "respeit*",
          "espirito esportivo",
          "fair play"
        ]
      }
    }
  },
  {
    "id": "rec030",
    "dificuldade": "facil",
    "titulo": "A festa do gol",
    "narracao": "O time tinha um costume de comemorar todos os gols com uma dança bem engraçada. Mas um dia eles esqueceram a dança e ficaram tristes depois de marcar. A Yasmin propôs que todos inventassem uma comemoração nova bem ali na hora. Eles criaram uma dança nova, riram muito e o time ganhou o jogo bem animado.",
    "ideiaCentralTexto": "A criatividade transforma um problema em um momento divertido.",
    "elementos": {
      "personagens": {
        "termos": [
          "Yasmin",
          "time",
          "criancas",
          "jogadores"
        ]
      },
      "problema": {
        "termos": [
          "esqueceram",
          "danca",
          "tristes",
          "esquec*"
        ]
      },
      "tentativa": {
        "termos": [
          "propos",
          "inventassem",
          "invent*",
          "nova"
        ]
      },
      "desfecho": {
        "termos": [
          "criaram",
          "riram",
          "ganhou",
          "animado"
        ]
      },
      "ideiaCentral": {
        "termos": [
          "criativ*",
          "invent*",
          "divert*",
          "jeito"
        ]
      }
    }
  },
  {
    "id": "rec031",
    "dificuldade": "medio",
    "titulo": "A capitã e o gramado encharcado",
    "narracao": "A capitã Helena liderava o time Tempestade na final, mas a chuva forte deixou o gramado encharcado e a bola não rolava direito. Para piorar, a goleira Rita torceu o tornozelo e precisou sair machucada. Helena reuniu as colegas e mudou a estratégia: passes curtos no chão e a lateral Duda foi improvisada no gol. Todas se esforçaram e marcaram a marcação com paciência. No fim, o Tempestade venceu por 1 a 0 com um gol de cabeça. Helena mostrou que uma boa liderança adapta o plano quando tudo dá errado.",
    "ideiaCentralTexto": "Uma boa líder adapta o plano e mantém a equipe unida diante dos imprevistos.",
    "elementos": {
      "personagens": {
        "termos": [
          "Helena",
          "capit*",
          "Rita",
          "goleir*",
          "Duda",
          "time"
        ]
      },
      "problema": {
        "termos": [
          "chuva",
          "encharcado",
          "gramado",
          "tornozelo",
          "machucada",
          "machuc*"
        ]
      },
      "tentativa": {
        "termos": [
          "reuniu",
          "reun*",
          "estrategia",
          "passes",
          "esforc*",
          "improvis*"
        ]
      },
      "desfecho": {
        "termos": [
          "venceu",
          "venc*",
          "gol",
          "1 a 0",
          "cabeca"
        ]
      },
      "ideiaCentral": {
        "termos": [
          "lideranca",
          "lider*",
          "adapt*",
          "unid*",
          "equipe",
          "junt*"
        ]
      }
    }
  },
  {
    "id": "rec032",
    "dificuldade": "medio",
    "titulo": "O atacante que aprendeu a passar",
    "narracao": "Bruno era o atacante mais veloz do time Foguete, mas só pensava em fazer gol sozinho e nunca passava a bola. Por causa disso, os colegas ficavam parados e o time perdia muitas chances. Um dia o treinador Sérgio mostrou um vídeo e pediu que Bruno tentasse dar assistências aos amigos. No jogo seguinte, Bruno passou para a Lara, que marcou, e depois para o Téo, que ampliou o placar. O Foguete venceu por 3 a 1 e todos comemoraram juntos. Bruno entendeu que dividir a bola faz o time inteiro brilhar.",
    "ideiaCentralTexto": "Dividir a bola e jogar em equipe rende mais do que tentar tudo sozinho.",
    "elementos": {
      "personagens": {
        "termos": [
          "Bruno",
          "atacante",
          "Sergio",
          "treinador",
          "Lara",
          "Teo"
        ]
      },
      "problema": {
        "termos": [
          "sozinho",
          "nunca passava",
          "parados",
          "perdia",
          "perd*",
          "chances"
        ]
      },
      "tentativa": {
        "termos": [
          "treinador",
          "video",
          "assistencias",
          "passou",
          "pass*",
          "tent*"
        ]
      },
      "desfecho": {
        "termos": [
          "venceu",
          "venc*",
          "3 a 1",
          "marcou",
          "comemoraram",
          "comemor*"
        ]
      },
      "ideiaCentral": {
        "termos": [
          "dividir",
          "equipe",
          "junt*",
          "compartilh*",
          "time",
          "ajud*"
        ]
      }
    }
  },
  {
    "id": "rec033",
    "dificuldade": "medio",
    "titulo": "A jogadora cadeirante no campeonato",
    "narracao": "Mariana adorava futebol, mas usava cadeira de rodas e achava que nunca poderia entrar em campo com a turma. A professora Cláudia descobriu o futebol adaptado e organizou um treino para todos jogarem juntos. No começo alguns colegas tinham vergonha e não sabiam como ajudar, o que deixou Mariana triste. Então o capitão Igor convidou a turma a treinar as regras novas e a torcer pela amiga. No campeonato da escola, Mariana fez um gol de pênalti e a arquibancada inteira gritou. Ela provou que incluir quem é diferente deixa o esporte muito melhor.",
    "ideiaCentralTexto": "Incluir quem é diferente torna o esporte mais justo e mais bonito para todos.",
    "elementos": {
      "personagens": {
        "termos": [
          "Mariana",
          "Claudia",
          "professora",
          "Igor",
          "capit*"
        ]
      },
      "problema": {
        "termos": [
          "cadeira",
          "vergonha",
          "triste",
          "nunca poderia",
          "sozinha",
          "diferente"
        ]
      },
      "tentativa": {
        "termos": [
          "adaptado",
          "organizou",
          "organiz*",
          "treino",
          "trein*",
          "convidou",
          "regras"
        ]
      },
      "desfecho": {
        "termos": [
          "gol",
          "penalti",
          "gritou",
          "campeonato",
          "comemor*",
          "venc*"
        ]
      },
      "ideiaCentral": {
        "termos": [
          "incluir",
          "inclu*",
          "diferente",
          "junt*",
          "respeit*",
          "todos"
        ]
      }
    }
  },
  {
    "id": "rec034",
    "dificuldade": "medio",
    "titulo": "O pênalti da honestidade",
    "narracao": "No último minuto da final, o zagueiro Rafael caiu na área e o juiz marcou pênalti a favor do time dele, o Leões. Só que Rafael sabia que tinha se jogado de propósito e ninguém o havia derrubado. Ele ficou dividido: cobrar o pênalti garantiria o título, mas seria uma trapaça. Rafael chamou o árbitro e contou a verdade, mesmo com os colegas reclamando. O juiz voltou atrás e o jogo terminou empatado, indo para os pênaltis de verdade, que os Leões venceram. No fim, todos ficaram orgulhosos porque Rafael escolheu o fair play.",
    "ideiaCentralTexto": "Ser honesto vale mais do que ganhar com trapaça.",
    "elementos": {
      "personagens": {
        "termos": [
          "Rafael",
          "zagueiro",
          "juiz",
          "arbitro",
          "Leoes",
          "time"
        ]
      },
      "problema": {
        "termos": [
          "penalti",
          "jogado",
          "proposito",
          "trapaca",
          "dividido",
          "mentir*"
        ]
      },
      "tentativa": {
        "termos": [
          "chamou",
          "contou",
          "verdade",
          "honest*",
          "arbitro",
          "voltou atras"
        ]
      },
      "desfecho": {
        "termos": [
          "empatado",
          "penaltis",
          "venceram",
          "venc*",
          "orgulhosos",
          "titulo"
        ]
      },
      "ideiaCentral": {
        "termos": [
          "honest*",
          "fair play",
          "verdade",
          "trapaca",
          "justo",
          "etic*"
        ]
      }
    }
  },
  {
    "id": "rec035",
    "dificuldade": "medio",
    "titulo": "A rivalidade que virou amizade",
    "narracao": "Os times do bairro, Estrela e Cometa, viviam brigando e nunca se cumprimentavam depois dos jogos. A goleira Paula, do Estrela, e o capitão Léo, do Cometa, eram os que mais provocavam um ao outro. Numa partida, um temporal alagou o campo e os dois times ficaram presos no mesmo vestiário esperando passar. Sem ter o que fazer, começaram a conversar e descobriram que gostavam das mesmas músicas e jogadas. Quando a chuva parou, decidiram fazer um amistoso só por diversão, sem placar. A partir daquele dia, a rivalidade virou respeito e Paula e Léo viraram grandes amigos.",
    "ideiaCentralTexto": "Conhecer melhor o outro transforma rivalidade em respeito e amizade.",
    "elementos": {
      "personagens": {
        "termos": [
          "Paula",
          "goleir*",
          "Leo",
          "capit*",
          "Estrela",
          "Cometa"
        ]
      },
      "problema": {
        "termos": [
          "brigando",
          "provocavam",
          "rivalidade",
          "temporal",
          "alagou",
          "presos"
        ]
      },
      "tentativa": {
        "termos": [
          "conversar",
          "convers*",
          "descobriram",
          "amistoso",
          "diversao",
          "vestiario"
        ]
      },
      "desfecho": {
        "termos": [
          "respeito",
          "amigos",
          "amizade",
          "amig*",
          "parou",
          "junt*"
        ]
      },
      "ideiaCentral": {
        "termos": [
          "respeit*",
          "amizade",
          "amig*",
          "rivalidade",
          "conhec*",
          "uni*"
        ]
      }
    }
  },
  {
    "id": "rec036",
    "dificuldade": "medio",
    "titulo": "O treino na quadra emprestada",
    "narracao": "O time Andorinha não tinha campo próprio e treinava num terreno cheio de buracos e pedras. Por causa disso, vários jogadores se machucavam e a treinadora Vera ficava preocupada. A capitã Sofia teve a ideia de pedir a quadra da escola emprestada nos fins de semana. A turma juntou dinheiro de uma rifa para comprar bolas novas e cones. Com um lugar seguro para treinar, o time melhorou rápido e chegou à final da liga. O Andorinha levantou o troféu e aprendeu que com organização e união se conquista até o que parecia impossível.",
    "ideiaCentralTexto": "Com organização e união, um grupo conquista até o que parecia impossível.",
    "elementos": {
      "personagens": {
        "termos": [
          "Vera",
          "treinador*",
          "Sofia",
          "capit*",
          "Andorinha",
          "time"
        ]
      },
      "problema": {
        "termos": [
          "buracos",
          "pedras",
          "machucavam",
          "machuc*",
          "preocupada",
          "terreno"
        ]
      },
      "tentativa": {
        "termos": [
          "ideia",
          "emprestada",
          "rifa",
          "juntou",
          "junt*",
          "quadra",
          "comprar"
        ]
      },
      "desfecho": {
        "termos": [
          "final",
          "trofeu",
          "melhorou",
          "venc*",
          "conquist*",
          "levantou"
        ]
      },
      "ideiaCentral": {
        "termos": [
          "organiz*",
          "uni*",
          "junt*",
          "equipe",
          "esforc*",
          "impossivel"
        ]
      }
    }
  },
  {
    "id": "rec037",
    "dificuldade": "medio",
    "titulo": "A estratégia contra o time mais forte",
    "narracao": "O pequeno time Centelha precisava enfrentar o Trovão, que era muito mais alto e mais forte. O capitão Davi sabia que no jogo físico eles não teriam chance nenhuma. Então o treinador Otávio bolou um plano: jogar com a bola sempre no chão e correr nos espaços vazios. Durante a semana eles treinaram passes rápidos e a meia Nina decorou os movimentos. No jogo, o Centelha cansou o adversário com toques curtos e a Nina marcou o gol da vitória nos minutos finais. O time provou que inteligência e estratégia podem vencer a força bruta.",
    "ideiaCentralTexto": "Inteligência e estratégia podem superar a força bruta.",
    "elementos": {
      "personagens": {
        "termos": [
          "Davi",
          "capit*",
          "Otavio",
          "treinador",
          "Nina",
          "Centelha"
        ]
      },
      "problema": {
        "termos": [
          "mais forte",
          "mais alto",
          "sem chance",
          "fisico",
          "Trovao",
          "forca"
        ]
      },
      "tentativa": {
        "termos": [
          "plano",
          "estrategia",
          "treinaram",
          "trein*",
          "passes",
          "espacos",
          "chao"
        ]
      },
      "desfecho": {
        "termos": [
          "marcou",
          "gol",
          "vitoria",
          "venc*",
          "cansou",
          "finais"
        ]
      },
      "ideiaCentral": {
        "termos": [
          "inteligencia",
          "estrategia",
          "esperto",
          "plano",
          "pensar",
          "forca"
        ]
      }
    }
  },
  {
    "id": "rec038",
    "dificuldade": "medio",
    "titulo": "O goleiro que perdeu a confiança",
    "narracao": "Depois de falhar num gol bobo, o goleiro Tomás perdeu toda a confiança e começou a tremer só de ver a bola chegar. Os adversários perceberam e passaram a chutar de longe para testá-lo, o que deixou o time Raio nervoso. A treinadora Bia chamou Tomás para uma conversa e treinou com ele defesas fáceis para ele lembrar do que sabia fazer. Aos poucos, com apoio dos colegas, Tomás voltou a confiar em si mesmo. No jogo decisivo, ele defendeu um pênalti difícil e segurou o empate. Tomás descobriu que errar faz parte e que recomeçar com apoio devolve a coragem.",
    "ideiaCentralTexto": "Errar faz parte; com apoio e treino é possível recuperar a confiança.",
    "elementos": {
      "personagens": {
        "termos": [
          "Tomas",
          "goleir*",
          "Bia",
          "treinador*",
          "Raio",
          "time"
        ]
      },
      "problema": {
        "termos": [
          "falhar",
          "falh*",
          "confianca",
          "tremer",
          "nervoso",
          "errar"
        ]
      },
      "tentativa": {
        "termos": [
          "conversa",
          "convers*",
          "treinou",
          "trein*",
          "apoio",
          "defesas"
        ]
      },
      "desfecho": {
        "termos": [
          "defendeu",
          "defend*",
          "penalti",
          "empate",
          "segurou",
          "venc*"
        ]
      },
      "ideiaCentral": {
        "termos": [
          "errar",
          "confianca",
          "apoio",
          "coragem",
          "recomec*",
          "tent*"
        ]
      }
    }
  },
  {
    "id": "rec039",
    "dificuldade": "medio",
    "titulo": "A bola furada antes da final",
    "narracao": "Na manhã da grande final, o time Vento descobriu que a única bola boa estava furada e nenhuma loja perto estava aberta. O capitão Murilo ficou desesperado, porque sem bola não haveria jogo. A meia Clara lembrou que o vovô dela consertava câmaras de bicicleta e talvez soubesse remendar a bola. Os dois pedalaram até a casa do vovô Antônio, que colou o furo com um remendo caprichado. Eles voltaram correndo e a bola aguentou a partida inteira, que o Vento venceu nos pênaltis. A turma aprendeu que pensar com calma e pedir ajuda resolve quase qualquer imprevisto.",
    "ideiaCentralTexto": "Diante de um imprevisto, pensar com calma e pedir ajuda quase sempre resolve.",
    "elementos": {
      "personagens": {
        "termos": [
          "Murilo",
          "capit*",
          "Clara",
          "Antonio",
          "vovo",
          "Vento"
        ]
      },
      "problema": {
        "termos": [
          "furada",
          "furo",
          "sem bola",
          "desesperado",
          "fechada",
          "imprevisto"
        ]
      },
      "tentativa": {
        "termos": [
          "lembrou",
          "remendar",
          "remendo",
          "consertava",
          "colou",
          "pedalaram",
          "ajuda"
        ]
      },
      "desfecho": {
        "termos": [
          "aguentou",
          "venceu",
          "venc*",
          "penaltis",
          "voltaram",
          "jogo"
        ]
      },
      "ideiaCentral": {
        "termos": [
          "calma",
          "ajuda",
          "ajud*",
          "imprevisto",
          "pensar",
          "resolv*"
        ]
      }
    }
  },
  {
    "id": "rec040",
    "dificuldade": "medio",
    "titulo": "A líder que aprendeu a ouvir",
    "narracao": "A capitã Júlia era muito boa de bola, mas gritava com as colegas e decidia tudo sozinha. Por isso, o time Aurora estava desunido e várias meninas pensavam em desistir. A treinadora Sandra conversou com Júlia e sugeriu que ela ouvisse as ideias das companheiras antes de cada jogo. Na reunião seguinte, Júlia perguntou a opinião da Bruna e da Lia e montou a tática junto com elas. O time se sentiu valorizado, jogou unido e venceu o clássico por 2 a 1. Júlia entendeu que uma boa líder também sabe ouvir e respeitar o grupo.",
    "ideiaCentralTexto": "Liderar bem é também ouvir e respeitar as ideias do grupo.",
    "elementos": {
      "personagens": {
        "termos": [
          "Julia",
          "capit*",
          "Sandra",
          "treinador*",
          "Bruna",
          "Lia"
        ]
      },
      "problema": {
        "termos": [
          "gritava",
          "sozinha",
          "desunido",
          "desistir",
          "desist*",
          "brigava"
        ]
      },
      "tentativa": {
        "termos": [
          "conversou",
          "convers*",
          "ouvisse",
          "ouvir",
          "opiniao",
          "ideias",
          "perguntou"
        ]
      },
      "desfecho": {
        "termos": [
          "unido",
          "venceu",
          "venc*",
          "2 a 1",
          "classico",
          "valorizado"
        ]
      },
      "ideiaCentral": {
        "termos": [
          "ouvir",
          "respeit*",
          "lideranca",
          "lider*",
          "grupo",
          "junt*"
        ]
      }
    }
  },
  {
    "id": "rec041",
    "dificuldade": "medio",
    "titulo": "O menino que não enxergava bem",
    "narracao": "Caio amava futebol, mas enxergava pouco e sempre errava a direção do passe, o que fazia alguns colegas rirem dele. O treinador Paulo percebeu o problema e descobriu que Caio precisava de óculos esportivos. Enquanto o óculos não chegava, a turma teve a ideia de chamar o nome de quem estava livre para Caio passar pelo som. A capitã Manu organizou os gritos e todos treinaram a se comunicar em campo. Quando o óculos chegou, Caio já tinha melhorado muito e deu o passe para o gol do título. O time descobriu que ajudar um colega faz todo mundo jogar melhor.",
    "ideiaCentralTexto": "Quando o grupo se adapta para ajudar um colega, todos jogam melhor.",
    "elementos": {
      "personagens": {
        "termos": [
          "Caio",
          "Paulo",
          "treinador",
          "Manu",
          "capit*",
          "time"
        ]
      },
      "problema": {
        "termos": [
          "enxergava",
          "errava",
          "rirem",
          "pouco",
          "oculos",
          "direcao"
        ]
      },
      "tentativa": {
        "termos": [
          "ideia",
          "chamar",
          "nome",
          "som",
          "comunicar",
          "gritos",
          "organizou"
        ]
      },
      "desfecho": {
        "termos": [
          "melhorado",
          "melhor*",
          "passe",
          "gol",
          "titulo",
          "venc*"
        ]
      },
      "ideiaCentral": {
        "termos": [
          "ajudar",
          "ajud*",
          "adapt*",
          "junt*",
          "inclu*",
          "colega"
        ]
      }
    }
  },
  {
    "id": "rec042",
    "dificuldade": "medio",
    "titulo": "A treinadora e a regra justa",
    "narracao": "O time Falcão tinha muitos jogadores e a treinadora Renata percebeu que os mesmos titulares jogavam sempre, enquanto Léo e Duda ficavam só no banco. Isso deixava o grupo dividido e os reservas desanimados. Renata criou uma regra: todo mundo jogaria pelo menos um tempo em cada partida. No começo alguns titulares reclamaram, achando que iam perder mais. Mas com mais gente rodando, o time ficou descansado e Duda marcou um gol importante na semifinal. O Falcão chegou à final unido e entendeu que tratar todos com justiça fortalece a equipe.",
    "ideiaCentralTexto": "Tratar todos com justiça e dar oportunidade a cada um fortalece a equipe.",
    "elementos": {
      "personagens": {
        "termos": [
          "Renata",
          "treinador*",
          "Leo",
          "Duda",
          "Falcao",
          "time"
        ]
      },
      "problema": {
        "termos": [
          "titulares",
          "banco",
          "dividido",
          "desanimados",
          "reservas",
          "sempre"
        ]
      },
      "tentativa": {
        "termos": [
          "regra",
          "jogaria",
          "rodando",
          "oportunidade",
          "tempo",
          "criou"
        ]
      },
      "desfecho": {
        "termos": [
          "marcou",
          "gol",
          "semifinal",
          "final",
          "unido",
          "venc*"
        ]
      },
      "ideiaCentral": {
        "termos": [
          "justica",
          "justo",
          "oportunidade",
          "equipe",
          "todos",
          "junt*"
        ]
      }
    }
  },
  {
    "id": "rec043",
    "dificuldade": "medio",
    "titulo": "O sol que cegava o goleiro",
    "narracao": "No segundo tempo da semifinal, o sol bateu de frente no gol e o goleiro Vitor não conseguia ver os chutes. O adversário aproveitou e quase virou o jogo com dois arremates perigosos. O capitão Enzo pediu tempo e, junto com o treinador, decidiu trocar o esquema e marcar o atacante bem longe da área. A zagueira Pietra passou a cortar os cruzamentos antes que chegassem ao gol ofuscado. Com a defesa reorganizada, o time Sol Nascente segurou o resultado e venceu por 2 a 1. Eles aprenderam que ler o problema e mudar o plano a tempo evita o desastre.",
    "ideiaCentralTexto": "Ler o problema a tempo e mudar o plano evita que tudo dê errado.",
    "elementos": {
      "personagens": {
        "termos": [
          "Vitor",
          "goleir*",
          "Enzo",
          "capit*",
          "Pietra",
          "zagueir*"
        ]
      },
      "problema": {
        "termos": [
          "sol",
          "ofuscado",
          "nao conseguia ver",
          "cegava",
          "perigosos",
          "virou"
        ]
      },
      "tentativa": {
        "termos": [
          "tempo",
          "trocar",
          "esquema",
          "marcar",
          "cortar",
          "reorganiz*"
        ]
      },
      "desfecho": {
        "termos": [
          "segurou",
          "venceu",
          "venc*",
          "2 a 1",
          "resultado",
          "defesa"
        ]
      },
      "ideiaCentral": {
        "termos": [
          "adapt*",
          "plano",
          "estrategia",
          "mudar",
          "pensar",
          "junt*"
        ]
      }
    }
  },
  {
    "id": "rec044",
    "dificuldade": "medio",
    "titulo": "A irmã caçula no time dos grandes",
    "narracao": "Bia era a mais nova do time e os jogadores maiores achavam que ela era fraca demais para jogar na final. Seu irmão Gabriel, o capitão, ficava dividido entre proteger a irmã e escalar quem o grupo queria. A treinadora Marta resolveu fazer um teste justo e cronometrou a velocidade de todos. Para surpresa de muitos, Bia foi a mais rápida e ainda driblava muito bem. Gabriel a escalou e, no jogo, Bia deu três assistências que levaram o time Relâmpago ao título. Todos aprenderam que não se deve julgar alguém pelo tamanho ou pela idade.",
    "ideiaCentralTexto": "Não se julga alguém pelo tamanho ou pela idade; cada um tem seu valor.",
    "elementos": {
      "personagens": {
        "termos": [
          "Bia",
          "Gabriel",
          "capit*",
          "Marta",
          "treinador*",
          "irma"
        ]
      },
      "problema": {
        "termos": [
          "mais nova",
          "fraca",
          "julgavam",
          "dividido",
          "tamanho",
          "idade"
        ]
      },
      "tentativa": {
        "termos": [
          "teste",
          "cronometrou",
          "velocidade",
          "justo",
          "driblava",
          "escalou"
        ]
      },
      "desfecho": {
        "termos": [
          "rapida",
          "assistencias",
          "titulo",
          "venc*",
          "levaram",
          "gol"
        ]
      },
      "ideiaCentral": {
        "termos": [
          "julgar",
          "valor",
          "idade",
          "tamanho",
          "respeit*",
          "capaz"
        ]
      }
    }
  },
  {
    "id": "rec045",
    "dificuldade": "medio",
    "titulo": "O torcedor que invadiu o campo",
    "narracao": "Durante a decisão, um torcedor nervoso invadiu o campo para reclamar do juiz e a partida foi interrompida. O capitão Heitor, do time Aurora, e a capitã Lis, do time rival, temeram que o jogo fosse cancelado e ninguém levasse o troféu. Em vez de brigar, os dois capitães foram juntos conversar com o torcedor e pediram calma com educação. A segurança acompanhou o homem para fora e o juiz pôde recomeçar a partida. No fim, o Aurora venceu nos pênaltis, mas os dois times se cumprimentaram pelo bom exemplo. Eles mostraram que resolver conflitos com diálogo é melhor do que com briga.",
    "ideiaCentralTexto": "Conflitos se resolvem melhor com diálogo e calma do que com briga.",
    "elementos": {
      "personagens": {
        "termos": [
          "Heitor",
          "capit*",
          "Lis",
          "juiz",
          "torcedor",
          "Aurora"
        ]
      },
      "problema": {
        "termos": [
          "invadiu",
          "interrompida",
          "nervoso",
          "cancelado",
          "reclamar",
          "conflito"
        ]
      },
      "tentativa": {
        "termos": [
          "conversar",
          "convers*",
          "calma",
          "educacao",
          "pediram",
          "dialogo",
          "junt*"
        ]
      },
      "desfecho": {
        "termos": [
          "recomecar",
          "venceu",
          "venc*",
          "penaltis",
          "cumprimentaram",
          "trofeu"
        ]
      },
      "ideiaCentral": {
        "termos": [
          "dialogo",
          "calma",
          "conflito",
          "paz",
          "respeit*",
          "convers*"
        ]
      }
    }
  },
  {
    "id": "rec046",
    "dificuldade": "medio",
    "titulo": "A goleira surda e os sinais",
    "narracao": "Laís era uma ótima goleira, mas era surda e não escutava os gritos da defesa durante o jogo. Por isso, às vezes ela saía do gol na hora errada e o time Cometa levava gols fáceis. O capitão Nando teve a ideia de criar sinais com as mãos para avisar a Laís sobre cada jogada. A turma treinou os gestos a semana inteira e a meia Sofia ajudou a Laís a decorar tudo. No campeonato, os sinais funcionaram, Laís defendeu um pênalti decisivo e o Cometa foi campeão. O time aprendeu que existem muitos jeitos de se comunicar e incluir um amigo.",
    "ideiaCentralTexto": "Existem muitos jeitos de se comunicar e incluir um amigo na equipe.",
    "elementos": {
      "personagens": {
        "termos": [
          "Lais",
          "goleir*",
          "Nando",
          "capit*",
          "Sofia",
          "Cometa"
        ]
      },
      "problema": {
        "termos": [
          "surda",
          "nao escutava",
          "gritos",
          "hora errada",
          "fáceis",
          "gols"
        ]
      },
      "tentativa": {
        "termos": [
          "sinais",
          "maos",
          "gestos",
          "treinou",
          "trein*",
          "decorar",
          "avisar"
        ]
      },
      "desfecho": {
        "termos": [
          "defendeu",
          "defend*",
          "penalti",
          "campeao",
          "venc*",
          "funcionaram"
        ]
      },
      "ideiaCentral": {
        "termos": [
          "comunicar",
          "incluir",
          "inclu*",
          "junt*",
          "jeitos",
          "ajud*"
        ]
      }
    }
  },
  {
    "id": "rec047",
    "dificuldade": "medio",
    "titulo": "O capitão lesionado e o substituto tímido",
    "narracao": "A uma semana da final, o capitão Diego machucou o joelho e não poderia jogar de jeito nenhum. O time Trovão ficou abalado, pois ele era o melhor jogador e o líder de todos. Diego decidiu treinar o tímido Vini para assumir a faixa de capitão e passou todas as suas dicas. Vini tinha medo de falhar e quase desistiu, mas Diego ficou na beira do campo o incentivando. No jogo, Vini liderou os colegas, marcou de cabeça e o Trovão venceu por 1 a 0. A equipe entendeu que um bom líder prepara outros para brilharem também.",
    "ideiaCentralTexto": "Um bom líder prepara e incentiva os outros para que também possam brilhar.",
    "elementos": {
      "personagens": {
        "termos": [
          "Diego",
          "capit*",
          "Vini",
          "time",
          "Trovao",
          "lider*"
        ]
      },
      "problema": {
        "termos": [
          "machucou",
          "machuc*",
          "joelho",
          "abalado",
          "medo",
          "desistiu"
        ]
      },
      "tentativa": {
        "termos": [
          "treinar",
          "trein*",
          "dicas",
          "incentivando",
          "incentiv*",
          "preparou",
          "apoio"
        ]
      },
      "desfecho": {
        "termos": [
          "liderou",
          "lider*",
          "marcou",
          "venceu",
          "venc*",
          "1 a 0"
        ]
      },
      "ideiaCentral": {
        "termos": [
          "lider*",
          "preparar",
          "incentiv*",
          "ensin*",
          "apoio",
          "junt*"
        ]
      }
    }
  },
  {
    "id": "rec048",
    "dificuldade": "medio",
    "titulo": "A enchente e o mutirão do bairro",
    "narracao": "Uma enchente alagou o campinho do bairro e encheu tudo de lama poucos dias antes do torneio. As crianças do time Garra ficaram tristes, achando que o campeonato seria cancelado. A capitã Yara reuniu a turma e propôs um mutirão para limpar o campo com pás, baldes e a ajuda dos vizinhos. Até o senhor Joaquim, dono da padaria, emprestou ferramentas e levou pão para todos. Depois de dois dias de trabalho duro, o campo ficou limpo e o torneio aconteceu, com o Garra vencendo a final. O bairro inteiro aprendeu que quando a comunidade se une, qualquer obstáculo é superado.",
    "ideiaCentralTexto": "Quando a comunidade se une, qualquer obstáculo pode ser superado.",
    "elementos": {
      "personagens": {
        "termos": [
          "Yara",
          "capit*",
          "Joaquim",
          "vizinhos",
          "Garra",
          "time"
        ]
      },
      "problema": {
        "termos": [
          "enchente",
          "alagou",
          "lama",
          "tristes",
          "cancelado",
          "obstaculo"
        ]
      },
      "tentativa": {
        "termos": [
          "mutirao",
          "limpar",
          "pas",
          "baldes",
          "ajuda",
          "trabalho",
          "reuniu"
        ]
      },
      "desfecho": {
        "termos": [
          "limpo",
          "torneio",
          "venceu",
          "venc*",
          "aconteceu",
          "final"
        ]
      },
      "ideiaCentral": {
        "termos": [
          "comunidade",
          "uni*",
          "junt*",
          "ajud*",
          "equipe",
          "superado"
        ]
      }
    }
  },
  {
    "id": "rec049",
    "dificuldade": "medio",
    "titulo": "A estrela que aprendeu humildade",
    "narracao": "Téo era o craque do time Veloz e estava cheio de si depois de sair numa reportagem do jornal da escola. Ele começou a chegar atrasado nos treinos e a desprezar os colegas, achando que ganharia sozinho. Por causa disso, o time perdeu a sintonia e tomou uma goleada feia na estreia. A treinadora Olga conversou em particular e mostrou a Téo como ele havia magoado os amigos. Arrependido, Téo pediu desculpas, voltou a treinar sério e ajudou os companheiros. No jogo seguinte, o Veloz jogou unido de novo e venceu de virada por 4 a 3. Téo aprendeu que talento sem humildade não leva ninguém longe.",
    "ideiaCentralTexto": "Talento sem humildade não leva longe; respeitar os colegas é essencial.",
    "elementos": {
      "personagens": {
        "termos": [
          "Teo",
          "craque",
          "Olga",
          "treinador*",
          "Veloz",
          "time"
        ]
      },
      "problema": {
        "termos": [
          "cheio de si",
          "atrasado",
          "desprezar",
          "goleada",
          "sozinho",
          "magoado"
        ]
      },
      "tentativa": {
        "termos": [
          "conversou",
          "convers*",
          "desculpas",
          "arrependido",
          "treinar",
          "trein*",
          "ajudou"
        ]
      },
      "desfecho": {
        "termos": [
          "unido",
          "venceu",
          "venc*",
          "virada",
          "4 a 3",
          "comemor*"
        ]
      },
      "ideiaCentral": {
        "termos": [
          "humildade",
          "respeit*",
          "desculp*",
          "junt*",
          "talento",
          "amigos"
        ]
      }
    }
  },
  {
    "id": "rec050",
    "dificuldade": "medio",
    "titulo": "O apito que falhou",
    "narracao": "No meio da partida, o apito do juiz Ramiro quebrou e ninguém sabia quando parar as jogadas, gerando confusão no campo. Os jogadores continuavam correndo mesmo quando a bola saía e quase houve uma briga entre o time Sol e o time Lua. A capitã Helô teve a ideia de usar a sineta do lanche da escola como apito improvisado. O professor Caio buscou a sineta e o juiz Ramiro voltou a comandar o jogo direitinho. A partida terminou em paz, com empate, e os dois times agradeceram a solução criativa. Todos perceberam que uma ideia simples e a calma podem salvar uma situação difícil.",
    "ideiaCentralTexto": "Uma ideia simples e a calma podem salvar uma situação difícil.",
    "elementos": {
      "personagens": {
        "termos": [
          "Ramiro",
          "juiz",
          "Helo",
          "capit*",
          "Caio",
          "professor"
        ]
      },
      "problema": {
        "termos": [
          "apito",
          "quebrou",
          "confusao",
          "briga",
          "falhou",
          "parar"
        ]
      },
      "tentativa": {
        "termos": [
          "ideia",
          "sineta",
          "improvisado",
          "improvis*",
          "buscou",
          "voltou",
          "usar"
        ]
      },
      "desfecho": {
        "termos": [
          "empate",
          "paz",
          "terminou",
          "agradeceram",
          "solucao",
          "comandar"
        ]
      },
      "ideiaCentral": {
        "termos": [
          "ideia",
          "calma",
          "criativa",
          "simples",
          "resolv*",
          "pensar"
        ]
      }
    }
  },
  {
    "id": "rec051",
    "dificuldade": "medio",
    "titulo": "A jogadora estrangeira",
    "narracao": "Aicha chegou de outro país e entrou no time Estrela, mas falava pouco português e se sentia muito sozinha. Nos treinos, ela não entendia as instruções da treinadora e errava as jogadas combinadas. O capitão Léo teve a ideia de desenhar as táticas num quadro com setas e bonequinhos para todos entenderem. A meia Duda também aprendeu algumas palavras na língua de Aicha para deixá-la mais à vontade. Logo Aicha se integrou, fez amigos e marcou um golaço na final que deu o título ao Estrela. A turma aprendeu que acolher quem vem de longe enriquece todo o grupo.",
    "ideiaCentralTexto": "Acolher quem vem de longe e de outra cultura enriquece todo o grupo.",
    "elementos": {
      "personagens": {
        "termos": [
          "Aicha",
          "Leo",
          "capit*",
          "Duda",
          "Estrela",
          "time"
        ]
      },
      "problema": {
        "termos": [
          "outro pais",
          "pouco portugues",
          "sozinha",
          "nao entendia",
          "errava",
          "lingua"
        ]
      },
      "tentativa": {
        "termos": [
          "ideia",
          "desenhar",
          "quadro",
          "setas",
          "palavras",
          "aprendeu",
          "taticas"
        ]
      },
      "desfecho": {
        "termos": [
          "integrou",
          "amigos",
          "golaco",
          "titulo",
          "venc*",
          "marcou"
        ]
      },
      "ideiaCentral": {
        "termos": [
          "acolher",
          "inclu*",
          "diferente",
          "junt*",
          "respeit*",
          "cultura"
        ]
      }
    }
  },
  {
    "id": "rec052",
    "dificuldade": "medio",
    "titulo": "O empate que valia a final",
    "narracao": "O time Coragem precisava só de um empate para chegar à final, mas estava perdendo de 1 a 0 e o tempo acabava. O zagueiro Otávio queria subir para atacar, enquanto a capitã Nina achava arriscado deixar a defesa aberta. O treinador Bento bolou um meio-termo: Otávio subiria só nas bolas paradas e voltaria correndo depois. Nos minutos finais, num escanteio ensaiado, Otávio subiu, cabeceou e empatou o jogo. O time Coragem segurou o 1 a 1 e garantiu a vaga na decisão. Eles aprenderam que ouvir todos os lados e combinar um plano equilibrado dá certo.",
    "ideiaCentralTexto": "Ouvir todos os lados e combinar um plano equilibrado leva ao bom resultado.",
    "elementos": {
      "personagens": {
        "termos": [
          "Otavio",
          "zagueir*",
          "Nina",
          "capit*",
          "Bento",
          "treinador"
        ]
      },
      "problema": {
        "termos": [
          "perdendo",
          "perd*",
          "1 a 0",
          "tempo acabava",
          "arriscado",
          "aberta"
        ]
      },
      "tentativa": {
        "termos": [
          "plano",
          "meio-termo",
          "subiria",
          "escanteio",
          "ensaiado",
          "combinar",
          "bolou"
        ]
      },
      "desfecho": {
        "termos": [
          "empatou",
          "empate",
          "1 a 1",
          "cabeceou",
          "vaga",
          "segurou"
        ]
      },
      "ideiaCentral": {
        "termos": [
          "ouvir",
          "equilibrado",
          "combinar",
          "junt*",
          "plano",
          "acordo"
        ]
      }
    }
  },
  {
    "id": "rec053",
    "dificuldade": "medio",
    "titulo": "A torcida organizada das crianças",
    "narracao": "O time Foguete jogava sempre sem ninguém na arquibancada e os jogadores ficavam desanimados pelo silêncio. A goleira Sofia reparou que os irmãos menores da turma adoravam futebol mas ficavam em casa. Ela e o capitão Murilo tiveram a ideia de organizar uma torcida só de crianças, com bandeiras e tambores feitos de lata. No dia do jogo, a torcida fez uma festa nas arquibancadas e animou o time inteiro. Empurrado pelo apoio, o Foguete jogou com vontade e venceu o clássico por 3 a 0. Todos perceberam que o apoio da torcida e da família dá uma força enorme.",
    "ideiaCentralTexto": "O apoio da torcida e da família dá uma força enorme para a equipe.",
    "elementos": {
      "personagens": {
        "termos": [
          "Sofia",
          "goleir*",
          "Murilo",
          "capit*",
          "Foguete",
          "time"
        ]
      },
      "problema": {
        "termos": [
          "sem ninguem",
          "desanimados",
          "silencio",
          "arquibancada",
          "vazia",
          "casa"
        ]
      },
      "tentativa": {
        "termos": [
          "ideia",
          "torcida",
          "bandeiras",
          "tambores",
          "organizar",
          "animou",
          "festa"
        ]
      },
      "desfecho": {
        "termos": [
          "venceu",
          "venc*",
          "3 a 0",
          "classico",
          "vontade",
          "apoio"
        ]
      },
      "ideiaCentral": {
        "termos": [
          "apoio",
          "torcida",
          "familia",
          "forca",
          "junt*",
          "incentiv*"
        ]
      }
    }
  },
  {
    "id": "rec054",
    "dificuldade": "medio",
    "titulo": "O gol mal anulado",
    "narracao": "No fim do jogo, o atacante Rui fez um gol lindo, mas o juiz anulou por engano achando que era impedimento. Os colegas do time Raio ficaram furiosos e queriam abandonar a partida em protesto. O capitão Téo, porém, pediu calma e foi conversar com o juiz com respeito, explicando a jogada. O bandeirinha Clara confirmou que Rui não estava impedido e o juiz, humilde, validou o gol. O Raio venceu por 1 a 0 e o juiz parabenizou o capitão pela postura educada. A turma aprendeu que reclamar com respeito funciona mais do que brigar.",
    "ideiaCentralTexto": "Reclamar com respeito e calma funciona mais do que brigar.",
    "elementos": {
      "personagens": {
        "termos": [
          "Rui",
          "atacante",
          "Teo",
          "capit*",
          "juiz",
          "Clara"
        ]
      },
      "problema": {
        "termos": [
          "anulou",
          "engano",
          "impedimento",
          "furiosos",
          "abandonar",
          "protesto"
        ]
      },
      "tentativa": {
        "termos": [
          "calma",
          "conversar",
          "convers*",
          "respeito",
          "explicando",
          "confirmou",
          "educad*"
        ]
      },
      "desfecho": {
        "termos": [
          "validou",
          "venceu",
          "venc*",
          "1 a 0",
          "parabenizou",
          "gol"
        ]
      },
      "ideiaCentral": {
        "termos": [
          "respeit*",
          "calma",
          "dialogo",
          "educad*",
          "convers*",
          "paz"
        ]
      }
    }
  },
  {
    "id": "rec055",
    "dificuldade": "medio",
    "titulo": "A ponte quebrada e o caminho longo",
    "narracao": "No dia da final, a ponte que levava ao estádio quebrou e o time Estrela corria o risco de chegar atrasado e perder por ausência. O motorista do ônibus, seu Jorge, ficou nervoso sem saber por onde ir. A capitã Lia lembrou de uma trilha pela mata que o avô dela usava e mostrou o caminho no mapa do celular. O time desceu do ônibus e foi a pé com as chuteiras na mão, atravessando o atalho a tempo. Chegaram suados mas inteiros, e o Estrela venceu a final nos pênaltis. Eles aprenderam que conhecer bem o próprio lugar ajuda a achar uma saída.",
    "ideiaCentralTexto": "Conhecer bem o próprio lugar e manter a calma ajuda a achar uma saída.",
    "elementos": {
      "personagens": {
        "termos": [
          "Jorge",
          "motorista",
          "Lia",
          "capit*",
          "Estrela",
          "time"
        ]
      },
      "problema": {
        "termos": [
          "ponte",
          "quebrou",
          "atrasado",
          "nervoso",
          "ausencia",
          "perder"
        ]
      },
      "tentativa": {
        "termos": [
          "trilha",
          "mata",
          "atalho",
          "caminho",
          "mapa",
          "lembrou",
          "pe"
        ]
      },
      "desfecho": {
        "termos": [
          "chegaram",
          "venceu",
          "venc*",
          "penaltis",
          "tempo",
          "final"
        ]
      },
      "ideiaCentral": {
        "termos": [
          "conhec*",
          "calma",
          "saida",
          "lugar",
          "resolv*",
          "esperto"
        ]
      }
    }
  },
  {
    "id": "rec056",
    "dificuldade": "medio",
    "titulo": "O treino na chuva e a gripe",
    "narracao": "O time Trovão treinou debaixo de chuva forte para se preparar e vários jogadores acabaram com gripe na véspera da final. A treinadora Sara ficou preocupada porque sobraram poucos atletas saudáveis. O capitão Davi propôs chamar os reservas que quase nunca jogavam e treiná-los rápido nas posições novas. Durante dois dias, os titulares passaram suas dicas pelo telefone para os reservas se prepararem. No jogo, o time misturado se ajudou em campo e a reserva Pietra marcou o gol da vitória por 2 a 1. O Trovão entendeu que confiar e dar chance a todos salva a equipe nas horas difíceis.",
    "ideiaCentralTexto": "Confiar nos colegas e dar chance a todos salva a equipe nas horas difíceis.",
    "elementos": {
      "personagens": {
        "termos": [
          "Sara",
          "treinador*",
          "Davi",
          "capit*",
          "Pietra",
          "Trovao"
        ]
      },
      "problema": {
        "termos": [
          "gripe",
          "doentes",
          "preocupada",
          "poucos",
          "chuva",
          "vespera"
        ]
      },
      "tentativa": {
        "termos": [
          "reservas",
          "chamar",
          "treina",
          "trein*",
          "dicas",
          "posicoes",
          "preparar"
        ]
      },
      "desfecho": {
        "termos": [
          "marcou",
          "gol",
          "vitoria",
          "venc*",
          "2 a 1",
          "ajudou"
        ]
      },
      "ideiaCentral": {
        "termos": [
          "confiar",
          "chance",
          "todos",
          "junt*",
          "equipe",
          "ajud*"
        ]
      }
    }
  },
  {
    "id": "rec057",
    "dificuldade": "medio",
    "titulo": "A promessa ao amigo doente",
    "narracao": "Lucas, o artilheiro do time Cometa, estava internado no hospital e não poderia ver a final do campeonato. Seu melhor amigo, o capitão Pedro, prometeu que dedicaria a vitória a ele. No jogo, porém, o Cometa começou perdendo de 2 a 0 e o time ficou desanimado e quase desistiu. Pedro lembrou a turma da promessa feita ao Lucas e todos jogaram com o coração até o último minuto. Eles viraram para 3 a 2 e gravaram um vídeo da taça mandando um abraço para o amigo no hospital. A história mostrou que a amizade e uma boa motivação fazem a gente não desistir.",
    "ideiaCentralTexto": "A amizade e uma boa motivação fazem a gente não desistir.",
    "elementos": {
      "personagens": {
        "termos": [
          "Lucas",
          "artilheiro",
          "Pedro",
          "capit*",
          "Cometa",
          "amigo"
        ]
      },
      "problema": {
        "termos": [
          "internado",
          "hospital",
          "perdendo",
          "perd*",
          "2 a 0",
          "desistiu"
        ]
      },
      "tentativa": {
        "termos": [
          "promessa",
          "dedicaria",
          "lembrou",
          "coracao",
          "jogaram",
          "motiv*"
        ]
      },
      "desfecho": {
        "termos": [
          "viraram",
          "virada",
          "3 a 2",
          "taca",
          "venc*",
          "abraco"
        ]
      },
      "ideiaCentral": {
        "termos": [
          "amizade",
          "amig*",
          "motiv*",
          "nao desist*",
          "junt*",
          "esforc*"
        ]
      }
    }
  },
  {
    "id": "rec058",
    "dificuldade": "medio",
    "titulo": "O placar errado",
    "narracao": "O time Garra achava que ia empatar a partida, mas o placar do estádio estava com defeito e marcava um número errado. Por causa disso, os jogadores relaxaram e quase deixaram o adversário virar o jogo de verdade. A meia Bia foi a primeira a perceber o erro e avisou a capitã Olga na hora. Olga reuniu o time e explicou que precisavam de mais um gol para de fato vencer. Com a informação certa, o Garra atacou, a Bia marcou e o time ganhou por 2 a 1. Eles aprenderam que conferir a informação antes de comemorar evita um grande engano.",
    "ideiaCentralTexto": "Conferir a informação antes de comemorar evita um engano que custa caro.",
    "elementos": {
      "personagens": {
        "termos": [
          "Bia",
          "meia",
          "Olga",
          "capit*",
          "Garra",
          "time"
        ]
      },
      "problema": {
        "termos": [
          "placar",
          "defeito",
          "errado",
          "relaxaram",
          "virar",
          "engano"
        ]
      },
      "tentativa": {
        "termos": [
          "percebeu",
          "avisou",
          "reuniu",
          "explicou",
          "informacao",
          "conferir"
        ]
      },
      "desfecho": {
        "termos": [
          "marcou",
          "gol",
          "ganhou",
          "venc*",
          "2 a 1",
          "atacou"
        ]
      },
      "ideiaCentral": {
        "termos": [
          "conferir",
          "informacao",
          "atencao",
          "verific*",
          "cuidado",
          "certo"
        ]
      }
    }
  },
  {
    "id": "rec059",
    "dificuldade": "medio",
    "titulo": "A capitã que dividiu o prêmio",
    "narracao": "O time Aurora venceu o torneio e ganhou um prêmio em dinheiro, mas a capitã Manu recebeu sozinha o troféu e o envelope. Alguns jogadores acharam que ela ia ficar com tudo e começaram a desconfiar e a brigar. Manu, em vez de guardar o dinheiro, reuniu a turma e propôs decidir juntos como usar o prêmio. A treinadora Vera ajudou a votar e o grupo escolheu comprar uniformes novos e bolas para todos. Com a confiança restaurada, o Aurora seguiu unido e venceu o torneio seguinte também. A história mostrou que partilhar e decidir em grupo fortalece a confiança.",
    "ideiaCentralTexto": "Partilhar e decidir em grupo fortalece a confiança entre os colegas.",
    "elementos": {
      "personagens": {
        "termos": [
          "Manu",
          "capit*",
          "Vera",
          "treinador*",
          "Aurora",
          "time"
        ]
      },
      "problema": {
        "termos": [
          "premio",
          "sozinha",
          "desconfiar",
          "brigar",
          "dinheiro",
          "ficar com tudo"
        ]
      },
      "tentativa": {
        "termos": [
          "reuniu",
          "juntos",
          "votar",
          "propos",
          "decidir",
          "partilh*",
          "dividir"
        ]
      },
      "desfecho": {
        "termos": [
          "uniformes",
          "unido",
          "venceu",
          "venc*",
          "confianca",
          "comprar"
        ]
      },
      "ideiaCentral": {
        "termos": [
          "partilh*",
          "dividir",
          "confianca",
          "junt*",
          "grupo",
          "compartilh*"
        ]
      }
    }
  },
  {
    "id": "rec060",
    "dificuldade": "medio",
    "titulo": "O atacante adversário machucado",
    "narracao": "Na final, o atacante do time rival, chamado Gael, caiu sozinho e torceu o braço bem feio perto do gol do time Leão. Os jogadores do Leão poderiam aproveitar para atacar enquanto o adversário estava no chão. Mas a capitã Sofia mandou todos pararem e chamou o socorro para cuidar do Gael. A médica Rita entrou no campo e levou o menino com cuidado para fora. Quando o jogo voltou, o Leão venceu por 2 a 1 e os dois times se abraçaram no fim. Todos viram que respeitar o adversário machucado é mais importante do que qualquer gol.",
    "ideiaCentralTexto": "Respeitar o adversário e cuidar de quem se machuca vale mais que qualquer gol.",
    "elementos": {
      "personagens": {
        "termos": [
          "Gael",
          "atacante",
          "Sofia",
          "capit*",
          "Rita",
          "medica"
        ]
      },
      "problema": {
        "termos": [
          "caiu",
          "torceu",
          "braco",
          "machucado",
          "machuc*",
          "chao"
        ]
      },
      "tentativa": {
        "termos": [
          "pararem",
          "socorro",
          "cuidar",
          "chamou",
          "entrou",
          "ajud*"
        ]
      },
      "desfecho": {
        "termos": [
          "venceu",
          "venc*",
          "2 a 1",
          "abracaram",
          "voltou",
          "fora"
        ]
      },
      "ideiaCentral": {
        "termos": [
          "respeit*",
          "cuidar",
          "fair play",
          "adversario",
          "junt*",
          "ajud*"
        ]
      }
    }
  },
  {
    "id": "rec061",
    "dificuldade": "medio",
    "titulo": "A goleira e o medo do escuro",
    "narracao": "O jogo decisivo do time Vento foi marcado para a noite, mas a goleira Duda tinha muito medo do escuro e do barulho dos refletores. Quando uma das luzes do estádio apagou, ela travou de medo e quase tomou um gol fácil. A capitã Lia percebeu e foi até o gol segurar a mão da amiga e acalmá-la. O treinador Bento pediu para os colegas ficarem perto da área protegendo a goleira. Mais tranquila, Duda defendeu o pênalti final e o Vento venceu o campeonato. Ela aprendeu que com o apoio dos amigos dá para enfrentar até os próprios medos.",
    "ideiaCentralTexto": "Com o apoio dos amigos é possível enfrentar até os próprios medos.",
    "elementos": {
      "personagens": {
        "termos": [
          "Duda",
          "goleir*",
          "Lia",
          "capit*",
          "Bento",
          "treinador"
        ]
      },
      "problema": {
        "termos": [
          "medo",
          "escuro",
          "noite",
          "travou",
          "apagou",
          "barulho"
        ]
      },
      "tentativa": {
        "termos": [
          "percebeu",
          "segurar",
          "mao",
          "acalma",
          "apoio",
          "perto",
          "protegendo"
        ]
      },
      "desfecho": {
        "termos": [
          "defendeu",
          "defend*",
          "penalti",
          "venceu",
          "venc*",
          "campeonato"
        ]
      },
      "ideiaCentral": {
        "termos": [
          "apoio",
          "amigos",
          "medo",
          "coragem",
          "junt*",
          "ajud*"
        ]
      }
    }
  },
  {
    "id": "rec062",
    "dificuldade": "medio",
    "titulo": "O time sem treinador",
    "narracao": "Na véspera do torneio, o treinador do time Relâmpago precisou viajar de urgência e as crianças ficaram sem ninguém para orientar. O grupo entrou em pânico, achando que não saberia se organizar sozinho em campo. A capitã Yara propôs que cada jogador ensinasse uma jogada que sabia fazer bem para os outros. O experiente Léo mostrou a marcação, a Pietra ensinou os passes e juntos montaram a estratégia. No torneio, o Relâmpago se virou sem treinador, jogou unido e ganhou a final por 3 a 2. Eles descobriram que, trabalhando em equipe, conseguem resolver problemas sozinhos.",
    "ideiaCentralTexto": "Trabalhando em equipe, um grupo consegue resolver problemas até sozinho.",
    "elementos": {
      "personagens": {
        "termos": [
          "Yara",
          "capit*",
          "Leo",
          "Pietra",
          "Relampago",
          "time"
        ]
      },
      "problema": {
        "termos": [
          "sem treinador",
          "viajar",
          "panico",
          "sozinho",
          "orientar",
          "urgencia"
        ]
      },
      "tentativa": {
        "termos": [
          "ensinasse",
          "ensin*",
          "jogada",
          "passes",
          "estrategia",
          "montaram",
          "propos"
        ]
      },
      "desfecho": {
        "termos": [
          "venceu",
          "venc*",
          "ganhou",
          "3 a 2",
          "unido",
          "final"
        ]
      },
      "ideiaCentral": {
        "termos": [
          "equipe",
          "junt*",
          "uni*",
          "resolv*",
          "ajud*",
          "colabor*"
        ]
      }
    }
  },
  {
    "id": "rec063",
    "dificuldade": "medio",
    "titulo": "A aposta que deu errado",
    "narracao": "Antes do clássico, o capitão Ravi, do time Sol, apostou com os colegas que faria três gols sozinho e provocou bastante o time Lua. No jogo, ele forçou jogadas individuais para ganhar a aposta e acabou perdendo a bola várias vezes. Por causa disso, o Sol começou perdendo de 2 a 0 e os colegas ficaram bravos com Ravi. No intervalo, a treinadora Nina conversou e Ravi pediu desculpas, prometendo jogar para o time. No segundo tempo, ele passou para os amigos, deu duas assistências e o Sol virou para 3 a 2. Ravi aprendeu que se exibir atrapalha, e que o jogo é sempre do coletivo.",
    "ideiaCentralTexto": "Querer se exibir atrapalha; o jogo é sempre do coletivo, não de um só.",
    "elementos": {
      "personagens": {
        "termos": [
          "Ravi",
          "capit*",
          "Nina",
          "treinador*",
          "Sol",
          "time"
        ]
      },
      "problema": {
        "termos": [
          "apostou",
          "aposta",
          "provocou",
          "individuais",
          "perdendo",
          "perd*"
        ]
      },
      "tentativa": {
        "termos": [
          "conversa",
          "convers*",
          "desculpas",
          "prometendo",
          "passou",
          "assistencias"
        ]
      },
      "desfecho": {
        "termos": [
          "virou",
          "virada",
          "3 a 2",
          "venc*",
          "segundo tempo",
          "gol"
        ]
      },
      "ideiaCentral": {
        "termos": [
          "coletivo",
          "equipe",
          "junt*",
          "exibir",
          "humildade",
          "time"
        ]
      }
    }
  },
  {
    "id": "rec064",
    "dificuldade": "medio",
    "titulo": "A chuva de granizo na decisão",
    "narracao": "No meio da decisão, começou a cair granizo e o juiz precisou parar o jogo com o time Garra ganhando de 1 a 0. A capitã Helena temia que, ao voltar, o time esfriasse e o Cometa empatasse. Para manter o grupo aquecido e concentrado, ela puxou alongamentos e revisou a marcação no vestiário enquanto esperavam. O treinador Caio também passou água e palavras de incentivo para todos não perderem o foco. Quando o granizo parou, o Garra voltou ligado, segurou o 1 a 0 e foi campeão. Eles aprenderam que manter a calma e a concentração nas pausas faz diferença.",
    "ideiaCentralTexto": "Manter a calma e a concentração mesmo nas pausas faz toda a diferença.",
    "elementos": {
      "personagens": {
        "termos": [
          "Helena",
          "capit*",
          "Caio",
          "treinador",
          "Garra",
          "time"
        ]
      },
      "problema": {
        "termos": [
          "granizo",
          "parar",
          "esfriasse",
          "empatasse",
          "pausa",
          "foco"
        ]
      },
      "tentativa": {
        "termos": [
          "alongamentos",
          "revisou",
          "marcacao",
          "incentivo",
          "concentrad*",
          "aquecido"
        ]
      },
      "desfecho": {
        "termos": [
          "voltou",
          "segurou",
          "1 a 0",
          "campeao",
          "venc*",
          "ligado"
        ]
      },
      "ideiaCentral": {
        "termos": [
          "calma",
          "concentracao",
          "foco",
          "paciencia",
          "junt*",
          "controle"
        ]
      }
    }
  },
  {
    "id": "rec065",
    "dificuldade": "medio",
    "titulo": "O uniforme trocado",
    "narracao": "No dia do jogo, os times Estrela e Cometa chegaram com uniformes da mesma cor azul, e ninguém conseguia distinguir os jogadores em campo. O juiz avisou que, sem cores diferentes, a partida teria que ser cancelada. A capitã Lis, do Estrela, lembrou que tinha coletes laranja guardados no armário do ginásio. Ela e o capitão Téo, do Cometa, foram juntos buscar os coletes e dividir entre um dos times. Com as cores resolvidas, o jogo aconteceu, terminou empatado e os dois capitães se cumprimentaram. Eles mostraram que resolver um problema juntos é melhor do que desistir do jogo.",
    "ideiaCentralTexto": "Resolver um problema juntos, mesmo entre rivais, é melhor do que desistir.",
    "elementos": {
      "personagens": {
        "termos": [
          "Lis",
          "capit*",
          "Teo",
          "juiz",
          "Estrela",
          "Cometa"
        ]
      },
      "problema": {
        "termos": [
          "uniformes",
          "mesma cor",
          "azul",
          "distinguir",
          "cancelada",
          "iguais"
        ]
      },
      "tentativa": {
        "termos": [
          "coletes",
          "laranja",
          "lembrou",
          "buscar",
          "juntos",
          "dividir",
          "armario"
        ]
      },
      "desfecho": {
        "termos": [
          "empatado",
          "aconteceu",
          "cumprimentaram",
          "resolvidas",
          "jogo",
          "terminou"
        ]
      },
      "ideiaCentral": {
        "termos": [
          "juntos",
          "junt*",
          "resolv*",
          "colabor*",
          "rivais",
          "ajud*"
        ]
      }
    }
  },
  {
    "id": "rec066",
    "dificuldade": "dificil",
    "titulo": "O artilheiro fantasma",
    "narracao": "O time do Atlético subia na tabela graças aos gols de um atacante misterioso que ninguém via treinar. A imprensa local inventou que era um craque estrangeiro contratado em segredo pelo presidente. Na verdade, a goleadora era Dora, uma faxineira do clube que entrava em campo só nos minutos finais, escondida sob o uniforme reserva. Quando um repórter teimoso descobriu a verdade, o presidente ficou com medo da reação da torcida esnobe. Dora, porém, decidiu revelar-se diante de todos antes da final. Em vez de vaias, recebeu uma ovação, pois o que importava era o talento, não o crachá. O Atlético venceu com ela escalada do início, e a cidade aprendeu a olhar além das aparências.",
    "ideiaCentralTexto": "O valor de uma pessoa está no que ela faz, não no rótulo que carrega.",
    "elementos": {
      "personagens": {
        "termos": [
          "Dora",
          "presidente",
          "atacante",
          "faxineira",
          "time",
          "reporter"
        ]
      },
      "problema": {
        "termos": [
          "misterios*",
          "segredo",
          "escondid*",
          "medo",
          "aparencia",
          "inventou"
        ]
      },
      "tentativa": {
        "termos": [
          "revelar",
          "descobr*",
          "verdade",
          "decidiu",
          "diante de todos"
        ]
      },
      "desfecho": {
        "termos": [
          "ovacao",
          "venc*",
          "escalad*",
          "aprend*",
          "talento",
          "aplaud*"
        ]
      },
      "ideiaCentral": {
        "termos": [
          "talento",
          "aparencia",
          "rotulo",
          "valor",
          "preconceito",
          "aprend*"
        ]
      }
    }
  },
  {
    "id": "rec067",
    "dificuldade": "dificil",
    "titulo": "A herança do rival",
    "narracao": "Quando o velho técnico do Cruzeiro morreu, deixou um bilhete pedindo que seu maior rival, o treinador Anselmo, assumisse o time que ele dirigira por décadas. Anselmo havia disputado contra aquele clube a vida inteira e hesitou, achando que os jogadores jamais o aceitariam. Os atletas, ressentidos, recebiam suas ordens com desconfiança e sabotavam os treinos. Em vez de impor autoridade, Anselmo passou a contar histórias do antigo técnico, mostrando o respeito que sentia pelo adversário falecido. Aos poucos, o grupo percebeu que a rivalidade tinha sido uma forma de admiração disfarçada. O time uniu-se em torno do novo treinador e venceu o campeonato em homenagem a quem partira. Anselmo entendeu que um adversário verdadeiro também é um espelho que nos faz crescer.",
    "ideiaCentralTexto": "Um rival respeitado pode se tornar parte da nossa própria história.",
    "elementos": {
      "personagens": {
        "termos": [
          "Anselmo",
          "treinador",
          "tecnico",
          "rival",
          "time",
          "jogadores"
        ]
      },
      "problema": {
        "termos": [
          "rival*",
          "desconfianc*",
          "sabot*",
          "ressentid*",
          "hesit*",
          "nao aceit*"
        ]
      },
      "tentativa": {
        "termos": [
          "contar histor*",
          "respeito",
          "mostr*",
          "homenag*",
          "convers*"
        ]
      },
      "desfecho": {
        "termos": [
          "uniu",
          "venc*",
          "campeonato",
          "aceit*",
          "consegui*",
          "entendeu"
        ]
      },
      "ideiaCentral": {
        "termos": [
          "rival",
          "respeito",
          "admirac*",
          "adversari*",
          "crescer",
          "espelho"
        ]
      }
    }
  },
  {
    "id": "rec068",
    "dificuldade": "dificil",
    "titulo": "O placar manipulado",
    "narracao": "No campeonato escolar, o time da Tâmara venceu a semifinal por um placar suspeito de oito a zero contra um adversário fraquíssimo. Circulava o boato de que o diretor havia escalado alunos doentes no time rival só para favorecer a escola da filha. Tâmara, capitã da equipe vencedora, sentiu que aquela vitória tinha gosto amargo de trapaça. Mesmo sem provas, ela reuniu o time e propôs abrir mão da vaga, jogando uma partida limpa de desempate. Os colegas relutaram, pois ninguém gosta de devolver uma classificação conquistada. Convencidos por ela, enfrentaram o rival em pé de igualdade e perderam por pouco, mas saíram de cabeça erguida. A escola descobriu que uma derrota honesta vale mais que uma vitória manchada.",
    "ideiaCentralTexto": "Uma vitória obtida por trapaça não vale nada perto de uma derrota digna.",
    "elementos": {
      "personagens": {
        "termos": [
          "Tamara",
          "capit*",
          "diretor",
          "time",
          "adversari*",
          "rival"
        ]
      },
      "problema": {
        "termos": [
          "suspeit*",
          "boato",
          "trapac*",
          "favorecer",
          "manipul*",
          "amargo"
        ]
      },
      "tentativa": {
        "termos": [
          "abrir mao",
          "reuniu",
          "propos",
          "desempate",
          "partida limpa",
          "igualdade"
        ]
      },
      "desfecho": {
        "termos": [
          "perderam",
          "cabeca erguida",
          "honest*",
          "descobriu",
          "dign*",
          "consegui*"
        ]
      },
      "ideiaCentral": {
        "termos": [
          "honest*",
          "trapac*",
          "dign*",
          "justic*",
          "integridad*",
          "verdade"
        ]
      }
    }
  },
  {
    "id": "rec069",
    "dificuldade": "dificil",
    "titulo": "O ídolo de pés de barro",
    "narracao": "Pequeno torcedor fanático, Bento idolatrava o astro Maurício, cujo pôster cobria a parede do seu quarto. Numa tarde, escondido no estádio, Bento ouviu sem querer o ídolo combinando entregar o jogo em troca de dinheiro de apostadores. O menino ficou dividido entre proteger o herói que amava e denunciar a falcatrua que presenciara. Depois de uma noite sem dormir, decidiu escrever uma carta anônima ao presidente do clube, contando tudo. Maurício foi afastado, e a torcida, furiosa, xingou o delator desconhecido. Bento engoliu calado o desprezo de todos, sabendo que fizera o certo mesmo doendo. Ele aprendeu que admirar alguém não nos obriga a fechar os olhos para os erros dessa pessoa.",
    "ideiaCentralTexto": "Fazer o certo às vezes exige decepcionar até quem admiramos.",
    "elementos": {
      "personagens": {
        "termos": [
          "Bento",
          "Mauricio",
          "idolo",
          "torcedor",
          "presidente",
          "astro"
        ]
      },
      "problema": {
        "termos": [
          "entregar o jogo",
          "aposta*",
          "falcatrua",
          "dividid*",
          "dinheiro",
          "escondid*"
        ]
      },
      "tentativa": {
        "termos": [
          "denunci*",
          "carta",
          "contar",
          "decidiu",
          "escrev*",
          "delator"
        ]
      },
      "desfecho": {
        "termos": [
          "afastad*",
          "desprezo",
          "fez o certo",
          "aprend*",
          "calado",
          "sozinho"
        ]
      },
      "ideiaCentral": {
        "termos": [
          "honest*",
          "certo",
          "verdade",
          "coragem",
          "idolo",
          "integridad*"
        ]
      }
    }
  },
  {
    "id": "rec070",
    "dificuldade": "dificil",
    "titulo": "A capitã de duas faces",
    "narracao": "Larissa era admirada por todos: capitã exemplar nos jogos e líder querida nos treinos. O que ninguém sabia é que, pelas costas, ela espalhava fofocas para enfraquecer as colegas que ameaçavam sua vaga. Quando a estreante Yumi descobriu o jogo duplo, em vez de expor a capitã, conversou com ela em particular. Larissa, encurralada pela própria consciência, percebeu o estrago silencioso que causara ao grupo. Envergonhada, pediu desculpas ao time numa roda e renunciou à braçadeira por um tempo. O grupo, surpreso pela honestidade dela, escolheu mantê-la como capitã, agora de verdade. Larissa entendeu que liderança falsa desaba, mas liderança sincera se reconstrói.",
    "ideiaCentralTexto": "Uma liderança verdadeira nasce da sinceridade, não da aparência.",
    "elementos": {
      "personagens": {
        "termos": [
          "Larissa",
          "Yumi",
          "capit*",
          "estreante",
          "time",
          "colegas"
        ]
      },
      "problema": {
        "termos": [
          "fofoca*",
          "enfraquecer",
          "jogo duplo",
          "pelas costas",
          "falsa",
          "estrago"
        ]
      },
      "tentativa": {
        "termos": [
          "convers*",
          "desculp*",
          "particular",
          "percebeu",
          "renunci*",
          "roda"
        ]
      },
      "desfecho": {
        "termos": [
          "mantê-la",
          "mante*",
          "capit*",
          "honest*",
          "reconstr*",
          "entendeu"
        ]
      },
      "ideiaCentral": {
        "termos": [
          "lideranc*",
          "sincer*",
          "honest*",
          "verdade",
          "aparencia",
          "confianc*"
        ]
      }
    }
  },
  {
    "id": "rec071",
    "dificuldade": "dificil",
    "titulo": "O troféu dividido",
    "narracao": "Na final do torneio infantil, o juiz se distraiu e marcou um gol que, pelas câmeras, claramente não havia entrado. O time de Otávio foi declarado campeão por causa daquele lance fantasma. No vestiário, em vez de festa, instalou-se um silêncio incômodo, pois todos sabiam da injustiça. Otávio propôs algo inédito: procurar a organização e pedir que o título fosse dividido com o adversário. Os dirigentes, comovidos, criaram um troféu especial repartido entre as duas equipes. Os rivais, que esperavam arrogância, foram surpreendidos pela grandeza do gesto e viraram amigos. Aquele campeonato ficou famoso não pelo gol errado, mas pela nobreza de quem abriu mão de brilhar sozinho.",
    "ideiaCentralTexto": "A verdadeira grandeza está em reconhecer o mérito do outro.",
    "elementos": {
      "personagens": {
        "termos": [
          "Otavio",
          "juiz",
          "time",
          "adversari*",
          "organizac*",
          "rivais"
        ]
      },
      "problema": {
        "termos": [
          "distra*",
          "gol fantasma",
          "nao havia entrado",
          "injust*",
          "errad*",
          "silencio"
        ]
      },
      "tentativa": {
        "termos": [
          "dividir",
          "propos",
          "procur*",
          "repartid*",
          "pedir",
          "gesto"
        ]
      },
      "desfecho": {
        "termos": [
          "trofeu",
          "amigos",
          "surpreend*",
          "consegui*",
          "famoso",
          "nobreza"
        ]
      },
      "ideiaCentral": {
        "termos": [
          "grandeza",
          "merito",
          "generos*",
          "justic*",
          "nobreza",
          "reconhec*"
        ]
      }
    }
  },
  {
    "id": "rec072",
    "dificuldade": "dificil",
    "titulo": "A linha do tempo",
    "narracao": "O zagueirão Téo vivia preso a uma única jogada do passado: um pênalti perdido que custara um título três anos antes. Cada erro novo reacendia aquela lembrança, e ele jogava com medo de falhar de novo. Uma psicóloga do clube propôs que ele desenhasse uma linha do tempo com todas as suas conquistas, e não só o fracasso. Surpreso, Téo percebeu quantas partidas decisivas havia salvado e quanto crescera desde então. Aos poucos, parou de carregar o peso de um instante e voltou a jogar solto. Na decisão seguinte, foi justamente ele quem converteu o pênalti da vitória, sereno. Téo descobriu que um erro é apenas um ponto numa longa história, não a história inteira.",
    "ideiaCentralTexto": "Um único fracasso não resume tudo o que somos.",
    "elementos": {
      "personagens": {
        "termos": [
          "Teo",
          "zagueiro",
          "psicolog*",
          "time"
        ]
      },
      "problema": {
        "termos": [
          "penalti perdid*",
          "passado",
          "medo",
          "fracasso",
          "preso",
          "lembranca"
        ]
      },
      "tentativa": {
        "termos": [
          "linha do tempo",
          "desenh*",
          "percebeu",
          "conquist*",
          "propos",
          "refletir"
        ]
      },
      "desfecho": {
        "termos": [
          "converteu",
          "penalti",
          "vitoria",
          "sereno",
          "solto",
          "consegui*"
        ]
      },
      "ideiaCentral": {
        "termos": [
          "erro",
          "fracasso",
          "passado",
          "supera*",
          "recomec*",
          "historia"
        ]
      }
    }
  },
  {
    "id": "rec073",
    "dificuldade": "dificil",
    "titulo": "O contrato tentador",
    "narracao": "A jovem promessa Fernanda recebeu uma proposta milionária de um clube poderoso, com a condição de abandonar de imediato seu time de bairro na véspera da final. O dinheiro resolveria os problemas da família, mas a deixaria como traidora aos olhos das amigas de infância. Dividida, ela passou dias pesando lealdade contra oportunidade num dilema que tirava seu sono. Conversou abertamente com as companheiras, que, generosas, disseram para ela aceitar e seguir o sonho. Comovida, Fernanda negociou adiar a transferência para depois da decisão, honrando os dois lados. Disputou a final com o time do coração, foi campeã, e só então se mudou para o clube grande. Ela aprendeu que escolhas difíceis ficam mais leves quando feitas com honestidade e diálogo.",
    "ideiaCentralTexto": "Diante de um dilema, a honestidade e o diálogo abrem o melhor caminho.",
    "elementos": {
      "personagens": {
        "termos": [
          "Fernanda",
          "time",
          "familia",
          "amigas",
          "companheir*"
        ]
      },
      "problema": {
        "termos": [
          "proposta",
          "abandonar",
          "dilema",
          "dividid*",
          "lealdade",
          "traidora"
        ]
      },
      "tentativa": {
        "termos": [
          "convers*",
          "pesando",
          "negoci*",
          "adiar",
          "dialog*",
          "decidir"
        ]
      },
      "desfecho": {
        "termos": [
          "campeã",
          "campe*",
          "honr*",
          "consegui*",
          "mudou",
          "aprend*"
        ]
      },
      "ideiaCentral": {
        "termos": [
          "dilema",
          "honest*",
          "lealdade",
          "escolha",
          "dialog*",
          "consciencia"
        ]
      }
    }
  },
  {
    "id": "rec074",
    "dificuldade": "dificil",
    "titulo": "O juiz que errou contra si",
    "narracao": "Seu Heitor, árbitro respeitadíssimo, apitava a final justamente do campeonato em que seu próprio filho jogava. No último minuto, com o time do garoto perdendo, houve um pênalti claro a favor dele. Heitor sabia que marcá-lo poderia salvar o filho, mas também que todos suspeitariam de favorecimento. Tomado pela ética, ele assinalou o pênalti exatamente como faria em qualquer outro jogo. O filho cobrou, empatou, e a partida foi para os pênaltis, que o outro time venceu no fim. Em vez de mágoa, o garoto abraçou o pai, orgulhoso de sua imparcialidade diante de todos. Heitor mostrou que a justiça não escolhe lados, nem mesmo entre quem amamos.",
    "ideiaCentralTexto": "Ser justo significa aplicar a mesma regra a todos, sem exceção.",
    "elementos": {
      "personagens": {
        "termos": [
          "Heitor",
          "arbitro",
          "juiz",
          "filho",
          "garoto",
          "time"
        ]
      },
      "problema": {
        "termos": [
          "penalti",
          "filho",
          "favorecimento",
          "suspeit*",
          "dilema",
          "perdendo"
        ]
      },
      "tentativa": {
        "termos": [
          "assinalou",
          "marcar",
          "etica",
          "imparcial*",
          "apit*",
          "decidiu"
        ]
      },
      "desfecho": {
        "termos": [
          "empatou",
          "venceu",
          "abracou",
          "orgulho*",
          "consegui*",
          "mostrou"
        ]
      },
      "ideiaCentral": {
        "termos": [
          "justic*",
          "imparcial*",
          "etica",
          "igual",
          "integridad*",
          "honest*"
        ]
      }
    }
  },
  {
    "id": "rec075",
    "dificuldade": "dificil",
    "titulo": "A bandeira de dois clubes",
    "narracao": "A cidade vivia rachada pela rivalidade entre dois times que dividiam o mesmo bairro havia gerações. Quando uma enchente destruiu os dois campos numa só noite, cada torcida culpou a outra pela falta de socorro. A pequena Sol, neta de fundadores dos dois clubes ao mesmo tempo, propôs uma trégua inédita. Ela organizou mutirões mistos para reconstruir os gramados, misturando torcedores que jamais se falavam. Trabalhando lado a lado na lama, antigos inimigos descobriram que tinham os mesmos sonhos para os filhos. Os clubes decidiram disputar um amistoso anual de irmandade no campo reformado por todos. Sol provou que uma causa comum é mais forte do que qualquer rivalidade antiga.",
    "ideiaCentralTexto": "Um objetivo em comum derruba até as inimizades mais antigas.",
    "elementos": {
      "personagens": {
        "termos": [
          "Sol",
          "torcedor*",
          "clubes",
          "times",
          "bairro",
          "torcida"
        ]
      },
      "problema": {
        "termos": [
          "rivalidade",
          "enchente",
          "destruiu",
          "culpou",
          "rachada",
          "inimig*"
        ]
      },
      "tentativa": {
        "termos": [
          "tregua",
          "mutir*",
          "reconstruir",
          "organiz*",
          "junt*",
          "propos"
        ]
      },
      "desfecho": {
        "termos": [
          "amistoso",
          "irmandade",
          "descobr*",
          "reformad*",
          "consegui*",
          "uni*"
        ]
      },
      "ideiaCentral": {
        "termos": [
          "uni*",
          "causa comum",
          "rivalidade",
          "paz",
          "junt*",
          "cooperac*"
        ]
      }
    }
  },
  {
    "id": "rec076",
    "dificuldade": "dificil",
    "titulo": "O elogio envenenado",
    "narracao": "Sempre que o talentoso Igor jogava, o comentarista Saulo o chamava de \"gênio que dispensa treino\", como se ele fosse perfeito sem esforço. Lisonjeado, Igor passou a faltar aos treinos, convencido de que seu dom bastava. O rendimento despencou jogo após jogo, mas ele culpava os companheiros pela própria queda. Foi a treinadora quem, com franqueza, mostrou que aquele elogio fácil tinha virado uma armadilha preguiçosa. Magoado a princípio, Igor refletiu e voltou a ser o primeiro a chegar e o último a sair do campo. Sua bola voltou a brilhar, não por mágica, mas pelo suor reencontrado. Igor aprendeu que elogios cômodos podem adormecer quem se deixa levar por eles.",
    "ideiaCentralTexto": "Nenhum talento dispensa o esforço de cultivá-lo todos os dias.",
    "elementos": {
      "personagens": {
        "termos": [
          "Igor",
          "Saulo",
          "comentarista",
          "treinador*",
          "companheir*"
        ]
      },
      "problema": {
        "termos": [
          "elogio",
          "faltar",
          "preguic*",
          "despencou",
          "armadilha",
          "culpava"
        ]
      },
      "tentativa": {
        "termos": [
          "mostr*",
          "refletiu",
          "voltou a chegar",
          "trein*",
          "franqueza",
          "esforc*"
        ]
      },
      "desfecho": {
        "termos": [
          "brilhar",
          "suor",
          "aprend*",
          "consegui*",
          "reencontr*",
          "voltou"
        ]
      },
      "ideiaCentral": {
        "termos": [
          "esforc*",
          "talento",
          "dedicac*",
          "trein*",
          "humild*",
          "cultiv*"
        ]
      }
    }
  },
  {
    "id": "rec077",
    "dificuldade": "dificil",
    "titulo": "A promessa ao avô",
    "narracao": "Antes de partir, o avô de Caio fez o neto prometer que jamais usaria a camisa do clube adversário, antigo inimigo da família. Anos depois, foi justamente esse clube rival que ofereceu a Caio a única chance de seguir como jogador profissional. Atormentado pela promessa, o garoto recusou a proposta e quase abandonou o sonho do futebol. Vasculhando cartas antigas do avô, descobriu que o velho havia, na juventude, sido salvo por um goleiro daquele mesmo clube inimigo. Caio compreendeu que o avô valorizava acima de tudo a gratidão, não o ódio cego. Aceitou a vaga em paz, honrando o verdadeiro espírito do avô em vez da letra da promessa. Ele aprendeu que entender a intenção por trás de uma palavra vale mais que obedecê-la cegamente.",
    "ideiaCentralTexto": "Compreender o espírito de uma promessa importa mais que segui-la ao pé da letra.",
    "elementos": {
      "personagens": {
        "termos": [
          "Caio",
          "avô",
          "avo",
          "goleiro",
          "clube",
          "familia"
        ]
      },
      "problema": {
        "termos": [
          "promessa",
          "rival",
          "inimig*",
          "recusou",
          "atormentad*",
          "dilema"
        ]
      },
      "tentativa": {
        "termos": [
          "cartas",
          "descobriu",
          "vasculh*",
          "compreend*",
          "refletir",
          "investig*"
        ]
      },
      "desfecho": {
        "termos": [
          "aceitou",
          "paz",
          "honr*",
          "aprend*",
          "consegui*",
          "gratidao"
        ]
      },
      "ideiaCentral": {
        "termos": [
          "gratidao",
          "compreend*",
          "perdao",
          "intencao",
          "sabedoria",
          "amor"
        ]
      }
    }
  },
  {
    "id": "rec078",
    "dificuldade": "dificil",
    "titulo": "O capitão de aluguel",
    "narracao": "Para salvar o clube falido, os dirigentes contrataram Vítor, um capitão famoso, só para emprestar seu nome ao marketing, sem que ele jogasse de fato. Confortável recebendo por nada, Vítor passava os jogos no banco posando para fotos enquanto o time penava. Aos poucos, ele percebeu nos olhos das crianças da base uma admiração que não merecia. Incomodado com a própria farsa, Vítor exigiu treinar e ganhar uma vaga de verdade, abrindo mão de parte do salário. Os companheiros, antes ressentidos com o privilégio dele, passaram a respeitá-lo de coração. Ele virou titular por mérito e liderou uma arrancada que tirou o clube da degola. Vítor entendeu que reputação emprestada não enche o vazio de quem não se esforça.",
    "ideiaCentralTexto": "Nenhuma fama vale a pena se não for sustentada por mérito real.",
    "elementos": {
      "personagens": {
        "termos": [
          "Vitor",
          "capit*",
          "dirigentes",
          "time",
          "companheir*",
          "criancas"
        ]
      },
      "problema": {
        "termos": [
          "falido",
          "marketing",
          "farsa",
          "sem jogar",
          "banco",
          "privilegio"
        ]
      },
      "tentativa": {
        "termos": [
          "exigiu treinar",
          "trein*",
          "abrir mao",
          "merito",
          "esforc*",
          "vaga"
        ]
      },
      "desfecho": {
        "termos": [
          "titular",
          "liderou",
          "respeit*",
          "consegui*",
          "arrancada",
          "salvou"
        ]
      },
      "ideiaCentral": {
        "termos": [
          "merito",
          "esforc*",
          "reputac*",
          "fama",
          "honest*",
          "dignidade"
        ]
      }
    }
  },
  {
    "id": "rec079",
    "dificuldade": "dificil",
    "titulo": "A reserva insubstituível",
    "narracao": "Durante toda a temporada, Helô foi reserva e nunca entrou em campo um minuto sequer. Embora frustrada, ela chegava cedo, animava as titulares e estudava cada adversário como ninguém. Nos bastidores, era ela quem avisava as colegas sobre as manhas dos rivais antes de cada jogo. Quando a artilheira se machucou na final, muitos acharam que o time estava perdido sem sua melhor jogadora. Helô entrou tremendo, mas aplicou na prática tudo que observara das arquibancadas durante meses. Marcou o gol do título e revelou que sua arma secreta era a paciência de quem nunca parou de aprender. O time descobriu que existem heroínas que vencem partidas mesmo sentadas no banco.",
    "ideiaCentralTexto": "Quem se prepara em silêncio brilha quando a oportunidade chega.",
    "elementos": {
      "personagens": {
        "termos": [
          "Helô",
          "Helo",
          "reserva",
          "time",
          "artilheira",
          "colegas"
        ]
      },
      "problema": {
        "termos": [
          "reserva",
          "nunca entrou",
          "frustrad*",
          "banco",
          "machucou",
          "perdid*"
        ]
      },
      "tentativa": {
        "termos": [
          "estudava",
          "estud*",
          "observ*",
          "avisava",
          "animava",
          "prepar*"
        ]
      },
      "desfecho": {
        "termos": [
          "marcou",
          "gol",
          "titulo",
          "consegui*",
          "revelou",
          "venc*"
        ]
      },
      "ideiaCentral": {
        "termos": [
          "paciencia",
          "prepar*",
          "oportunidade",
          "persist*",
          "dedicac*",
          "silencio"
        ]
      }
    }
  },
  {
    "id": "rec080",
    "dificuldade": "dificil",
    "titulo": "O recorde indesejado",
    "narracao": "O goleiro veterano Adão estava a uma partida de bater o recorde histórico de jogos invictos do clube. No último jogo, percebeu que seu jovem reserva, Tom, precisava de uma chance para ser observado por olheiros importantes. Adão enfrentou um dilema cruel entre a glória pessoal e o futuro do colega mais novo. Sem alarde, ele alegou um leve incômodo no joelho e pediu ao técnico para iniciar no banco. Tom jogou, brilhou diante dos olheiros e garantiu um contrato que mudaria sua vida. O recorde de Adão escapou por pouco, mas ele dormiu tranquilo como nunca antes. O veterano provou que algumas conquistas valem mais quando entregues a outra pessoa.",
    "ideiaCentralTexto": "Abrir mão da própria glória por alguém pode ser a maior vitória.",
    "elementos": {
      "personagens": {
        "termos": [
          "Adão",
          "Adao",
          "Tom",
          "goleiro",
          "reserva",
          "olheiros"
        ]
      },
      "problema": {
        "termos": [
          "recorde",
          "dilema",
          "gloria",
          "chance",
          "invictos",
          "escolha"
        ]
      },
      "tentativa": {
        "termos": [
          "alegou",
          "pediu",
          "banco",
          "abrir mao",
          "cedeu",
          "incômodo"
        ]
      },
      "desfecho": {
        "termos": [
          "brilhou",
          "contrato",
          "tranquilo",
          "consegui*",
          "mudaria",
          "entregou"
        ]
      },
      "ideiaCentral": {
        "termos": [
          "generos*",
          "gloria",
          "sacrif*",
          "altru*",
          "humild*",
          "abrir mao"
        ]
      }
    }
  },
  {
    "id": "rec081",
    "dificuldade": "dificil",
    "titulo": "A torcida silenciosa",
    "narracao": "O atacante Rui tinha um irmão autista, Davi, que amava futebol mas sofria com o barulho ensurdecedor das arquibancadas. Por medo das crises do irmão, Rui escondia a família e jogava sem nunca olhar para a torcida. Quando a verdade veio à tona numa entrevista, Rui temeu a zombaria dos torcedores mais ríspidos. Em vez disso, a organização criou um setor de silêncio, com luzes suaves e som reduzido para receber Davi. Pela primeira vez, o irmão pôde assistir ao jogo inteiro, vibrando à sua maneira, sem pânico. Comovido por ver Davi na arquibancada, Rui jogou inspirado e dedicou o gol da vitória a ele. O clube descobriu que acolher as diferenças torna o estádio um lugar de todos.",
    "ideiaCentralTexto": "Um espaço que acolhe as diferenças se torna a casa de todos.",
    "elementos": {
      "personagens": {
        "termos": [
          "Rui",
          "Davi",
          "irmão",
          "irmao",
          "torcedor*",
          "organizac*"
        ]
      },
      "problema": {
        "termos": [
          "autista",
          "barulho",
          "crises",
          "escondia",
          "medo",
          "panico"
        ]
      },
      "tentativa": {
        "termos": [
          "setor de silencio",
          "luzes",
          "criou",
          "acolher",
          "reduzido",
          "adapt*"
        ]
      },
      "desfecho": {
        "termos": [
          "assistir",
          "vibrando",
          "dedicou",
          "gol",
          "vitoria",
          "consegui*"
        ]
      },
      "ideiaCentral": {
        "termos": [
          "acolh*",
          "diferenc*",
          "inclu*",
          "respeito",
          "empatia",
          "todos"
        ]
      }
    }
  },
  {
    "id": "rec082",
    "dificuldade": "dificil",
    "titulo": "O autor do gol contra",
    "narracao": "Numa decisão tensa, o zagueiro Bruno marcou um gol contra no último lance e entregou o título ao rival sem querer. A torcida, enfurecida, transformou-o em vilão e pichou ameaças no muro de sua casa. Em vez de se esconder, Bruno foi às redes sociais assumir o erro publicamente, pedindo perdão de cabeça erguida. Um grupo de crianças do projeto social do clube enviou-lhe cartas dizendo que ainda o admiravam por sua honestidade. Tocado, Bruno passou a treinar voluntariamente com essas crianças todos os fins de semana. No campeonato seguinte, foi ovacionado ao marcar o gol do título, agora a favor do próprio time. A cidade entendeu que um erro assumido com dignidade pode reerguer qualquer pessoa.",
    "ideiaCentralTexto": "Assumir um erro com coragem transforma a queda em recomeço.",
    "elementos": {
      "personagens": {
        "termos": [
          "Bruno",
          "zagueiro",
          "torcida",
          "criancas",
          "rival",
          "time"
        ]
      },
      "problema": {
        "termos": [
          "gol contra",
          "vilão",
          "ameaças",
          "erro",
          "enfurecida",
          "pichou"
        ]
      },
      "tentativa": {
        "termos": [
          "assumir",
          "perdão",
          "perdao",
          "desculp*",
          "voluntari*",
          "reconhec*"
        ]
      },
      "desfecho": {
        "termos": [
          "ovacionad*",
          "gol",
          "titulo",
          "consegui*",
          "reerguer",
          "admir*"
        ]
      },
      "ideiaCentral": {
        "termos": [
          "erro",
          "coragem",
          "dignidade",
          "recomec*",
          "humild*",
          "perdao"
        ]
      }
    }
  },
  {
    "id": "rec083",
    "dificuldade": "dificil",
    "titulo": "A jogada ensaiada de ninguém",
    "narracao": "O time da escola sempre repetia uma jogada de falta brilhante creditada ao craque Murilo, tida como invenção genial dele. Na reta final do campeonato, a tímida Inês revelou, sem querer, que a tal jogada fora ideia sua, anotada num caderno emprestado a Murilo anos antes. Constrangido, Murilo precisou escolher entre manter a fama de gênio ou devolver o crédito à colega esquecida. Para surpresa de todos, ele reuniu o time e contou a verdade, dando a Inês o reconhecimento merecido. Em vez de perder prestígio, Murilo ganhou o respeito profundo dos companheiros por sua honestidade. Inês, encorajada, passou a propor novas jogadas que levaram o time ao título. O grupo aprendeu que dar a cada um o devido crédito fortalece a todos.",
    "ideiaCentralTexto": "Reconhecer o mérito alheio engrandece quem o faz e une o grupo.",
    "elementos": {
      "personagens": {
        "termos": [
          "Murilo",
          "Inês",
          "Ines",
          "time",
          "craque",
          "colega"
        ]
      },
      "problema": {
        "termos": [
          "credit*",
          "invenção",
          "fama",
          "esquecid*",
          "constrangid*",
          "caderno"
        ]
      },
      "tentativa": {
        "termos": [
          "revelou",
          "contou a verdade",
          "reuniu",
          "devolver",
          "reconhec*",
          "admitir"
        ]
      },
      "desfecho": {
        "termos": [
          "respeito",
          "titulo",
          "consegui*",
          "encoraj*",
          "merecid*",
          "ganhou"
        ]
      },
      "ideiaCentral": {
        "termos": [
          "merito",
          "reconhec*",
          "honest*",
          "credito",
          "generos*",
          "justic*"
        ]
      }
    }
  },
  {
    "id": "rec084",
    "dificuldade": "dificil",
    "titulo": "O gol que ninguém viu",
    "narracao": "No último minuto da final, a zagueira Helena cabeceou para dentro do gol, mas a bola bateu na trave, voltou e foi afastada antes de o juiz enxergar. A torcida jurava que tinha entrado; o árbitro, sem certeza, mandou seguir o jogo. Helena sabia, no fundo, que a bola não havia cruzado a linha por inteiro. No intervalo, em vez de comemorar a reclamação do time, ela procurou o árbitro e contou que a dúvida da torcida não tinha fundamento. O técnico ficou furioso, achando que ela jogou o título fora. A partida terminou empatada e foi para os pênaltis. Helena converteu a cobrança decisiva e o time venceu mesmo assim. No fim, todos entenderam que a honestidade dela valia mais que um gol duvidoso.",
    "ideiaCentralTexto": "A honestidade vale mais do que uma vitória conquistada na dúvida.",
    "elementos": {
      "personagens": {
        "termos": [
          "helena",
          "zagueir*",
          "arbitro",
          "juiz",
          "torcida",
          "tecnic*"
        ]
      },
      "problema": {
        "termos": [
          "trave",
          "duvida",
          "nao havia cruzado",
          "linha",
          "reclam*"
        ]
      },
      "tentativa": {
        "termos": [
          "procurou",
          "contou",
          "honest*",
          "arbitro",
          "sem fundamento"
        ]
      },
      "desfecho": {
        "termos": [
          "penaltis",
          "convert*",
          "venceu",
          "empat*",
          "entender*"
        ]
      },
      "ideiaCentral": {
        "termos": [
          "honest*",
          "verdade",
          "sincer*",
          "vale mais",
          "duvid*"
        ]
      }
    }
  },
  {
    "id": "rec085",
    "dificuldade": "dificil",
    "titulo": "A braçadeira pesada",
    "narracao": "Quando o capitão se machucou, o técnico entregou a braçadeira a Rafael, o jogador mais quieto do elenco. No primeiro jogo como líder, dois veteranos discutiram em campo e quase saíram no soco diante de todos. Rafael percebeu que gritar ordens só pioraria a briga. Em vez disso, ele parou o treino, ouviu cada um separadamente e admitiu que também errava sob pressão. Os veteranos, surpresos com a humildade do novo capitão, pediram desculpas um ao outro. A partir dali o vestiário ficou mais unido e o time engatou uma sequência de vitórias. Rafael aprendeu que liderar não é mandar, e sim ouvir. A braçadeira deixou de pesar quando ele entendeu o que ela significava.",
    "ideiaCentralTexto": "Liderar de verdade é ouvir e unir, não apenas dar ordens.",
    "elementos": {
      "personagens": {
        "termos": [
          "rafael",
          "capit*",
          "tecnic*",
          "veteran*",
          "jogador*",
          "lider*"
        ]
      },
      "problema": {
        "termos": [
          "discut*",
          "briga",
          "machuc*",
          "soco",
          "pressao"
        ]
      },
      "tentativa": {
        "termos": [
          "parou",
          "ouviu",
          "admitiu",
          "humild*",
          "desculpa*"
        ]
      },
      "desfecho": {
        "termos": [
          "unid*",
          "vitoria*",
          "sequencia",
          "aprend*",
          "desculp*"
        ]
      },
      "ideiaCentral": {
        "termos": [
          "lider*",
          "ouvir",
          "humild*",
          "unir",
          "mandar"
        ]
      }
    }
  },
  {
    "id": "rec086",
    "dificuldade": "dificil",
    "titulo": "O apito imparcial",
    "narracao": "Marcos era árbitro e, naquela tarde, apitava o jogo do time em que seu próprio filho jogava. No segundo tempo, o filho dele cometeu uma falta clara dentro da área adversária. A plateia era pequena e talvez ninguém cobrasse nada se ele deixasse passar. Marcos sentiu o coração apertar, mas levou o apito à boca e marcou o pênalti contra o próprio time do menino. O adversário converteu e venceu a partida. No vestiário, o filho chegou emburrado, achando que o pai o havia traído. Marcos explicou que ser justo exigia tratar todos do mesmo jeito, inclusive quem ele amava. Anos depois, já adulto, o filho admitiu que aquele apito tinha sido a lição mais importante da vida dele.",
    "ideiaCentralTexto": "A imparcialidade exige tratar todos igualmente, mesmo quem amamos.",
    "elementos": {
      "personagens": {
        "termos": [
          "marcos",
          "arbitro",
          "juiz",
          "filho",
          "pai",
          "adversari*"
        ]
      },
      "problema": {
        "termos": [
          "falta",
          "penalti",
          "dentro da area",
          "traido",
          "emburrado"
        ]
      },
      "tentativa": {
        "termos": [
          "apito",
          "marcou",
          "justo",
          "explic*",
          "mesmo jeito"
        ]
      },
      "desfecho": {
        "termos": [
          "convert*",
          "venceu",
          "admitiu",
          "licao",
          "adulto"
        ]
      },
      "ideiaCentral": {
        "termos": [
          "justo",
          "imparc*",
          "igual*",
          "honest*",
          "tratar todos"
        ]
      }
    }
  },
  {
    "id": "rec087",
    "dificuldade": "dificil",
    "titulo": "A camisa do rival",
    "narracao": "O artilheiro Téo recebeu uma proposta milionária para trocar de clube justamente antes da decisão contra o maior rival. A diretoria do seu time não tinha como cobrir o valor e liberou a saída. Téo, porém, lembrou de quando era garoto e a torcida pagou sua viagem para o primeiro torneio. Em vez de assinar logo, ele pediu para jogar a final antes de partir. Na decisão, marcou o gol da vitória contra o rival e só então vestiu a camisa do outro clube. Muitos o chamaram de mercenário; outros, de leal. Téo respondeu que gratidão e ambição podiam caminhar juntas, desde que a ordem fosse respeitada. A história mostrou que retribuir quem nos ajudou não é fraqueza, e sim caráter.",
    "ideiaCentralTexto": "A gratidão a quem nos ajudou deve vir antes da ambição pessoal.",
    "elementos": {
      "personagens": {
        "termos": [
          "teo",
          "artilheir*",
          "diretoria",
          "torcida",
          "rival",
          "clube"
        ]
      },
      "problema": {
        "termos": [
          "proposta",
          "trocar de clube",
          "saida",
          "mercenari*",
          "milionari*"
        ]
      },
      "tentativa": {
        "termos": [
          "pediu para jogar",
          "lembrou",
          "gratidao",
          "final",
          "retribu*"
        ]
      },
      "desfecho": {
        "termos": [
          "marcou",
          "vitoria",
          "vestiu",
          "leal",
          "carater"
        ]
      },
      "ideiaCentral": {
        "termos": [
          "gratidao",
          "leal*",
          "retribu*",
          "carater",
          "ambicao"
        ]
      }
    }
  },
  {
    "id": "rec088",
    "dificuldade": "dificil",
    "titulo": "O banco de reservas",
    "narracao": "Lucas era o maior goleador do colégio, mas no campeonato decisivo o técnico o deixou no banco e escalou Davi, um menino tímido que mal jogava. A escola inteira estranhou a decisão e cobrou explicações. O técnico revelou que Davi tinha treinado em segredo durante meses, enquanto Lucas faltava aos treinos confiando só no talento. No início do jogo, Lucas fervia de raiva no banco, mas aos poucos percebeu o esforço silencioso do colega. Quando entrou no segundo tempo, em vez de roubar a cena, deu o passe que Davi finalizou para o gol do título. Os dois ergueram a taça juntos. Lucas entendeu que talento sem dedicação não basta, e que reconhecer o trabalho do outro também é vencer.",
    "ideiaCentralTexto": "O talento não substitui a dedicação, e reconhecer o esforço alheio é uma vitória.",
    "elementos": {
      "personagens": {
        "termos": [
          "lucas",
          "davi",
          "tecnic*",
          "goleador*",
          "colega",
          "escola"
        ]
      },
      "problema": {
        "termos": [
          "banco",
          "deixou no banco",
          "raiva",
          "faltava",
          "estranh*"
        ]
      },
      "tentativa": {
        "termos": [
          "treinad*",
          "esforco",
          "passe",
          "entrou",
          "percebeu"
        ]
      },
      "desfecho": {
        "termos": [
          "gol",
          "titulo",
          "taca",
          "venc*",
          "entendeu"
        ]
      },
      "ideiaCentral": {
        "termos": [
          "dedicacao",
          "esforco",
          "talento",
          "reconhec*",
          "trabalho"
        ]
      }
    }
  },
  {
    "id": "rec089",
    "dificuldade": "dificil",
    "titulo": "A aposta secreta",
    "narracao": "Antes da semifinal, descobriu-se que o atacante Bruno havia feito uma aposta de dinheiro com um torcedor sobre quantos gols faria. Pelas regras do clube, apostar no próprio desempenho era proibido e dava suspensão. Bruno podia esconder tudo, já que ninguém tinha provas. Atormentado, ele procurou o presidente e confessou antes do jogo, mesmo sabendo que ficaria de fora da partida mais importante do ano. O time perdeu a semifinal sem o artilheiro e muitos o culparam. Porém, a comissão elogiou sua coragem de assumir o erro e o manteve no elenco. No ano seguinte, agora respeitado pela sinceridade, Bruno liderou a equipe ao título. Ele aprendeu que confessar uma falha dói, mas mentir custa muito mais caro.",
    "ideiaCentralTexto": "Assumir o próprio erro é difícil, mas esconder a verdade custa mais caro.",
    "elementos": {
      "personagens": {
        "termos": [
          "bruno",
          "atacante",
          "presidente",
          "torcedor*",
          "artilheir*",
          "time"
        ]
      },
      "problema": {
        "termos": [
          "aposta",
          "proibid*",
          "suspensao",
          "esconder",
          "falha"
        ]
      },
      "tentativa": {
        "termos": [
          "confess*",
          "procurou",
          "assumir",
          "coragem",
          "sinceridade"
        ]
      },
      "desfecho": {
        "termos": [
          "perdeu",
          "elogi*",
          "manteve",
          "titulo",
          "aprend*"
        ]
      },
      "ideiaCentral": {
        "termos": [
          "verdade",
          "assumir",
          "sincer*",
          "honest*",
          "mentir"
        ]
      }
    }
  },
  {
    "id": "rec090",
    "dificuldade": "dificil",
    "titulo": "O pênalti perdido de propósito",
    "narracao": "No jogo beneficente, o craque Igor ganhou um pênalti nos minutos finais contra um time de crianças de um abrigo que sonhava em vencer ao menos uma vez. Converter seria fácil e garantiria a goleada do seu time profissional. Igor olhou para a alegria nervosa do pequeno goleiro adversário e tomou uma decisão estranha. Ele chutou de propósito para fora, deixando o placar como estava. Alguns colegas o criticaram por não respeitar o jogo; outros entenderam o gesto. As crianças do abrigo seguraram o empate e comemoraram como se fosse uma final de Copa. Igor explicou que naquele dia o importante não era o resultado, e sim a felicidade de quem raramente tinha motivos para sorrir. A generosidade dele virou notícia maior que qualquer gol.",
    "ideiaCentralTexto": "Há momentos em que a generosidade vale mais do que vencer.",
    "elementos": {
      "personagens": {
        "termos": [
          "igor",
          "craque",
          "goleir*",
          "criancas",
          "abrigo",
          "adversari*"
        ]
      },
      "problema": {
        "termos": [
          "penalti",
          "goleada",
          "sonhava em vencer",
          "decisao",
          "placar"
        ]
      },
      "tentativa": {
        "termos": [
          "chutou",
          "para fora",
          "de proposito",
          "gesto",
          "deixando"
        ]
      },
      "desfecho": {
        "termos": [
          "empate",
          "comemor*",
          "felicidade",
          "noticia",
          "seguraram"
        ]
      },
      "ideiaCentral": {
        "termos": [
          "generos*",
          "bondade",
          "vale mais",
          "felicidade",
          "vencer"
        ]
      }
    }
  },
  {
    "id": "rec091",
    "dificuldade": "dificil",
    "titulo": "A herança do treinador",
    "narracao": "O velho treinador Salomão anunciou que se aposentaria e precisava escolher entre dois auxiliares para o seu lugar. Vítor era brilhante taticamente, mas arrogante; Pedro era simples, porém tratava cada jogador com afeto. Todos esperavam que o cargo fosse para o mais talentoso. Para decidir, Salomão deu a cada um a missão de treinar os garotos mais fracos do clube por um mês. Vítor desistiu na primeira semana, dizendo que eram caso perdido. Pedro insistiu, descobriu o que cada menino fazia bem e transformou o grupo. No fim do prazo, os garotos antes desprezados venceram um amistoso difícil. Salomão escolheu Pedro e disse que um bom líder não é quem brilha sozinho, mas quem faz os outros crescerem.",
    "ideiaCentralTexto": "Um bom líder se mede por sua capacidade de fazer os outros crescerem.",
    "elementos": {
      "personagens": {
        "termos": [
          "salomao",
          "vitor",
          "pedro",
          "treinador*",
          "auxiliar*",
          "garotos"
        ]
      },
      "problema": {
        "termos": [
          "aposentar*",
          "escolher",
          "arrogante",
          "caso perdido",
          "desistiu"
        ]
      },
      "tentativa": {
        "termos": [
          "treinar",
          "insistiu",
          "descobriu",
          "transformou",
          "afeto"
        ]
      },
      "desfecho": {
        "termos": [
          "venceram",
          "escolheu",
          "amistoso",
          "cresc*",
          "disse"
        ]
      },
      "ideiaCentral": {
        "termos": [
          "lider*",
          "humild*",
          "fazer os outros",
          "cresc*",
          "paciencia"
        ]
      }
    }
  },
  {
    "id": "rec092",
    "dificuldade": "dificil",
    "titulo": "O gêmeo do gol",
    "narracao": "Os gêmeos André e Caio eram idênticos e jogavam no mesmo time, mas só André tinha sido inscrito no campeonato. Numa rodada decisiva, André machucou o tornozelo na véspera e ninguém mais poderia substituí-lo a tempo. Caio se ofereceu para entrar em campo fingindo ser o irmão, e quase ninguém notaria a troca. Os dois ficaram a noite inteira pensando se valia a pena trapacear para garantir a classificação. De manhã, decidiram contar a verdade à arbitragem em vez de enganar todo mundo. O time foi punido com a ausência de André, mas jogou com honestidade e, contra todas as previsões, empatou e avançou pelo saldo. Os gêmeos descobriram que uma vitória limpa, mesmo improvável, dorme melhor à noite do que um título sujo.",
    "ideiaCentralTexto": "Uma conquista honesta vale mais do que um título obtido com trapaça.",
    "elementos": {
      "personagens": {
        "termos": [
          "andre",
          "caio",
          "gemeos",
          "irmao",
          "arbitr*",
          "time"
        ]
      },
      "problema": {
        "termos": [
          "machucou",
          "tornozelo",
          "fingindo",
          "trapac*",
          "enganar"
        ]
      },
      "tentativa": {
        "termos": [
          "contar a verdade",
          "decidiram",
          "honest*",
          "arbitr*",
          "verdade"
        ]
      },
      "desfecho": {
        "termos": [
          "punid*",
          "empatou",
          "avancou",
          "saldo",
          "descobriram"
        ]
      },
      "ideiaCentral": {
        "termos": [
          "honest*",
          "verdade",
          "trapac*",
          "limp*",
          "vitoria limpa"
        ]
      }
    }
  },
  {
    "id": "rec093",
    "dificuldade": "dificil",
    "titulo": "A entrevista perigosa",
    "narracao": "Depois de uma derrota dura, a meia Fernanda foi cercada por repórteres que queriam que ela culpasse a goleira pelos gols sofridos. Era a saída fácil: jogar a responsabilidade na colega e salvar a própria imagem. Fernanda, no entanto, lembrou que a goleira tinha defendido sozinha vários ataques antes da falha. Diante das câmeras, ela assumiu que o time inteiro errou e que ninguém perde ou ganha sozinho. A goleira, que assistia tremendo de medo, sentiu-se protegida pela companheira. A imprensa estranhou, esperando polêmica, mas a torcida valorizou a atitude. Naquela semana o grupo treinou mais unido do que nunca e reagiu no campeonato. Fernanda mostrou que defender um colega na hora difícil cria laços que nenhuma vitória sozinha consegue.",
    "ideiaCentralTexto": "Defender um companheiro na hora difícil fortalece o time mais do que culpar alguém.",
    "elementos": {
      "personagens": {
        "termos": [
          "fernanda",
          "goleir*",
          "reporter*",
          "imprensa",
          "meia",
          "colega"
        ]
      },
      "problema": {
        "termos": [
          "derrota",
          "culpasse",
          "falha",
          "responsabilidade",
          "polemica"
        ]
      },
      "tentativa": {
        "termos": [
          "assumiu",
          "time inteiro",
          "proteg*",
          "defend*",
          "ninguem sozinho"
        ]
      },
      "desfecho": {
        "termos": [
          "unid*",
          "reagiu",
          "valoriz*",
          "lacos",
          "treinou"
        ]
      },
      "ideiaCentral": {
        "termos": [
          "lealdade",
          "companheir*",
          "defend*",
          "unir",
          "culpar"
        ]
      }
    }
  },
  {
    "id": "rec094",
    "dificuldade": "dificil",
    "titulo": "O placar adulterado",
    "narracao": "O time juvenil descobriu que, na tabela oficial, alguém havia somado três pontos a mais para a equipe deles por engano de digitação. Com aqueles pontos extras, eles terminariam em primeiro sem precisar jogar a última rodada. O capitão Otávio sabia que bastava ficar calado e o erro nunca seria notado. Mas ele reuniu o grupo e perguntou se queriam ser campeões por um número falso. Após muita discussão, decidiram avisar a organização sobre o equívoco a favor deles mesmos. Tiveram que disputar a rodada final e quase perderam o título por isso. No último lance, marcaram o gol que valeu a taça de forma legítima. Otávio disse que ser campeão de mentira seria como ganhar um troféu vazio.",
    "ideiaCentralTexto": "Vencer com base numa mentira é vazio; a vitória só tem valor quando é legítima.",
    "elementos": {
      "personagens": {
        "termos": [
          "otavio",
          "capit*",
          "time",
          "organizacao",
          "grupo",
          "juvenil"
        ]
      },
      "problema": {
        "termos": [
          "pontos a mais",
          "engano",
          "erro",
          "falso",
          "calado"
        ]
      },
      "tentativa": {
        "termos": [
          "avisar",
          "decidiram",
          "reuniu",
          "equivoco",
          "disputar"
        ]
      },
      "desfecho": {
        "termos": [
          "marcaram",
          "taca",
          "titulo",
          "legitim*",
          "disse"
        ]
      },
      "ideiaCentral": {
        "termos": [
          "honest*",
          "legitim*",
          "mentira",
          "merec*",
          "verdade"
        ]
      }
    }
  },
  {
    "id": "rec095",
    "dificuldade": "dificil",
    "titulo": "O adversário no chão",
    "narracao": "Na disputa do título, o zagueiro Nuno tinha o caminho livre para o gol decisivo quando viu o atacante rival cair desacordado atrás dele, sem que o juiz percebesse. Ele podia seguir e marcar, garantindo a taça para o seu time. Em vez disso, Nuno chutou a bola para fora e correu para socorrer o adversário caído. O jogo foi paralisado e o rapaz, atendido a tempo, passou bem. A jogada perdida custou caro: o time de Nuno empatou e ficou com o vice-campeonato. Parte da torcida o criticou por abrir mão do gol. Mas o pai do jogador socorrido procurou Nuno para agradecer por ter colocado uma vida acima de um troféu. Nuno respondeu que nenhuma taça valeria a saúde de outra pessoa.",
    "ideiaCentralTexto": "A vida e a segurança de uma pessoa valem mais do que qualquer troféu.",
    "elementos": {
      "personagens": {
        "termos": [
          "nuno",
          "zagueir*",
          "adversari*",
          "rival",
          "juiz",
          "atacante"
        ]
      },
      "problema": {
        "termos": [
          "caido",
          "desacordado",
          "gol decisivo",
          "socorr*",
          "taca"
        ]
      },
      "tentativa": {
        "termos": [
          "chutou",
          "para fora",
          "socorrer",
          "paralisad*",
          "correu"
        ]
      },
      "desfecho": {
        "termos": [
          "empatou",
          "vice",
          "agradecer",
          "passou bem",
          "criticou"
        ]
      },
      "ideiaCentral": {
        "termos": [
          "vida",
          "solidari*",
          "acima de",
          "trofeu",
          "respeit*"
        ]
      }
    }
  },
  {
    "id": "rec096",
    "dificuldade": "dificil",
    "titulo": "A promessa do treino",
    "narracao": "A jovem Sofia sonhava em ser titular, mas o técnico exigiu que ela escolhesse: faltar à formatura da irmã para um treino extra ou perder a vaga no jogo da vida. Todos diziam que uma chance assim não voltaria. Sofia ponderou durante dias e percebeu que a irmã estivera ao seu lado em cada derrota e cada lesão. Ela decidiu ir à formatura e abrir mão do treino, aceitando ficar no banco. O técnico, irritado, cumpriu a ameaça e a deixou de fora. No entanto, ao ver a lealdade de Sofia à família, uma olheira de outro clube ofereceu a ela uma proposta justamente por causa do caráter. Sofia entendeu que algumas oportunidades não valem o preço de abandonar quem amamos.",
    "ideiaCentralTexto": "Nenhuma oportunidade vale a pena se o preço é abandonar quem amamos.",
    "elementos": {
      "personagens": {
        "termos": [
          "sofia",
          "irma",
          "tecnic*",
          "olheir*",
          "familia",
          "titular"
        ]
      },
      "problema": {
        "termos": [
          "escolher",
          "faltar",
          "formatura",
          "perder a vaga",
          "ameaca"
        ]
      },
      "tentativa": {
        "termos": [
          "decidiu",
          "ponderou",
          "abrir mao",
          "ir a formatura",
          "lealdade"
        ]
      },
      "desfecho": {
        "termos": [
          "banco",
          "proposta",
          "ofereceu",
          "carater",
          "entendeu"
        ]
      },
      "ideiaCentral": {
        "termos": [
          "familia",
          "lealdade",
          "amamos",
          "oportunidade",
          "preco"
        ]
      }
    }
  },
  {
    "id": "rec097",
    "dificuldade": "dificil",
    "titulo": "O técnico de dois times",
    "narracao": "Por uma confusão de contratos, o treinador Henrique acabou comandando, na mesma rodada, dois clubes que se enfrentariam entre si pela liderança. Cada diretoria queria que ele entregasse os segredos do outro lado para garantir a vitória. Henrique percebeu que trair qualquer um dos grupos destruiria sua reputação para sempre. Ele reuniu os presidentes e propôs renunciar a um dos cargos antes do jogo, em vez de manipular o confronto. Abriu mão do salário maior para preservar a justiça da partida. O clube que ele deixou ficou bravo, dizendo que perdeu uma vantagem. Mas no longo prazo Henrique tornou-se o treinador mais procurado do país, pois todos confiavam nele. A história provou que a reputação construída com integridade vale mais que qualquer atalho.",
    "ideiaCentralTexto": "A integridade constrói uma reputação que vale mais do que qualquer atalho.",
    "elementos": {
      "personagens": {
        "termos": [
          "henrique",
          "treinador*",
          "tecnic*",
          "presidente*",
          "diretoria",
          "clubes"
        ]
      },
      "problema": {
        "termos": [
          "dois clubes",
          "segredos",
          "trair",
          "confusao",
          "manipular"
        ]
      },
      "tentativa": {
        "termos": [
          "renunciar",
          "propos",
          "abriu mao",
          "reuniu",
          "preservar"
        ]
      },
      "desfecho": {
        "termos": [
          "procurad*",
          "confiavam",
          "reputacao",
          "bravo",
          "provou"
        ]
      },
      "ideiaCentral": {
        "termos": [
          "integridade",
          "reputacao",
          "honest*",
          "confianca",
          "atalho"
        ]
      }
    }
  },
  {
    "id": "rec098",
    "dificuldade": "dificil",
    "titulo": "A bola de ouro dividida",
    "narracao": "No fim da temporada, dois colegas do mesmo time, Tiago e Mateus, disputavam o prêmio de melhor jogador, que só um poderia receber. A imprensa apontava Tiago como favorito por ter mais gols, embora Mateus tivesse dado quase todos os passes para esses gols. Durante a votação, Tiago notou que o trabalho do amigo estava sendo ignorado pelos jornalistas. Em vez de aproveitar a fama sozinho, ele subiu ao palco e declarou publicamente que o prêmio pertencia aos dois. Sugeriu dividir o troféu e o reconhecimento com Mateus diante de todos. Alguns acharam exagero, mas o gesto comoveu o vestiário. Os dois passaram a jogar ainda mais entrosados na temporada seguinte. Tiago mostrou que reconhecer quem nos ajuda a brilhar é maior do que qualquer prêmio individual.",
    "ideiaCentralTexto": "Reconhecer quem nos ajuda a brilhar é mais nobre do que receber a glória sozinho.",
    "elementos": {
      "personagens": {
        "termos": [
          "tiago",
          "mateus",
          "colega*",
          "jornalist*",
          "imprensa",
          "amigo"
        ]
      },
      "problema": {
        "termos": [
          "premio",
          "so um",
          "ignorad*",
          "favorito",
          "fama"
        ]
      },
      "tentativa": {
        "termos": [
          "declarou",
          "dividir",
          "subiu ao palco",
          "reconhec*",
          "pertencia aos dois"
        ]
      },
      "desfecho": {
        "termos": [
          "comoveu",
          "entrosad*",
          "gesto",
          "mostrou",
          "troféu"
        ]
      },
      "ideiaCentral": {
        "termos": [
          "reconhec*",
          "humild*",
          "generos*",
          "gloria",
          "dividir"
        ]
      }
    }
  },
  {
    "id": "rec099",
    "dificuldade": "dificil",
    "titulo": "O perdão no túnel",
    "narracao": "Anos antes, numa entrada violenta, o zagueiro Caetano havia quebrado a perna do atacante Vinícius e encerrado a carreira dele cedo. Os dois nunca mais se falaram, e Vinícius carregava um ódio enorme. O destino quis que Vinícius, agora treinador, recebesse Caetano como reforço no clube que comandava. No túnel do estádio, antes do primeiro treino, os dois se encararam em silêncio pesado. Caetano pediu desculpas sinceras, dizendo que se arrependia daquele lance todos os dias. Vinícius poderia se vingar barrando o jogador, mas escolheu perdoar e dar uma chance ao antigo rival. Juntos, técnico e zagueiro levaram o time pequeno a um título inesperado. Vinícius confessou que guardar rancor o havia machucado mais do que a antiga lesão, e que o perdão finalmente o libertou.",
    "ideiaCentralTexto": "O perdão liberta quem o concede mais do que o rancor jamais poderia.",
    "elementos": {
      "personagens": {
        "termos": [
          "caetano",
          "vinicius",
          "zagueir*",
          "atacante",
          "treinador*",
          "rival"
        ]
      },
      "problema": {
        "termos": [
          "quebrado a perna",
          "odio",
          "rancor",
          "vingar",
          "lesao"
        ]
      },
      "tentativa": {
        "termos": [
          "desculpas",
          "perdoar",
          "escolheu",
          "arrepend*",
          "chance"
        ]
      },
      "desfecho": {
        "termos": [
          "titulo",
          "libertou",
          "juntos",
          "confessou",
          "inesperad*"
        ]
      },
      "ideiaCentral": {
        "termos": [
          "perdao",
          "perdoar",
          "rancor",
          "libert*",
          "odio"
        ]
      }
    }
  },
  {
    "id": "rec100",
    "dificuldade": "dificil",
    "titulo": "O último a sair",
    "narracao": "O goleiro veterano Ângelo descobriu que o garoto Léo, sua jovem promessa reserva, seria dispensado por falta de espaço no elenco. Ângelo ainda era titular e poderia simplesmente cuidar da própria vaga até a aposentadoria. Em vez disso, ele percebeu que Léo tinha um talento raro que o clube estava prestes a desperdiçar. Ângelo procurou a diretoria e propôs algo inédito: pediu para encerrar a carreira mais cedo, abrindo a vaga para o menino seguir no time. Muitos não entenderam por que um ídolo abriria mão de seus últimos jogos. Léo assumiu o gol, brilhou e anos depois virou capitão e ídolo da torcida. Quando ergueu seu primeiro troféu, dedicou tudo ao veterano que cedera o lugar. Ângelo provou que o verdadeiro legado de alguém é o caminho que ele abre para os que vêm depois.",
    "ideiaCentralTexto": "O maior legado de uma pessoa é abrir caminho para quem vem depois.",
    "elementos": {
      "personagens": {
        "termos": [
          "angelo",
          "leo",
          "goleir*",
          "diretoria",
          "veteran*",
          "reserva"
        ]
      },
      "problema": {
        "termos": [
          "dispensad*",
          "falta de espaco",
          "desperdic*",
          "vaga",
          "reserva"
        ]
      },
      "tentativa": {
        "termos": [
          "propos",
          "encerrar a carreira",
          "abrindo a vaga",
          "procurou",
          "abriria mao"
        ]
      },
      "desfecho": {
        "termos": [
          "brilhou",
          "capit*",
          "idolo",
          "trofeu",
          "dedicou"
        ]
      },
      "ideiaCentral": {
        "termos": [
          "legado",
          "generos*",
          "sacrif*",
          "abrir caminho",
          "altruis*"
        ]
      }
    }
  }
];

  var INDICE_POR_ID = Object.create(null);
  for (var i = 0; i < EXERCICIOS.length; i++) {
    INDICE_POR_ID[EXERCICIOS[i].id] = EXERCICIOS[i];
  }

  function obterPorId(id) {
    if (id === undefined || id === null || id === "") { return null; }
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
  if (typeof module !== "undefined" && module.exports) { module.exports = api; }
})(typeof window !== "undefined" ? window : globalThis);
