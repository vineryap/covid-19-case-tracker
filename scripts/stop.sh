#!/usr/bin/env sh

if test -f ./docker-compose.yml; then
    docker-compose down
fi
