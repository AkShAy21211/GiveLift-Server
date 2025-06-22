import ExpressApp from "./config/app.js";
import Logger from "./utils/logger.js";

const start = () => {
  const app = new ExpressApp();
  const PORT = process.env.PORT || 5000;
  try {
    app.configureConnections();
    app.startServer(PORT);
  } catch (error) {
    Logger.error("Error starting the server", error);
    process.exit(1);
  }
};

start();
