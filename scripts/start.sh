#!/usr/bin/env sh

if test -f ./docker-compose.yml; then
    docker-compose up 'frontend'
fi
