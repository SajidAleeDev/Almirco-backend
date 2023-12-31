import cors from "cors";
import express from "express";
import { APP_PORT } from "./config/index.js";
import { conectdb } from "./database/db.configuration.js";
import errorHandler from "./middlewares/errorHandler.js";
import routes from "./routes/index.js";

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

/**
 * ---------- Express Static Folder ----------
 */

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

export { app };
