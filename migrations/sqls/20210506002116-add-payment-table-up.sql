/* Replace with your SQL commands */
CREATE TABLE IF NOT EXISTS payments (
  id uuid NOT NULL PRIMARY KEY,
  user_id uuid REFERENCES users(id) NOT NULL,
  payment_id uuid NOT NULL,
  source_id uuid NOT NULL,
  amount VARCHAR NOT NULL,
  status VARCHAR NOT NULL,
  currency VARCHAR NOT NULL,
  source_type VARCHAR NOT NULL,
  receivable_amount VARCHAR NOT NULL,
  level_from VARCHAR NOT NULL,
  level_to VARCHAR NOT NULL,
  error_code VARCHAR,
  created_at TIMESTAMP NOT NULL,
  updated_at TIMESTAMP NOT NULL
)