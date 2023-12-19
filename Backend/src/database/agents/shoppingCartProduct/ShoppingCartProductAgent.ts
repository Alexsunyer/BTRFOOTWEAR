import { FindOptions } from "sequelize";
import db from "../../";
import reportError from "../../../utils/reportError";
import {
  ShoppingCartProductModel,
  ShoppingCartProductModelAdd,
} from "../../models/shoppingCartProduct/ShoppingCartProduct";

export const createShoppingCartProduct = async (
  params: ShoppingCartProductModelAdd
): Promise<ShoppingCartProductModel | false> => {
  try {
    return await db.ShoppingCartProduct.create({
      ...params,
    });
  } catch (err: Error | any) {
    return reportError(
      err,
      "createShoppingCartProduct- ShoppingCartProductAgent"
    );
  }
};

export const getShoppingCartProductInstance = async (
  ProductId: number,
  ShoppingCartId: number
): Promise<ShoppingCartProductModel | false | null> => {
  try {
    let result = await db.ShoppingCartProduct.findOne({
      where: {
        ProductId,
        ShoppingCartId,
      },
    });
    return result;
  } catch (err: Error | any) {
    return reportError(
      err,
      "getShoppingCartProductInstance- ShoppingCartProductAgent"
    );
  }
};

export const updateShoppingCartProduct = async (
  params: ShoppingCartProductModelAdd
): Promise<boolean> => {
  try {
    if (params.ProductId && params.ShoppingCartId) {
      let ShoppingCartProduct = await db.ShoppingCartProduct.update(
        {
          ...params,
        },
        {
          where: {
            ProductId: params.ProductId,
            ShoppingCartId: params.ShoppingCartId,
          },
        }
      );
      if (ShoppingCartProduct[0] > 0) {
        return true;
      }
    }
    return false;
  } catch (err: Error | any) {
    return reportError(
      err,
      "updateShoppingCartProduct- ShoppingCartProductAgent"
    );
  }
};

export const getAllShoppingCartProducts = async (
  params: FindOptions
): Promise<ShoppingCartProductModel[] | false> => {
  try {
    return await db.ShoppingCartProduct.findAll({
      ...params,
      include: [
        {
          model: db.Product,
          required: false,
        },
      ],
    });
  } catch (err: Error | any) {
    return reportError(
      err,
      "getAllShoppingCartProducts- ShoppingCartProductAgent"
    );
  }
};

export const deleteShoppingCartProduct = async (
  ProductId: number,
  ShoppingCartId: number
): Promise<boolean> => {
  try {
    let ShoppingCartProduct = await getShoppingCartProductInstance(
      ProductId,
      ShoppingCartId
    );
    if (ShoppingCartProduct) {
      await ShoppingCartProduct.destroy();
      return true;
    }
    return false;
  } catch (err: Error | any) {
    return reportError(
      err,
      "deleteShoppingCartProduct- ShoppingCartProductAgent"
    );
  }
};
