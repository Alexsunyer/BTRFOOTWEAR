import { ConnectedProps, connect } from "react-redux";
import { AllReduxPayloads } from "../../../utils/reducers";
import { useCallback, useState } from "react";
import {
  CitySelect,
  CountrySelect,
  StateSelect,
} from "react-country-state-city";
import "react-country-state-city/dist/react-country-state-city.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faCheck } from "@fortawesome/free-solid-svg-icons";
import {
  OrderPaymentDetails,
  OrderPaymentTypes,
} from "../../../utils/reducers/order";
import {
  changeCart,
  changeOrderPaymentDetails,
} from "../../../utils/reducers/reduxDispatch";
import toast from "react-hot-toast";
import { getDataApiJSON } from "../../../utils/globals/petitions";

interface Step3Props extends Step3LogicProps {}

const Step3: React.FC<Step3Props> = ({ order, setStep }) => {
  const {
    paymentTypes,
    paymentDetails,
    setPaymentDetails,
    countryid,
    setCountryid,
    stateid,
    setstateid,
    previousStep,
    handlePaymentTypesChange,
    handlePaymentDetailsChange,
    nextStep,
  } = useStep3Logic({ order, setStep });
  return (
    <div className="step3">
      <form
        className="user-payment-billingAddress-container"
        onSubmit={(e) => nextStep(e, paymentDetails)}
      >
        <div className="user-payment-container">
          <h1>Payment</h1>
          <p>All transactions are secure and encrypted</p>
          <ul className="user-payment-list">
            <li>
              <label>
                <input
                  name="CreditCard"
                  type="checkbox"
                  checked={paymentTypes.payment === "Credit card"}
                  onChange={handlePaymentTypesChange}
                />
                <p>Credit Card</p>
                <ul className="creditCardsIMG">
                  <img src="/visaCard.png" alt="Visa" />
                  <img src="/masterCardCard.png" alt="MasterCard" />
                  <img src="/discoverCard.png" alt="Discover" />
                  <img src="/americanExpressCard.png" alt="American Express" />
                </ul>
              </label>
              {paymentTypes.payment === "Credit card" ? (
                <div className="credit-card-info">
                  <input
                    type="text"
                    name="card_number"
                    placeholder="Card number"
                    onChange={handlePaymentDetailsChange}
                    required
                  />
                  <input
                    type="text"
                    name="card_name"
                    placeholder="Name on card"
                    onChange={handlePaymentDetailsChange}
                    required
                  />
                  <div>
                    <input
                      type="text"
                      name="expiration_date"
                      placeholder="Expiration date"
                      onChange={handlePaymentDetailsChange}
                      required
                    />
                    <input
                      type="text"
                      name="security_code"
                      placeholder="Security code"
                      onChange={handlePaymentDetailsChange}
                      required
                    />
                  </div>
                </div>
              ) : null}
            </li>
            <li>
              <label>
                <input
                  name="PayPal"
                  type="checkbox"
                  checked={paymentTypes.payment === "PayPal"}
                  onChange={handlePaymentTypesChange}
                />
                <img src="/PayPalLogo.png" alt="PayPal" id="paypalLogo" />
              </label>
            </li>
          </ul>
        </div>
        <div className="user-billing-address-container">
          <h1>Billing address</h1>
          <p>Select the address that matches your card or payment method</p>
          <ul className="user-billing-address-list">
            <li>
              <label>
                <input
                  name="shippingAddress"
                  type="checkbox"
                  checked={paymentTypes.billingAddress === "Shipping address"}
                  onChange={handlePaymentTypesChange}
                />
                Same as shipping address
              </label>
            </li>
            <li>
              <label>
                <input
                  name="differentBillingAddress"
                  type="checkbox"
                  checked={
                    paymentTypes.billingAddress === "New billing address"
                  }
                  onChange={handlePaymentTypesChange}
                />
                Use a different billing address
              </label>
              {paymentTypes.billingAddress === "New billing address" ? (
                <form className="new-billing-address-form">
                  <ul className="new-billing-address-form-list">
                    <li>
                      <input
                        onChange={handlePaymentDetailsChange}
                        type="text"
                        name="address_1"
                        value={paymentDetails.BillingAddress?.address_1}
                        placeholder="First address"
                      />
                    </li>
                    <li>
                      <input
                        onChange={handlePaymentDetailsChange}
                        type="text"
                        name="address_2"
                        value={paymentDetails.BillingAddress?.address_2}
                        placeholder="Second address"
                      />
                    </li>
                    <li>
                      <CountrySelect
                        containerClassName="input-select"
                        onChange={(e: any) => {
                          setCountryid(e.id);
                          setPaymentDetails((prev) => ({
                            ...prev,
                            country: e.name,
                          }));
                        }}
                        placeHolder="Country"
                      />
                    </li>
                    <li>
                      <StateSelect
                        containerClassName="input-select"
                        countryid={countryid}
                        onChange={(e: any) => {
                          setstateid(e.id);
                          setPaymentDetails((prev) => ({
                            ...prev,
                            state: e.name,
                          }));
                        }}
                        placeHolder="State"
                      />
                    </li>
                    <li>
                      <CitySelect
                        containerClassName="input-select"
                        countryid={countryid}
                        stateid={stateid}
                        onChange={(e: any) => {
                          setPaymentDetails((prev) => ({
                            ...prev,
                            city: e.name,
                          }));
                        }}
                        placeHolder="City"
                      />
                    </li>
                    <li>
                      <input
                        onChange={handlePaymentDetailsChange}
                        type="text"
                        name="postal_code"
                        value={paymentDetails.BillingAddress?.postal_code}
                        placeholder="Postal code"
                      />
                    </li>
                  </ul>
                </form>
              ) : null}
            </li>
          </ul>
          <div className="buttons-submit billing-address">
            <button onClick={previousStep}>
              <p>
                <FontAwesomeIcon icon={faArrowLeft} /> Return
              </p>
            </button>
            <button type="submit">
              <p>
                Finish <FontAwesomeIcon icon={faCheck} />
              </p>
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

interface Step3LogicProps extends ReduxOrder {
  setStep: React.Dispatch<React.SetStateAction<number>>;
}

const useStep3Logic = ({ order, setStep }: Step3LogicProps) => {
  const [countryid, setCountryid] = useState("");
  const [stateid, setstateid] = useState("");
  const [city, setCity] = useState("");

  const [paymentTypes, setPaymentTypes] = useState<OrderPaymentTypes>({
    payment: "Credit card",
    billingAddress: "Shipping address",
  });

  const [paymentDetails, setPaymentDetails] = useState<OrderPaymentDetails>({
    PaymentTypes: {
      payment: paymentTypes.payment,
      billingAddress: paymentTypes.billingAddress,
    },
    PaymentMethod: {
      credit_card: {
        card_number:
          order?.PaymentDetails.PaymentMethod?.credit_card?.card_number || "",
        card_name:
          order?.PaymentDetails.PaymentMethod?.credit_card?.card_name || "",
        expiration_date:
          order?.PaymentDetails.PaymentMethod?.credit_card?.expiration_date ||
          "",
        security_code:
          order?.PaymentDetails.PaymentMethod?.credit_card?.security_code || "",
      },
      paypal: false,
    },
    BillingAddress: {
      address_1: order?.PaymentDetails.BillingAddress?.address_1 || "",
      address_2: order?.PaymentDetails.BillingAddress?.address_2 || "",
      country: order?.PaymentDetails.BillingAddress?.country || "",
      state: order?.PaymentDetails.BillingAddress?.state || "",
      city: order?.PaymentDetails.BillingAddress?.city || "",
      postal_code: order?.PaymentDetails.BillingAddress?.postal_code || "",
    },
  });

  const handlePaymentTypesChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const { name } = event.target;
      switch (name) {
        case "CreditCard":
          return setPaymentTypes((prev) => ({
            ...prev,
            payment: "Credit card",
          }));
        case "PayPal":
          console.log("SI");
          return setPaymentTypes((prev) => ({
            ...prev,
            payment: "PayPal",
          }));
        case "shippingAddress":
          return setPaymentTypes((prev) => ({
            ...prev,
            billingAddress: "Shipping address",
          }));
        case "differentBillingAddress":
          return setPaymentTypes((prev) => ({
            ...prev,
            billingAddress: "New billing address",
          }));
        default:
          break;
      }
    },
    []
  );

  const handlePaymentDetailsChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = event.target;
      setPaymentDetails((prev) => ({
        ...prev,
        [name]: value,
      }));
    },
    [setPaymentDetails]
  );

  const nextStep = useCallback(
    async (
      event: React.FormEvent<HTMLFormElement>,
      paymentDetails: OrderPaymentDetails
    ) => {
      if (Object.values(paymentDetails).some((value) => value === "")) {
        event.preventDefault();
        toast.error("Information is missing!");
      } else if (Object.values(paymentDetails).every((value) => value !== "")) {
        if (
          window.confirm(
            "Are you sure? If you go ahead your order will be processed. Make sure the information you have provided is correct."
          )
        ) {
          event.preventDefault();
          setStep(4);
          await changeOrderPaymentDetails({ ...paymentDetails });
          const shoppingCart = await getDataApiJSON(
            "/api/shoppingCart/createShoppingCart",
            {}
          );
          if (shoppingCart) {
            localStorage.setItem("shoppingCartId", shoppingCart.id);
            await changeCart({
              ...shoppingCart,
              price: 0,
              ShoppingCartProducts: [],
            });
          }
        }
      }
    },
    [setStep]
  );

  const previousStep = useCallback(async () => {
    setStep(2);
  }, [setStep]);

  return {
    paymentTypes,
    paymentDetails,
    setPaymentDetails,
    previousStep,
    countryid,
    setCountryid,
    stateid,
    setstateid,
    city,
    setCity,
    handlePaymentTypesChange,
    handlePaymentDetailsChange,
    nextStep,
  };
};

const orderDispatch = {};

const mapOrderConnector = (state: AllReduxPayloads) => ({ order: state.order });
const orderConnect = connect(mapOrderConnector, orderDispatch);
export type ReduxOrder = ConnectedProps<typeof orderConnect>;

const Step3Connect = orderConnect(Step3);

export default Step3Connect;
