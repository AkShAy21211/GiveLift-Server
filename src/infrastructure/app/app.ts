import express, { Express } from "express";

class ExpressApp {
   private _app: Express
  constructor() {
    this._app = express();
    this._app.use(express.json());
    this._app.use(express.urlencoded({ extended: true }));
  }

  public get app(): Express {
    return this._app;
  }

  public startServer(port: number|string): void {
    this._app.listen(port, () => {
      console.log(`Server listening at http://localhost:${port}`);
    });

  }
}

export default ExpressApp;
