import { Router } from "express";
import { CartService } from "./cart.service.js";
import isAuthMiddleware from "../middlewares/isAuth.middleware.js";
import validateMiddleware from "../middlewares/validate.middleware.js";
import {
  addToCartSchema,
  updateCartItemSchema,
} from "../validations/cart.validation.js";

const cartRouter = Router();

cartRouter.get("/", isAuthMiddleware, CartService.getCart);
cartRouter.post(
  "/",
  isAuthMiddleware,
  validateMiddleware(addToCartSchema),
  CartService.addToCart,
);
cartRouter.patch(
  "/:productId",
  isAuthMiddleware,
  validateMiddleware(updateCartItemSchema),
  CartService.updateCartItem,
);
cartRouter.delete("/:productId", isAuthMiddleware, CartService.removeCartItem);
cartRouter.delete("/", isAuthMiddleware, CartService.emptyCart);

export default cartRouter;
