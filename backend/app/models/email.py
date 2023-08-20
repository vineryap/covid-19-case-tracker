from pydantic import BaseModel, EmailStr, Field


class SendEmailPayload(BaseModel):
    to: EmailStr = Field(..., alias="email")
    name: str = Field(..., min_length=1)
    body: str = Field(..., min_length=1, max_length=500, alias="message")
