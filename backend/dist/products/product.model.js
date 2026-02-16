import mongoose from "mongoose";
const { Schema } = mongoose;
const productSchema = new Schema({
    title: {
        type: String,
        required: true,
        trim: true,
    },
    description: {
        type: String,
        required: true,
        trim: true,
    },
    quantity: {
        type: Number,
        required: true,
        min: 0,
    },
    price: {
        type: Number,
        required: true,
        min: 0,
    },
    images: {
        type: [String],
        default: [],
    },
    author: {
        type: Schema.Types.ObjectId,
        ref: "user",
        required: true,
    },
}, { timestamps: true });
export default mongoose.model("product", productSchema);
//# sourceMappingURL=product.model.js.map