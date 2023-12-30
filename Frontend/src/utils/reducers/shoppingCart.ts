export interface ShoppingCart {
  UserId?: number;
  price: number;
  id: number;
  ShoppingCartProducts: ShoppingCartProduct[];
}
export interface ShoppingCartProduct {
  ProductId: number;
  ShoppingCartId?: number;
  quantity?: number;
  price: number;
  Product: Product;
}

export interface Product {
  id: number;
  name: string;
  description?: string;
  url: string;
  price: number;
  CategoryId?: number;
}

export interface ShoppingCartAction {
  type: "SHOPPINGCART_ADDTOCART" | "SHOPPINGCART_DELETEFROMCART";
  payload: {
    ProductId: number;
    price: number;
    Product: Product;
    quantity: number;
  };
}

export interface ShoppingCartActionChange {
  type: "SHOPPINGCART_CHANGECART";
  payload: ShoppingCart;
}
export interface ShoppingCartDeleteProductsAction {
  type: "SHOPPINGCART_DELETEPRODUCTS";
  payload: ShoppingCart;
}

export type ShoppingCartPayload = ShoppingCart | null;

export default function shoppingCart(
  state: ShoppingCartPayload = null,
  action:
    | ShoppingCartAction
    | ShoppingCartActionChange
    | ShoppingCartDeleteProductsAction
): ShoppingCart | null {
  switch (action.type) {
    case "SHOPPINGCART_ADDTOCART":
      if (!state) {
        return state;
      }
      const existingProductIndex = state.ShoppingCartProducts.findIndex(
        (product) => product.ProductId === action.payload.ProductId
      );

      if (existingProductIndex !== -1) {
        const updatedProducts = [...state.ShoppingCartProducts];
        const existingProduct = updatedProducts[existingProductIndex];

        if (existingProduct.quantity) {
          updatedProducts[existingProductIndex] = {
            ...existingProduct,
            quantity: existingProduct.quantity + action.payload.quantity,
          };
        }

        return {
          ...state,
          price:
            parseFloat(String(state.price)) +
            parseFloat(String(action.payload.price)),
          ShoppingCartProducts: updatedProducts,
        };
      } else {
        return {
          ...state,
          price:
            parseFloat(String(state.price)) +
            parseFloat(String(action.payload.price)),
          ShoppingCartProducts: [
            ...state.ShoppingCartProducts,
            {
              ProductId: action.payload.ProductId,
              ShoppingCartId: state.id,
              price: action.payload.price,
              quantity: action.payload.quantity,
              Product: action.payload.Product,
            },
          ],
        };
      }
    case "SHOPPINGCART_DELETEFROMCART":
      if (!state) {
        return state;
      }
      const existingProductIndex2 = state.ShoppingCartProducts.findIndex(
        (product) => product.ProductId === action.payload.ProductId
      );

      let minusPrice = 0;
      if (existingProductIndex2 !== -1) {
        const updatedProducts = [...state.ShoppingCartProducts];
        const existingProduct = updatedProducts[existingProductIndex2];
        minusPrice = parseFloat(String(existingProduct.Product.price));
        if (existingProduct.quantity && existingProduct.quantity > 1) {
          updatedProducts[existingProductIndex2] = {
            ...existingProduct,
            quantity: existingProduct.quantity - 1,
            price: minusPrice * (existingProduct.quantity - 1),
          };
        } else {
          updatedProducts.splice(existingProductIndex2, 1);
        }

        return {
          ...state,
          price: parseFloat(String(state.price)) - minusPrice,
          ShoppingCartProducts: updatedProducts,
        };
      } else {
        return state;
      }
    case "SHOPPINGCART_CHANGECART":
      return (state = action.payload);
    case "SHOPPINGCART_DELETEPRODUCTS":
      if (!state) {
        return state;
      }
      return { ...state, price: 0, ShoppingCartProducts: [] };
    default:
      return state;
  }
}
