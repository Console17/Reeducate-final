import { Router } from "express";
import { ProductService } from "./product.service.js";
import validateMiddleware from "../middlewares/validate.middleware.js";
import isValidMongoId from "../middlewares/isValidMongoId.middleware.js";
import { productCreateSchema, productUpdateSchema, } from "../validations/product.validation.js";
import isAdminMiddleware from "../middlewares/isAdmin.middleware.js";
import isAuthMiddleware from "../middlewares/isAuth.middleware.js";
import uploadMiddleware from "../middlewares/upload.middleware.js";
const productRouter = Router();
/**
 * @openapi
 * /products:
 *   get:
 *     tags: [Products]
 *     summary: List products
 *     parameters:
 *       - in: query
 *         name: t
 *         schema:
 *           type: string
 *         description: Optional search term for product title
 *     responses:
 *       200:
 *         description: Product list
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: "#/components/schemas/Product"
 */
productRouter.get("/", ProductService.getAllProducts);
/**
 * @openapi
 * /products/{id}:
 *   get:
 *     tags: [Products]
 *     summary: Get product by id
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Product details
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/Product"
 *       400:
 *         description: Invalid id
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
productRouter.get("/:id", isValidMongoId, ProductService.getProductById);
/**
 * @openapi
 * /products:
 *   post:
 *     tags: [Products]
 *     summary: Create a product (admin)
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             $ref: "#/components/schemas/ProductCreateForm"
 *     responses:
 *       201:
 *         description: Product created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/Product"
 *       400:
 *         description: Validation or upload error
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
 */
productRouter.post("/", isAuthMiddleware, isAdminMiddleware, uploadMiddleware.array("images", 5), validateMiddleware(productCreateSchema), ProductService.createProduct);
/**
 * @openapi
 * /products/{id}:
 *   delete:
 *     tags: [Products]
 *     summary: Delete a product (admin)
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
 *         description: Product deleted
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
 *         description: Product not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/ErrorResponse"
 */
productRouter.delete("/:id", isAuthMiddleware, isAdminMiddleware, isValidMongoId, ProductService.deleteProduct);
/**
 * @openapi
 * /products/{id}:
 *   patch:
 *     tags: [Products]
 *     summary: Update a product (admin)
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
 *         multipart/form-data:
 *           schema:
 *             $ref: "#/components/schemas/ProductUpdateForm"
 *     responses:
 *       200:
 *         description: Product updated
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/Product"
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
 *         description: Product not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/ErrorResponse"
 */
productRouter.patch("/:id", isAuthMiddleware, isAdminMiddleware, isValidMongoId, uploadMiddleware.array("images", 5), validateMiddleware(productUpdateSchema), ProductService.updateProduct);
export default productRouter;
//# sourceMappingURL=product.controller.js.map