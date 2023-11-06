const dotenv = require("dotenv");

dotenv.config();

const {
  APP_PORT,
  DATABASE_URL,
  APP_URL,
  DEBUG_MODE,
  JWT_SECRET,
  JWT_REFRESH_SECRET,
} = process.env;

module.exports = {
  APP_PORT,
  DATABASE_URL,
  APP_URL,
  DEBUG_MODE,
  JWT_SECRET,
  JWT_REFRESH_SECRET,
};
