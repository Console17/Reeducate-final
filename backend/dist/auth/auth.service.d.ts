import "dotenv/config";
import type { Request, Response } from "express";
declare function signUp(req: Request, res: Response): Promise<Response<any, Record<string, any>> | undefined>;
declare function signIn(req: Request, res: Response): Promise<Response<any, Record<string, any>> | undefined>;
declare function currentUser(req: Request, res: Response): Promise<void>;
declare function verifyUser(req: Request, res: Response): Promise<Response<any, Record<string, any>> | undefined>;
declare function resendVerificationCode(req: Request, res: Response): Promise<Response<any, Record<string, any>> | undefined>;
export declare const AuthService: {
    signUp: typeof signUp;
    signIn: typeof signIn;
    currentUser: typeof currentUser;
    verifyUser: typeof verifyUser;
    resendVerificationCode: typeof resendVerificationCode;
};
export {};
//# sourceMappingURL=auth.service.d.ts.map