import express, { Router } from "express";
import example from "./example/example";
import category from "./category/category";
import product from "./product/product";
import user from "./user/user";
import shoppingCart from "./shoppingCart/shoppingCart";
import shoppingCartProduct from "./shoppingCartProduct/shoppingCartProduct";
import deliveryMethod from "./deliveryMethod/deliveryMethod";
import path from "path";

const routes = Router();

routes.use("/example", example);
routes.use("/public", express.static(path.join(__dirname, "public")));
routes.use("/category", category);
routes.use("/product", product);
routes.use("/user", user);
routes.use("/shoppingCart", shoppingCart);
routes.use("/shoppingCartProduct", shoppingCartProduct);
routes.use("/deliveryMethod", deliveryMethod);

export default routes;
