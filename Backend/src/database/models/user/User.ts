import Sequelize, { Model, BuildOptions } from "sequelize";
import { DbInterface } from "../..";

/*
 *
 * Typescript Models
 *
 */

export interface UserModelAdd {
  id?: number;
  username?: string;
  email?: string;
  password?: string;
  token?: string;
  address_1?: string;
  address_2?: string;
  city?: string;
  country?: string;
  state?: string;
  postal_code?: string;
  phone?: string;
}

export interface UserModelType {
  id: number;
  username: string;
  email: string;
  password: string;
  token: string;
  address_1?: string;
  address_2?: string;
  city?: string;
  country?: string;
  state?: string;
  postal_code?: string;
  phone?: string;
}

/*
 *
 * Typescript Properties
 *
 */

export type UserModel = UserModelType & Sequelize.Model & {};

export type UserModelStatic = typeof Model & {
  new (values?: object, options?: BuildOptions): UserModel;
} & { associate: any };

/*
 *
 * Database model
 *
 */
const UserFactory = (sequelize: Sequelize.Sequelize): UserModelStatic => {
  const User = <UserModelStatic>sequelize.define(
    "User",
    {
      username: {
        type: Sequelize.STRING(255),
        allowNull: false,
      },
      email: {
        type: Sequelize.STRING(255),
        allowNull: false,
      },
      password: {
        type: Sequelize.STRING(20),
        allowNull: false,
      },
      token: {
        type: Sequelize.STRING(255),
        allowNull: false,
      },
      address_1: {
        type: Sequelize.STRING(255),
      },
      address_2: {
        type: Sequelize.STRING(255),
      },
      city: {
        type: Sequelize.STRING(255),
      },
      country: {
        type: Sequelize.STRING(255),
      },
      state: {
        type: Sequelize.STRING(255),
      },
      postal_code: {
        type: Sequelize.STRING(5),
      },
      phone: {
        type: Sequelize.STRING(30),
      },
    },
    {
      name: {
        singular: "User",
        plural: "Users",
      },
      modelName: "User",
    }
  );

  /*
   *
   * Relations
   *
   */
  User.associate = (db: DbInterface) => {
    User.hasMany(db.ShoppingCart);
  };

  return User;
};

export default UserFactory;
