import jwt from "jsonwebtoken";
import ENVS from "../config/envConfig.js";
import Logger from "./logger.js";

export interface JwtPayload {
  _id: string;
  email: string;
  role: "user" | "admin" | "coordinator";
  exp: number;
}
class JsonWebToken {
  private _secret: string;
  constructor() {
    this._secret = ENVS.JWT_SECRET as string;
  }
  
  generateToken(payload: { _id: string; email: string,role:string }): string {
    try {
      const token = jwt.sign(payload, this._secret, { expiresIn: "24h" });
      return token;
    } catch (error: any) {
      Logger.error(error.message);
      throw new Error("Failed to generate token");
    }
  }

  verifyToken(token: string): JwtPayload {
    try {
      return jwt.verify(token, this._secret) as JwtPayload;
    } catch (error: any) {
      Logger.error(error.message);
      throw new Error("Invalid token");
    }
  }
}

export default JsonWebToken