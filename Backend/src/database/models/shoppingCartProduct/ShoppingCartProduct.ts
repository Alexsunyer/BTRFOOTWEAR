import Sequelize, { Model, BuildOptions } from "sequelize";
import { DbInterface } from "../..";

/*
 *
 * Typescript Models
 * Es para el programador
 *
 */

export interface ShoppingCartProductModelAdd {
  ShoppingCartId?: number;
  ProductId?: number;
  quantity?: number;
  price?: number;
}

export interface ShoppingCartProductModelType {
  ShoppingCartId: number;
  ProductId: number;
  quantity: number;
  price: number;
}

/*
 *
 * Typescript Properties
 * Realmente lo que importa
 *
 */

export type ShoppingCartProductModel = ShoppingCartProductModelType &
  Sequelize.Model & {};

export type ShoppingCartProductModelStatic = typeof Model & {
  new (values?: object, options?: BuildOptions): ShoppingCartProductModel;
} & { associate: any };

/*
 *
 * Database model
 *
 */
const ShoppingCartProductFactory = (
  sequelize: Sequelize.Sequelize
): ShoppingCartProductModelStatic => {
  const ShoppingCartProduct = <ShoppingCartProductModelStatic>sequelize.define(
    "ShoppingCartProduct",
    {
      quantity: {
        type: Sequelize.INTEGER,
        defaultValue: 1,
        allowNull: false,
      },
      price: {
        type: Sequelize.DECIMAL,
        allowNull: false,
      },
    },
    {
      name: {
        singular: "ShoppingCartProduct",
        plural: "ShoppingCartProducts",
      },
      modelName: "ShoppingCartProduct",
    }
  );

  /*
   *
   * Relations
   *
   */
  ShoppingCartProduct.associate = (db: DbInterface) => {
    ShoppingCartProduct.belongsTo(db.ShoppingCart);
    ShoppingCartProduct.belongsTo(db.Product);
  };

  return ShoppingCartProduct;
};

export default ShoppingCartProductFactory;
