import mongoose from "mongoose";
import cartModel from "./cart.model.js";
import productModel from "../products/product.model.js";
async function getCart(req, res) {
    try {
        if (!req.userId) {
            return res.status(401).json({ message: "token is invalid" });
        }
        const userId = new mongoose.Types.ObjectId(req.userId);
        const cart = await cartModel
            .findOne({ user: userId })
            .populate("items.product");
        if (!cart) {
            return res.json({ items: [], totalPrice: 0 });
        }
        const items = (cart.items || []).filter((item) => item.product);
        const totalPrice = items.reduce((sum, item) => {
            const product = item.product;
            const price = typeof product?.price === "number" ? product.price : 0;
            return sum + price * item.quantity;
        }, 0);
        if (cart.totalPrice !== totalPrice) {
            cart.totalPrice = totalPrice;
            await cart.save();
        }
        return res.json({
            _id: cart._id,
            user: cart.user,
            items,
            totalPrice: cart.totalPrice,
        });
    }
    catch (error) {
        return res.status(500).json({
            message: error,
        });
    }
}
async function addToCart(req, res) {
    try {
        if (!req.userId) {
            return res.json({ message: "token is invalid" });
        }
        const userId = new mongoose.Types.ObjectId(req.userId);
        const { productId, quantity } = req.body;
        const product = await productModel.findById(productId);
        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }
        const stock = typeof product.quantity === "number" ? product.quantity : 0;
        let cart = await cartModel.findOne({ user: userId });
        if (!cart) {
            cart = await cartModel.create({ user: userId, items: [] });
        }
        const existingItem = cart.items.find((item) => item.product.toString() === productId);
        const nextQty = existingItem ? existingItem.quantity + quantity : quantity;
        if (nextQty > stock) {
            return res.status(400).json({ message: "Quantity exceeds stock" });
        }
        if (existingItem) {
            existingItem.quantity = nextQty;
        }
        else {
            cart.items.push({
                product: new mongoose.Types.ObjectId(productId),
                quantity,
            });
        }
        await cart.save();
        return getCart(req, res);
    }
    catch (error) {
        return res.status(500).json({
            message: error instanceof Error ? error.message : String(error),
        });
    }
}
async function updateCartItem(req, res) {
    try {
        if (!req.userId) {
            return res.status(401).json({ message: "token is invalid" });
        }
        const userId = new mongoose.Types.ObjectId(req.userId);
        const { productId } = req.params;
        const { quantity } = req.body;
        const product = await productModel.findById(productId);
        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }
        const stock = typeof product.quantity === "number" ? product.quantity : 0;
        if (quantity > stock) {
            return res.status(400).json({ message: "Quantity exceeds stock" });
        }
        const cart = await cartModel.findOne({ user: userId });
        if (!cart) {
            return res.status(404).json({ message: "Cart not found" });
        }
        const item = cart.items.find((cartItem) => cartItem.product.toString() === productId);
        if (!item) {
            return res.status(404).json({ message: "Item not found in cart" });
        }
        item.quantity = quantity;
        await cart.save();
        return getCart(req, res);
    }
    catch (error) {
        return res.status(500).json({
            message: error instanceof Error ? error.message : String(error),
        });
    }
}
async function removeCartItem(req, res) {
    try {
        if (!req.userId) {
            return res.status(401).json({ message: "token is invalid" });
        }
        const userId = new mongoose.Types.ObjectId(req.userId);
        const { productId } = req.params;
        const cart = await cartModel.findOne({ user: userId });
        if (!cart) {
            return res.status(404).json({ message: "Cart not found" });
        }
        const before = cart.items.length;
        cart.items = cart.items.filter((cartItem) => cartItem.product.toString() !== productId);
        if (cart.items.length === before) {
            return res.status(404).json({ message: "Item not found in cart" });
        }
        await cart.save();
        return getCart(req, res);
    }
    catch (error) {
        return res.status(500).json({
            message: error instanceof Error ? error.message : String(error),
        });
    }
}
async function emptyCart(req, res) {
    try {
        if (!req.userId) {
            return res.status(401).json({ message: "token is invalid" });
        }
        const userId = new mongoose.Types.ObjectId(req.userId);
        const cart = await cartModel.findOne({ user: userId });
        if (!cart) {
            return res.json({ items: [], totalPrice: 0 });
        }
        cart.items = [];
        cart.totalPrice = 0;
        await cart.save();
        return res.json({ items: [], totalPrice: 0 });
    }
    catch (error) {
        return res.status(500).json({
            message: error instanceof Error ? error.message : String(error),
        });
    }
}
export const CartService = {
    getCart,
    addToCart,
    updateCartItem,
    removeCartItem,
    emptyCart,
};
//# sourceMappingURL=cart.service.js.map