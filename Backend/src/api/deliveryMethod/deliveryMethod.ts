import { Router, Request, Response } from "express";
import { checkSchema } from "express-validator";
import reportError from "../../utils/reportError";
import { return422IfErrors } from "../../utils/auth";
import {
  createDeliveryMethod,
  getDeliveryMethodInstance,
  updateDeliveryMethod,
  getAllDeliveryMethods,
  deleteDeliveryMethod,
} from "../../database/agents/deliveryMethod/DeliveryMethodAgent";

const routes = Router();

routes.post(
  "/createDeliveryMethod",
  checkSchema(
    {
      name: {
        isEmpty: {
          negated: true,
          errorMessage: "Field name required",
        },
      },
      price: {
        isEmpty: {
          negated: true,
          errorMessage: "Field price required",
        },
      },
    },
    ["body"]
  ),
  return422IfErrors,
  async (req: Request, res: Response) => {
    try {
      let result = await createDeliveryMethod(req.body);
      return res.status(200).send(result);
    } catch (err: Error | any) {
      return reportError(
        err,
        "API - deliverymethod - createDeliveryMethod",
        res
      );
    }
  }
);

routes.post(
  "/updateDeliveryMethod",
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
      let result = await updateDeliveryMethod(req.body);
      return res.status(200).send(result);
    } catch (err: Error | any) {
      return reportError(
        err,
        "API - deliverymethod - updateDeliveryMethod",
        res
      );
    }
  }
);

routes.post(
  "/getDeliveryMethodInstance",
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
      let result = await getDeliveryMethodInstance(req.body.id);
      return res.status(200).send(result);
    } catch (err: Error | any) {
      return reportError(
        err,
        "API - deliverymethod - getDeliveryMethodInstance",
        res
      );
    }
  }
);

routes.post("/getAllDeliveryMethods", async (req: Request, res: Response) => {
  try {
    let result = await getAllDeliveryMethods(req.body);
    res.status(200).send(result);
  } catch (err: Error | any) {
    return reportError(
      err,
      "API - deliverymethod - getAllDeliveryMethods",
      res
    );
  }
});

routes.post(
  "/deleteDeliveryMethod",
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
      let result = await deleteDeliveryMethod(req.body.id);
      res.status(200).send(result);
    } catch (err: Error | any) {
      return reportError(
        err,
        "API - deliverymethod - deleteDeliveryMethod",
        res
      );
    }
  }
);
export default routes;
