/* Replace with your SQL commands */
CREATE TABLE IF NOT EXISTS users (
  id uuid NOT NULL PRIMARY KEY,
  email VARCHAR(320) NOT NULL,
  first_name VARCHAR(32) NOT NULL,
  last_name VARCHAR(32) NOT NULL,
  hash VARCHAR(100) NOT NULL,
  salt VARCHAR(100) NOT NULL,
  is_active boolean NOT NULL default true,
  level VARCHAR NOT NULL DEFAULT ('basic'),
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);
