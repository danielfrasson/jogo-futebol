#!/bin/bash
# Ralph Loop — Bundle Size
# Reduz o bundle do frontend cortando o módulo mais pesado por iteração.
#
# Uso:
#   ./ralph-bundle.sh <iteracoes> [tamanho_alvo_kb] [comando_de_build]
#
# Exemplos:
#   ./ralph-bundle.sh 10
#   ./ralph-bundle.sh 10 250 "npm run build"
#   ./ralph-bundle.sh 10 500 "npm run build:analyze"

set -e

if [ -z "$1" ]; then
  echo "Uso: $0 <iteracoes> [tamanho_alvo_kb] [comando_de_build]"
  exit 1
fi

ITER="$1"
TARGET_KB="${2:-250}"
BUILD_CMD="${3:-npm run build}"
PROGRESS_FILE="bundle-progress.txt"
LOOP_NAME="bundle"

write_status() {
  mkdir -p .ralph/status
  echo "$LOOP_NAME|$1|$ITER|$2" > ".ralph/status/$LOOP_NAME.txt"
}

touch "$PROGRESS_FILE"

for ((i=1; i<=ITER; i++)); do
  echo ""
  echo "=========================================="
  echo "  Ralph Bundle Size — iteração $i / $ITER"
  echo "  Alvo: ${TARGET_KB}KB   Build: ${BUILD_CMD}"
  echo "=========================================="

  result=$(claude --permission-mode acceptEdits -p "@${PROGRESS_FILE} \
Você está em um loop Ralph focado em BUNDLE SIZE. Alvo: chunk inicial <= ${TARGET_KB}KB (gzip).

1. Rode o build: \`${BUILD_CMD}\`. Localize o relatório de tamanho (stats.json, dist/*.html do bundle analyzer, ou saída do build).
2. Identifique o tamanho do chunk inicial (initial/main, NÃO async chunks).
3. Se inicial <= ${TARGET_KB}KB, responda apenas com <promise>COMPLETE</promise> e pare.
4. Caso contrário, identifique o módulo mais pesado no chunk inicial que ainda não foi tratado segundo ${PROGRESS_FILE}. Considere:
   - Bibliotecas inteiras importadas quando só uma função é usada (ex.: \`import _ from 'lodash'\`)
   - Componentes pesados carregados eagerly que poderiam ser lazy
   - Polyfills incluídos para targets que o projeto não suporta
   - Imagens/assets embarcados via base64
   - Locales/data pesados (moment com todos os locales, intl-data completo)
5. Aplique UMA das estratégias, em ordem de preferência:
   a) **Tree-shake**: troque import default por import nomeado (\`import { debounce } from 'lodash-es'\`).
   b) **Lazy/code-split**: \`React.lazy\`, \`import()\` dinâmico para rotas/dialogs/modais não-iniciais.
   c) **Substituir**: troque por alternativa menor (moment → date-fns, axios → fetch nativo, lodash → utilitários nativos).
   d) **Remover**: se for genuinamente desnecessário.
6. Rode o build novamente e CONFIRME que:
   - O chunk inicial diminuiu.
   - Nenhum chunk async ficou inviável (ex.: 2MB de uma vez ao abrir uma rota).
7. Rode os testes e a aplicação localmente; smoke-test no caminho afetado. Se quebrar, reverta.
8. Commit no formato: 'perf(bundle): <estratégia> <módulo> (-XXKB)'.
9. Acrescente em ${PROGRESS_FILE}: data ISO, módulo, estratégia, KB antes -> depois (chunk inicial).

REGRAS:
- UM módulo por iteração.
- Não dinamite eager imports que afetam o tempo do primeiro render só pra mover bytes pra outro chunk gigante.
- Se a redução for < 5KB, registre como 'baixo ROI' e escolha outro alvo.")

  echo "$result"

  if [[ "$result" == *"<promise>COMPLETE</promise>"* ]]; then
    echo ""
    echo "Bundle dentro do alvo após $i iterações."
    write_status "$i" "COMPLETE"
    exit 0
  fi
done

echo ""
echo "Loop finalizado após $ITER iterações; bundle ainda acima do alvo."
write_status "$ITER" "INCOMPLETE"
