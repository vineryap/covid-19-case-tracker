from fastapi import APIRouter
from app.api.v1.endpoints import email, covid_19_statistics

api_router = APIRouter()
api_router.include_router(covid_19_statistics.router,
                          prefix="/covid19-statistics", tags=["covid19-statistics"])
api_router.include_router(email.router, tags=["email"])
