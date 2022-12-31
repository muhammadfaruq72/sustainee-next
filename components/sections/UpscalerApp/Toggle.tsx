import styles from "../../../styles/components/Upscaler/Upscaler.module.css";

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
            Props.gliderState === "waifu2x_photo"
              ? styles.glider0
              : styles.glider1
          }`}
        ></span>
        <div
          className={styles.ToggleButton}
          id="waifu2x_photo"
          onClick={Props.glider}
        >
          <Props.FirstSVG
            className={`${styles.SVGPicture} ${
              Props.gliderState === "waifu2x_photo"
                ? styles.strokeWhite
                : styles.strokeGrey
            }`}
          />
          <h5
            className={`${
              Props.gliderState === "waifu2x_photo"
                ? styles.glidertextWhite
                : styles.glidertextRed
            }`}
          >
            {Props.FirstText}
          </h5>
        </div>
        <div
          className={styles.ToggleButton}
          id="waifu2x_art"
          onClick={Props.glider}
        >
          <Props.SecondSVG
            className={`${styles.SVGCube} ${
              Props.gliderState === "waifu2x_art"
                ? styles.strokeWhite
                : styles.strokeGrey
            }`}
          />
          <h5
            className={`${
              Props.gliderState === "waifu2x_art"
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
