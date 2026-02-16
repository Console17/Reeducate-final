import express, {} from "express";
import swaggerUi from "swagger-ui-express";
// import logMiddleware from "./middlewares/admin.middleware.js";
import dbCondig from "./config/db.config.js";
import { swaggerSpec } from "./config/swagger.js";
import authRouter from "./auth/auth.controller.js";
import productRouter from "./products/product.controller.js";
import cartRouter from "./carts/cart.controller.js";
import orderRouter from "./orders/order.controller.js";
const app = express();
app.use(express.json());
app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use("/auth", authRouter);
app.use("/products", productRouter);
app.use("/cart", cartRouter);
app.use("/orders", orderRouter);
app.get("/", (req, res) => {
    res.send("hello");
});
dbCondig().then(() => {
    app.listen(3000, () => {
        console.log("server running on http://localhost:3000");
    });
});
//# sourceMappingURL=main.js.map