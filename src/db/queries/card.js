const query = {
  createCard: `INSERT INTO cards(
    id,
    card_id,
    user_id,
    status,
    error_code,
    created_at,
    updated_at
    ) VALUES($1, $2, $3, $4, $5, $6, $7) RETURNING *;
    `,

  findByUserId: `
  SELECT * FROM cards WHERE user_id = ($1);
  `,

  deleteCard: `
  DELETE FROM cards WHERE user_id = ($1);
  `,

  findPendingCards: `
  SELECT * FROM cards WHERE status = ($1);
  `,

  updateStatus: `
    UPDATE cards
    SET status = ($2),
    updated_at = ($3)
    WHERE id = ($1);
    `,

  findByCardId: `
    SELECT * FROM cards WHERE card_id = ($1);
  `,
};

export default query;
