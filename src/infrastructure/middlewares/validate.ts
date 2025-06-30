import { Request, Response, NextFunction, RequestHandler } from "express-serve-static-core";
import { ObjectSchema } from "joi";

export const validate = (schema: ObjectSchema): RequestHandler => {
  return (req:Request, res:Response, next:NextFunction) => {
    const { error } = schema.validate(req.body, { abortEarly: false });

    if (error) {
      const message = error.details.map((detail) => detail.message);
      res.status(400).json({ message });
      return;
    }

    next(); 
  };
};
