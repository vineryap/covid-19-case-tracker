#!/usr/bin/env sh

docker run -d \
    --name assignment-nuxt3 \
    -p 3000:3000 \
    -w /home/node/assignment-nuxt3 \
    assignment-nuxt3 \
    node .output/server/index.mjs
