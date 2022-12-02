import styles from "../../styles/components/SignUp.module.css";
import Image from "next/image";
import Sustainee from "../../public/images/Sustainee.png";
import Plus from "../../public/images/appExplore/plus";
import { useEffect, useState } from "react";

interface Close {
  closeLogIn: any;
  hidden: any;
  setUpOrIn: any;
  closeSignup: any;
}

export default function LogIn(Close: Close) {
  return (
    <div
      className={`${styles.overlay} ${
        Close.hidden === true ? styles.visible : styles.hidden
      }`}
    >
      <div className={styles.Wrapper}>
        <div
          className={styles.CrossButton}
          onClick={() => Close.closeLogIn(false)}
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
            <input type={"text"} required={true} placeholder="Email"></input>
            <input type={"text"} required={true} placeholder="Password"></input>
            <div className={styles.Button}>
              <h5 className={styles.ButtonName}>Sign Up</h5>
            </div>
            <div className={styles.line}></div>
            <div className={styles.PwithLink}>
              <p className={styles.paragraph}>Don't have an account?</p>
              <p
                className={styles.paragraph}
                style={{ color: "#ea2d49", cursor: "pointer" }}
                onClick={() => {
                  Close.setUpOrIn(true);
                  Close.closeSignup(true);
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
