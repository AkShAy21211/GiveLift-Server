import ExpressApp from "./infrastructure/app/app.js";

const start = () => {
  const app = new ExpressApp();
  const PORT = process.env.PORT||3000;
  try {
    app.startServer(PORT);
  } catch (error) {
    process.exit(1);
  }
};

start();
