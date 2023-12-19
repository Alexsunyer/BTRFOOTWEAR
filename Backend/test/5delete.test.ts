import { deleteCategory } from "../src/database/agents/category/CategoryAgent";
import { deleteDeliveryMethod } from "../src/database/agents/deliveryMethod/DeliveryMethodAgent";
import { deleteExample } from "../src/database/agents/example/ExampleAgent";
import { deleteProduct } from "../src/database/agents/product/productAgent";
import { deleteShoppingCart } from "../src/database/agents/shoppingCart/ShoppingCartAgent";
import { deleteShoppingCartProduct } from "../src/database/agents/shoppingCartProduct/ShoppingCartProductAgent";
import { deleteUser } from "../src/database/agents/user/userAgent";

test("Delete example", async () => {
  let res = await deleteExample(1);
  expect(res).toBe(true);
});

test("Delete shoppingCartProduct", async () => {
  let res = await deleteShoppingCartProduct(1, 1);
  expect(res).toBe(true);
});

test("Delete shoppingCart", async () => {
  let res = await deleteShoppingCart(1);
  expect(res).toBe(true);
});

test("Delete product", async () => {
  let res = await deleteProduct(1);
  expect(res).toBe(true);
});

test("Delete user", async () => {
  let res = await deleteUser(1);
  expect(res).toBe(true);
});

test("Delete category", async () => {
  let res = await deleteCategory(1);
  expect(res).toBe(true);
});

test("Delete delivery method", async () => {
  let res = await deleteDeliveryMethod(1);
  expect(res).toBe(true);
});
