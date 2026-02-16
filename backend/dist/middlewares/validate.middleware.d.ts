import type { NextFunction, Request, Response } from "express";
import type Joi from "joi";
declare const _default: (schema: Joi.ObjectSchema) => (req: Request, res: Response, next: NextFunction) => Response<any, Record<string, any>> | undefined;
export default _default;
//# sourceMappingURL=validate.middleware.d.ts.map