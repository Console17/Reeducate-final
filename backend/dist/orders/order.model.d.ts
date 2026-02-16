import mongoose from "mongoose";
import type { Document } from "mongoose";
export type OrderStatus = "preparing" | "shipped" | "delivered" | "refunded";
export interface OrderItem {
    product: mongoose.Types.ObjectId;
    title: string;
    price: number;
    quantity: number;
}
export interface Order extends Document {
    user: mongoose.Types.ObjectId;
    items: OrderItem[];
    totalPrice: number;
    status: OrderStatus;
}
declare const _default: mongoose.Model<Order, {}, {}, {}, mongoose.Document<unknown, {}, Order, {}, mongoose.DefaultSchemaOptions> & Order & Required<{
    _id: mongoose.Types.ObjectId;
}> & {
    __v: number;
} & {
    id: string;
}, any, Order>;
export default _default;
//# sourceMappingURL=order.model.d.ts.map