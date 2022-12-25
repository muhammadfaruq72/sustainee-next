import styles from "../../styles/Header.module.css";
import styleButton from "../../styles/SmallComponents/Buttons.module.css";
import SignUp from "../sections/Global/SignUp";
import LogIn from "../sections/Global/LogIn";
import { useContext, useEffect, useState, useRef } from "react";
import AuthContext from "../sections/Global/login_AuthContext";
import User from "../../public/images/appExplore/user";
import Link from "next/link";
import Menu from "./Menu";
import Svg_logo from "../../public/images/Svg_LOGO.svg";

export default function Header() {
  const [openSignUp, setSignUp] = useState<Boolean>(false);
  const [openLogIn, setLogIn] = useState<Boolean>(false);
  const [UpOrIn, setUpOrIn] = useState<null | string>(null);
  const { isloggedIn, LogOutUser } = useContext(AuthContext);
  const [menuIsOpen, setMenuIsOpen] = useState(false);
  const HamburgerRef: any = useRef();
  const signUpOnClick: any = () => {
    setSignUp(true);
    setUpOrIn("signup");
  };
  const LogInOnCluck: any = () => {
    setLogIn(true);
    setUpOrIn("login");
  };

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
            <Svg_logo className={styles.logo} />
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
              onClick={LogInOnCluck}
            >
              Sign in
            </button>
            <button
              type="button"
              className={styleButton.roundBtn}
              onClick={signUpOnClick}
            >
              Sign up
            </button>
          </div>
          <img
            onClick={() => setMenuIsOpen(!menuIsOpen)}
            ref={HamburgerRef}
            className={`${styles.Hamburger} ${
              isloggedIn === false ? styles.visible : styles.hidden
            }`}
            src="../images/hamburger.png"
          ></img>{" "}
          <Menu
            signUpOnClick={signUpOnClick}
            LogInOnCluck={LogInOnCluck}
            menuIsOpen={menuIsOpen}
            setMenuIsOpen={setMenuIsOpen}
            HamburgerRef={HamburgerRef}
          />
        </div>
      </header>
    </>
  );
}
