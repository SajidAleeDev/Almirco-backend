import serverless from "serverless-http";
import { app } from "../../index.js";

const handler = serverless(app);

export { handler };