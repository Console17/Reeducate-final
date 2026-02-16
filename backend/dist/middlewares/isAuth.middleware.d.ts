import "dotenv/config";
import type { NextFunction, Request, Response } from "express";
export default function isAuthMiddleware(req: Request, res: Response, next: NextFunction): Promise<Response<any, Record<string, any>> | undefined>;
//# sourceMappingURL=isAuth.middleware.d.ts.map