

from pydantic import BaseModel, Field, NoneStr


class CovidCase(BaseModel):
    Active_Cases_text: NoneStr = Field(default="", alias="Active Cases_text")
    Country_text: NoneStr = Field(default="", alias="Country_text")
    Last_Update: NoneStr = Field(default="", alias="Last Update")
    New_Cases_text: NoneStr = Field(default="", alias="New Cases_text")
    New_Deaths_text: NoneStr = Field(default="", alias="New Deaths_text")
    Total_Cases_text: NoneStr = Field(default="", alias="Total Cases_text")
    Total_Deaths_text: NoneStr = Field(default="", alias="Total Deaths_text")
    Total_Recovered_text: NoneStr = Field(
        default="", alias="Total Recovered_text")
