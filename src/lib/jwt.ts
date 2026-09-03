import jwt, { SignOptions } from "jsonwebtoken";
import { env } from "../config/env.js";
import { TokenPayload } from "../types/user.js";
import { AppError } from "../errors/AppError.js";

export const signAccessToken = (payload: TokenPayload): string => {
  const options: SignOptions = {
    expiresIn: env.jwtExpiresIn as SignOptions["expiresIn"],
  };
  return jwt.sign(payload, env.jwtSecret, options);
};

export const verifyAccessToken = (token: string): TokenPayload => {
  try {
    const decoded = jwt.verify(token, env.jwtSecret) as TokenPayload;
    return decoded;
  } catch (error) {
    throw new AppError(401, "Invalid or expired access token");
  }
};
