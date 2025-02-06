import dotenv from "dotenv";
dotenv.config();

const ENVS = {
  PORT: process.env.PORT || 3000,
  DB_CONNECTION_STRING: process.env.DB_CONNECTION_STRING,
  JWT_SECRET: process.env.JWT_SECRET,
  NODE_ENV: process.env.NODE_ENV,
  TWILIO_SID: process.env.TWILIO_SID,
  TWILIO_TOKEN: process.env.TWILIO_TOKEN,
  TWILIO_PHONE: process.env.TWILIO_PHONE,
};

export default ENVS;
