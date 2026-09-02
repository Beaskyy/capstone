import { AppError } from "../errors/AppError.js";
import { createUser, findUserByEmail } from "../repositories/user.repository.js";
import bcrypt from "bcrypt";

export const registerUser = async (
  email: string,
  password: string,
): Promise<void> => {
  if (!email || !password) {
    throw new AppError(400, "Email and password are required");
  }
  if (password.length < 6) {
    throw new AppError(400, "Password must be at least 6 characters");
  }

  const normalizeEmail = email.toLowerCase().trim();

  const existingUser = await findUserByEmail(normalizeEmail);

  if (existingUser) {
    throw new AppError(400, "User already exists");
  }

  const passwordHash = await bcrypt.hash(password, 10);

  await createUser(normalizeEmail, passwordHash);
};
