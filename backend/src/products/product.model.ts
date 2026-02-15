import mongoose from "mongoose";
import type { Document } from "mongoose";

const { Schema } = mongoose;

export interface Product extends Document {
  title: string;
  description: string;
  quantity: number;
  price: number;
  images: string[];
  author: mongoose.Types.ObjectId;
}

const productSchema = new Schema<Product>(
  {
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
  },
  { timestamps: true },
);

export default mongoose.model<Product>("product", productSchema);
