#!/bin/bash
if [ -f ".env" ]; then
  source .env
fi

declare -A confs
confs=(
    [{ALLOW_URLS}]="$ALLOW_URLS"
    [{DB_URL}]="$DB_URL"
    [{REDIS_SESSION_URL}]="$REDIS_SESSION_URL"
    [{REDIS_SOCKET_URL}]="$REDIS_SOCKET_URL"
    [{REDIS_JOBQUEUE_URL}]="$REDIS_JOBQUEUE_URL"
    [{BASE_URL}]="$BASE_URL"
    [{WEB_APP_URL}]="$WEB_APP_URL"
    [{MAILJET_AK}]="$MAILJET_AK"
    [{MAILJET_AS}]="$MAILJET_AS"
    [{MAILJET_VERSION}]="$MAILJET_VERSION"
    [{MAILJET_EMAIL}]="$MAILJET_EMAIL"
    [{MAILJET_NAME}]="$MAILJET_NAME"
    [{LOG_LEVEL}]="$LOG_LEVEL"
    [{PORT}]="$PORT"
)
echo "Copy configuration" ;
# share dir
SETUP_FILE_PATH="./config/env/$NODE_ENV.js" ;
echo "${SETUP_FILE_PATH}" ;
cp "./templates/env.js" "${SETUP_FILE_PATH}" ;

configurer() {
    # Loop the config array
    for i in "${!confs[@]}"
    do
        search=$i
        replace=${confs[$i]}
        escaped_replace=$(printf '%s\n' "$replace" | sed -e 's/[\/&]/\\&/g')

        echo sed -i "s/$search/$escaped_replace/g" "${SETUP_FILE_PATH}"
        # Note the "" after -i, needed in OS X
        sed -i "s/$search/$escaped_replace/g" "${SETUP_FILE_PATH}"
    done
}
configurer ;
