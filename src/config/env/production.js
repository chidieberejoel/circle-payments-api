import dotenv from "dotenv";

dotenv.config();

export default {
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,
  },
};
