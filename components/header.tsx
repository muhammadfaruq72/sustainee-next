import styles from "../styles/Header.module.css";
import styleButton from "../styles/SmallComponents/Buttons.module.css";
import SignUp from "./sections/Global/SignUp";
import LogIn from "./sections/LogIn";
import { useContext, useEffect, useState } from "react";
import AuthContext from "./sections/Global/login_AuthContext";
import User from "../public/images/appExplore/user";
import Link from "next/link";

export default function Header() {
  const [openSignUp, setSignUp] = useState<Boolean>(false);
  const [openLogIn, setLogIn] = useState<Boolean>(false);
  const [UpOrIn, setUpOrIn] = useState<null | string>(null);
  const { isloggedIn, LogOutUser } = useContext(AuthContext);

  useEffect(() => {
    if (localStorage.getItem("loginRequired") && UpOrIn === null) {
      setUpOrIn("login");
      setLogIn(true);
      localStorage.removeItem("loginRequired");
    }
  });

  return (
    <>
      {UpOrIn === "login" && (
        <LogIn
          closeLogIn={setLogIn}
          hidden={openLogIn}
          setUpOrIn={setUpOrIn}
          closeSignup={setSignUp}
        />
      )}
      {UpOrIn === "signup" && (
        <SignUp
          closeSignup={setSignUp}
          hidden={openSignUp}
          setUpOrIn={setUpOrIn}
          closeLogIn={setLogIn}
        />
      )}

      <header className={styles.HeaderTag}>
        <div className={styles.Wrapper}>
          <Link href="/">
            <img src="../images/LogoSustainee.png" className={styles.logo} />
          </Link>
          <div
            onClick={LogOutUser}
            className={`${styles.userParent} ${
              isloggedIn === true ? styles.visible : styles.hidden
            }`}
          >
            <User className={styles.SVGUser} />
          </div>

          <div
            className={`${styles.ButtonWrapper} ${
              isloggedIn === false ? styles.visible : styles.hidden
            }`}
          >
            <button
              type="button"
              className={styleButton.roundSimpleBtn}
              onClick={() => {
                setLogIn(true);
                setUpOrIn("login");
              }}
            >
              Sign in
            </button>
            <button
              type="button"
              className={styleButton.roundBtn}
              onClick={() => {
                setSignUp(true);
                setUpOrIn("signup");
              }}
            >
              Sign up
            </button>
          </div>

          <img className={styles.Hamburger} src="../images/hamburger.png"></img>
        </div>
      </header>
    </>
  );
}
