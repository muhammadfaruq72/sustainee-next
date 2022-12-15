import Plus from "../../../public/images/appExplore/plus";
import styles from "../../../styles/components/BGApp/BGApp.module.css";
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
}

export default function ImageBox(Props: props) {
  return (
    <>
      <div className={styles.BoxWrapper} style={Props.dragStyle}>
        <div className={styles.AddedImages}>
          {Props.selectedImages &&
            Props.gliderState === "0" &&
            Props.selectedImages.map((Image: any, index: any) => (
              <div className={styles.ImagesContainer} key={index}>
                <div className={`ImageBorder ${styles.ImageBorder}`}>
                  <style jsx>{`
                    .ImageBorder {
                      padding: ${typeof Image.U2net !== "undefined"
                        ? "0px"
                        : "2px"};
                    }

                    .ImageBorder::before {
                      display: ${typeof Image.U2net !== "undefined" ||
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
                      typeof Image.U2net !== "undefined"
                        ? Image.U2net
                        : Image.originalImage
                    }
                    key={index}
                    ref={(event) => {
                      Props.handleSize(event);
                    }}
                    //onLoad={(image) => handleSize(image)}
                  ></img>
                </div>
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
              </div>
            ))}

          {Props.selectedImages &&
            Props.gliderState === "1" &&
            Props.selectedImages.map((Image: any, index: any) => (
              <div className={styles.ImagesContainer} key={index}>
                <div className={`ImageBorder ${styles.ImageBorder}`}>
                  <style jsx>{`
                    .ImageBorder {
                      padding: ${typeof Image.Stickerinator !== "undefined"
                        ? "0px"
                        : "2px"};
                    }

                    .ImageBorder::before {
                      display: ${typeof Image.Stickerinator !== "undefined" ||
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
                      typeof Image.Stickerinator !== "undefined"
                        ? Image.Stickerinator
                        : Image.originalImage
                    }
                    key={index}
                    ref={(event) => {
                      Props.handleSize(event);
                    }}
                    //onLoad={(image) => handleSize(image)}
                  ></img>
                </div>
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
