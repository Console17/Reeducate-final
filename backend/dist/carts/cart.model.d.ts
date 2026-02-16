import mongoose from "mongoose";
import type { Document } from "mongoose";
export interface CartItem {
    product: mongoose.Types.ObjectId;
    quantity: number;
}
export interface Cart extends Document {
    user: mongoose.Types.ObjectId;
    items: CartItem[];
    totalPrice: number;
}
declare const _default: mongoose.Model<Cart, {}, {}, {}, mongoose.Document<unknown, {}, Cart, {}, mongoose.DefaultSchemaOptions> & Cart & Required<{
    _id: mongoose.Types.ObjectId;
}> & {
    __v: number;
} & {
    id: string;
}, any, Cart>;
export default _default;
//# sourceMappingURL=cart.model.d.ts.map