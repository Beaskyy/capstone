import path from "node:path";
import { pool } from "../lib/db.js";
import { readdirSync } from "node:fs";

const MIGRATIONS_DIR = path.join(process.cwd(), "migrations");

const CREATE_MIGRATIONS_TABLE_SQL = `
  CREATE TABLE IF NOT EXISTS migrations (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    executed_at TIMESTAMP NOT NULL DEFAULT NOW(),
  );
`;

type MigrationRow = {
  name: string;
};

const getExecutedMigrations = async (): Promise<string[]> => {
  const result = await pool.query<MigrationRow[]>(
    "SELECT name FROM migrations ORDER BY name",
  );
  return result.rows.map((row: MigrationRow) => row.name);
};

const getMigationFiles = (): string[] => {
  return readdirSync(MIGRATIONS_DIR)
    .filter((file) => file.endsWith(".sql"))
    .sort();
};

const migrate = async (): Promise<void> => {
  await pool.query(CREATE_MIGRATIONS_TABLE_SQL);

  const executed = new Set(await getExecutedMigrations());
  const pending = getMigationFiles().filter((file) => !executed.has(file))
};

