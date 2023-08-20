#!/usr/bin/env sh

docker images --format="{{.Repository}} {{.ID}}" | grep "assignment-" | cut -d ' ' -f 2 | xargs docker rmi -f
docker ps -f name=assignment --format "{{.Names}}" | xargs docker rm -v
