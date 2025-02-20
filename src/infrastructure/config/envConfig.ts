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
  ADMIN_EMAIL: process.env.ADMIN_EMAIL,
  ADMIN_PASSWORD: process.env.ADMIN_PASSWORD,
  ADMIN_PHONE: process.env.ADMIN_PHONE,
  CLOUDNAME: process.env.CLOUDNAME,
  CLOUD_API: process.env.CLOUD_API,
  CLOUD_API_SECRET: process.env.CLOUD_API_SECRET,
};

export default ENVS;
