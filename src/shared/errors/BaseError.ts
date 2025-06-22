export class BaseError extends Error {
    constructor(message: string, public readonly statusCode = 500) {
      super(message);
      this.name = this.constructor.name;
      Error.captureStackTrace(this, this.constructor);
    }
  }
  