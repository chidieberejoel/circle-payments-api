const query = {
  createUser: `INSERT INTO users(
    id,
    email,
    first_name,
    last_name,
    hash,
    salt
    ) VALUES($1, $2, $3, $4, $5, $6) RETURNING *;
    `,
  findByEmail: `
    SELECT * FROM users WHERE email = $1;
    `,
  findById: `
    SELECT * FROM users WHERE id = ($1);
    `,
  updateLevel: `
    UPDATE users
    SET level = ($2),
    updated_at = now()
    WHERE id = ($1);
    `,
};

export default query;
