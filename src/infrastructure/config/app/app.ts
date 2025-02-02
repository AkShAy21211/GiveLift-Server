import express, { Express } from "express";
import morganMiddleware from "../../utils/morganMiddleware.js";
import Logger from "../../utils/logger.js";
import dotenv from "dotenv";
import connectToDataBase from "../db/mongo.js";

class ExpressApp {
  private _app: Express;
  constructor() {
    this._app = express();
    this._app.use(express.json());
    this._app.use(express.urlencoded({ extended: true }));
    this.app.use(morganMiddleware);
  }

  public get app(): Express {
    return this._app;
  }

  public configureConnections() {
    dotenv.config();
    connectToDataBase();
  }

  public startServer(port: number | string): void {
    this._app.listen(port, () => {
      Logger.info(`Server listening at http://localhost:${port}`);
    });
  }
}

export default ExpressApp;
