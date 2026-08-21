import { Router } from "express";

export const healthrouter = Router();

healthrouter.get("/health", (_req, res) => {
  res.status(200).json({
    success: true,
    message: "Health route is working"
  })
})