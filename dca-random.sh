#!/bin/bash

WTIME=$(( ((RANDOM % 37767) + (RANDOM % 37767) + (RANDOM % 10866))  + 1 ))

/bin/echo $WTIME
/bin/sleep $WTIME
/bin/node /path/to/dca.js
