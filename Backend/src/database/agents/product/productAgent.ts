import { FindOptions } from "sequelize";
import db from "../..";
import reportError from "../../../utils/reportError";
import { ProductModel, ProductModelAdd } from "../../models/product/Product";
import { Op } from "sequelize";

export const createProduct = async (
  params: ProductModelAdd
): Promise<ProductModel | false> => {
  try {
    return await db.Product.create({
      ...params,
    });
  } catch (err: Error | any) {
    return reportError(err, "createProduct- ProductAgent");
  }
};

export const getProductInstance = async (
  id: number
): Promise<ProductModel | false | null> => {
  try {
    let result = await db.Product.findByPk(id);
    return result;
  } catch (err: Error | any) {
    return reportError(err, "getProductInstance- ProductAgent");
  }
};
export const updateProduct = async (
  params: ProductModelAdd
): Promise<boolean> => {
  try {
    if (params.id) {
      let Product = await db.Product.update(
        {
          ...params,
        },
        {
          where: {
            id: params.id,
          },
        }
      );
      if (Product[0] > 0) {
        return true;
      }
    }
    return false;
  } catch (err: Error | any) {
    return reportError(err, "updateProduct- ProductAgent");
  }
};

export const getAllProducts = async (
  params: FindOptions
): Promise<ProductModel[] | false> => {
  try {
    return await db.Product.findAll({
      ...params,
    });
  } catch (err: Error | any) {
    return reportError(err, "getAllProducts- ProductAgent");
  }
};

export const getAllProductsByName = async (
  name: string
): Promise<ProductModel[] | false> => {
  try {
    return await db.Product.findAll({
      where: {
        name: {
          [Op.iLike]: `%${name}%`,
        },
      },
    });
  } catch (err: Error | any) {
    return reportError(err, "getAllProducts- ProductAgent");
  }
};

export const getMostSelledProducts = async (
  params: FindOptions
): Promise<ProductModel[] | false> => {
  try {
    return await db.Product.findAll({
      // limit: 8,
      // order: [["createdAt", "DESC"]],
      ...params,
    });
  } catch (err: Error | any) {
    return reportError(err, "getMostSelledProducts- ProductAgent");
  }
};

export const deleteProduct = async (id: number): Promise<boolean> => {
  try {
    let Product = await getProductInstance(id);
    if (Product) {
      await Product.destroy();
      return true;
    }
    return false;
  } catch (err: Error | any) {
    return reportError(err, "deleteProduct- ProductAgent");
  }
};
