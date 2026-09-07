import { AppError } from "../errors/AppError.js";
import { verifyAccessToken } from "../lib/jwt.js";
export const authenticate = (req, _res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
        return next(new AppError(401, "Authorization token is required"));
    }
    const token = authHeader.split(" ")[1];
    req.user = verifyAccessToken(token);
    next();
};
