from fastapi import APIRouter, HTTPException
from app.models.email import SendEmailPayload
from bleach import clean
import requests


router = APIRouter()


@router.post("/send-email")
async def send_email(form_data: SendEmailPayload):
    response = requests.post(
        'https://rough-flower-352d.vineryap.workers.dev/',
        json={"email": form_data.to, "name": form_data.name, "message": clean(form_data.body)})

    if not response.ok:
        status_code = response.status_code
        message = "We’re not quite sure what went wrong. Please try again later."

        if status_code == 400 or status_code == 422:
            message = "Contact form content is invalid. Please check the fields again."
        elif status_code == 413:
            message = "Message content is too big."

        raise HTTPException(status_code, detail={
                            "smtpError": True, "message": message})

    return response.json()
