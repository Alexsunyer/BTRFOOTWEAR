import { faClose, faPowerOff, faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import LoginRegister from "./LoginRegisterModal";
import ShoppingCartConnect from "./shoppingCartHeader";
import { AllReduxPayloads } from "../../../../utils/reducers";
import { ConnectedProps, connect } from "react-redux";

interface HeaderRightProps {}

const HeaderRight: React.FC<HeaderRightProps> = () => {
  return (
    <div className="header-right">
      <LoginHeaderConnect />
      <ShoppingCartConnect />
    </div>
  );
};

interface LoginHeaderProps extends ReduxLoginHeader {}

const LoginHeader: React.FC<LoginHeaderProps> = ({ user }) => {
  const { open, setOpen } = useLoginHeaderLogic();
  return (
    <div className="login-header">
      {user ? (
        <div className="user-logged-navbar">
          <a
            href="/"
            className="logout"
            onClick={() => {
              localStorage.removeItem("userId");
              localStorage.removeItem("shoppingCartId");
            }}
          >
            <FontAwesomeIcon icon={faPowerOff} /> <p>Logout</p>
          </a>
          <button className="username">
            <FontAwesomeIcon icon={faUser} /> {user.username}
          </button>
        </div>
      ) : (
        <button className="button-login" onClick={() => setOpen((old) => !old)}>
          <FontAwesomeIcon icon={faUser} /> <p>Account</p>
        </button>
      )}
      {open ? <LoginHeaderModal setOpen={setOpen} /> : null}
    </div>
  );
};

const loginHeaderDispatch = {};

const mapLoginHeaderConnector = (state: AllReduxPayloads) => ({
  user: state.user,
});
const loginHeaderConnect = connect(
  mapLoginHeaderConnector,
  loginHeaderDispatch
);
export type ReduxLoginHeader = ConnectedProps<typeof loginHeaderConnect>;

const LoginHeaderConnect = loginHeaderConnect(LoginHeader);

const useLoginHeaderLogic = () => {
  const [open, setOpen] = useState(false);
  return { setOpen, open };
};

interface LoginHeaderModalProps {
  setOpen: any;
}

const LoginHeaderModal: React.FC<LoginHeaderModalProps> = ({ setOpen }) => {
  return (
    <div className="login-modal">
      <div className="login-modal-whitebox">
        <button
          className="close-window"
          onClick={() => setOpen((old: any) => !old)}
        >
          <FontAwesomeIcon icon={faClose} />
        </button>
        <LoginRegister setOpen={setOpen} />
      </div>
    </div>
  );
};

export default HeaderRight;
