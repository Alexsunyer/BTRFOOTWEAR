import Sequelize, { Model, BuildOptions } from "sequelize";
import { DbInterface } from "../..";

/*
 *
 * Typescript Models
 *
 */

export interface ProductModelAdd {
  id?: number;
  name?: string;
  description?: string;
  url?: string;
  price?: number;
  CategoryId?: number;
}

export interface ProductModelType {
  id: number;
  name: string;
  description?: string;
  url: string;
  price: number;
  CategoryId: number;
}

/*
 *
 * Typescript Properties
 *
 */

export type ProductModel = ProductModelType & Sequelize.Model & {};

export type ProductModelStatic = typeof Model & {
  new (values?: object, options?: BuildOptions): ProductModel;
} & { associate: any };

/*
 *
 * Database model
 *
 */
const ProductFactory = (sequelize: Sequelize.Sequelize): ProductModelStatic => {
  const Product = <ProductModelStatic>sequelize.define(
    "Product",
    {
      name: {
        type: Sequelize.STRING(255),
        allowNull: false,
      },
      description: {
        type: Sequelize.TEXT,
      },
      url: {
        type: Sequelize.TEXT,
      },
      price: {
        type: Sequelize.DECIMAL,
        allowNull: false,
      },
    },
    {
      name: {
        singular: "Product",
        plural: "Products",
      },
      modelName: "Product",
    }
  );

  /*
   *
   * Relations
   *
   */
  Product.associate = (db: DbInterface) => {
    Product.belongsTo(db.Category);
    Product.belongsToMany(db.ShoppingCart, { through: db.ShoppingCartProduct });
    Product.belongsToMany(db.Order, { through: db.OrderProduct });
  };

  return Product;
};

export default ProductFactory;
