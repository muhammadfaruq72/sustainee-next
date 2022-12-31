import Plus from "../../../public/images/appExplore/plus";
import SVGCompare from "../../../public/images/appExplore/compare.svg";
import styles from "../../../styles/components/Upscaler/Upscaler.module.css";
import styleButton from "../../../styles/SmallComponents/Buttons.module.css";
import back from "../../../public/images/back.png";

interface props {
  dragStyle: any;
  selectedImages: any;
  gliderState: any;
  StartBoolean: any;
  handleSize: any;
  setSelectedImages: any;
  setSelectedFilesArray: any;
  selectedFilesArray: any;
  onSelectFile: any;
  SaveImages: any;
  setCloseCompareImage: any;
  setCompareImaage: any;
}

export default function ImageBox(Props: props) {
  return (
    <>
      <div className={styles.BoxWrapper} style={Props.dragStyle}>
        <div className={styles.AddedImages}>
          {Props.selectedImages &&
            Props.selectedImages.map((Image: any, index: any) => (
              <div className={styles.ImagesContainer} key={index}>
                <div className={`ImageBorder ${styles.ImageBorder}`}>
                  <style jsx>{`
                    .ImageBorder {
                      padding: ${typeof Image.UpscaledImage !== "undefined"
                        ? "0px"
                        : "2px"};
                    }

                    .ImageBorder::before {
                      display: ${typeof Image.UpscaledImage !== "undefined" ||
                      Props.StartBoolean !== true
                        ? "none"
                        : "block"};
                    }

                    .ImageBorder::after {
                      background-image: url(${back.src});
                    }
                  `}</style>

                  <img
                    className={styles.Image}
                    src={
                      typeof Image.UpscaledImage !== "undefined"
                        ? Image.UpscaledImage
                        : Image.originalImage
                    }
                    key={index}
                    ref={(event) => {
                      Props.handleSize(event);
                    }}
                    //onLoad={(image) => handleSize(image)}
                  ></img>
                </div>
                <div className={styles.WrapperSVGbuttons}>
                  <div
                    className={styles.CrossButton}
                    onClick={() => {
                      Props.setSelectedImages(
                        Props.selectedImages.filter((e: any) => e !== Image)
                      );
                      Props.setSelectedFilesArray(
                        Props.selectedFilesArray.filter(
                          (e: any) => e.name !== Image.Imagename
                        )
                      );
                    }}
                  >
                    <Plus className={styles.SVGCross} />
                  </div>
                  <div
                    style={{
                      display: `${
                        typeof Image.UpscaledImage !== "undefined"
                          ? "grid"
                          : "none"
                      }`,
                    }}
                    className={styles.CompareButton}
                    onClick={() => {
                      Props.setCloseCompareImage(true);
                      Props.setCompareImaage({
                        original: Image.originalImage,
                        converted: Image.UpscaledImage,
                        ArrayIndex: index,
                      });
                    }}
                  >
                    <SVGCompare
                      style={{
                        transform: "rotate(0deg)",
                        width: "19px",
                        height: "19px",
                      }}
                      className={styles.SVGCross}
                    />
                  </div>
                </div>
              </div>
            ))}
          <label className={styles.AddImagesMobile}>
            <Plus className={styles.SVGPlusImgMobile} />
            <h5 style={{ fontWeight: "500", fontSize: "15px", color: "white" }}>
              Select Images
            </h5>
            <input
              type="file"
              className={styles.inputImage}
              onChange={Props.onSelectFile}
              multiple
              accept="image/png, image/jpeg, image/jpg"
            ></input>
          </label>
          <label className={styles.AddImages}>
            <div className={styles.PlusImg}>
              <Plus className={styles.SVGPlusImg} />
            </div>
            <h3 className={styles.BigText}>Select Image</h3>
            <h5 className={styles.SmallText}>or Drag Image Here</h5>
            <input
              type="file"
              className={styles.inputImage}
              onChange={Props.onSelectFile}
              multiple
              accept="image/png, image/jpeg, image/jpg"
            ></input>
          </label>
        </div>
        <div className={styles.ButtonWrapper}>
          <button
            type="button"
            className={styleButton.SimpleButton}
            onClick={() => {
              Props.setSelectedImages([]);
              Props.setSelectedFilesArray([]);
            }}
          >
            Clear
          </button>
          <button
            type="button"
            className={styleButton.Button}
            onClick={Props.SaveImages}
          >
            Save All
          </button>
        </div>
      </div>
    </>
  );
}
