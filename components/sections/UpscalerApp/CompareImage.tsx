import Plus from "../../../public/images/appExplore/plus";
import Save from "../../../public/images/appExplore/saveBold.svg";
import BackArrow from "../../../public/images/appExplore/back-arrow-icon.svg";
import styles from "../../../styles/SmallComponents/CompareImage.module.css";
import { ImgComparisonSlider } from "@img-comparison-slider/react";
import { saveAs } from "file-saver";

interface props {
  leftImage: string;
  rightImage: string;
  setCloseCompareImage: any;
  closeCompareImage: any;
  selectedImages: any;
  compareImage: any;
  setCompareImaage: any;
}

export default function CompareImage(Props: props) {
  return (
    <>
      <div
        style={{
          userSelect: "none",
          cursor: "pointer",
        }}
        onClick={() => {
          Props.setCloseCompareImage(false);
        }}
        className={styles.overlay}
      >
        <div
          style={{
            userSelect: "none",
            cursor: "pointer",
          }}
          id="WrapperCompare"
          onClick={(e: any) => e.stopPropagation()}
          className={styles.Wrapper}
        >
          <div className={styles.TopBar}>
            <div className={styles.Section}>
              <div
                onClick={() => {
                  try {
                    if (
                      typeof Props.selectedImages[
                        Props.compareImage?.ArrayIndex - 1
                      ].UpscaledImage !== "undefined"
                    ) {
                      Props.setCompareImaage({
                        original:
                          Props.selectedImages[
                            Props.compareImage?.ArrayIndex - 1
                          ].originalImage,
                        converted:
                          Props.selectedImages[
                            Props.compareImage?.ArrayIndex - 1
                          ].UpscaledImage,
                        ArrayIndex: Props.compareImage?.ArrayIndex - 1,
                      });
                    } else {
                      alert("Previous image is not upscaled.");
                    }
                  } catch (error) {
                    //console.log(error);
                  }
                }}
                className={styles.SVGButtons}
              >
                <BackArrow
                  style={{ fill: "#868686", width: "15px" }}
                  className={styles.SVGSave}
                />
              </div>
              <div
                onClick={() => {
                  try {
                    if (
                      typeof Props.selectedImages[
                        Props.compareImage?.ArrayIndex + 1
                      ].UpscaledImage !== "undefined"
                    ) {
                      Props.setCompareImaage({
                        original:
                          Props.selectedImages[
                            Props.compareImage?.ArrayIndex + 1
                          ].originalImage,
                        converted:
                          Props.selectedImages[
                            Props.compareImage?.ArrayIndex + 1
                          ].UpscaledImage,
                        ArrayIndex: Props.compareImage?.ArrayIndex + 1,
                      });
                    } else {
                      alert("Next image is not upscaled.");
                    }
                  } catch (error) {
                    //console.log(error);
                  }
                }}
                className={styles.SVGButtons}
              >
                <BackArrow
                  style={{
                    fill: "#868686",
                    width: "15px",
                    transform: "rotate(180deg)",
                  }}
                  className={styles.SVGSave}
                />
              </div>
            </div>
            <div className={styles.Section}>
              <div
                onClick={() => {
                  saveAs(
                    `${
                      Props.selectedImages[Props.compareImage?.ArrayIndex]
                        .UpscaledImage
                    }`,
                    `${
                      Props.selectedImages[Props.compareImage?.ArrayIndex]
                        .Imagename
                    }`
                  );
                }}
                className={styles.SVGButtons}
              >
                <Save className={styles.SVGSave} />
              </div>
              <div
                onClick={() => {
                  Props.setCloseCompareImage(false);
                }}
                className={styles.CrossButton}
              >
                <Plus className={styles.SVGCross} />
              </div>
            </div>
          </div>
          <div className={styles.WrapperCompare}>
            <ImgComparisonSlider className={styles.ImgComparisonSlider}>
              <img
                className={styles.CompareImage}
                slot="first"
                src={Props.leftImage}
              />
              <img
                className={styles.CompareImage}
                slot="second"
                src={Props.rightImage}
              />
            </ImgComparisonSlider>
          </div>
        </div>
      </div>
    </>
  );
}
