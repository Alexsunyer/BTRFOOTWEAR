import Sequelize, { Model, BuildOptions } from "sequelize";
import { DbInterface } from "../..";

/*
 *
 * Typescript Models
 *
 */

export interface OrderProductModelAdd {
  id?: number;
  unitPrice?: number;
  quantity?: number;
  totalRowPrice?: number;
  OrderId?: number;
  ProductId?: number;
}

export interface OrderProductModelType {
  id: number;
  unitPrice: number;
  quantity: number;
  totalRowPrice: number;
  OrderId: number;
  ProductId: number;
}

/*
 *
 * Typescript Properties
 *
 */

export type OrderProductModel = OrderProductModelType & Sequelize.Model & {};

export type OrderProductModelStatic = typeof Model & {
  new (values?: object, options?: BuildOptions): OrderProductModel;
} & { associate: any };

/*
 *
 * Database model
 *
 */
const OrderProductFactory = (
  sequelize: Sequelize.Sequelize
): OrderProductModelStatic => {
  const OrderProduct = <OrderProductModelStatic>sequelize.define(
    "OrderProduct",
    {
      unitPrice: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      quantity: {
        type: Sequelize.INTEGER,
        defaultValue: 1,
      },
      totalRowPrice: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
      },
    },
    {
      name: {
        singular: "OrderProduct",
        plural: "OrderProducts",
      },
      modelName: "OrderProduct",
    }
  );

  /*
   *
   * Relations
   *
   */
  OrderProduct.associate = (db: DbInterface) => {
    OrderProduct.belongsTo(db.Order);
    OrderProduct.belongsTo(db.Product);
  };

  return OrderProduct;
};

export default OrderProductFactory;
