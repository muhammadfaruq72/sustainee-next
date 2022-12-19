import styleButton from "../../../styles/SmallComponents/Buttons.module.css";

interface props {
  StartBoolean: Boolean;
  onStartButton: any;
  FirstSVG: any;
  SecondSVG: any;
  mobileOnly?: Boolean;
}

export default function AnimatedButton(Props: props) {
  return (
    <>
      <div
        className={`${styleButton.btnAnimated} ${
          Props.mobileOnly === true
            ? styleButton.mobileOnly
            : styleButton.visible
        }`}
        onClick={Props.onStartButton}
      >
        <Props.FirstSVG
          className={`${styleButton.firstSVG} ${
            Props.StartBoolean !== true
              ? styleButton.displayBlock
              : styleButton.rotation
          }`}
        />
        <h4 className={styleButton.textAnimBtn}>{`${
          Props.StartBoolean !== true ? "Start" : "Processing"
        }`}</h4>
        <Props.SecondSVG
          className={`${styleButton.secondSVG} ${
            Props.StartBoolean !== true
              ? styleButton.displayBlock
              : styleButton.displayNone
          }`}
        />
      </div>
    </>
  );
}
