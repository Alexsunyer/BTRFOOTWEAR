import Sequelize, { Model, BuildOptions } from "sequelize";
import { DbInterface } from "../..";

/*
 *
 * Typescript Models
 *
 */

export interface CategoryModelAdd {
  id?: number;
  name?: string;
}

export interface CategoryModelType {
  id: number;
  name: string;
}

/*
 *
 * Typescript Properties
 *
 */

export type CategoryModel = CategoryModelType & Sequelize.Model & {};

export type CategoryModelStatic = typeof Model & {
  new (values?: object, options?: BuildOptions): CategoryModel;
} & { associate: any };

/*
 *
 * Database model
 *
 */
const CategoryFactory = (
  sequelize: Sequelize.Sequelize
): CategoryModelStatic => {
  const Category = <CategoryModelStatic>sequelize.define(
    "Category",
    {
      name: {
        type: Sequelize.STRING(255),
        allowNull: false,
      },
    },
    {
      name: {
        singular: "Category",
        plural: "Categories",
      },
      modelName: "Category",
    }
  );

  /*
   *
   * Relations
   *
   */
  Category.associate = (db: DbInterface) => {
    Category.hasMany(db.Product);
  };

  return Category;
};

export default CategoryFactory;
