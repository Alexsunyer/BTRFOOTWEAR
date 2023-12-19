import { updateCategory } from "../src/database/agents/category/CategoryAgent";
import { updateDeliveryMethod } from "../src/database/agents/deliveryMethod/DeliveryMethodAgent";
import { updateProduct } from "../src/database/agents/product/productAgent";
import { updateShoppingCartProduct } from "../src/database/agents/shoppingCartProduct/ShoppingCartProductAgent";
import { updateUser } from "../src/database/agents/user/userAgent";

test("Update user instance", async () => {
  let user = await updateUser({
    id: 1,
    email: "nuevoemail@mail.com",
  });
  expect(user).toBe(true);
});

test("Update category instance", async () => {
  let category = await updateCategory({
    id: 1,
    name: "NewName",
  });
  expect(category).toBe(true);
});

test("Update product instance", async () => {
  let product = await updateProduct({
    id: 1,
    name: "NewName",
  });
  expect(product).toBe(true);
});

test("Update shoppingCart instance", async () => {
  let shoppingCart = await updateShoppingCartProduct({
    ProductId: 1,
    ShoppingCartId: 1,
    quantity: 2,
  });
  expect(shoppingCart).toBe(true);
});

test("Update delivery method instance", async () => {
  let deliveryMethod = await updateDeliveryMethod({
    id: 1,
    name: "NewDeliveryMethod",
  });
  expect(deliveryMethod).toBe(true);
});
