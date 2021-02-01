#!/bin/bash

WTIME=$(( ( RANDOM % 86399 )  + 1 ))

/bin/echo $WTIME
/bin/sleep $WTIME
/bin/node /path/to/dca.js
