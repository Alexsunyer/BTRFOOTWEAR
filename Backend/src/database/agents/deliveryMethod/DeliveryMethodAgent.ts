import { FindOptions } from "sequelize";
import db from "../../";
import reportError from "../../../utils/reportError";
import {
  DeliveryMethodModel,
  DeliveryMethodModelAdd,
} from "../../models/deliveryMethod/DeliveryMethod";

export const createDeliveryMethod = async (
  params: DeliveryMethodModelAdd
): Promise<DeliveryMethodModel | false> => {
  try {
    const res = await db.DeliveryMethod.create({
      ...params,
    });
    return res;
  } catch (err: Error | any) {
    return reportError(err, "createDeliveryMethod- DeliveryMethodAgent");
  }
};

export const getDeliveryMethodInstance = async (
  id: number
): Promise<DeliveryMethodModel | false | null> => {
  try {
    let result = await db.DeliveryMethod.findByPk(id);
    return result;
  } catch (err: Error | any) {
    return reportError(err, "getDeliveryMethodInstance- DeliveryMethodAgent");
  }
};
export const updateDeliveryMethod = async (
  params: DeliveryMethodModelAdd
): Promise<boolean> => {
  try {
    if (params.id) {
      let DeliveryMethod = await db.DeliveryMethod.update(
        {
          ...params,
        },
        {
          where: {
            id: params.id,
          },
        }
      );
      if (DeliveryMethod[0] > 0) {
        return true;
      }
    }
    return false;
  } catch (err: Error | any) {
    return reportError(err, "updateDeliveryMethod- DeliveryMethodAgent");
  }
};

export const getAllDeliveryMethods = async (
  params: FindOptions
): Promise<DeliveryMethodModel[] | false> => {
  try {
    return await db.DeliveryMethod.findAll({
      ...params,
    });
  } catch (err: Error | any) {
    return reportError(err, "getAllDeliveryMethods- DeliveryMethodAgent");
  }
};

export const deleteDeliveryMethod = async (id: number): Promise<boolean> => {
  try {
    let DeliveryMethod = await getDeliveryMethodInstance(id);
    if (DeliveryMethod) {
      await DeliveryMethod.destroy();
      return true;
    }
    return false;
  } catch (err: Error | any) {
    return reportError(err, "deleteDeliveryMethod- DeliveryMethodAgent");
  }
};
