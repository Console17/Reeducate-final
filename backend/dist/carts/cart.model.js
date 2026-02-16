import mongoose from "mongoose";
const { Schema } = mongoose;
const cartItemSchema = new Schema({
    product: {
        type: Schema.Types.ObjectId,
        ref: "product",
        required: true,
    },
    quantity: {
        type: Number,
        required: true,
        min: 1,
    },
}, { _id: false });
const cartSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: "user",
        required: true,
        unique: true,
        index: true,
    },
    items: {
        type: [cartItemSchema],
        default: [],
    },
    totalPrice: {
        type: Number,
        default: 0,
        min: 0,
    },
}, { timestamps: true });
export default mongoose.model("cart", cartSchema);
//# sourceMappingURL=cart.model.js.map