import styles from "../../../styles/components/SignUp.module.css";
import Sustaineee from "../../../public/images/Sustaineee.svg";
import Plus from "../../../public/images/appExplore/plus";
import Cross from "../../../public/images/appExplore/cross";
import { useRef, useState, useEffect, useContext } from "react";
import { gql, useMutation } from "@apollo/client";
import AuthContext from "./login_AuthContext";

interface Close {
  closeSignup: any;
  hidden: any;
  setUpOrIn: any;
  closeLogIn: any;
}

interface Data {
  Email: any;
  Password: any;
}

export default function SignUp(Close: Close) {
  const refEmail: any = useRef();
  const refPassword: any = useRef();
  const [warningtext, setWarningText] = useState("This is a warning pop up!");
  const refSubmit: any = useRef();
  const [warningBool, setWarningBool] = useState<Boolean | null>(null);
  var refData = useRef<Data>();
  const { UpAndIn } = useContext(AuthContext);

  const Mutation = gql`
    mutation MyMutation($email: String!, $password: String!) {
      register(email: $email, password1: $password, password2: $password) {
        errors
        success
      }
    }
  `;

  const [mutate, { loading, error, data: mutateResponse }] = useMutation(
    Mutation,
    {
      onCompleted(data) {
        if (data.register.errors !== null) {
          setWarningBool(true);
          var objects: any = Object.values(data.register.errors);
          setWarningText(objects[0][0].message);
        }
        if (data.register.errors === null) {
          setWarningBool(false);
          Close.setUpOrIn("login");
          Close.closeLogIn(true);
          window.location.reload();
        }
      },
    }
  );

  async function Register(event: any) {
    event.preventDefault();

    refData.current = {
      Email: refEmail.current.value,
      Password: refPassword.current.value,
    };
    var email = refData.current.Email;
    var password = refData.current.Password;
    if (refEmail.current.value === "" || refPassword.current.value === "") {
      setWarningText("These fields are required.");
    } else {
      mutate({ variables: { email, password } });
      localStorage.setItem("loginRequired", "Please, login!");
    }
    if (UpAndIn === true) {
      Close.setUpOrIn("login");
    }
  }

  useEffect(() => {
    if (loading === true) {
      refSubmit.current.style.background = "rgba(0, 0, 0, 0.3)";
      refSubmit.current.style.pointerEvents = "none";
    }
    if (loading === false) {
      refSubmit.current.style.background = "#ea2d49";
      refSubmit.current.style.pointerEvents = "auto";
    }
  }, [loading]);

  return (
    <div
      onClick={() => Close.closeSignup(false)}
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

      <div onClick={(e: any) => e.stopPropagation()} className={styles.Wrapper}>
        <div
          className={styles.CrossButton}
          onClick={() => Close.closeSignup(false)}
        >
          <Plus className={styles.SVGCross} />
        </div>
        <div className={styles.ContentWrapper}>
          <Sustaineee className={styles.Image} />
          <div className={styles.SignUpWrapper}>
            <h2 style={{ fontSize: "36px", fontWeight: "700" }}>Sign Up</h2>
            <p className={styles.paragraph}>
              Access to AI tools, that open up a new door for creativity
            </p>
            <form onSubmit={Register} className={styles.forms}>
              <input
                ref={refEmail}
                type={"email"}
                required={true}
                placeholder="Email"
              ></input>
              <input
                ref={refPassword}
                type={"password"}
                required={true}
                placeholder="Password"
              ></input>
              <input ref={refSubmit} type="submit" value="Sign Up"></input>
            </form>
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
                  Close.setUpOrIn("login");
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
