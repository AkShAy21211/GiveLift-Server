// types/express.d.ts
import * as express from "express-serve-static-core";

declare global {
  namespace Express {
    interface Request {
      currentUser?: {
        _id: string;
        role: string;
      };
    }
  }
}
