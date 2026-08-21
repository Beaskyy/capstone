// combine all the routes of the application

import { Router } from "express";
import { healthrouter } from "./health.routes.js";

export const apiRouter = Router();

apiRouter.use(healthrouter);
