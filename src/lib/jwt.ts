import jwt, { SignOptions} from "jsonwebtoken";
import { env } from "../config/env.js";
import { TokenPayload } from "../types/user.js";

export const signAccessToken = (payload: TokenPayload): string => {
  const options: SignOptions = {
    expiresIn: env.jwtExpiresIn as SignOptions["expiresIn"],
  }
  return jwt.sign(payload, env.jwtSecret, options);
}