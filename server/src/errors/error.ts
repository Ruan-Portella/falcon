export class HttpError {
  public readonly status: number;
  public readonly error: { error_description: string; error_code: string };

  constructor(status: number, error: { error_description: string; error_code: string }) {
    this.status = status;
    this.error = error;
  }
}