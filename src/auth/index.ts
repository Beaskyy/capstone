import { Request, Response } from "express"

const login = (req: Request, res: Response) => {
  res.status(200).json({
    success: true,
    message: "User logged in successfully"
  })
}