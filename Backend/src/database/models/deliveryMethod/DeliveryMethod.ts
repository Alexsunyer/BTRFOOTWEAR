import Sequelize, { Model, BuildOptions } from "sequelize";

/*
 *
 * Typescript Models
 *
 */

export interface DeliveryMethodModelAdd {
  id?: number;
  name?: string;
  price?: number;
}

export interface DeliveryMethodModelType {
  id: number;
  name: string;
  price: number;
}

/*
 *
 * Typescript Properties
 *
 */

export type DeliveryMethodModel = DeliveryMethodModelType &
  Sequelize.Model & {};

export type DeliveryMethodModelStatic = typeof Model & {
  new (values?: object, options?: BuildOptions): DeliveryMethodModel;
} & { associate: any };

/*
 *
 * Database model
 *
 */
const DeliveryMethodFactory = (
  sequelize: Sequelize.Sequelize
): DeliveryMethodModelStatic => {
  const DeliveryMethod = <DeliveryMethodModelStatic>sequelize.define(
    "DeliveryMethod",
    {
      name: {
        type: Sequelize.STRING(255),
        allowNull: false,
      },

      price: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
    },
    {
      name: {
        singular: "DeliveryMethod",
        plural: "DeliveryMethods",
      },
      modelName: "DeliveryMethod",
    }
  );

  /*
   *
   * Relations
   *
   */
  DeliveryMethod.associate = () => {};

  return DeliveryMethod;
};

export default DeliveryMethodFactory;
