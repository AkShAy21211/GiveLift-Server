import express, { Express } from "express";
import Logger from "../utils/logger.js";
import dotenv from "dotenv";
import connectToDataBase from "./mongo.js";
import morgan from "morgan";
import cors from "cors";
import cookieParser from "cookie-parser";

dotenv.config();

import userAuthRoute from "../infrastructure/routes/userAuthRoute.js";

class ExpressApp {
  private _app: Express;
  constructor() {
    this._app = express();
    this._app.use(express.json());
    this._app.use(cookieParser())
    this._app.use(express.urlencoded({ extended: true }));
    this.app.use(cookieParser()); 
    this.app.use(morgan("tiny"));
    this.app.use(cors({
      origin: ["http://localhost:3000","http://192.168.1.3:3000"],
      credentials: true,
      methods: ["GET", "POST", "PUT", "DELETE", "PATCH"]
    }))
   this.app.use("/api/auth", userAuthRoute);
  }

  public get app(): Express {
    return this._app;
  }

  public configureConnections() {
    connectToDataBase();
  }

  public startServer(port: number | string): void {
    this._app.listen(port, () => {
      Logger.info(`Server listening at c${port}`);
    });
  }
}

export default ExpressApp;
