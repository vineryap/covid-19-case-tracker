from typing import List, Union
from fastapi import APIRouter, HTTPException
from app.models.covid_19_cases import CovidCase
import requests

router = APIRouter()


class CovidCaseErrorResponse:
    ok: bool
    status_code: str
    detail: str


async def get_covid_case(path: str = "") -> Union[CovidCaseErrorResponse, CovidCase, List[CovidCase]]:
    response = requests.get(
        f'https://covid-19.dataflowkit.com/v1/{path}'.rstrip('/'))

    if response.status_code != 200:
        status_code, detail = response.status_code, response.text
        ok = response.ok
        return CovidCaseErrorResponse(ok=ok, status_code=status_code, detail=detail)

    return response.json()


@router.get("/all", response_model=List[CovidCase])
async def get_all_cases():
    """
    Retrieve COVID-19 data for all countries.

    Returns:
        list: A list of dictionaries containing COVID-19 data for all countries.
    """
    response = await get_covid_case()
    if 'ok' in response and not response.ok:
        status_code, detail = response.status_code, response.text
        raise HTTPException(status_code, detail)

    return response


@router.get("/{country}", response_model=CovidCase)
async def get_case(country: str):
    """
    Retrieve COVID-19 data for a given country.

    Args:
        country (str): The name of the country to retrieve data for

    Returns:
        dict: A dictionary containing COVID-19 data for the given country.
    """
    response = await get_covid_case(country)
    if 'ok' in response and not response.ok:
        status_code, detail = response.status_code, response.text
        raise HTTPException(status_code, detail)

    return response
