import { CustomError } from "./custom-error";
export class BadRequestError extends CustomError {
  statusCode = 400;
  reason = "Bad Request";
  constructor() {
    super("Bad Request");
    Object.setPrototypeOf(this, BadRequestError.prototype);
  }

  serializeErrors() {
    return [{ message: this.reason }];
  }
}