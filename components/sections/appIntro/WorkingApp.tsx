import React, { useState, useEffect, useContext, useRef } from "react";
import styles from "../../../styles/components/WorkingApp.module.css";
import styleButton from "../../../styles/SmallComponents/Buttons.module.css";
import Plus from "../../../public/images/appExplore/plus";
import Cube from "../../../public/images/appExplore/cube";
import PictureSVG from "../../../public/images/appExplore/picture";
import Process from "../../../public/images/appExplore/process";
import Arrow from "../../../public/images/appExplore/Arrow";
import back from "../../../public/images/back.png";
import Context from "./WorkingApp_one";
import Explore from "../../../public/images/appExplore/explore";

export default function WorkingApp() {
  const {
    gliderState,
    glider,
    onStartButton,
    StartBoolean,
    selectedImages,
    setSelectedImages,
    onSelectFile,
    handleSize,
    SaveImages,
    setSelectedFilesArray,
    selectedFilesArray,
    dragStyle,
    onDrag,
    onDrop,
    onDragLeave,
  } = useContext(Context);

  return (
    <div
      className={styles.Wrapper}
      onDrop={onDrop}
      onDragOver={onDrag}
      onDragLeave={onDragLeave}
    >
      <div className={styles.ContentWrapper}>
        <div className={styles.TextWrapper}>
          <h4 className={styles.Title}>Remove Image Background with AI</h4>
          <h5 className={styles.Description}>
            Our app gives you the chance to shine against completely clear photo
            backgrounds
          </h5>
        </div>
        <div className={styles.Stack}>
          <div className={styles.ToggleWrapper}>
            <span
              className={`${styles.glider} ${
                gliderState === "0" ? styles.glider0 : styles.glider1
              }`}
            ></span>
            <div className={styles.ToggleButton} id="0" onClick={glider}>
              <PictureSVG
                className={`${styles.SVGPicture} ${
                  gliderState === "0" ? styles.strokeWhite : styles.strokeGrey
                }`}
              />
              <h5
                className={`${
                  gliderState === "0"
                    ? styles.glidertextWhite
                    : styles.glidertextRed
                }`}
              >
                Picture
              </h5>
            </div>
            <div className={styles.ToggleButton} id="1" onClick={glider}>
              <Cube
                className={`${styles.SVGCube} ${
                  gliderState === "1" ? styles.strokeWhite : styles.strokeGrey
                }`}
              />
              <h5
                className={`${
                  gliderState === "1"
                    ? styles.glidertextWhite
                    : styles.glidertextRed
                }`}
              >
                Art Work
              </h5>
            </div>
          </div>
          <div className={styleButton.btnAnimated} onClick={onStartButton}>
            <Process
              className={`${styleButton.firstSVG} ${
                StartBoolean !== true
                  ? styleButton.displayBlock
                  : styleButton.rotation
              }`}
            />
            <h4 className={styleButton.textAnimBtn}>{`${
              StartBoolean !== true ? "Start" : "Processing"
            }`}</h4>
            <Arrow
              className={`${styleButton.secondSVG} ${
                StartBoolean !== true
                  ? styleButton.displayBlock
                  : styleButton.displayNone
              }`}
            />
          </div>
        </div>
        <div className={styles.BoxWrapper} style={dragStyle}>
          <div className={styles.AddedImages}>
            {selectedImages &&
              gliderState === "0" &&
              selectedImages.map((Image: any, index: any) => (
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
                        StartBoolean !== true
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
                        handleSize(event);
                      }}
                      //onLoad={(image) => handleSize(image)}
                    ></img>
                  </div>
                  <div
                    className={styles.CrossButton}
                    onClick={() => {
                      setSelectedImages(
                        selectedImages.filter((e: any) => e !== Image)
                      );
                      setSelectedFilesArray(
                        selectedFilesArray.filter(
                          (e: any) => e.name !== Image.Imagename
                        )
                      );
                    }}
                  >
                    <Plus className={styles.SVGCross} />
                  </div>
                </div>
              ))}

            {selectedImages &&
              gliderState === "1" &&
              selectedImages.map((Image: any, index: any) => (
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
                        StartBoolean !== true
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
                        handleSize(event);
                      }}
                      //onLoad={(image) => handleSize(image)}
                    ></img>
                  </div>
                  <div
                    className={styles.CrossButton}
                    onClick={() => {
                      setSelectedImages(
                        selectedImages.filter((e: any) => e !== Image)
                      );
                      setSelectedFilesArray(
                        selectedFilesArray.filter(
                          (e: any) => e.name !== Image.Imagename
                        )
                      );
                    }}
                  >
                    <Plus className={styles.SVGCross} />
                  </div>
                </div>
              ))}

            <label className={styles.AddImages}>
              <div className={styles.PlusImg}>
                <Plus className={styles.SVGPlusImg} />
              </div>
              <h3 className={styles.BigText}>Select Image</h3>
              <h5 className={styles.SmallText}>or Drag Image Here</h5>
              <input
                type="file"
                className={styles.inputImage}
                onChange={onSelectFile}
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
                setSelectedImages([]);
                setSelectedFilesArray([]);
              }}
            >
              Clear
            </button>
            <button
              type="button"
              className={styleButton.Button}
              onClick={SaveImages}
            >
              Save All
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
