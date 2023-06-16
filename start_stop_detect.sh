#!/bin/bash

# -------------------------------------------------
# Config
# -------------------------------------------------

# name of the start script
PATH_TO_START_SCRIPT="/path/to/your/start.sh"

# port of the server
MINECRAFT_PORT=25565

# server ip/domain
SERVERIP="test.com"

# name of the created screen
SCREEN_NAME="minecraft"

# API URL for mcstatus
# see https://github.com/mcstatus-io/website
URL="https://api.mcstatus.io/v2/status/java/$SERVERIP:$MINECRAFT_PORT"

# -------------------------------------------------
# technical variable  
IS_SERVER_ON=0



RESPONSE=$(curl -s "$URL")

ONLINE=$(echo "$RESPONSE" | jq -r '.online')

if [ "$ONLINE" = "true" ]; then
    IS_SERVER_ON=1
fi

while true; do
    if [ $IS_SERVER_ON -eq 0 ]; then
        if nc -l -p $MINECRAFT_PORT >/dev/null; then
            echo "Player joined. Starting server..."
            screen -dmS $SCREEN_NAME sh -c "$PATH_TO_START_SCRIPT; exec sh"
            IS_SERVER_ON=1
	fi
    else
        sleep 1800

        RESPONSE=$(curl -s "$URL")
        PLAYERS=$(echo "$RESPONSE" | jq -r '.players.online')
        ONLINE=$(echo "$RESPONSE" | jq -r '.ONLINE')

        if [ "$ONLINE" = "false" ]; then
            screen -X -S $SCREEN_NAME kill
            screen -dmS $SCREEN_NAME sh -c "$PATH_TO_START_SCRIPT; exec sh"
        else
            if [ $PLAYERS -eq 0 ]; then
                screen -X -S $SCREEN_NAME kill
                IS_SERVER_ON=0
            fi
        fi  
    fi
    sleep 2
done
