import { Router, Request, Response } from "express";
import { checkSchema } from "express-validator";
import reportError from "../../utils/reportError";
import { return422IfErrors } from "../../utils/auth";
import {
  createUser,
  getUserInstance,
  updateUser,
  getAllUsers,
  deleteUser,
  getUserInstanceLogin,
} from "../../database/agents/user/userAgent";

const routes = Router();

routes.post(
  "/createUser",
  return422IfErrors,
  async (req: Request, res: Response) => {
    try {
      let result = await createUser(req.body);
      return res.status(200).send(result);
    } catch (err: Error | any) {
      return reportError(err, "API - User - createUser", res);
    }
  }
);

routes.post(
  "/updateUser",
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
      let result = await updateUser(req.body);
      return res.status(200).send(result);
    } catch (err: Error | any) {
      return reportError(err, "API - User - updateUser", res);
    }
  }
);

routes.post(
  "/getUserInstance",
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
      let result = await getUserInstance(req.body.id);
      return res.status(200).send(result);
    } catch (err: Error | any) {
      return reportError(err, "API - User - getUserInstance", res);
    }
  }
);
routes.post(
  "/getUserInstanceLogin",
  checkSchema({
    email: {
      isEmpty: {
        negated: true,
        errorMessage: "Valid email required",
      },
    },
    password: {
      isEmpty: {
        negated: true,
        errorMessage: "Valid password required",
      },
    },
  }),
  return422IfErrors,
  async (req: Request, res: Response) => {
    try {
      let result = await getUserInstanceLogin(
        req.body.email,
        req.body.password
      );
      if (!result) {
        return res.status(422).send(false);
      }
      return res.status(200).send(result);
    } catch (err: Error | any) {
      return reportError(err, "API - User - getUserInstance", res);
    }
  }
);

routes.post("/getAllUsers", async (req: Request, res: Response) => {
  try {
    let result = await getAllUsers(req.body);
    res.status(200).send(result);
  } catch (err: Error | any) {
    return reportError(err, "API - User - getAllUsers", res);
  }
});

routes.post(
  "/deleteUser",
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
      let result = await deleteUser(req.body.id);
      res.status(200).send(result);
    } catch (err: Error | any) {
      return reportError(err, "API - User - deleteUser", res);
    }
  }
);
export default routes;
