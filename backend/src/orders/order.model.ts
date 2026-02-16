import mongoose from "mongoose";
import type { Document } from "mongoose";

const { Schema } = mongoose;

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

const orderItemSchema = new Schema<OrderItem>(
  {
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
  },
  { _id: false },
);

const orderSchema = new Schema<Order>(
  {
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
  },
  { timestamps: true },
);

export default mongoose.model<Order>("order", orderSchema);
