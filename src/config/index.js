import dotenv from "dotenv";
import development from "./env/development";
import production from "./env/production";
import test from "./env/tests";

dotenv.config();

const { NODE_ENV } = process.env;
const env = {
  development,
  test,
  production,
}[NODE_ENV || "development"];

export default {
  port: process.env.PORT,
  nodeEnv: NODE_ENV,
  DATABASE_URL: env,
  circleApiKey: process.env.CIRCLE_API_KEY,
  circleBaseUrl: process.env.CIRCLE_BASE_URL,
  secret: process.env.JWT_SECRET,
};
