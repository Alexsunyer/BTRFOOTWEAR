import { FindOptions } from "sequelize";
import db from "../../";
import reportError from "../../../utils/reportError";
import {
  ShoppingCartModel,
  ShoppingCartModelAdd,
} from "../../models/shoppingCart/ShoppingCart";

export const createShoppingCart = async (
  params: ShoppingCartModelAdd
): Promise<ShoppingCartModel | false> => {
  try {
    return await db.ShoppingCart.create({
      ...params,
    });
  } catch (err: Error | any) {
    return reportError(err, "createShoppingCart- ShoppingCartAgent");
  }
};

export const getShoppingCartInstance = async (
  id: number
): Promise<ShoppingCartModel | false | null> => {
  try {
    let result = await db.ShoppingCart.findByPk(id, {
      include: [
        {
          model: db.ShoppingCartProduct,
          include: [
            {
              model: db.Product,
              duplicating: false,
            },
          ],
          duplicating: false,
        },
      ],
    });
    return result;
  } catch (err: Error | any) {
    return reportError(err, "getShoppingCartInstance- ShoppingCartAgent");
  }
};

export const getAllShoppingCarts = async (
  params: FindOptions
): Promise<ShoppingCartModel[] | false> => {
  try {
    return await db.ShoppingCart.findAll({
      ...params,
    });
  } catch (err: Error | any) {
    return reportError(err, "getAllShoppingCarts- ShoppingCartAgent");
  }
};

export const deleteShoppingCart = async (id: number): Promise<boolean> => {
  try {
    let ShoppingCart = await getShoppingCartInstance(id);
    if (ShoppingCart) {
      await ShoppingCart.destroy();
      return true;
    }
    return false;
  } catch (err: Error | any) {
    return reportError(err, "deleteShoppingCart- ShoppingCartAgent");
  }
};
