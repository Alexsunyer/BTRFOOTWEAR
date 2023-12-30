import { ConnectedProps, connect } from "react-redux";
import { AllReduxPayloads } from "../../../utils/reducers";
import {
  CitySelect,
  CountrySelect,
  StateSelect,
} from "react-country-state-city";
import "react-country-state-city/dist/react-country-state-city.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useCallback, useState } from "react";
import { OrderDeliveryTo } from "../../../utils/reducers/order";
import { changeOrderDeliveryTo } from "../../../utils/reducers/reduxDispatch";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import toast from "react-hot-toast";

interface Step1Props extends Step1LogicProps {}

const Step1: React.FC<Step1Props> = ({ order, setStep }) => {
  const {
    shippingAddress,
    handleChange,
    nextStep,
    setShippingAddress,
    countryid,
    setCountryid,
    stateid,
    setstateid,
  } = useStep1Logic({
    order,
    setStep,
  });
  return (
    <form
      className="user-order-info-form"
      onSubmit={(e) => nextStep(e, shippingAddress)}
    >
      <h1>Shipping address</h1>
      <ul className="user-order-info-form-list">
        <li>
          <input
            onChange={handleChange}
            type="text"
            name="address_1"
            value={shippingAddress.address_1}
            placeholder="First address"
          />
        </li>
        <li>
          <input
            onChange={handleChange}
            type="text"
            name="address_2"
            value={shippingAddress.address_2}
            placeholder="Second address"
          />
        </li>
        <li>
          <CountrySelect
            containerClassName="input-select"
            onChange={(e: any) => {
              setCountryid(e.id);
              setShippingAddress((prev) => ({
                ...prev,
                country: e.name,
              }));
            }}
            placeHolder={
              order?.DeliveryTo?.country === "" ||
              order?.DeliveryTo?.country === undefined
                ? "Country"
                : order?.DeliveryTo?.country
            }
          />
        </li>
        <li>
          <StateSelect
            containerClassName="input-select"
            countryid={countryid}
            onChange={(e: any) => {
              setstateid(e.id);
              setShippingAddress((prev) => ({
                ...prev,
                state: e.name,
              }));
            }}
            placeHolder={
              order?.DeliveryTo?.state === "" ||
              order?.DeliveryTo?.country === undefined
                ? "State"
                : order?.DeliveryTo?.state
            }
          />
        </li>
        <li>
          <CitySelect
            containerClassName="input-select"
            countryid={countryid}
            stateid={stateid}
            onChange={(e: any) => {
              setShippingAddress((prev) => ({
                ...prev,
                city: e.name,
              }));
            }}
            placeHolder={
              order?.DeliveryTo?.city === "" ||
              order?.DeliveryTo?.country === undefined
                ? "City"
                : order?.DeliveryTo?.city
            }
          />
        </li>
        <li>
          <input
            onChange={handleChange}
            type="text"
            name="postal_code"
            value={shippingAddress.postal_code}
            placeholder="Postal code"
          />
        </li>
        <li>
          <input
            onChange={handleChange}
            type="text"
            name="phone"
            value={shippingAddress.phone}
            placeholder="Mobile phone"
          />
        </li>
      </ul>
      <div className="buttons-submit">
        <button type="submit">
          <p>
            Shipping method <FontAwesomeIcon icon={faArrowRight} />
          </p>
        </button>
      </div>
    </form>
  );
};

interface Step1LogicProps extends ReduxOrder {
  setStep: React.Dispatch<React.SetStateAction<number>>;
}

const useStep1Logic = ({ order, setStep }: Step1LogicProps) => {
  const [countryid, setCountryid] = useState("");
  const [stateid, setstateid] = useState("");
  const [city, setCity] = useState("");
  const [shippingAddress, setShippingAddress] = useState<OrderDeliveryTo>({
    address_1: order?.DeliveryTo?.address_1 || "",
    address_2: order?.DeliveryTo?.address_2 || "",
    country: order?.DeliveryTo?.country || "",
    state: order?.DeliveryTo?.state || "",
    city: order?.DeliveryTo?.city || "",
    postal_code: order?.DeliveryTo?.postal_code || "",
    phone: order?.DeliveryTo?.phone || "",
  });

  const handleChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = event.target;
      setShippingAddress((prevShippingAddress) => ({
        ...prevShippingAddress,
        [name]: value,
      }));
    },
    [setShippingAddress]
  );

  const nextStep = useCallback(
    async (
      event: React.FormEvent<HTMLFormElement>,
      shippingAddress: OrderDeliveryTo
    ) => {
      if (Object.values(shippingAddress).some((value) => value === "")) {
        event.preventDefault();
        toast.error("Information is missing!");
      } else if (
        Object.values(shippingAddress).every((value) => value !== "")
      ) {
        event.preventDefault();
        setStep(2);
        await changeOrderDeliveryTo({ ...shippingAddress });
      }
    },
    [setStep]
  );

  return {
    shippingAddress,
    handleChange,
    nextStep,
    setShippingAddress,
    countryid,
    setCountryid,
    stateid,
    setstateid,
    city,
    setCity,
  };
};

const orderDispatch = {};

const mapOrderConnector = (state: AllReduxPayloads) => ({ order: state.order });
const orderConnect = connect(mapOrderConnector, orderDispatch);
export type ReduxOrder = ConnectedProps<typeof orderConnect>;

const Step1Connect = orderConnect(Step1);

export default Step1Connect;
