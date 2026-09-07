import jwt from "jsonwebtoken";
import { env } from "../config/env.js";
import { AppError } from "../errors/AppError.js";
export const signAccessToken = (payload) => {
    const options = {
        expiresIn: env.jwtExpiresIn,
    };
    return jwt.sign(payload, env.jwtSecret, options);
};
export const verifyAccessToken = (token) => {
    try {
        const decoded = jwt.verify(token, env.jwtSecret);
        return decoded;
    }
    catch (error) {
        throw new AppError(401, "Invalid or expired access token");
    }
};
