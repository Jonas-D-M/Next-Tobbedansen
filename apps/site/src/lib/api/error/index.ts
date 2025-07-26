export const isError = (error: unknown): error is BackendError => {
  return error instanceof BackendError;
};

export interface BackendErrorResponse {
  message: string;
  errors?: Record<string, string[]>; // if you're returning field-level errors
  [key: string]: unknown; // catch-all for any additional fields
}

function isBackendErrorResponse(body: unknown): body is BackendErrorResponse {
  if (typeof body !== 'object' || body === null) return false;

  const maybeError = body as { message?: unknown };
  return typeof maybeError.message === 'string';
}

export class BackendError extends Error {
  public status: number;
  public body: BackendErrorResponse;

  constructor(status: number, statusText: string, body: unknown) {
    super(statusText);
    this.name = 'BackendError';
    this.status = status;
    this.body = isBackendErrorResponse(body)
      ? body
      : { message: 'Unexpected error format', original: body };
  }
}
