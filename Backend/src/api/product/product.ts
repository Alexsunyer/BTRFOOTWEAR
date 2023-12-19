import { Router, Request, Response } from "express";
import { checkSchema } from "express-validator";
import reportError from "../../utils/reportError";
import { return422IfErrors } from "../../utils/auth";
import {
  createProduct,
  getProductInstance,
  updateProduct,
  getAllProducts,
  deleteProduct,
  getMostSelledProducts,
  getAllProductsByName,
} from "../../database/agents/product/productAgent";

const routes = Router();

routes.post(
  "/createProduct",
  checkSchema(
    {
      id: {
        isNumeric: true,
        isEmpty: {
          negated: true,
          errorMessage: "id required",
        },
      },
      name: {
        isString: true,
        isEmpty: {
          negated: true,
          errorMessage: "name required",
        },
      },
      image: {
        isString: true,
        isEmpty: {
          negated: true,
          errorMessage: "image required",
        },
      },
      price: {
        isNumeric: true,
        isEmpty: {
          negated: true,
          errorMessage: "price required",
        },
      },
      categoryId: {
        isNumeric: true,
        isEmpty: {
          negated: true,
          errorMessage: "categoryId required",
        },
      },
    },
    ["body"]
  ),
  return422IfErrors,
  async (req: Request, res: Response) => {
    try {
      let result = await createProduct(req.body);
      return res.status(200).send(result);
    } catch (err: Error | any) {
      return reportError(err, "API - Product - createProduct", res);
    }
  }
);

routes.post(
  "/updateProduct",
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
      let result = await updateProduct(req.body);
      return res.status(200).send(result);
    } catch (err: Error | any) {
      return reportError(err, "API - Product - updateProduct", res);
    }
  }
);

routes.post(
  "/getProductInstance",
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
      let result = await getProductInstance(req.body.id);
      return res.status(200).send(result);
    } catch (err: Error | any) {
      return reportError(err, "API - Product - getProductInstance", res);
    }
  }
);

routes.post("/getAllProducts", async (req: Request, res: Response) => {
  try {
    let result = await getAllProducts(req.body);
    res.status(200).send(result);
  } catch (err: Error | any) {
    return reportError(err, "API - Product - getAllProducts", res);
  }
});

routes.post(
  "/getAllProductsByName",
  checkSchema({
    name: {
      isEmpty: {
        negated: true,
        errorMessage: "Valid name required",
      },
    },
  }),
  return422IfErrors,
  async (req: Request, res: Response) => {
    try {
      let result = await getAllProductsByName(req.body.name);
      res.status(200).send(result);
    } catch (err: Error | any) {
      return reportError(err, "API - Product - getAllProducts", res);
    }
  }
);

routes.post("/getMostSelledProducts", async (req: Request, res: Response) => {
  try {
    let result = await getMostSelledProducts(req.body);
    // const lastProducts:Array<object> = result.sort(
    //   (a: object, b: object) => new Date(b.createdAt) - new Date(a.createdAt)
    // );
    // const last8Products = lastProducts.slice(0, 8);
    res.status(200).send(result);
  } catch (err: Error | any) {
    return reportError(err, "API - Product - getMostSelledProducts", res);
  }
});

routes.post(
  "/deleteProduct",
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
      let result = await deleteProduct(req.body.id);
      res.status(200).send(result);
    } catch (err: Error | any) {
      return reportError(err, "API - Product - deleteProduct", res);
    }
  }
);
export default routes;
