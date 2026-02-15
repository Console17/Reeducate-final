import mongoose from "mongoose";
import type { Document } from "mongoose";

const { Schema } = mongoose;

export interface CartItem {
  product: mongoose.Types.ObjectId;
  quantity: number;
}

export interface Cart extends Document {
  user: mongoose.Types.ObjectId;
  items: CartItem[];
  totalPrice: number;
}

const cartItemSchema = new Schema<CartItem>(
  {
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
  },
  { _id: false },
);

const cartSchema = new Schema<Cart>(
  {
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
  },
  { timestamps: true },
);

export default mongoose.model<Cart>("cart", cartSchema);
