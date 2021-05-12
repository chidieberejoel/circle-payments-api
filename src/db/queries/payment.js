const query = {
  createPayment: `INSERT INTO payments(
    id,
    user_id,
    payment_id,
    source_id,
    amount,
    status,
    currency,
    source_type,
    receivable_amount,
    level_from,
    level_to,
    error_code,
    created_at,
    updated_at
    ) VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14) RETURNING *;
    `,

  findPendingOrConfirmedPayments: `
  SELECT * FROM payments WHERE status != ($1) and status != ($2);
  `,

  updateStatus: `
    UPDATE payments
    SET status = ($2),
    updated_at = ($3)
    WHERE id = ($1);
  `,

  findByUserId: `
    SELECT * FROM payments WHERE user_id = ($1);
  `,
};

export default query;
