#!/usr/bin/env sh

# only build image when not exist
if [[ "$(docker images -q assignment-nuxt3 2>/dev/null)" == "" ]]; then
    docker build -t assignment-nuxt3 -f Dockerfile .
fi
