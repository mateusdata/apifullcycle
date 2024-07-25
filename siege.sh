#!/bin/bash

# Defina as variáveis para o comando do Siege

#TOKEN="oat_NzA.SmViRjdZVEt5dzBVbG5hd2ZSOUpKOHU2WnVGZzVlOFFYUGRMRG8tZzM4NzcwMjEyMTQ"
#URL="https://fono-api-adonis.fly.dev/answered-questionnaire/2"

#siege -c 1 -r 20 -b -i 100 \
#    -H "Authorization: Bearer $TOKEN" \
#    $URL


# URL para localhost/todolist


#URL="http://localhost:3000/todolist"
URL="https://api.mateusdata.com.br/todolist"


#siege -c 90 -r 3 -b  $URL
#siege -c 46007 -b -t 1M $URL

#siege -R ~/.siegerc -c 255  -r 99999 -b -t 60S $URL

siege -R ~/.siegerc -c 255 -r 1000000000 -d 0  $URL

