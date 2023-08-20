import { ContactAPIResponse, ValidationErrorDetail } from "~/types/contact";

const { backendEndpoint } = useRuntimeConfig();

export default defineEventHandler(async (e) => {
  const formData = await readBody(e);

  const response = await fetch(`${backendEndpoint}/v1/send-email`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(formData),
  });

  const data = await response.json();

  const returnResponse: ContactAPIResponse = {
    success: response.ok,
    message: "Message sent! Thank you for inquiring.",
    validationMessage: {
      name: "",
      email: "",
      message: "",
    },
  };

  // return the response early when the response is ok (successful request).
  if (response.ok) return returnResponse;

  const { detail } = data;

  // If the error is coming from the SMTP server.
  if (detail.smtpError) {
    returnResponse.message = detail.message;
  }
  // Else the error is coming from the backend.
  else {
    returnResponse.message = "";

    // Iterate the error and assign the error message accordingly.
    detail.forEach((item: ValidationErrorDetail) => {
      const key = item.loc[1];
      switch (key) {
        case "email":
          returnResponse.validationMessage[key] = "Email is invalid.";
          break;
        case "name":
          returnResponse.validationMessage[key] = "Name is required.";
          break;
        case "message":
          if (formData.message.length > 500)
            returnResponse.validationMessage[key] =
              "Message is too big. Make sure it is less than 500 characters.";
          else returnResponse.validationMessage[key] = "Message is required.";
          break;
      }
    });
  }

  return returnResponse;
});
