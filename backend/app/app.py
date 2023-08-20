from fastapi import FastAPI
from app.api.v1.api_v1 import api_router
from app.api.healthcheck import router

app = FastAPI()
app.include_router(router, prefix="/api")
app.include_router(api_router, prefix="/api/v1")
