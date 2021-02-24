#!/bin/bash

WTIME=$(/bin/node /path/to/random-day.js)

/bin/echo $WTIME
/bin/sleep $WTIME
/bin/node /path/to/dca.js
