import express, { type Request, type Response } from "express";
// import logMiddleware from "./middlewares/admin.middleware.js";
import dbCondig from "./config/db.config.js";
import authRouter from "./auth/auth.controller.js";
import productRouter from "./products/product.controller.js";
import cartRouter from "./carts/cart.controller.js";

const app = express();
app.use(express.json());

app.use("/auth", authRouter);
app.use("/products", productRouter);
app.use("/cart", cartRouter);

app.get("/", (req: Request, res: Response) => {
  res.send("hello");
});

dbCondig().then(() => {
  app.listen(3000, () => {
    console.log("server running on http://localhost:3000");
  });
});
