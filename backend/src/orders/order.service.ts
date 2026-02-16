import mongoose from "mongoose";
import type { Request, Response } from "express";
import cartModel from "../carts/cart.model.js";
import orderModel from "./order.model.js";

async function checkout(req: Request, res: Response) {
  try {
    const userId = new mongoose.Types.ObjectId(req.userId);
    const cart = await cartModel
      .findOne({ user: userId })
      .populate("items.product");

    if (!cart || cart.items.length === 0) {
      return res.status(400).json({ message: "cart is empty" });
    }

    const orderItems = cart.items
      .filter((item) => item.product)
      .map((item) => {
        const product = item.product as {
          _id: mongoose.Types.ObjectId;
          title?: string;
          price?: number;
        };

        return {
          product: product._id,
          title: product.title || "",
          price: typeof product.price === "number" ? product.price : 0,
          quantity: item.quantity,
        };
      })
      .filter((item) => item.title && item.price >= 0);

    if (orderItems.length === 0) {
      return res.status(400).json({ message: "cart has invalid items" });
    }

    const totalPrice = orderItems.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0,
    );

    const order = await orderModel.create({
      user: userId,
      items: orderItems,
      totalPrice,
      status: "preparing",
    });

    cart.items = [];
    cart.totalPrice = 0;
    await cart.save();

    const populatedOrder = await orderModel
      .findById(order._id)
      .populate("items.product");

    return res.status(201).json(populatedOrder || order);
  } catch (error) {
    return res.status(500).json({ message: "server error" });
  }
}

async function getOrders(req: Request, res: Response) {
  try {
    const userId = new mongoose.Types.ObjectId(req.userId);
    const filter = req.userRole === "admin" ? {} : { user: userId };

    const orders = await orderModel
      .find(filter)
      .sort({ createdAt: -1 })
      .populate("items.product");

    return res.json(orders);
  } catch (error) {
    return res.status(500).json({ message: "server error" });
  }
}

async function getOrderById(req: Request, res: Response) {
  try {
    const userId = new mongoose.Types.ObjectId(req.userId);
    const { id } = req.params;

    const order = await orderModel.findById(id).populate("items.product");
    if (!order) {
      return res.status(404).json({ message: "order not found" });
    }

    if (req.userRole !== "admin" && !order.user.equals(userId)) {
      return res.status(403).json({ message: "permition denied" });
    }

    return res.json(order);
  } catch (error) {
    return res.status(500).json({ message: "server error" });
  }
}

async function updateOrderStatus(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const { status } = req.body as { status: string };

    const order = await orderModel.findByIdAndUpdate(
      id,
      { status },
      { returnDocument: "after" },
    );

    if (!order) {
      return res.status(404).json({ message: "order not found" });
    }

    const populatedOrder = await orderModel
      .findById(order._id)
      .populate("items.product");

    return res.json(populatedOrder || order);
  } catch (error) {
    return res.status(500).json({ message: "server error" });
  }
}

async function deleteOrder(req: Request, res: Response) {
  try {
    const { id } = req.params;

    const deletedOrder = await orderModel.findByIdAndDelete(id);
    if (!deletedOrder) {
      return res.status(404).json({ message: "order not found" });
    }

    return res.json({ message: "order deleted" });
  } catch (error) {
    return res.status(500).json({ message: "server error" });
  }
}

export const OrderService = {
  checkout,
  getOrders,
  getOrderById,
  updateOrderStatus,
  deleteOrder,
};
