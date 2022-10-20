export interface Payload {
  email: string;
  role: string;
  organization : string;
  expiresIn?: string;
}

export interface ForgotPswdPayload {
  email: string;
  id : string;
}
