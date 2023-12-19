import { Router, Request, Response } from "express";
import { checkSchema } from "express-validator";
import reportError from "../../utils/reportError";
import { return422IfErrors } from "../../utils/auth";
import {
  createShoppingCartProduct,
  getShoppingCartProductInstance,
  updateShoppingCartProduct,
  getAllShoppingCartProducts,
  deleteShoppingCartProduct,
} from "../../database/agents/shoppingCartProduct/ShoppingCartProductAgent";

const routes = Router();

routes.post(
  "/createShoppingCartProduct",
  checkSchema(
    {
      ShoppingCartId: {
        isEmpty: {
          negated: true,
          errorMessage: "ShoppingCartId required",
        },
      },
      ProductId: {
        isEmpty: {
          negated: true,
          errorMessage: "ProductId required",
        },
      },
    },
    ["body"]
  ),
  return422IfErrors,
  async (req: Request, res: Response) => {
    try {
      let result = await createShoppingCartProduct(req.body);
      return res.status(200).send(result);
    } catch (err: Error | any) {
      return reportError(
        err,
        "API - ShoppingCartProduct - createShoppingCartProduct",
        res
      );
    }
  }
);

routes.post(
  "/updateShoppingCartProduct",
  return422IfErrors,
  async (req: Request, res: Response) => {
    try {
      let result = await updateShoppingCartProduct(req.body);
      return res.status(200).send(result);
    } catch (err: Error | any) {
      return reportError(
        err,
        "API - ShoppingCartProduct - updateShoppingCartProduct",
        res
      );
    }
  }
);

routes.post(
  "/getShoppingCartProductInstance",
  checkSchema({
    ProductId: {
      isNumeric: true,
      isEmpty: {
        negated: true,
        errorMessage: "Valid id required",
      },
    },
    ShoppingCartId: {
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
      let result = await getShoppingCartProductInstance(
        req.body.ProductId,
        req.body.ShoppingCartId
      );
      return res.status(200).send(result);
    } catch (err: Error | any) {
      return reportError(
        err,
        "API - ShoppingCartProduct - getShoppingCartProductInstance",
        res
      );
    }
  }
);

routes.post(
  "/getAllShoppingCartProducts",
  async (req: Request, res: Response) => {
    try {
      let result = await getAllShoppingCartProducts(req.body);
      res.status(200).send(result);
    } catch (err: Error | any) {
      return reportError(
        err,
        "API - ShoppingCartProduct - getAllShoppingCartProducts",
        res
      );
    }
  }
);

routes.post(
  "/deleteShoppingCartProduct",
  checkSchema({
    ProductId: {
      isNumeric: true,
      isEmpty: {
        negated: true,
        errorMessage: "Valid id required",
      },
    },
    ShoppingCartId: {
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
      let result = await deleteShoppingCartProduct(
        req.body.ProductId,
        req.body.ShoppingCartId
      );
      res.status(200).send(result);
    } catch (err: Error | any) {
      return reportError(
        err,
        "API - ShoppingCartProduct - deleteShoppingCartProduct",
        res
      );
    }
  }
);
export default routes;
