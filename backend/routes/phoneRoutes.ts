import express, { Request, Response } from "express";
import { authMiddleware } from "../middlewares/authMiddleware";

const router = express.Router();

router.get("/protected", authMiddleware, (req: Request, res: Response) => {
  res.send("This is a protected phone route");
});

export default router;
