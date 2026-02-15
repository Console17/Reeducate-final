import jwt from "jsonwebtoken";
import "dotenv/config";
import type { NextFunction, Request, Response } from "express";

export default async function isAuthMiddleware(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const headers = req.headers["authorization"];
    if (!headers) {
      return res.status(401).json({ message: "token not provided" });
    }
    const token = headers.split(" ")[1];
    if (!token) {
      return res.status(401).json({ message: "token not provided" });
    }
    const payload = await jwt.verify(token, process.env.JWT_SECRET!);
    if (typeof payload === "string" || !payload.userId || !payload.role) {
      return res.status(401).json({ message: "token is invalid" });
    }
    req.userId = payload.userId;
    req.userRole = payload.role;
    next();
  } catch (e) {
    return res.status(401).json({ message: "token is expired" });
  }
}
