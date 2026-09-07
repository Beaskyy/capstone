import { AppError } from "../errors/AppError.js";
export const requireAdmin = (req, _res, next) => {
    if (req.user?.role !== "admin") {
        next(new AppError(403, "Admin access required. You do not have permission to access this resource."));
        return;
    }
    next();
};
