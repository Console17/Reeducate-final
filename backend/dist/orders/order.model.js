import mongoose from "mongoose";
const { Schema } = mongoose;
const orderItemSchema = new Schema({
    product: {
        type: Schema.Types.ObjectId,
        ref: "product",
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
        min: 0,
    },
    quantity: {
        type: Number,
        required: true,
        min: 1,
    },
}, { _id: false });
const orderSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: "user",
        required: true,
        index: true,
    },
    items: {
        type: [orderItemSchema],
        required: true,
        default: [],
    },
    totalPrice: {
        type: Number,
        required: true,
        min: 0,
    },
    status: {
        type: String,
        enum: ["preparing", "shipped", "delivered", "refunded"],
        default: "preparing",
        required: true,
    },
}, { timestamps: true });
export default mongoose.model("order", orderSchema);
//# sourceMappingURL=order.model.js.map