import { Product } from "./shoppingCart";

export interface Order {
  price: number;
  DeliveryMethod?: OrderDeliveryMethod;
  DeliveryTo: OrderDeliveryTo;
  OrderProducts: OrderProduct[];
  PaymentDetails: OrderPaymentDetails;
}

export interface OrderProduct {
  ProductId: number;
  quantity?: number;
  price: number;
  Product: Product;
}

export interface OrderDeliveryTo {
  address_1?: string;
  address_2?: string;
  country?: string;
  state?: string;
  city?: string;
  postal_code?: string;
  phone?: string;
}

export interface OrderDeliveryMethod {
  price?: number;
  name?: string;
}

export interface OrderBillingAddress {
  address_1?: string;
  address_2?: string;
  country?: string;
  state?: string;
  city?: string;
  postal_code?: string;
}

export interface OrderPaymentMethod {
  credit_card?: OrderCreditCardInfo;
  paypal?: boolean;
}

export interface OrderCreditCardInfo {
  card_number?: string;
  card_name?: string;
  expiration_date?: string;
  security_code?: string;
}

export interface OrderPaymentTypes {
  payment?: "Credit card" | "PayPal";
  billingAddress?: "Shipping address" | "New billing address";
}

export interface OrderPaymentDetails {
  PaymentTypes?: OrderPaymentTypes;
  PaymentMethod?: OrderPaymentMethod;
  BillingAddress?: OrderBillingAddress;
}

export interface OrderActionChange {
  type: "ORDER_CHANGE";
  payload: Order;
}

export interface OrderActionChangeDeliveryTo {
  type: "ORDER_CHANGE_DELIVERYTO";
  payload: OrderDeliveryTo;
}

export interface OrderActionChangeDeliveryMethod {
  type: "ORDER_CHANGE_DELIVERYMETHOD";
  payload: OrderDeliveryMethod;
}

export interface OrderActionChangePaymentDetails {
  type: "ORDER_CHANGE_PAYMENTDETAILS";
  payload: OrderPaymentDetails;
}

export type OrderPayload = Order | null;

export default function order(
  state: OrderPayload = null,
  action:
    | OrderActionChange
    | OrderActionChangeDeliveryTo
    | OrderActionChangeDeliveryMethod
    | OrderActionChangePaymentDetails
): Order | null {
  switch (action.type) {
    case "ORDER_CHANGE":
      return (state = action.payload);
    case "ORDER_CHANGE_DELIVERYTO":
      if (!state) {
        return null;
      }
      return { ...state, DeliveryTo: action.payload };
    case "ORDER_CHANGE_DELIVERYMETHOD":
      if (!state) {
        return null;
      }
      return { ...state, DeliveryMethod: action.payload };
    case "ORDER_CHANGE_PAYMENTDETAILS":
      if (!state) {
        return null;
      }
      return { ...state, PaymentDetails: action.payload };
    default:
      return state;
  }
}
