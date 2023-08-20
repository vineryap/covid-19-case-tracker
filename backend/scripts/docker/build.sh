#!/usr/bin/env sh

# only build image when not exist
if [[ "$(docker images -q assignment-fastapi 2>/dev/null)" == "" ]]; then
    docker build -t assignment-fastapi -f Dockerfile .
fi