#!/usr/bin/env sh

# remove the container and volume
docker rm assignment-nuxt3 && docker volume rm assignment-nuxt3

# remove image
docker rmi assignment-nuxt3
