import { Router } from "express";
import { OrderService } from "./order.service.js";
import isAuthMiddleware from "../middlewares/isAuth.middleware.js";
import isAdminMiddleware from "../middlewares/isAdmin.middleware.js";
import isValidMongoId from "../middlewares/isValidMongoId.middleware.js";
import validateMiddleware from "../middlewares/validate.middleware.js";
import updateOrderStatusSchema from "../validations/order.validation.js";
const orderRouter = Router();
/**
 * @openapi
 * /orders:
 *   get:
 *     tags: [Orders]
 *     summary: List orders (admin sees all)
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Order list
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: "#/components/schemas/Order"
 *       401:
 *         description: Missing or invalid token
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/ErrorResponse"
 */
orderRouter.get("/", isAuthMiddleware, OrderService.getOrders);
/**
 * @openapi
 * /orders/{id}:
 *   get:
 *     tags: [Orders]
 *     summary: Get order by id
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Order details
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/Order"
 *       400:
 *         description: Invalid id
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
 *       403:
 *         description: Permission denied
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/ErrorResponse"
 *       404:
 *         description: Order not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/ErrorResponse"
 */
orderRouter.get("/:id", isAuthMiddleware, isValidMongoId, OrderService.getOrderById);
/**
 * @openapi
 * /orders/checkout:
 *   post:
 *     tags: [Orders]
 *     summary: Create an order from cart
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       201:
 *         description: Order created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/Order"
 *       400:
 *         description: Cart empty or invalid
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
 */
orderRouter.post("/checkout", isAuthMiddleware, OrderService.checkout);
/**
 * @openapi
 * /orders/{id}/status:
 *   patch:
 *     tags: [Orders]
 *     summary: Update order status (admin)
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: "#/components/schemas/UpdateOrderStatusInput"
 *     responses:
 *       200:
 *         description: Updated order
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/Order"
 *       400:
 *         description: Invalid id or validation error
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
 *       403:
 *         description: Admin access required
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/ErrorResponse"
 *       404:
 *         description: Order not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/ErrorResponse"
 */
orderRouter.patch("/:id/status", isAuthMiddleware, isAdminMiddleware, isValidMongoId, validateMiddleware(updateOrderStatusSchema), OrderService.updateOrderStatus);
/**
 * @openapi
 * /orders/{id}:
 *   delete:
 *     tags: [Orders]
 *     summary: Delete an order (admin)
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Order deleted
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/MessageResponse"
 *       400:
 *         description: Invalid id
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
 *       403:
 *         description: Admin access required
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/ErrorResponse"
 *       404:
 *         description: Order not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/ErrorResponse"
 */
orderRouter.delete("/:id", isAuthMiddleware, isAdminMiddleware, isValidMongoId, OrderService.deleteOrder);
export default orderRouter;
//# sourceMappingURL=order.controller.js.map