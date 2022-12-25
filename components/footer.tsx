import React from "react";
import styles from "../styles/Footer.module.css";
import Sustainee from "../public/images/footer/SUSTAINEE1.svg";

export default function Footer() {
  return (
    <>
      <footer>
        <div className={styles.Wrapper}>
          <Sustainee />
          <div className={styles.Description}>
            Sustainee is a young company build to enhance creativity by bringing
            the tools to help you solve problems.
          </div>
          <div className="Address">
            Sialkot Cantt, Pakistan <br />
            faruq.72.786@gmail.com
          </div>
          {/* {<div className="Social">
            <img src="../images/footer/iconFB.png" />
            <img src="../images/footer/iconIG.png" />
            <img src="../images/footer/iconTwitter.png" />
          </div>} */}
        </div>
      </footer>
    </>
  );
}
