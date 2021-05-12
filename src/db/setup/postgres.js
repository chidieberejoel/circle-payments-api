/* eslint-disable no-underscore-dangle */
import { Pool as _Pool } from "pg";
import logger from "../../config/winstonlog";

class Pool {
  constructor() {
    this._pool = null;
  }

  async connect(options) {
    this._pool = new _Pool(options);
    return this._pool
      .query("SELECT 1 + 1;")
      .then(() => logger.info("Database connected successfully"))
      .catch((error) => logger.info(`Error connecting to Database: ${error}`));
  }

  close() {
    return this._pool.end();
  }

  query(sql, params) {
    return this._pool.query(sql, params);
  }
}

export default new Pool();
