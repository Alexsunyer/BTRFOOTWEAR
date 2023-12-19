import store from ".";
import { getDataApiJSON } from "../globals/petitions";
import {
  Order,
  OrderActionChange,
  OrderActionChangeDeliveryMethod,
  OrderActionChangeDeliveryTo,
  OrderActionChangePaymentDetails,
  OrderDeliveryMethod,
  OrderDeliveryTo,
  OrderPaymentDetails,
} from "./order";
import {
  ShoppingCart,
  ShoppingCartAction,
  ShoppingCartActionChange,
  ShoppingCartDeleteProductsAction,
} from "./shoppingCart";
import { User, UserActionChange } from "./user";

export const changeUser = async (params: User) => {
  const mydispatch: UserActionChange = {
    type: "USER_CHANGEUSER",
    payload: params,
  };
  await store.dispatch(mydispatch);
};

export const changeCart = async (params: ShoppingCart) => {
  const mydispatch: ShoppingCartActionChange = {
    type: "SHOPPINGCART_CHANGECART",
    payload: params,
  };
  await store.dispatch(mydispatch);
};

export const addToCart = async (payload: ShoppingCartAction["payload"]) => {
  const mydispatch: ShoppingCartAction = {
    type: "SHOPPINGCART_ADDTOCART",
    payload,
  };
  const shoppingCart = store.getState().shoppingCart;
  if (shoppingCart) {
    const existingProductIndex = shoppingCart.ShoppingCartProducts.findIndex(
      (product) => product.ProductId === payload.ProductId
    );
    if (existingProductIndex !== -1) {
      const existingProduct =
        shoppingCart.ShoppingCartProducts[existingProductIndex];
      if (existingProduct.quantity) {
        await getDataApiJSON(
          "/api/shoppingCartProduct/updateShoppingCartProduct",
          {
            ShoppingCartId: shoppingCart.id,
            ProductId: payload.ProductId,
            price: payload.price,
            quantity: payload.quantity + existingProduct.quantity,
          }
        );
      }
      await store.dispatch(mydispatch);
    } else {
      await getDataApiJSON(
        "/api/shoppingCartProduct/createShoppingCartProduct",
        {
          ShoppingCartId: shoppingCart.id,
          ProductId: payload.ProductId,
          price: payload.price,
          quantity: payload.quantity,
        }
      );
      await store.dispatch(mydispatch);
    }
  }
};

export const deleteFromCart = async (
  payload: ShoppingCartAction["payload"]
) => {
  const mydispatch: ShoppingCartAction = {
    type: "SHOPPINGCART_DELETEFROMCART",
    payload,
  };
  const shoppingCart = store.getState().shoppingCart;
  if (shoppingCart) {
    const existingProductIndex = shoppingCart.ShoppingCartProducts.findIndex(
      (product) => product.ProductId === payload.ProductId
    );

    if (existingProductIndex !== -1) {
      await getDataApiJSON(
        "/api/shoppingCartProduct/deleteShoppingCartProduct",
        {
          ProductId: payload.ProductId,
          ShoppingCartId: shoppingCart.id,
        }
      );
    } else {
      const existingProduct =
        shoppingCart.ShoppingCartProducts[existingProductIndex];
      if (existingProduct.quantity) {
        await getDataApiJSON(
          "/api/shoppingCartProduct/updateShoppingCartProduct",
          {
            ShoppingCartId: shoppingCart.id,
            ProductId: payload.ProductId,
            price: payload.price,
            quantity: payload.quantity - existingProduct.quantity,
          }
        );
      }
    }
    await store.dispatch(mydispatch);
  }
};

export const deleteShoppingCartProducts = async (params: ShoppingCart) => {
  const mydispatch: ShoppingCartDeleteProductsAction = {
    type: "SHOPPINGCART_DELETEPRODUCTS",
    payload: params,
  };
  await store.dispatch(mydispatch);
};

export const changeOrderByShoppingCart = async () => {
  const shoppingCart = store.getState().shoppingCart;
  if (shoppingCart) {
    const order: Order = {
      price: shoppingCart.price,
      DeliveryTo: {},
      OrderProducts: shoppingCart?.ShoppingCartProducts,
      PaymentDetails: {},
    };
    const mydispatch: OrderActionChange = {
      type: "ORDER_CHANGE",
      payload: order,
    };
    await store.dispatch(mydispatch);
  }
};
export const changeOrder = async (params: Order) => {
  const mydispatch: OrderActionChange = {
    type: "ORDER_CHANGE",
    payload: params,
  };
  await store.dispatch(mydispatch);
};

export const changeOrderDeliveryTo = async (params: OrderDeliveryTo) => {
  const mydispatch: OrderActionChangeDeliveryTo = {
    type: "ORDER_CHANGE_DELIVERYTO",
    payload: params,
  };
  await store.dispatch(mydispatch);
};

export const changeOrderDeliveryMethod = async (
  params: OrderDeliveryMethod
) => {
  const mydispatch: OrderActionChangeDeliveryMethod = {
    type: "ORDER_CHANGE_DELIVERYMETHOD",
    payload: params,
  };
  await store.dispatch(mydispatch);
};

export const changeOrderPaymentDetails = async (
  params: OrderPaymentDetails
) => {
  const mydispatch: OrderActionChangePaymentDetails = {
    type: "ORDER_CHANGE_PAYMENTDETAILS",
    payload: params,
  };
  await store.dispatch(mydispatch);
};
