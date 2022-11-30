import React from "react";
import styles from "../styles/Footer.module.css";

export default function Footer() {
  return (
    <>
      <footer>
        <div className={styles.Wrapper}>
          <img src="../images/footer/Sustainee.png" />
          <div className={styles.Description}>
            Sustainee is a young company build to enhance businesses via
            services like custom software development, design innovation and
            consultancy.
          </div>
          <div className="Address">
            Sialkot Cantt, Pakistan <br />
            contact@sustainee.org
          </div>
          <div className="Social">
            <img src="../images/footer/iconFB.png" />
            <img src="../images/footer/iconIG.png" />
            <img src="../images/footer/iconTwitter.png" />
          </div>
        </div>
      </footer>
    </>
  );
}
