import React from "react";
import styles from "../styles/Header.module.css";

export default function Header() {
  return (
    <>
      <header className={styles.HeaderTag}>
        <div className={styles.Wrapper}>
          <img src="../images/LogoSustainee.png" />
          <div className={styles.ButtonWrapper}>
            <div className={styles.SimpleButton}>
              <h5 className={styles.SimpleName}>Sign in</h5>
            </div>
            <div className={styles.Button}>
              <h5 className={styles.ButtonName}>Sign up</h5>
            </div>
          </div>
          <img className={styles.Hamburger} src="../images/hamburger.png"></img>
        </div>
      </header>
    </>
  );
}
