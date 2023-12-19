import { ConnectedProps, connect } from "react-redux";
import { AllReduxPayloads } from "../../utils/reducers";
import { changeOrderByShoppingCart } from "../../utils/reducers/reduxDispatch";
import { useEffect, useState } from "react";
import "./orderPage.sass";
import { Link } from "react-router-dom";
import Step1Connect from "./Step1";
import Step2Connect from "./Step2";
import Step3Connect from "./Step3";
import Step4Connect from "./Step4";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome } from "@fortawesome/free-solid-svg-icons";
import { ShoppingCartProduct } from "../../utils/reducers/shoppingCart";

interface OrderPageProps extends ReduxOrder {}

const OrderPage: React.FC<OrderPageProps> = ({ order }) => {
  useOrderPageLogic();
  return (
    <div className="order-page">
      <button className="home-button">
        <Link to="/">
          <FontAwesomeIcon icon={faHome} />
        </Link>
      </button>
      <OrderSteps />
      <OrderRightWindow order={order} />
    </div>
  );
};

const useOrderPageLogic = () => {
  useEffect(() => {
    changeOrderByShoppingCart();
  }, []);

  return {};
};

const OrderSteps = () => {
  const { step, setStep } = useOrderStepsLogic();
  let renderThis: JSX.Element | null = null;
  if (step === 1) {
    renderThis = <Step1Connect setStep={setStep} />;
  }
  if (step === 2) {
    renderThis = <Step2Connect setStep={setStep} />;
  }
  if (step === 3) {
    renderThis = <Step3Connect setStep={setStep} />;
  }
  if (step === 4) {
    renderThis = <Step4Connect />;
  }
  return <div className="order-steps">{renderThis}</div>;
};

const useOrderStepsLogic = () => {
  const [step, setStep] = useState<number>(1);
  return { step, setStep };
};

interface OrderRightWindowProps extends ReduxOrder {}

const OrderRightWindow: React.FC<OrderRightWindowProps> = ({ order }) => {
  const renderThis: JSX.Element[] = [];
  const deliveryTo = order?.DeliveryTo;
  const orderProducts = order?.OrderProducts;
  const deliveryMethod = order?.DeliveryMethod;
  const paymentTypes = order?.PaymentDetails?.PaymentTypes;
  const billingAddress = order?.PaymentDetails?.BillingAddress;
  const orderProductQuantity: number[] = [];
  if (orderProducts) {
    for (const product of orderProducts) {
      if (product.quantity) {
        orderProductQuantity.push(product.quantity);
      }
      renderThis.push(
        <IndividualOrderProduct
          key={product.ProductId}
          product={{ ...product }}
        />
      );
    }
  }
  let totalProductQuantity = orderProductQuantity.reduce((a, b) => a + b, 0);
  return (
    <div className="order-page-right">
      <div className="order-right-window">
        <div className="number-items-and-price">
          {totalProductQuantity > 1 ? (
            <h2>
              <span>{totalProductQuantity}</span> items
            </h2>
          ) : (
            <h2>
              <span>{totalProductQuantity}</span> item
            </h2>
          )}
          <span>{order?.price}€</span>
        </div>
        <ul className="order-products">{renderThis}</ul>
        {deliveryTo &&
        Object.values(deliveryTo).some((value) => value !== "") ? (
          <div>
            <h3>Sending to:</h3>
            <p className="order-info">
              {deliveryTo?.address_1}, {deliveryTo?.address_2},{" "}
              {deliveryTo?.city}, {deliveryTo?.state}, {deliveryTo?.country},{" "}
              {deliveryTo?.postal_code}, {deliveryTo?.phone}
            </p>
          </div>
        ) : null}
        {deliveryMethod ? (
          <div>
            <h3>Shipping:</h3>
            <p className="order-info">
              {deliveryMethod?.name} -{" "}
              <span className="font-bold">{deliveryMethod?.price}</span>
            </p>
          </div>
        ) : null}
        {paymentTypes &&
        Object.values(paymentTypes).some((value) => value !== "") ? (
          <div>
            <h3>Payment:</h3>
            <p className="order-info">{paymentTypes.payment}</p>
          </div>
        ) : null}
        {billingAddress &&
        Object.values(billingAddress).some((value) => value !== "") ? (
          <div>
            <h3>Billing address:</h3>
            <p className="order-info">
              {billingAddress?.address_1}, {billingAddress?.address_2},{" "}
              {billingAddress?.city}, {billingAddress?.state},{" "}
              {billingAddress?.country}, {billingAddress?.postal_code},{" "}
            </p>{" "}
          </div>
        ) : (
          paymentTypes?.billingAddress === "Shipping address" &&
          (deliveryTo &&
          Object.values(deliveryTo).some((value) => value !== "") ? (
            <div>
              <h3>Billing address:</h3>
              <p className="order-info">
                {deliveryTo?.address_1}, {deliveryTo?.address_2},{" "}
                {deliveryTo?.city}, {deliveryTo?.state}, {deliveryTo?.country},{" "}
                {deliveryTo?.postal_code}, {deliveryTo?.phone}
              </p>
            </div>
          ) : null)
        )}

        <h2>
          Total order price:{" "}
          {order?.price && deliveryMethod?.price ? (
            <span>
              {Math.round((order?.price + deliveryMethod?.price) * 100) / 100}€
            </span>
          ) : order?.price ? (
            <span>{Math.round(order?.price * 100) / 100}€</span>
          ) : null}
        </h2>
      </div>
    </div>
  );
};

interface IndividualOrderProductProps {
  product: ShoppingCartProduct;
}

export const IndividualOrderProduct: React.FC<IndividualOrderProductProps> = ({
  product,
}) => {
  const productInfo = product.Product;
  return (
    <li className="individual-order-product">
      <span className="SP-product-quantity">{product.quantity}</span>
      <Link to={"/product/" + productInfo.id}>
        <img src={productInfo.url} alt={productInfo.name} />
      </Link>
      <div>
        <Link to={"/product/" + productInfo.id}>
          <h2>{productInfo.name}</h2>
        </Link>
        <span>{Math.round(product.price * 100) / 100}€</span>
      </div>
    </li>
  );
};

const orderDispatch = {};

const mapOrderConnector = (state: AllReduxPayloads) => ({ order: state.order });
const orderConnect = connect(mapOrderConnector, orderDispatch);
export type ReduxOrder = ConnectedProps<typeof orderConnect>;

const OrderpageConnect = orderConnect(OrderPage);

export default OrderpageConnect;
