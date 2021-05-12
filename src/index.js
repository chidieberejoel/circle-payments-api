import express from "express";
import loader from "./loaders";
import main from "./jobs/worker";
import config from "./config";
import logger from "./config/winstonlog";
import pool from "./db/setup/postgres";

const app = express();
const graph = loader.graphql;

// Initialize app with dependencies
loader.init(app);

// Initialize database connection
pool.connect(config.DATABASE_URL);

// Run worker function
main().catch((err) => {
  logger.warn(err);
  process.exit(1);
});

graph.applyMiddleware({ app });

export default { app, graph };
