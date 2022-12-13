import { createContext, ReactNode, useState, useEffect } from "react";
import { gql, useMutation } from "@apollo/client";

const Mutation = gql`
  mutation MyMutation($email: String!, $password: String!) {
    tokenAuth(email: $email, password: $password) {
      errors
      refreshToken {
        isExpired
        token
      }
      token {
        token
      }
      user {
        email
      }
    }
  }
`;

interface typeContext {
  LoginUser?: any;
  styleSubmit?: any;
  warningBool?: any;
  warningtext?: any;
  UpAndIn?: any;
  setWarningBool?: any;
  isloggedIn?: any;
  LogOutUser?: any;
}

const AuthContext = createContext<typeContext>({});

export default AuthContext;

interface Props {
  children?: ReactNode;
}

export const AuthProvider = ({ children }: Props) => {
  const [isloggedIn, setIsLoggedIn] = useState<Boolean | null>(null);
  const [styleSubmit, setStyleSubmit] = useState({});
  const [warningBool, setWarningBool] = useState(false);
  const [warningtext, setWarningText] = useState("This is a warning pop up!");
  const [UpAndIn, setUpAndIn] = useState(false);
  const [mutate, { loading, error, data: mutateResponse }] = useMutation(
    Mutation,
    {
      onCompleted(data) {
        if (data.tokenAuth.errors !== null) {
          setWarningBool(true);
          setWarningText("Please, enter valid credentials.");
        }
        if (data.tokenAuth.errors === null) {
          setWarningBool(false);
          setUpAndIn(true);
          localStorage.setItem("tokenAuth", JSON.stringify(data));
          setIsLoggedIn(true);
        }
      },
    }
  );

  let LoginUser = (event: any) => {
    event.preventDefault();
    var email = event.target.email.value;
    var password = event.target.password.value;
    mutate({ variables: { email, password } });
  };

  let LogOutUser = () => {
    localStorage.removeItem("tokenAuth");
    setIsLoggedIn(false);
  };

  let contextData = {
    LoginUser: LoginUser,
    styleSubmit: styleSubmit,
    warningBool: warningBool,
    warningtext: warningtext,
    UpAndIn: UpAndIn,
    setWarningBool: setWarningBool,
    isloggedIn: isloggedIn,
    LogOutUser: LogOutUser,
  };

  useEffect(() => {
    if (localStorage.getItem("tokenAuth") !== null) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
    setUpAndIn(false);
    if (loading === true) {
      setStyleSubmit({
        background: "rgba(0, 0, 0, 0.3)",
        pointerEvents: "none",
      });
    }
    if (loading === false) {
      setStyleSubmit({
        background: "#ea2d49",
        pointerEvents: "auto",
      });
    }
  }, [loading]);

  return (
    <AuthContext.Provider value={contextData}>{children}</AuthContext.Provider>
  );
};
