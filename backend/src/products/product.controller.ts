import { Router } from "express";
import { ProductService } from "./product.service.js";
import validateMiddleware from "../middlewares/validate.middleware.js";
import isValidMongoId from "../middlewares/isValidMongoId.middleware.js";
import {
  productCreateSchema,
  productUpdateSchema,
} from "../validations/product.validation.js";
import isAdminMiddleware from "../middlewares/isAdmin.middleware.js";
import isAuthMiddleware from "../middlewares/isAuth.middleware.js";
import uploadMiddleware from "../middlewares/upload.middleware.js";

const productRouter = Router();

productRouter.get("/", ProductService.getAllProducts);
productRouter.get("/:id", isValidMongoId, ProductService.getProductById);
productRouter.post(
  "/",
  isAuthMiddleware,
  isAdminMiddleware,
  uploadMiddleware.array("images", 5),
  validateMiddleware(productCreateSchema),
  ProductService.createProduct,
);
productRouter.delete(
  "/:id",
  isAuthMiddleware,
  isAdminMiddleware,
  isValidMongoId,
  ProductService.deleteProduct,
);
productRouter.patch(
  "/:id",
  isAuthMiddleware,
  isAdminMiddleware,
  isValidMongoId,
  uploadMiddleware.array("images", 5),
  validateMiddleware(productUpdateSchema),
  ProductService.updateProduct,
);

export default productRouter;
