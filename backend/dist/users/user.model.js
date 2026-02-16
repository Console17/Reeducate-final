import mongoose from "mongoose";
const { Schema } = mongoose;
const userSchema = new Schema({
    fullName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        lowercase: true,
    },
    password: {
        type: String,
        required: true,
        select: false,
    },
    age: {
        type: Number,
        required: true,
    },
    role: {
        type: String,
        enum: ["customer", "admin"],
        default: "customer",
        required: true,
    },
    isVerified: {
        type: Boolean,
        default: false,
        required: true,
    },
    OTPCode: {
        type: String,
        default: null,
    },
    OTPCodeExpirationDate: {
        type: String,
        default: null,
    },
    products: {
        type: [
            {
                product: { type: Schema.Types.ObjectId, ref: "product" },
                title: { type: String, required: true },
                price: { type: Number, required: true, min: 0 },
            },
        ],
        default: [],
    },
}, { timestamps: true });
export default mongoose.model("user", userSchema);
//# sourceMappingURL=user.model.js.map