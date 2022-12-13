import styles from "../../styles/components/SignUp.module.css";
import Image from "next/image";
import Sustainee from "../../public/images/Sustainee.png";
import Plus from "../../public/images/appExplore/plus";
import { useEffect, useState, useContext, useRef } from "react";
import AuthContext from "./login_AuthContext";
import Cross from "../../public/images/appExplore/cross";

interface Close {
  closeLogIn: any;
  hidden: any;
  setUpOrIn: any;
  closeSignup: any;
}

export default function LogIn(Close: Close) {
  const {
    LoginUser,
    styleSubmit,
    warningBool,
    warningtext,
    UpAndIn,
    setWarningBool,
  } = useContext(AuthContext);

  useEffect(() => {
    if (UpAndIn === true) {
      Close.setUpOrIn(null);
    }
  }, [UpAndIn]);

  return (
    <div
      className={`${styles.overlay} ${
        Close.hidden === true ? styles.visible : styles.hidden
      }`}
    >
      <div
        className={`${styles.warning} ${
          warningBool === true ? styles.visible : styles.hidden
        }`}
      >
        <Cross className={styles.SVGCrossRed} />
        <p className={styles.paragraph}>{warningtext}</p>
      </div>
      <div className={styles.Wrapper}>
        <div
          className={styles.CrossButton}
          onClick={() => {
            Close.closeLogIn(false);
            setWarningBool(false);
          }}
        >
          <Plus className={styles.SVGCross} />
        </div>
        <div className={styles.ContentWrapper}>
          <Image className={styles.Image} src={Sustainee} alt="" />
          <div className={styles.SignUpWrapper}>
            <h2 style={{ fontSize: "36px", fontWeight: "700" }}>Sign in</h2>
            <p className={styles.paragraph}>
              Access to AI tools, that open up a new door for creativity
            </p>
            <form onSubmit={LoginUser} className={styles.forms}>
              <input
                name="email"
                type={"email"}
                required={true}
                placeholder="Email"
              ></input>
              <input
                name="password"
                type={"password"}
                required={true}
                placeholder="Password"
              ></input>
              <input type="submit" value="Sign in" style={styleSubmit}></input>
            </form>
            <div className={styles.line}></div>
            <div className={styles.PwithLink}>
              <p className={styles.paragraph}>Don't have an account?</p>
              <p
                className={styles.paragraph}
                style={{ color: "#ea2d49", cursor: "pointer" }}
                onClick={() => {
                  Close.setUpOrIn("signup");
                  Close.closeSignup(true);
                  setWarningBool(false);
                }}
              >
                Sign Up
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
