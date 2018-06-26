#!/bin/bash

CURRENT=$(pwd)
DIST="$CURRENT/dist"
APP="$CURRENT/app"

docker run -d -v $DIST:/app/dist -v $APP:/app/app -p 9999:9999 vemsy:latest