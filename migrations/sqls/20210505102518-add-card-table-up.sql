/* Replace with your SQL commands */
CREATE TABLE IF NOT EXISTS cards (
  id uuid NOT NULL PRIMARY KEY,
  card_id uuid UNIQUE NOT NULL,
  user_id uuid REFERENCES users(id) NOT NULL,
  status VARCHAR NOT NULL,
  error_code VARCHAR,
  created_at TIMESTAMP NOT NULL,
  updated_at TIMESTAMP NOT NULL
);