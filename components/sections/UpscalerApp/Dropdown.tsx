import styles from "../../../styles/SmallComponents/DropDown.module.css";
import { useState, useEffect, useRef, useContext } from "react";
import Image from "next/image";
import dropArrow from "../../../public/images/appExplore/arrowDown.png";
import Context from "./Upscaler_";

export default function Dropdown() {
  const { Option, setOption } = useContext(Context);
  const [isOpen, setisOpen] = useState(false);
  let WrapperRef: any = useRef();
  let paraRef: any = useRef();
  let arrowRef: any = useRef();

  useEffect(() => {
    function ToggleMenu(event: any) {
      //console.log(event.target, arrowRef.current);
      if (
        event.target !== WrapperRef.current &&
        event.target !== paraRef.current &&
        event.target !== arrowRef.current
      ) {
        setisOpen(false);
      }
    }
    window.addEventListener("click", ToggleMenu);
    return () => {
      // Unbind the event listener on clean up
      window.removeEventListener("click", ToggleMenu);
    };
  });

  return (
    <>
      <div className={styles.parentWrapper}>
        <div
          ref={WrapperRef}
          className={styles.Wrapper}
          onClick={() => setisOpen(!isOpen)}
        >
          <p
            ref={paraRef}
            style={{ color: "#ea2d49", fontWeight: "400", fontSize: "22px" }}
          >
            {Option}
          </p>
          <Image
            ref={arrowRef}
            src={dropArrow}
            alt=""
            className={styles.DropArrow}
          />
        </div>
        <div
          className={`${styles.Options} ${isOpen == false && styles.hidden}`}
        >
          <p
            onClick={() => setOption("2x")}
            className={`${styles.dropdownItem} ${
              Option === "2x" && styles.dropdownItemSelected
            }`}
          >
            2x
          </p>
          <p
            onClick={() => setOption("3x")}
            className={`${styles.dropdownItem} ${
              Option === "3x" && styles.dropdownItemSelected
            }`}
          >
            3x
          </p>
        </div>
      </div>
    </>
  );
}
