#!/bin/bash

docker run -v `pwd`/dist:/app/dist -v `pwd`/app:/app/app -p 9999:9999 vemsy:latest