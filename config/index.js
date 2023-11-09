import dotenv from "dotenv";

dotenv.config();

export const {
  APP_PORT,
  DATABASE_URL,
  APP_URL,
  DEBUG_MODE,
  JWT_SECRET,
  JWT_REFRESH_SECRET,
} = process.env;
