import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

interface Step4Props {}

const Step4: React.FC<Step4Props> = () => {
  return (
    <div className="step4">
      <img id="thankyou" src="/THANKYOU.png" alt="Thank you!" />
      <div className="purchased-successfully">
        <h1>Your order has been processed successfully!</h1>
        <p>
          Thank you for your purchase! We've received your order and we're
          getting it ready to send. Check out your email, we've sent you a
          personalized tracking link!
        </p>
      </div>
      <Link to="/">
        <button>
          <h2>
            Return to store <FontAwesomeIcon icon={faHome} />
          </h2>
        </button>
      </Link>
    </div>
  );
};

export default Step4;
