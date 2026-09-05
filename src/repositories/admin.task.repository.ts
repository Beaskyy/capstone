import { pool } from "../lib/db.js";

export const createTask = async (
  userId: string,
  title: unknown,
): Promise<void> => {
const result = await pool.query(
    `
    INSERT INTO tasks (user_id, title) 
    VALUES ($1, $2) 
    RETURNING id, title, status, user_id, created_at, updated_at
    `,
    [userId, title],
  );
  return result.rows[0];
};

export const getTasksByUserId = async (userId: string): Promise<any[]> => {
  const result = await pool.query(
    `
    SELECT id, title, status, user_id, created_at, updated_at
    FROM support_tasks
    WHERE user_id = $1
    ORDER BY created_at DESC
    `,
    [userId],
  );
  return result.rows;
};
