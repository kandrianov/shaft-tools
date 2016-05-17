#!/bin/bash
FILE='./../../Makefile'
DATA="# SHAFT-TOOLS\ninclude ./node_modules/shaft-tools/Makefile\n# /SHAFT-TOOLS"

if test -e $FILE && grep -q SHAFT-TOOLS $FILE; then
  sed -i "/SHAFT-TOOLS/,/\/SHAFT-TOOLS/c\\\n${DATA}" $FILE
else
  printf "\n${DATA}" >> $FILE
fi
