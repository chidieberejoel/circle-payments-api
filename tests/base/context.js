import migrate from "db-migrate";
import pool from "../../src/db/setup/postgres";
import config from "../../src/config";

const dbMigrate = migrate.getInstance(true);

class Context {
  static async build() {
    await dbMigrate.up();
    pool.connect(config.DATABASE_URL);
  }

  static async close() {
    await dbMigrate.down(200);
    await pool.close();
  }
}

export default Context;
