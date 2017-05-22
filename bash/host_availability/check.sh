#!/bin/bash

error=""
msg=$'{
	"dest": {
		"user": "jaime@eldoctordeldesierto.com"
	},
	"msg": {
		"title": "matusaISP core network failure!",
		"data": "DATA"
	}
}'

while read line;
do
    ping -c 2 -W 2 "$line" > /dev/null
    if ! [ $? -eq 0 ]; then
        error+="router $line is down\\n"
    fi
done < "list.txt"

if ! [[ -z "${error}" ]]; then
    msg="${msg/DATA/$error}"
    echo "$msg"
    curl -H "Content-Type: application/json" -X POST -d "$msg" "http://eldoctordeldesierto.com:6060/notmail_api/app/msg?unique_id=REPLACEWITHUNIQUEID&shared_key=REPLACEWITHSHAREDKEY"
fi