import { run, quickAddJob } from "graphile-worker";
import updateLevel from "./updateStatus";
import config from "../config";

const DBString = typeof config.DATABASE_URL === "string"
  ? config.DATABASE_URL
  : `postgres:///${config.DATABASE_URL.database}`;

async function main() {
  // Run a worker to execute jobs:
  const runner = await run({
    connectionString: DBString,
    concurrency: 1,
    noHandleSignals: false,
    crontab: "*/15 * * * * update",
    taskList: {
      update: async (_, helpers) => {
        updateLevel();
        helpers.logger.info("Worker, working haha :)");
      },
    },
  });

  await quickAddJob(
    { connectionString: DBString },
    "update",
  );

  await runner.promise;
}

export default main;
