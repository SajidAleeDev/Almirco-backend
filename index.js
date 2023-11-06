const express = require("express");
const { APP_PORT } = require("./config/index.js");
const { conectdb } = require("./database/db.configuration.js");
const errorHandler = require("./middlewares/errorHandler.js");
const routes = require("./routes/index.js");
const cors = require("cors");
const path = require("path");
const { dirname } = require("path");
const fs = require("fs");

const app = express();

/**
 * ---------- CONFIGURING CORS ----------
 */
app.use(cors());

/**
 * ---------- Database connection ----------
 */
conectdb();

/**
 * ---------- PARSING FORM DATA ----------
 */
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(
  express.json(
    // fast data parsing
    { limit: "50mb" }
  )
);

/**
 * ---------- Express Static Folder ----------
 */
const uploadDirectory = path.join(__dirname, "uploads");
if (!fs.existsSync(uploadDirectory)) {
  fs.mkdirSync(uploadDirectory);
}

global.appRoot = path.resolve(dirname(""));
app.use("/uploads", express.static("uploads"));
app.use(express.static(path.join(appRoot, "uploads")));

/**
 * ---------- ROUTES ----------
 */
app.use("/api", routes);

app.use("/", (req, res) => {
  res.send(`
  <h1>Welcome to E-commerce Rest APIs</h1>
  `);
});

app.get("/", (_req, res) => {
  res.send("Hello world!");
});

/**
 * ---------- Middlewares Configuration ----------
 */
app.use(errorHandler);

/**
 * ---------- Development Configuration ----------
 */
const PORT = APP_PORT || 5000;

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});

module.exports = { app };
