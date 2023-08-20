#!/usr/bin/env sh

docker run -d \
    --name assignment-fastapi \
    -p 8000:8000 \
    assignment-fastapi \
    uvicorn app.app:app --host 0.0.0.0 --port 8000
