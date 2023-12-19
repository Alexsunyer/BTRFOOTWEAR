import { useCallback, useState } from "react";
import { LoginInfo, RegisterInfo } from "./types";
import { getDataApiJSON } from "../../../../../utils/globals/petitions";
import { changeUser } from "../../../../../utils/reducers/reduxDispatch";
import toast from "react-hot-toast";
import "./loginRegisterModal.sass";

interface LoginRegisterProps {
  setOpen: any;
}

const LoginRegister: React.FC<LoginRegisterProps> = ({
  setOpen,
}: LoginRegisterProps) => {
  const { type, setType } = useLoginRegisterLogic();

  return (
    <div className="login-register-container">
      {type !== "login" ? (
        <RegisterForm setType={setType} setOpen={setOpen} />
      ) : (
        <LoginForm setType={setType} setOpen={setOpen} />
      )}
    </div>
  );
};

const useLoginRegisterLogic = () => {
  const [type, setType] = useState("login");
  return { type, setType };
};

interface LoginFormProps {
  setType: any;
  setOpen: any;
}

const LoginForm: React.FC<LoginFormProps> = ({ setType, setOpen }) => {
  const { handleChange, handleSubmit, loginInfo } = useLoginLogic({ setOpen });

  return (
    <form onSubmit={handleSubmit} className="login-form">
      <h2>LOGIN</h2>

      <label htmlFor="email">Email </label>
      <input
        onChange={handleChange}
        type="email"
        name="email"
        value={loginInfo?.email}
        placeholder="Enter email"
        required
      />

      <label htmlFor="password">Password </label>
      <input
        onChange={handleChange}
        type="password"
        name="password"
        value={loginInfo?.password}
        placeholder="Enter password"
        required
      />

      <button type="submit" className="submit">
        <p>Login</p>
      </button>
      <h3>
        <span>Are you not registered? Register </span>
        <button
          onClick={() => {
            setType("register");
          }}
        >
          here
        </button>
      </h3>
    </form>
  );
};
interface LoginLogicProps {
  setOpen: any;
}

const useLoginLogic = ({ setOpen }: LoginLogicProps) => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [loginInfo, setLoginInfo] = useState<LoginInfo>({
    email: "",
    password: "",
  });

  const handleSubmit = useCallback(
    async (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      setIsSubmitted(true);
      const user = await getDataApiJSON("/api/user/getUserInstanceLogin", {
        ...loginInfo,
      });
      if (user) {
        localStorage.setItem("userId", user.id);
        await changeUser({ ...user });
        setOpen(false);
        toast.success("Successfully logged in!");
      } else {
        toast.error("Login failed. Invalid credentials");
      }
    },
    [setIsSubmitted, loginInfo, setOpen]
  );

  const handleChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = event.target;
      setLoginInfo((prevLoginInfo) => ({ ...prevLoginInfo, [name]: value }));
    },
    [setLoginInfo]
  );

  return {
    isSubmitted,
    handleChange,
    handleSubmit,
    loginInfo,
  };
};

interface RegisterFormProps {
  setType: any;
  setOpen: any;
}

const RegisterForm: React.FC<RegisterFormProps> = ({ setType, setOpen }) => {
  const { handleChange, handleSubmit, registerInfo, handleConfirmPassword } =
    useRegisterFormLogic({ setOpen });

  return (
    <form onSubmit={handleSubmit} className="register-form">
      <h2>REGISTER</h2>

      <label htmlFor="username">Username</label>
      <input
        onChange={handleChange}
        type="text"
        name="username"
        value={registerInfo.username}
        placeholder="Enter username"
        required
      />

      <label htmlFor="email">Email</label>
      <input
        onChange={handleChange}
        type="email"
        name="email"
        value={registerInfo.email}
        placeholder="Enter email"
        required
      />

      <label htmlFor="password">Password</label>
      <input
        onChange={handleChange}
        type="password"
        name="password"
        value={registerInfo.password}
        placeholder="Enter password"
        required
      />

      <label htmlFor="confirm-password">Confirm password</label>
      <input
        onChange={handleConfirmPassword}
        type="password"
        name="confirm-password"
        placeholder="Confirm password"
        required
      />

      <button type="submit" className="submit">
        <p>Register</p>
      </button>
      <h3>
        <span>Are you already registered? Login</span>{" "}
        <button
          onClick={() => {
            setType("login");
          }}
        >
          here
        </button>
      </h3>
    </form>
  );
};

interface RegisterFormLogicProps {
  setOpen: any;
}

const useRegisterFormLogic = ({ setOpen }: RegisterFormLogicProps) => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [registerInfo, setRegisterInfo] = useState<RegisterInfo>({
    username: "",
    email: "",
    password: "",
  });

  const handleSubmit = useCallback(
    async (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      setIsSubmitted(true);
      const result = await getDataApiJSON("/api/user/getAllUsers", {
        where: {
          email: registerInfo.email,
        },
      });
      if (result?.length) {
        toast.error("This user is already registered");
      } else {
        const user = await getDataApiJSON("/api/user/createUser", {
          ...registerInfo,
        });
        if (user) {
          localStorage.setItem("userId", user.id);
          await changeUser({ ...user });
          setOpen(false);
          toast.success("User created!");
        }
      }
    },
    [setIsSubmitted, registerInfo, setOpen]
  );

  const handleChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = event.target;
      setRegisterInfo((prevRegisterInfo) => ({
        ...prevRegisterInfo,
        [name]: value,
      }));
    },
    [setRegisterInfo]
  );

  const handleConfirmPassword = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const { value } = event.target;
      if (value !== registerInfo.password) {
        toast.error("Passwords must match!");
      }
    },
    [registerInfo.password]
  );

  return {
    isSubmitted,
    handleChange,
    handleSubmit,
    registerInfo,
    handleConfirmPassword,
  };
};

export default LoginRegister;
