import dotenv from "dotenv";

dotenv.config();

const checkRequiredEnvVariables = (key: string): string => {
  const value = process.env[key];
  if (!value) {
    throw new Error(`Missing required environment variable: ${key}`);
  }
  return value;
};

export const env = {
  port: Number(process.env.PORT ?? 4000),
  isProduction: (process.env.NODE_ENV ?? "development") === "production",
  nodeEnv: process.env.NODE_ENV ?? "development",
  logLevel: process.env.LOG_LEVEL ?? "info",
  databaseUrl: checkRequiredEnvVariables("DATABASE_URL"),
  jwtSecret: checkRequiredEnvVariables("JWT_SECRET"),
  jwtExpiresIn: checkRequiredEnvVariables("JWT_EXPIRES_IN"),
} as const;
