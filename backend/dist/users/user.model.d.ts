import mongoose from "mongoose";
import type { Document } from "mongoose";
export interface User extends Document {
    fullName: string;
    email: string;
    password: string;
    age: number;
    role: "customer" | "admin";
    isVerified: boolean;
    OTPCode: string | null;
    OTPCodeExpirationDate: string | null;
    products: {
        product: mongoose.Types.ObjectId;
        title: string;
        price: number;
    }[];
}
declare const _default: mongoose.Model<User, {}, {}, {}, mongoose.Document<unknown, {}, User, {}, mongoose.DefaultSchemaOptions> & User & Required<{
    _id: mongoose.Types.ObjectId;
}> & {
    __v: number;
} & {
    id: string;
}, any, User>;
export default _default;
//# sourceMappingURL=user.model.d.ts.map