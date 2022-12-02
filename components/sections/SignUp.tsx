import styles from "../../styles/components/SignUp.module.css";
import Image from "next/image";
import Sustainee from "../../public/images/Sustainee.png";
import Plus from "../../public/images/appExplore/plus";

interface Close {
  closeSignup: any;
  hidden: any;
  setUpOrIn: any;
  closeLogIn: any;
}

export default function SignUp(Close: Close) {
  return (
    <div
      className={`${styles.overlay} ${
        Close.hidden === true ? styles.visible : styles.hidden
      }`}
    >
      <div className={styles.Wrapper}>
        <div
          className={styles.CrossButton}
          onClick={() => Close.closeSignup(false)}
        >
          <Plus className={styles.SVGCross} />
        </div>
        <div className={styles.ContentWrapper}>
          <Image className={styles.Image} src={Sustainee} alt="" />
          <div className={styles.SignUpWrapper}>
            <h2 style={{ fontSize: "36px", fontWeight: "700" }}>Sign Up</h2>
            <p className={styles.paragraph}>
              Access to AI tools, that open up a new door for creativity
            </p>
            <input type={"text"} required={true} placeholder="Email"></input>
            <input type={"text"} required={true} placeholder="Password"></input>
            <div className={styles.Button}>
              <h5 className={styles.ButtonName}>Sign Up</h5>
            </div>
            <p className={styles.paragraph}>
              By clicking on Sign up, you agree to our Terms of service and
              Privacy policy
            </p>
            <div className={styles.line}></div>
            <div className={styles.PwithLink}>
              <p className={styles.paragraph}>Already have an account?</p>
              <p
                className={styles.paragraph}
                style={{ color: "#ea2d49", cursor: "pointer" }}
                onClick={() => {
                  Close.setUpOrIn(false);
                  Close.closeLogIn(true);
                }}
              >
                Sign in
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
