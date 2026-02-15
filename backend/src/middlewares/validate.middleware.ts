import type { NextFunction, Request, Response } from "express";
import type Joi from "joi";

export default (schema: Joi.ObjectSchema) =>
  (req: Request, res: Response, next: NextFunction) => {
    const { error, value } = schema.validate(req.body || {}, {
      abortEarly: false,
    });
    if (error) {
      return res.status(400).json({
        message: error.details.map((el: Joi.ValidationErrorItem) => el.message),
      });
    }

    req.body = value;
    next();
  };
