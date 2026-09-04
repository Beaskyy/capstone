// combine all the routes of the application

import { Router } from "express";
import { healthrouter } from "./health.routes.js";
import { authRouter } from "./auth.routes.js";
import { userTaskRouter } from "./user.task.route.js";

export const apiRouter = Router();

apiRouter.use(healthrouter);
apiRouter.use("/auth", authRouter)
apiRouter.use("/tasks", userTaskRouter);
