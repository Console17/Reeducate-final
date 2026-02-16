import mongoose from "mongoose";
import type { Document } from "mongoose";
export interface Product extends Document {
    title: string;
    description: string;
    quantity: number;
    price: number;
    images: string[];
    author: mongoose.Types.ObjectId;
}
declare const _default: mongoose.Model<Product, {}, {}, {}, mongoose.Document<unknown, {}, Product, {}, mongoose.DefaultSchemaOptions> & Product & Required<{
    _id: mongoose.Types.ObjectId;
}> & {
    __v: number;
} & {
    id: string;
}, any, Product>;
export default _default;
//# sourceMappingURL=product.model.d.ts.map