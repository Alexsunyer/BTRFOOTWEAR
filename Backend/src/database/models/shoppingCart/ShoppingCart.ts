import Sequelize, { Model, BuildOptions } from "sequelize";
import { DbInterface } from "../..";

/*
 *
 * Typescript Models
 *
 */

export interface ShoppingCartModelAdd {
  id?: number;
  UserId?: number;
}

export interface ShoppingCartModelType {
  id: number;
  UserId: number;
}

/*
 *
 * Typescript Properties
 *
 */

export type ShoppingCartModel = ShoppingCartModelType & Sequelize.Model & {};

export type ShoppingCartModelStatic = typeof Model & {
  new (values?: object, options?: BuildOptions): ShoppingCartModel;
} & { associate: any };

/*
 *
 * Database model
 *
 */
const ShoppingCartFactory = (
  sequelize: Sequelize.Sequelize
): ShoppingCartModelStatic => {
  const ShoppingCart = <ShoppingCartModelStatic>sequelize.define(
    "ShoppingCart",
    {},
    {
      name: {
        singular: "ShoppingCart",
        plural: "ShoppingCarts",
      },
      modelName: "ShoppingCart",
    }
  );

  /*
   *
   * Relations
   *
   */
  ShoppingCart.associate = (db: DbInterface) => {
    ShoppingCart.belongsTo(db.User);
    ShoppingCart.hasMany(db.ShoppingCartProduct);
    ShoppingCart.belongsToMany(db.Product, { through: db.ShoppingCartProduct });
  };

  return ShoppingCart;
};

export default ShoppingCartFactory;
