import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      return res.status(401).send("unauthorized");
    }
    jwt.verify(token, process.env.JWT_SECRET!);
    next();
  } catch (error) {
    if (error instanceof Error) {
      res.status(401).send("unauthorized" + error.message);
    } else {
      res.status(401).send("unauthorized");
    }
  }
};
