const mongoose = require("mongoose");
const { DATABASE_URL } = require("../config/index.js");

const conectdb = () => {
  try {
    mongoose.connect(DATABASE_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    mongoose.connection.on("error", (error) => {
      console.log(`
      -------- DATABASE CONNECTION ERROR Top -------- \n ${error?.message} 

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

module.exports = { conectdb };
