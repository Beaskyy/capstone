// find user by email

import { pool } from "../lib/db.js";
import { DBUserRow, User } from "../types/user.js";

export const findUserByEmail = async (email: string): Promise<User | null> => {
  const result = await pool.query<DBUserRow>(
    "SELECT id, email, role, created_at FROM users WHERE email = $1",
    [email],
  );

  return result.rows[0] || null;
};

export const createUser = async (
  email: string,
  passwordHash: string,
): Promise<void> => {
  const result = await pool.query(
    `INSERT INTO users (email, password_hash) 
    VALUES ($1, $2) 
    RETURNING id, email, role, created_at`,
    [email, passwordHash],
  );

  return result.rows[0];
};
