import db from "../src/database";
import { createCategory } from "../src/database/agents/category/CategoryAgent";
import { createProduct } from "../src/database/agents/product/productAgent";
import { createDeliveryMethod } from "../src/database/agents/deliveryMethod/DeliveryMethodAgent";
import products from "../src/data/products.json";
import categories from "../src/data/categories.json";

for (const item of categories) {
  test("Creating category", async () => {
    let category = await createCategory({
      name: item,
    });
    expect(category instanceof db.Category).toBe(true);
  });
}

let indexImg = 1;
for (const item of products) {
  test("Creating product", async () => {
    let product = await createProduct({
      name: item.name,
      description: item.description,
      url: `/api/public/ProductImg${indexImg++}.jpg`,
      price: item.price,
      CategoryId: item.category,
    });
    expect(product instanceof db.Product).toBe(true);
  });
}

test("Creating delivery method", async () => {
  let deliveryMethod = await createDeliveryMethod({
    name: "Seur",
    price: 100,
  });
  expect(deliveryMethod instanceof db.DeliveryMethod).toBe(true);
});

test("Creating delivery method", async () => {
  let deliveryMethod = await createDeliveryMethod({
    name: "GLS",
    price: 120,
  });
  expect(deliveryMethod instanceof db.DeliveryMethod).toBe(true);
});

// test("Creating user", async () => {
//   let user = await createUser({
//     email: "alex@mail.com",
//     password: "12345",
//     token: "2gfqwsdf903na931",
//     address_1: "calle torreblanca 12,",
//     postal_code: "08970",
//     phone: "677754609",
//   });
//   expect(user instanceof db.User).toBe(true);
// });

// test("Creating shoppingCart", async () => {
//   let shoppingCart = await createShoppingCart({
//     UserId: 1,
//   });
//   expect(shoppingCart instanceof db.ShoppingCart).toBe(true);
// });

// test("Creating shoppingCartProduct", async () => {
//   let shoppingCartProduct = await createShoppingCartProduct({
//     ShoppingCartId: 1,
//     ProductId: 1,
//     price: 10,
//   });
//   expect(shoppingCartProduct instanceof db.ShoppingCartProduct).toBe(true);
// });
