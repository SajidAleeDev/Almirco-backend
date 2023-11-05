import mongoose from "mongoose";
import { DATABASE_URL } from "../config/index.js";

export const conectdb = () => {
  try {
    mongoose.connect(DATABASE_URL, {
      appName: "E-commerce",
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Database connected successfully!");
  } catch (error) {
    console.log(`
      -------- DATABASE CONNECTION ERROR -------- \n ${error?.message} 

      `);
  }
};
