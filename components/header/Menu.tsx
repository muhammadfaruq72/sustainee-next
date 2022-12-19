import styles from "../../styles/Header.module.css";
import Register from "../../public/images/appExplore/Register.svg";
import LoginUser from "../../public/images/appExplore/LoginUser.svg";
import { useEffect } from "react";

interface props {
  signUpOnClick: any;
  LogInOnCluck: any;
  menuIsOpen: any;
  setMenuIsOpen: any;
  HamburgerRef: any;
}

export default function Menu(Props: props) {
  interface MenuData {
    title: string;
    icon: any;
    click: any;
  }

  const MenuData: MenuData[] = [
    { title: "Sign Up", icon: Register, click: Props.signUpOnClick },
    { title: "Log in", icon: LoginUser, click: Props.LogInOnCluck },
  ];

  useEffect(() => {
    function ToggleMenu(event: any) {
      if (event.target !== Props.HamburgerRef.current) {
        Props.setMenuIsOpen(false);
      }
    }
    window.addEventListener("click", ToggleMenu);
    return () => {
      // Unbind the event listener on clean up
      window.removeEventListener("click", ToggleMenu);
    };
  });

  return (
    <div
      className={`${Props.menuIsOpen === true ? styles.Menu : styles.hidden}`}
    >
      {MenuData.map((item, index) => (
        <div key={index}>
          {" "}
          <div className={styles.MenuItem} onClick={item.click}>
            <item.icon style={{ width: "36px" }} />

            <p style={{ fontWeight: "400", fontSize: "18px" }}>{item.title}</p>
          </div>
          <div
            className={`${index !== MenuData.length - 1 && styles.Divider}`}
          ></div>
        </div>
      ))}
    </div>
  );
}
