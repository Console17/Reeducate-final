import type { NextFunction, Request, Response } from "express";
import { isValidObjectId } from "mongoose";

export default function isValidMongoId(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const id = req.params.id;
  if (!isValidObjectId(id)) {
    return res.status(400).json({ message: "wrong moongo Id is provided" });
  }
  next();
}
