#!/bin/sh
BANNER=$(node scripts/add-banner.js)
SUBSTITUTION_COMMAND="${BANNER}"
# echo "$SUBSTITUTION_COMMAND"
find dist/ -type f -name '*.css' -exec bash -c 'echo "${SUBSTITUTION_COMMAND}"' - '{}' \;
# sed -i "" "1s;^;${BANNER};" "$1"
# echo "$BANNER"
