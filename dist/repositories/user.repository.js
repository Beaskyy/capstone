// find user by email
import { pool } from "../lib/db.js";
export const findUserByEmail = async (email) => {
    const result = await pool.query("SELECT id, email, role, created_at FROM users WHERE email = $1", [email]);
    return result.rows[0] ?? null;
};
export const createUser = async (email, passwordHash) => {
    const result = await pool.query(`INSERT INTO users (email, password_hash) 
    VALUES ($1, $2) 
    RETURNING id, email, role, created_at`, [email, passwordHash]);
    return result.rows[0];
};
export const findUserByEmailWithPassword = async (email) => {
    const result = await pool.query("SELECT id, email, role, created_at, password_hash FROM users WHERE email = $1", [email]);
    return result.rows[0] ?? null;
};
