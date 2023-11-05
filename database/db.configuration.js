import mongoose from "mongoose";
import { DATABASE_URL } from "../config/index.js";

export const conectdb = () => {
  try {
    mongoose.connect(DATABASE_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
    });
    mongoose.connection.on("error", (error) => {
      console.log(`
      -------- DATABASE CONNECTION ERROR -------- \n ${error?.message} 

      `);
    });
    mongoose.connection.once("open", () => {
      console.log("Database connected successfully");
    });
  } catch (error) {
    console.log(`
      -------- DATABASE CONNECTION ERROR -------- \n ${error?.message} 

      `);
  }
};
