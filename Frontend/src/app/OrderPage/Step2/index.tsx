import { ConnectedProps, connect } from "react-redux";
import { AllReduxPayloads } from "../../../utils/reducers";
import { useCallback, useState } from "react";
import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { changeOrderDeliveryMethod } from "../../../utils/reducers/reduxDispatch";
import { OrderDeliveryMethod } from "../../../utils/reducers/order";
import toast from "react-hot-toast";

interface Step2Props extends Step2LogicProps {}

const Step2: React.FC<Step2Props> = ({ order, setStep }) => {
  const {
    shippingMethod,
    handleContainerClick,
    handleChange,
    nextStep,
    previousStep,
  } = useStep2Logic({
    order,
    setStep,
  });
  return (
    <form
      className="user-shipping-method-form"
      onSubmit={(e) => nextStep(e, shippingMethod)}
    >
      <h1>Shipping method</h1>
      <ul className="user-shipping-method-form-list">
        <li>
          <input
            type="checkbox"
            name="UPS Ground"
            onChange={handleChange}
            checked={shippingMethod.name === "UPS Ground"}
          />
          <div
            className="user-shipping-method-info"
            onClick={() => handleContainerClick("UPS Ground", 22.81)}
          >
            <img src="/UPS_logo.png" alt="DeliveryMethod" />
            <div>
              <label htmlFor="UPS Ground"> UPS Ground</label>
              <p>Expected delivery: 2 days</p>
            </div>
            <span>22.81€</span>
          </div>
        </li>
        <li>
          <input
            type="checkbox"
            name="UPS Air"
            onChange={handleChange}
            checked={shippingMethod.name === "UPS Air"}
          />
          <div
            className="user-shipping-method-info"
            onClick={() => handleContainerClick("UPS Air", 28.77)}
          >
            <img src="/UPS_logo.png" alt="DeliveryMethod" />
            <div>
              <label htmlFor="UPS Air"> UPS Air</label>
              <p>Expected delivery: 3 bussiness days</p>
            </div>
            <span>28.77€</span>
          </div>
        </li>
        <li>
          <input
            type="checkbox"
            name="UPS Next day Air"
            onChange={handleChange}
            checked={shippingMethod.name === "UPS Next Day Air"}
          />
          <div
            className="user-shipping-method-info"
            onClick={() => handleContainerClick("UPS Next Day Air", 35.72)}
          >
            <img src="/UPS_logo.png" alt="DeliveryMethod" />
            <div>
              <label htmlFor="UPS Next Day Air"> UPS Next Day Air</label>
              <p>Expected delivery: 2 bussiness days</p>
            </div>
            <span>35.72€</span>
          </div>
        </li>
      </ul>
      <div className="buttons-submit">
        <button onClick={previousStep}>
          <p>
            <FontAwesomeIcon icon={faArrowLeft} /> Return
          </p>
        </button>
        <button type="submit">
          <p>
            Payment <FontAwesomeIcon icon={faArrowRight} />
          </p>
        </button>
      </div>
    </form>
  );
};

interface Step2LogicProps extends ReduxOrder {
  setStep: React.Dispatch<React.SetStateAction<number>>;
}

const useStep2Logic = ({ order, setStep }: Step2LogicProps) => {
  const [shippingMethod, setShippingMethod] = useState<OrderDeliveryMethod>({
    price: order?.DeliveryMethod?.price || 0,
    name: order?.DeliveryMethod?.name || "",
  });

  const handleChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const { name } = event.target;
      setShippingMethod((prevMethod) => ({ ...prevMethod, name }));
    },
    [setShippingMethod]
  );

  const handleContainerClick = (name: string, price: number) => {
    setShippingMethod((prevMethod) => ({ ...prevMethod, name, price }));
  };

  const nextStep = useCallback(
    async (
      event: React.FormEvent<HTMLFormElement>,
      shippingMethod: OrderDeliveryMethod
    ) => {
      if (Object.values(shippingMethod).some((value) => value === "")) {
        event.preventDefault();
        toast.error("Information is missing!");
      } else if (Object.values(shippingMethod).every((value) => value !== "")) {
        event.preventDefault();
        setStep(3);
        await changeOrderDeliveryMethod({ ...shippingMethod });
      }
    },
    [setStep]
  );

  const previousStep = useCallback(async () => {
    setStep(1);
  }, [setStep]);

  return {
    shippingMethod,
    handleChange,
    handleContainerClick,
    nextStep,
    previousStep,
  };
};

const orderDispatch = {};

const mapOrderConnector = (state: AllReduxPayloads) => ({ order: state.order });
const orderConnect = connect(mapOrderConnector, orderDispatch);
export type ReduxOrder = ConnectedProps<typeof orderConnect>;

const Step2Connect = orderConnect(Step2);

export default Step2Connect;
