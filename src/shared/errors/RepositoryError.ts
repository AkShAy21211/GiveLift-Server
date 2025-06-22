import { BaseError } from "./BaseError";


export class RepositoryError extends BaseError {
  constructor(message: string) {
    super(`Repository Error: ${message}`, 500);
  }
}
