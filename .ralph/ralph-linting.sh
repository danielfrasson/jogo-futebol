#!/bin/bash
# Ralph Loop — Linting
# Corrige erros de lint um a um, com commit por correção.
#
# Uso:
#   ./ralph-linting.sh <iteracoes> [comando_de_lint]
#
# Exemplos:
#   ./ralph-linting.sh 50
#   ./ralph-linting.sh 50 "npx eslint . --max-warnings 0"
#   ./ralph-linting.sh 50 "ruff check ."
#   ./ralph-linting.sh 50 "golangci-lint run ./..."

set -e

if [ -z "$1" ]; then
  echo "Uso: $0 <iteracoes> [comando_de_lint]"
  exit 1
fi

ITER="$1"
LINT_CMD="${2:-npx eslint .}"
PROGRESS_FILE="lint-progress.txt"
LOOP_NAME="linting"

write_status() {
  mkdir -p .ralph/status
  echo "$LOOP_NAME|$1|$ITER|$2" > ".ralph/status/$LOOP_NAME.txt"
}

touch "$PROGRESS_FILE"

for ((i=1; i<=ITER; i++)); do
  echo ""
  echo "=========================================="
  echo "  Ralph Linting — iteração $i / $ITER"
  echo "  Comando: ${LINT_CMD}"
  echo "=========================================="

  result=$(claude --permission-mode acceptEdits -p "@${PROGRESS_FILE} \
Você está em um loop Ralph focado em LINTING. Objetivo: zerar os erros do linter, um por iteração.

1. Rode o linter: \`${LINT_CMD}\`. Capture a saída.
2. Se a saída indicar 0 erros e 0 warnings (ou se o linter retornar sucesso e a contagem global de problemas estiver zerada), responda apenas com <promise>COMPLETE</promise> e pare.
3. Caso contrário, escolha UM ÚNICO erro/warning para corrigir agora — preferindo, nessa ordem: (a) erros sobre warnings; (b) regras de segurança/correção sobre regras de estilo; (c) o arquivo com a maior densidade de problemas.
4. Antes de corrigir manualmente, tente \`<comando_de_lint> --fix\` (ou equivalente: \`ruff check --fix\`, \`golangci-lint run --fix\`) restrito ao arquivo escolhido. Se o autofix resolver, ótimo.
5. Para o que sobrar, edite o código e corrija. NÃO desabilite a regra (sem \`eslint-disable\`, \`# noqa\`, \`//nolint\` etc.) — corrija o problema na raiz. Se a regra for genuinamente inadequada para o projeto, registre no progresso para revisão humana e escolha outro problema.
6. Rode o linter novamente APENAS no arquivo modificado para confirmar que o erro escolhido sumiu e nenhum novo apareceu. Depois rode o linter completo para o panorama geral.
7. Rode os testes do projeto se existirem (\`npm test\`, \`pytest\`, etc.). Se quebrarem, reverta a correção e escolha outro problema.
8. Commit no formato: 'lint(<regra>): <arquivo>'.
9. Acrescente uma linha em ${PROGRESS_FILE}: data ISO, regra corrigida, arquivo, total de problemas antes -> depois.

REGRAS:
- UM ÚNICO problema por iteração.
- Nunca silencie a regra; corrija o código.
- Se houver conflito com o formatador (prettier/black), rode o formatador antes da próxima iteração e registre.")

  echo "$result"

  if [[ "$result" == *"<promise>COMPLETE</promise>"* ]]; then
    echo ""
    echo "Lint zerado após $i iterações."
    write_status "$i" "COMPLETE"
    exit 0
  fi
done

echo ""
echo "Loop finalizado após $ITER iterações; ainda restam problemas de lint."
write_status "$ITER" "INCOMPLETE"
