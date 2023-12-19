import { Sequelize } from "sequelize";
import ExampleFactory, { ExampleModelStatic } from "./models/example/Example";
import CategoryFactory, {
  CategoryModelStatic,
} from "./models/category/Category";
import ProductFactory, { ProductModelStatic } from "./models/product/Product";
import UserFactory, { UserModelStatic } from "./models/user/User";
import ShoppingCartFactory, {
  ShoppingCartModelStatic,
} from "./models/shoppingCart/ShoppingCart";
import ShoppingCartProductFactory, {
  ShoppingCartProductModelStatic,
} from "./models/shoppingCartProduct/ShoppingCartProduct";
import DeliveryMethodFactory, {
  DeliveryMethodModelStatic,
} from "./models/deliveryMethod/DeliveryMethod";
import OrderFactory, { OrderModelStatic } from "./models/order/Order";
import OrderProductFactory, {
  OrderProductModelStatic,
} from "./models/orderProduct/OrderProduct";

require("dotenv").config();
export interface DbInterface {
  sequelize: Sequelize;
  Example: ExampleModelStatic;
  Category: CategoryModelStatic;
  Product: ProductModelStatic;
  User: UserModelStatic;
  ShoppingCart: ShoppingCartModelStatic;
  ShoppingCartProduct: ShoppingCartProductModelStatic;
  DeliveryMethod: DeliveryMethodModelStatic;
  Order: OrderModelStatic;
  OrderProduct: OrderProductModelStatic;
}
const getInstance = (): DbInterface => {
  let sequelize: Sequelize;
  const isTest = process.env.IS_TEST;
  if (isTest) {
    const DB_USER = process.env.DB_USER || "postgres";
    const DB_PASS = process.env.POSTGRES_PASSWORD || "";
    const DB_HOST = process.env.DB_HOST || "postgres:5432";
    const DB_DB = process.env.POSTGRES_DATABASE || "postgres";
    const DB_URL = `postgres://${DB_USER}:${DB_PASS}@${DB_HOST}/${DB_DB}`;
    sequelize = new Sequelize(DB_URL);
  } else {
    const databaseConfig = {
      username: process.env.POSTGRES_USER || "postgres",
      password: process.env.POSTGRES_PASSWORD
        ? process.env.POSTGRES_PASSWORD
        : "",
      database: process.env.POSTGRES_DATABASE || "postgres",
      host: process.env.POSTGRES_HOST || "127.0.0.1",
      dialect: "postgres",
    };
    sequelize = new Sequelize(
      databaseConfig.database,
      databaseConfig.username,
      databaseConfig.password,
      {
        dialect: "postgres",
        host: databaseConfig.host,
      }
    );
  }
  let mydb = {
    sequelize: sequelize,
    Example: ExampleFactory(sequelize),
    Category: CategoryFactory(sequelize),
    Product: ProductFactory(sequelize),
    User: UserFactory(sequelize),
    ShoppingCart: ShoppingCartFactory(sequelize),
    ShoppingCartProduct: ShoppingCartProductFactory(sequelize),
    DeliveryMethod: DeliveryMethodFactory(sequelize),
    Order: OrderFactory(sequelize),
    OrderProduct: OrderProductFactory(sequelize),
  };
  let model: keyof DbInterface;
  for (model in mydb) {
    let sub: any = mydb[model];
    if (sub.associate) {
      sub.associate(mydb);
    }
  }
  return mydb;
};
const db = getInstance();

export const checkConection = async () => {
  try {
    await db.sequelize.authenticate();
    return true;
  } catch (err: Error | any) {
    return false;
  }
};
export default db;
