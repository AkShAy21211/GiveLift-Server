import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export function authenticate(req: Request, res: Response, next: NextFunction): void {
  const cookie = req.cookies.currentUser;
  const currentUser = cookie ? JSON.parse(cookie) : "";
  const token = currentUser?.token;

  try {
    if (token) {
      jwt.verify(
        token,
        process.env.JWT_SECRET as string,
        (err: any, userData: any) => {
          if (err) {
            res.status(403).json({ message: "Invalid or expired token" });
            return;
          }

          req.currentUser = userData;
          next();
        }
      );
    } else {
      res.status(401).json({ message: "No token provided" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
}
