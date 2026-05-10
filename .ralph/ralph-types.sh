#!/bin/bash
# Ralph Loop — Type Safety
# Migra para strict mode adicionando tipos um arquivo por iteração.
#
# Uso:
#   ./ralph-types.sh <iteracoes> [comando]
#
# Exemplos:
#   ./ralph-types.sh 30
#   ./ralph-types.sh 30 "npx tsc --noEmit --strict"
#   ./ralph-types.sh 30 "mypy --strict src/"
#   ./ralph-types.sh 30 "pyright"

set -e

if [ -z "$1" ]; then
  echo "Uso: $0 <iteracoes> [comando]"
  exit 1
fi

ITER="$1"
TYPE_CMD="${2:-npx tsc --noEmit --strict}"
PROGRESS_FILE="types-progress.txt"
LOOP_NAME="types"

write_status() {
  mkdir -p .ralph/status
  echo "$LOOP_NAME|$1|$ITER|$2" > ".ralph/status/$LOOP_NAME.txt"
}

touch "$PROGRESS_FILE"

for ((i=1; i<=ITER; i++)); do
  echo ""
  echo "=========================================="
  echo "  Ralph Type Safety — iteração $i / $ITER"
  echo "  Comando: ${TYPE_CMD}"
  echo "=========================================="

  result=$(claude --permission-mode acceptEdits -p "@${PROGRESS_FILE} \
Você está em um loop Ralph focado em TYPE SAFETY (migração strict).

1. Rode o type-checker: \`${TYPE_CMD}\`. Capture os erros.
2. Se 0 erros, responda apenas com <promise>COMPLETE</promise> e pare.
3. Caso contrário, escolha UM ÚNICO arquivo com erros — preferindo o que tem mais erros concentrados (resolve em massa). Cheque ${PROGRESS_FILE} para não repetir.
4. Para cada erro no arquivo:
   - Adicione o tipo correto, inferindo do uso real.
   - NÃO use \`any\`, \`unknown as Foo\`, \`# type: ignore\`, \`@ts-ignore\` sem comentário JUSTIFICANDO a exceção.
   - Se um tipo de biblioteca externa estiver faltando, instale \`@types/<lib>\` ou crie um \`.d.ts\` mínimo.
5. Rode o type-checker novamente APENAS no escopo afetado. Confirme que os erros do arquivo escolhido sumiram e nenhum novo apareceu em arquivos relacionados.
6. Rode os testes do projeto. Se quebrarem, o código tinha bug latente que a tipagem expôs — corrija o bug, NÃO relaxe a tipagem.
7. Commit no formato: 'types: <arquivo>'.
8. Acrescente em ${PROGRESS_FILE}: data ISO, arquivo, erros antes -> depois (no arquivo) e total no projeto.

REGRAS:
- UM arquivo por iteração.
- \`any\` é última escolha e exige comentário /* TODO: tipar — <motivo> */.
- Nunca relaxe a flag estrita pra fazer passar; conserte o tipo.
- Se um arquivo exigir refatoração arquitetural, registre como 'difere arquitetura' e escolha outro.")

  echo "$result"

  if [[ "$result" == *"<promise>COMPLETE</promise>"* ]]; then
    echo ""
    echo "Type-check zerado após $i iterações."
    write_status "$i" "COMPLETE"
    exit 0
  fi
done

echo ""
echo "Loop finalizado após $ITER iterações; ainda há erros de tipo."
write_status "$ITER" "INCOMPLETE"
