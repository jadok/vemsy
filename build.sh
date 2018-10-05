#!/bin/bash

docker build -t vemsy/app .
cd gulp

docker build -t vemsy/compile .

cd -
