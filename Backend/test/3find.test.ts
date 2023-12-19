import db from "../src/database";
import {
  getAllCategories,
  getCategoryInstance,
} from "../src/database/agents/category/CategoryAgent";
import {
  getAllDeliveryMethods,
  getDeliveryMethodInstance,
} from "../src/database/agents/deliveryMethod/DeliveryMethodAgent";
import {
  getAllExamples,
  getExampleInstance,
} from "../src/database/agents/example/ExampleAgent";
import {
  getAllProducts,
  getProductInstance,
} from "../src/database/agents/product/productAgent";
import {
  getAllShoppingCarts,
  getShoppingCartInstance,
} from "../src/database/agents/shoppingCart/ShoppingCartAgent";
import {
  getAllUsers,
  getUserInstance,
} from "../src/database/agents/user/userAgent";

test("Get example instance", async () => {
  let example = await getExampleInstance(1);
  expect(example instanceof db.Example).toBe(true);
});
test("Finding all examples", async () => {
  let examples = await getAllExamples({
    where: {
      id: 1,
    },
  });
  expect(examples).toHaveLength(1);
  let res = false;
  if (examples) {
    res = examples[0] instanceof db.Example;
  }
  expect(res).toBe(true);
});

test("Get category instance", async () => {
  let category = await getCategoryInstance(1);
  expect(category instanceof db.Category).toBe(true);
});
test("Finding all categories", async () => {
  let categories = await getAllCategories({
    where: {
      id: 1,
    },
  });
  expect(categories).toHaveLength(1);
  let res = false;
  if (categories) {
    res = categories[0] instanceof db.Category;
  }
  expect(res).toBe(true);
});

test("Get product instance", async () => {
  let product = await getProductInstance(1);
  expect(product instanceof db.Product).toBe(true);
});
test("Finding all products", async () => {
  let products = await getAllProducts({
    where: {
      id: 1,
    },
  });
  expect(products).toHaveLength(1);
  let res = false;
  if (products) {
    res = products[0] instanceof db.Product;
  }
  expect(res).toBe(true);
});

test("Get user instance", async () => {
  let user = await getUserInstance(1);
  expect(user instanceof db.User).toBe(true);
});
test("Finding all users", async () => {
  let users = await getAllUsers({
    where: {
      id: 1,
    },
  });
  expect(users).toHaveLength(1);
  let res = false;
  if (users) {
    res = users[0] instanceof db.User;
  }
  expect(res).toBe(true);
});

test("Get shoppingCart instance", async () => {
  let shoppingCart = await getShoppingCartInstance(1);
  expect(shoppingCart instanceof db.ShoppingCart).toBe(true);
});
test("Finding all shoppingCarts", async () => {
  let shoppingCarts = await getAllShoppingCarts({
    where: {
      id: 1,
    },
  });
  expect(shoppingCarts).toHaveLength(1);
  let res = false;
  if (shoppingCarts) {
    res = shoppingCarts[0] instanceof db.ShoppingCart;
  }
  expect(res).toBe(true);
});

test("Get delivery method instance", async () => {
  let deliveryMethod = await getDeliveryMethodInstance(1);
  expect(deliveryMethod instanceof db.DeliveryMethod).toBe(true);
});

test("Finding all delivery methods", async () => {
  let deliveryMethod = await getAllDeliveryMethods({
    where: {
      id: 1,
    },
  });
  expect(deliveryMethod).toHaveLength(1);
  let res = false;
  if (deliveryMethod) {
    res = deliveryMethod[0] instanceof db.DeliveryMethod;
  }
  expect(res).toBe(true);
});
