#!/usr/bin/env bash

# Unicode Private Use Area Range [E000, F8FF], total 6400 chars
idx=$((16#E000)); end=$((16#E050)); xCnt=0

[[ -f private-area.css ]] && rm -f private-area.css

for ((; idx < end; idx++)); do
  printf -v HEX '%x' ${idx} # .icon-e000:before { content: "\e000"; }
  printf ".icon-${HEX}:before { content: '\\\\${HEX}'; }" >> private-area.css
  if (( xCnt++, xCnt % 2 == 0 )); then
    echo        >> private-area.css
  else
    printf "  " >> private-area.css
  fi
done
