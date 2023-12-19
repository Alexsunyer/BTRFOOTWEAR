import Sequelize, { Model, BuildOptions } from "sequelize";
import { DbInterface } from "../..";

/*
 *
 * Typescript Models
 *
 */

export interface OrderModelAdd {
  id?: number;
  UserId?: number;
}

export interface OrderModelType {
  id: number;
  UserId: number;
}

/*
 *
 * Typescript Properties
 *
 */

export type OrderModel = OrderModelType & Sequelize.Model & {};

export type OrderModelStatic = typeof Model & {
  new (values?: object, options?: BuildOptions): OrderModel;
} & { associate: any };

/*
 *
 * Database model
 *
 */
const OrderFactory = (sequelize: Sequelize.Sequelize): OrderModelStatic => {
  const Order = <OrderModelStatic>sequelize.define(
    "Order",
    {},
    {
      name: {
        singular: "Order",
        plural: "Orders",
      },
      modelName: "Order",
    }
  );

  /*
   *
   * Relations
   *
   */
  Order.associate = (db: DbInterface) => {
    Order.belongsTo(db.User);
    Order.belongsToMany(db.Product, { through: db.OrderProduct });
  };

  return Order;
};

export default OrderFactory;
