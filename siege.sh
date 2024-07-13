#!/bin/bash

# Defina as variáveis para o comando do Siege

#TOKEN="oat_NzA.SmViRjdZVEt5dzBVbG5hd2ZSOUpKOHU2WnVGZzVlOFFYUGRMRG8tZzM4NzcwMjEyMTQ"
#URL="https://fono-api-adonis.fly.dev/answered-questionnaire/2"

# Execute o comando do Siege com as variáveis definidas
#siege -c 1 -r 20 -b -i 100 \
#    -H "Authorization: Bearer $TOKEN" \
#    $URL


# URL para localhost/todolist


URL="http://localhost:3000/todolist"

# Execute o comando do Siege com as variáveis definidas
#siege -c 90 -r 3 -b  $URL
#siege -c 46007 -b -t 1M $URL

#siege -R ~/.siegerc -c 255  -r 99999 -b -t 60S $URL

siege -R ~/.siegerc -c 255   $URL