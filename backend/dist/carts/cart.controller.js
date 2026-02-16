import { Router } from "express";
import { CartService } from "./cart.service.js";
import isAuthMiddleware from "../middlewares/isAuth.middleware.js";
import validateMiddleware from "../middlewares/validate.middleware.js";
import { addToCartSchema, updateCartItemSchema, } from "../validations/cart.validation.js";
const cartRouter = Router();
/**
 * @openapi
 * /cart:
 *   get:
 *     tags: [Cart]
 *     summary: Get current user's cart
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Cart
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/Cart"
 *       401:
 *         description: Missing or invalid token
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/ErrorResponse"
 */
cartRouter.get("/", isAuthMiddleware, CartService.getCart);
/**
 * @openapi
 * /cart:
 *   post:
 *     tags: [Cart]
 *     summary: Add an item to cart
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: "#/components/schemas/AddToCartInput"
 *     responses:
 *       200:
 *         description: Updated cart
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/Cart"
 *       400:
 *         description: Validation or stock error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/ErrorResponse"
 *       401:
 *         description: Missing or invalid token
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/ErrorResponse"
 *       404:
 *         description: Product not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/ErrorResponse"
 */
cartRouter.post("/", isAuthMiddleware, validateMiddleware(addToCartSchema), CartService.addToCart);
/**
 * @openapi
 * /cart/{productId}:
 *   patch:
 *     tags: [Cart]
 *     summary: Update cart item quantity
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: productId
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: "#/components/schemas/UpdateCartItemInput"
 *     responses:
 *       200:
 *         description: Updated cart
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/Cart"
 *       400:
 *         description: Validation or stock error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/ErrorResponse"
 *       401:
 *         description: Missing or invalid token
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/ErrorResponse"
 *       404:
 *         description: Cart or product not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/ErrorResponse"
 */
cartRouter.patch("/:productId", isAuthMiddleware, validateMiddleware(updateCartItemSchema), CartService.updateCartItem);
/**
 * @openapi
 * /cart/{productId}:
 *   delete:
 *     tags: [Cart]
 *     summary: Remove an item from cart
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: productId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Updated cart
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/Cart"
 *       401:
 *         description: Missing or invalid token
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/ErrorResponse"
 *       404:
 *         description: Cart or item not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/ErrorResponse"
 */
cartRouter.delete("/:productId", isAuthMiddleware, CartService.removeCartItem);
/**
 * @openapi
 * /cart:
 *   delete:
 *     tags: [Cart]
 *     summary: Empty the cart
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Empty cart
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/Cart"
 *       401:
 *         description: Missing or invalid token
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/ErrorResponse"
 */
cartRouter.delete("/", isAuthMiddleware, CartService.emptyCart);
export default cartRouter;
//# sourceMappingURL=cart.controller.js.map