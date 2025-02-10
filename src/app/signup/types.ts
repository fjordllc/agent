export class SignupError extends Error {
  constructor(
    message: string,
    public readonly code: SignupErrorCode,
    public readonly field?: string
  ) {
    super(message)
    this.name = "SignupError"
  }
}

export enum SignupErrorCode {
  ValidationError = "VALIDATION_ERROR",
  EmailTaken = "EMAIL_TAKEN",
  ServerError = "SERVER_ERROR",
}

export function isSignupError(error: unknown): error is SignupError {
  return error instanceof SignupError
}

export type SignupResponse = {
  error: {
    message: string
    code: SignupErrorCode
    field?: string
  }
}
