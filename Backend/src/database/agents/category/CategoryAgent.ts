import { FindOptions } from "sequelize";
import db from "../../";
import reportError from "../../../utils/reportError";
import {
  CategoryModel,
  CategoryModelAdd,
} from "../../models/category/Category";

export const createCategory = async (
  params: CategoryModelAdd
): Promise<CategoryModel | false> => {
  try {
    return await db.Category.create({
      ...params,
    });
  } catch (err: Error | any) {
    return reportError(err, "createCategory- CategoryAgent");
  }
};

export const getCategoryInstance = async (
  id: number
): Promise<CategoryModel | false | null> => {
  try {
    let result = await db.Category.findByPk(id);
    return result;
  } catch (err: Error | any) {
    return reportError(err, "getCategoryInstance- CategoryAgent");
  }
};

export const getAllCategories = async (
  params: FindOptions
): Promise<CategoryModel[] | false> => {
  try {
    return await db.Category.findAll({
      ...params,
    });
  } catch (err: Error | any) {
    return reportError(err, "getAllCategories- CategoryAgent");
  }
};

export const updateCategory = async (
  params: CategoryModelAdd
): Promise<boolean> => {
  try {
    if (params.id) {
      let Category = await db.Example.update(
        {
          ...params,
        },
        {
          where: {
            id: params.id,
          },
        }
      );
      if (Category[0] > 0) {
        return true;
      }
    }
    return false;
  } catch (err: Error | any) {
    return reportError(err, "updateCategory- CategoryAgent");
  }
};

export const deleteCategory = async (id: number): Promise<boolean> => {
  try {
    let Category = await getCategoryInstance(id);
    if (Category) {
      await Category.destroy();
      return true;
    }
    return false;
  } catch (err: Error | any) {
    return reportError(err, "deleteCategory- CategoryAgent");
  }
};
