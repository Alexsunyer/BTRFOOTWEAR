import { Router, Request, Response } from "express";
import { checkSchema } from "express-validator";
import reportError from "../../utils/reportError";
import { return422IfErrors } from "../../utils/auth";
import {
  createShoppingCart,
  getShoppingCartInstance,
  getAllShoppingCarts,
  deleteShoppingCart,
} from "../../database/agents/shoppingCart/ShoppingCartAgent";

const routes = Router();

routes.post(
  "/createShoppingCart",
  return422IfErrors,
  async (req: Request, res: Response) => {
    try {
      let result = await createShoppingCart(req.body);
      return res.status(200).send(result);
    } catch (err: Error | any) {
      return reportError(err, "API - ShoppingCart - createShoppingCart", res);
    }
  }
);

routes.post(
  "/getShoppingCartInstance",
  checkSchema({
    id: {
      isNumeric: true,
      isEmpty: {
        negated: true,
        errorMessage: "Valid id required",
      },
    },
  }),
  return422IfErrors,
  async (req: Request, res: Response) => {
    try {
      let result = await getShoppingCartInstance(req.body.id);
      return res.status(200).send(result);
    } catch (err: Error | any) {
      return reportError(
        err,
        "API - ShoppingCart - getShoppingCartInstance",
        res
      );
    }
  }
);

routes.post("/getAllShoppingCarts", async (req: Request, res: Response) => {
  try {
    let result = await getAllShoppingCarts(req.body);
    res.status(200).send(result);
  } catch (err: Error | any) {
    return reportError(err, "API - ShoppingCart - getAllShoppingCarts", res);
  }
});

routes.post(
  "/deleteShoppingCart",
  checkSchema({
    id: {
      isNumeric: true,
      isEmpty: {
        negated: true,
        errorMessage: "Valid id required",
      },
    },
  }),
  return422IfErrors,
  async (req: Request, res: Response) => {
    try {
      let result = await deleteShoppingCart(req.body.id);
      res.status(200).send(result);
    } catch (err: Error | any) {
      return reportError(err, "API - ShoppingCart - deleteShoppingCart", res);
    }
  }
);
export default routes;
