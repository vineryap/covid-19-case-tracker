export interface ValidationErrorDetail {
  loc: string[];
  msg: string;
  type: string;
}

interface ContactAPIResponse {
  success: boolean;
  message: string;
  validationMessage: {
    name: string;
    email: string;
    message: string;
  };
}
