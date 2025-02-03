import dotenv from "dotenv";
dotenv.config();

const ENVS={
    PORT: process.env.PORT || 3000,
    DB_CONNECTION_STRING: process.env.DB_CONNECTION_STRING,
    JWT_SECRET: process.env.JWT_SECRET
}



export default ENVS