import styles from "../styles/Header.module.css";
import SignUp from "./sections/SignUp";
import LogIn from "./sections/LogIn";
import { useEffect, useState } from "react";

export default function Header() {
  const [openSignUp, setSignUp] = useState<Boolean>(false);
  const [openLogIn, setLogIn] = useState<Boolean>(false);
  const [UpOrIn, setUpOrIn] = useState<null | Boolean>(null);

  useEffect(() => {
    console.log("useEffect", UpOrIn);
  }, [UpOrIn]);

  return (
    <>
      {UpOrIn === false && (
        <LogIn
          closeLogIn={setLogIn}
          hidden={openLogIn}
          setUpOrIn={setUpOrIn}
          closeSignup={setSignUp}
        />
      )}
      {UpOrIn === true && (
        <SignUp
          closeSignup={setSignUp}
          hidden={openSignUp}
          setUpOrIn={setUpOrIn}
          closeLogIn={setLogIn}
        />
      )}

      <header className={styles.HeaderTag}>
        <div className={styles.Wrapper}>
          <img src="../images/LogoSustainee.png" />
          <div className={styles.ButtonWrapper}>
            <div
              className={styles.SimpleButton}
              onClick={() => {
                setLogIn(true);
                setUpOrIn(false);
              }}
            >
              <h5 className={styles.SimpleName}>Sign in</h5>
            </div>
            <div
              className={styles.Button}
              onClick={() => {
                setSignUp(true);
                setUpOrIn(true);
              }}
            >
              <h5 className={styles.ButtonName}>Sign up</h5>
            </div>
          </div>
          <img className={styles.Hamburger} src="../images/hamburger.png"></img>
        </div>
      </header>
    </>
  );
}
