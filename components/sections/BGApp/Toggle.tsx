import styles from "../../../styles/components/BGApp/BGApp.module.css";

interface props {
  gliderState: string;
  glider: any;
  FirstSVG: any;
  FirstText: string;
  SecondSVG: any;
  SecondText: string;
  mobileOnly?: Boolean;
}

export default function Toggle(Props: props) {
  return (
    <>
      <div
        className={`${styles.ToggleWrapper} ${
          Props.mobileOnly === true ? styles.mobileOnly : styles.visible
        }`}
      >
        <span
          className={`${styles.glider} ${
            Props.gliderState === "U2net" ? styles.glider0 : styles.glider1
          }`}
        ></span>
        <div className={styles.ToggleButton} id="U2net" onClick={Props.glider}>
          <Props.FirstSVG
            className={`${styles.SVGPicture} ${
              Props.gliderState === "U2net"
                ? styles.strokeWhite
                : styles.strokeGrey
            }`}
          />
          <h5
            className={`${
              Props.gliderState === "U2net"
                ? styles.glidertextWhite
                : styles.glidertextRed
            }`}
          >
            {Props.FirstText}
          </h5>
        </div>
        <div
          className={styles.ToggleButton}
          id="Stickerinator"
          onClick={Props.glider}
        >
          <Props.SecondSVG
            className={`${styles.SVGCube} ${
              Props.gliderState === "Stickerinator"
                ? styles.strokeWhite
                : styles.strokeGrey
            }`}
          />
          <h5
            className={`${
              Props.gliderState === "Stickerinator"
                ? styles.glidertextWhite
                : styles.glidertextRed
            }`}
          >
            {Props.SecondText}
          </h5>
        </div>
      </div>
    </>
  );
}
