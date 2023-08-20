#!/usr/bin/env sh

# remove the container and volume
docker rm assignment-fastapi && docker volume rm assignment-fastapi

# remove image
docker rmi assignment-fastapi
