import type { NextFunction, Request, Response } from "express";

export default function isAdminMiddleware(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  if (req.userRole !== "admin") {
    return res.status(403).json({ message: "permition denied" });
  }
  next();
}
