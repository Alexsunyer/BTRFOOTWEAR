import { FindOptions } from "sequelize";
import db from "../..";
import reportError from "../../../utils/reportError";
import { UserModel, UserModelAdd } from "../../models/user/User";

export const createUser = async (
  params: UserModelAdd
): Promise<UserModel | false> => {
  try {
    return await db.User.create({
      ...params,
      token: "jksdhfuh9736961",
    });
  } catch (err: Error | any) {
    return reportError(err, "createUser- UserAgent");
  }
};

export const getUserInstance = async (
  id: number
): Promise<UserModel | false | null> => {
  try {
    let result = await db.User.findByPk(id);
    return result;
  } catch (err: Error | any) {
    return reportError(err, "getUserInstance- UserAgent");
  }
};
export const getUserInstanceLogin = async (
  email: string,
  password: string
): Promise<UserModel | false | null> => {
  try {
    let result = await db.User.findOne({
      where: {
        email,
        password,
      },
    });
    return result;
  } catch (err: Error | any) {
    return reportError(err, "getUserInstance- UserAgent");
  }
};
export const updateUser = async (params: UserModelAdd): Promise<boolean> => {
  try {
    if (params.id) {
      let User = await db.User.update(
        {
          ...params,
        },
        {
          where: {
            id: params.id,
          },
        }
      );
      if (User[0] > 0) {
        return true;
      }
    }
    return false;
  } catch (err: Error | any) {
    return reportError(err, "updateUser- UserAgent");
  }
};

export const getAllUsers = async (
  params: FindOptions
): Promise<UserModel[] | false> => {
  try {
    return await db.User.findAll({
      ...params,
    });
  } catch (err: Error | any) {
    return reportError(err, "getAllUsers- UserAgent");
  }
};

export const deleteUser = async (id: number): Promise<boolean> => {
  try {
    let User = await getUserInstance(id);
    if (User) {
      await User.destroy();
      return true;
    }
    return false;
  } catch (err: Error | any) {
    return reportError(err, "deleteUser- UserAgent");
  }
};
