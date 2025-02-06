// types/express.d.ts
import * as express from "express-serve-static-core";

declare global {
  namespace Express {
    interface Request {
      user?: {
        _id: string;
        name: string;
      };
    }
  }
}
