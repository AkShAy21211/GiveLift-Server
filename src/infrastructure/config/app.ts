import express, { Express } from "express";
import Logger from "../utils/logger.js";
import dotenv from "dotenv";
import connectToDataBase from "./mongo.js";
import authRoute from "../routes/authRoute.js";
import userRoute from "../routes/userRoute.js";
import disasterRoute from "../routes/disasterRoute.js";
import morgan from "morgan";
import cookieParser from "cookie-parser";
dotenv.config();

class ExpressApp {
  private _app: Express;
  constructor() {
    this._app = express();
    this._app.use(express.json());
    this._app.use(cookieParser())
    this._app.use(express.urlencoded({ extended: true }));
    this.app.use(morgan("tiny"));
    this.app.use("/api/auth", authRoute);
    this.app.use("/api/user",userRoute);
    this.app.use("/api/disaster",disasterRoute);
  }

  public get app(): Express {
    return this._app;
  }

  public configureConnections() {
    connectToDataBase();
  }

  public startServer(port: number | string): void {
    this._app.listen(port, () => {
      Logger.info(`Server listening at http://localhost:${port}`);
    });
  }
}

export default ExpressApp;
