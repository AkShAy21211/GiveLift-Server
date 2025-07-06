import dotenv from "dotenv";
dotenv.config();

const ENVS = {
  PORT: process.env.PORT || 3000,
  DB_CONNECTION_STRING: process.env.DB_CONNECTION_STRING,
  JWT_SECRET: process.env.JWT_SECRET,
  NODE_ENV: process.env.NODE_ENV,
  GOOGLE_MAP_API_KEY: process.env.GOOGLE_MAP_API_KEY,
};

export default ENVS;
