import { Router, Request, Response } from "express";
import { checkSchema } from "express-validator";
import reportError from "../../utils/reportError";
import { return422IfErrors } from "../../utils/auth";
import {
  createCategory,
  getCategoryInstance,
  updateCategory,
  getAllCategories,
  deleteCategory,
} from "../../database/agents/category/CategoryAgent";

const routes = Router();

routes.post(
  "/createCategory",
  checkSchema(
    {
      name: {
        isString: true,
        isEmpty: {
          negated: true,
          errorMessage: "name required",
        },
      },
    },
    ["body"]
  ),
  return422IfErrors,
  async (req: Request, res: Response) => {
    try {
      let result = await createCategory(req.body);
      return res.status(200).send(result);
    } catch (err: Error | any) {
      return reportError(err, "API - Category - createCategory", res);
    }
  }
);

routes.post(
  "/updateCategory",
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
      let result = await updateCategory(req.body);
      return res.status(200).send(result);
    } catch (err: Error | any) {
      return reportError(err, "API - Category - updateCategory", res);
    }
  }
);

routes.post(
  "/getCategoryInstance",
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
      let result = await getCategoryInstance(req.body.id);
      return res.status(200).send(result);
    } catch (err: Error | any) {
      return reportError(err, "API - Category - getCategoryInstance", res);
    }
  }
);

routes.post("/getAllCategories", async (req: Request, res: Response) => {
  try {
    let result = await getAllCategories(req.body);
    res.status(200).send(result);
  } catch (err: Error | any) {
    return reportError(err, "API - Category - getAllCategories", res);
  }
});

routes.post(
  "/deleteCategory",
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
      let result = await deleteCategory(req.body.id);
      res.status(200).send(result);
    } catch (err: Error | any) {
      return reportError(err, "API - Category - deleteCategory", res);
    }
  }
);
export default routes;
