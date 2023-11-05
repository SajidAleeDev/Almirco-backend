import mongoose from "mongoose";
import { DATABASE_URL } from "../config/index.js";

export const conectdb = () => {
  try {
    mongoose.connect(DATABASE_URL, {
      appName: "E-commerce",
    });
    console.log("Database connected successfully!");
  } catch (error) {
    console.log(`
      -------- DATABASE CONNECTION ERROR -------- \n ${error?.message} 

      `);
  }
};
