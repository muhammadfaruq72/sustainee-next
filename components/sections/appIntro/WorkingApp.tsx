import React, { useState, useEffect } from "react";
import styles from "../../../styles/components/WorkingApp.module.css";
import Plus from "../../../public/images/appExplore/plus";
import Cube from "../../../public/images/appExplore/cube";
import PictureSVG from "../../../public/images/appExplore/picture";
import Process from "../../../public/images/appExplore/process";
import Arrow from "../../../public/images/appExplore/Arrow";
import back from "../../../public/images/back.png";
import { base64StringToBlob } from "blob-util";
import { gql, useMutation } from "@apollo/client";
import pWaitFor from "p-wait-for";

interface File {
  name: string;
  lastModified: number;
  webkitRelativePath: string;
  size: number;
  type: string;
}

interface ImagesOBJ {
  Imagename?: string;
  originalImage: string;
  U2net?: string;
  Stickerinator?: string;
}

var waitForMutate: Boolean = true;
var selectedFilesArray: File[] = [];
var waitForRes: number = 1;
var startTriggered: Boolean = false;

export default function WorkingApp() {
  const [selectedImages, setSelectedImages] = useState(Array<ImagesOBJ>);
  const [gliderState, setGlider] = useState("0");
  const [StartBoolean, setStartBoolean] = useState(false);
  const [mutate, { loading, error, data: mutateResponse }] = useMutation(
    MUTATION(gliderState),
    {
      onCompleted(data) {
        if (gliderState === "0") {
          ResponseData(data.U2net, "U2net", setSelectedImages);
        } else {
          ResponseData(data.Stickerinator, "Stickerinator", setSelectedImages);
        }
        waitForMutate = true;
        waitForRes = waitForRes + 1;
      },
    }
  );

  const handleSize = (event: any) => {};

  const onSelectFile = async (event: any) => {
    var selectedFiles: File[] = Array.from(event.target.files);
    selectedFilesArray = selectedFilesArray.concat(selectedFiles);

    const imagesArray: Array<ImagesOBJ> = selectedFiles.map((image: any) => {
      return {
        Imagename: image.name,
        originalImage: URL.createObjectURL(image),
      };
    });

    selectedFiles = [];
    setSelectedImages(selectedImages.concat(imagesArray));
  };

  const onStartButton = () => {
    setStartBoolean(true);

    if (startTriggered === true) {
      alert("Already triggered");
    } else {
      StartButton(selectedImages, gliderState, mutate).then(function () {
        setStartBoolean(false);
        startTriggered = false;
        console.log("I'm excecuted", StartBoolean);
      });
    }
  };

  useEffect(() => {
    console.log("UseEffect StartBoolean", StartBoolean);
  }, [StartBoolean]);

  const glider = (e: any) => {
    setGlider(e.currentTarget.id);
  };

  return (
    <div className={styles.Wrapper}>
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
                  gliderState === "0" ? styles.ButtonName : styles.glidertextRed
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
                  gliderState === "1" ? styles.ButtonName : styles.glidertextRed
                }`}
              >
                Art Work
              </h5>
            </div>
          </div>
          <div className={styles.btnAnimated} onClick={onStartButton}>
            <Process
              className={`${styles.ProcessSVG} ${
                StartBoolean !== true ? styles.displayBlock : styles.rotation
              }`}
            />
            <h4 className={styles.textAnimBtn}>{`${
              StartBoolean !== true ? "Start" : "Processing"
            }`}</h4>
            <Arrow
              className={`${styles.ArrowSVG} ${
                StartBoolean !== true ? styles.displayBlock : styles.displayNone
              }`}
            />
          </div>
        </div>
        <div className={styles.BoxWrapper}>
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
                    onClick={() =>
                      setSelectedImages(
                        selectedImages.filter((e) => e !== Image)
                      )
                    }
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
                    onClick={() =>
                      setSelectedImages(
                        selectedImages.filter((e) => e !== Image)
                      )
                    }
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
            <div className={styles.SimpleButton}>
              <h5 className={styles.SimpleName}>Clear</h5>
            </div>
            <div className={styles.Button}>
              <h5 className={styles.ButtonName}>Save All</h5>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function MUTATION(gliderState: any) {
  var MUTATION: any;
  if (gliderState === "0") {
    MUTATION = gql`
      mutation ($file: Upload!) {
        U2net(file: $file) {
          name
          imageFile
        }
      }
    `;
    return MUTATION;
  }
  if (gliderState === "1") {
    MUTATION = gql`
      mutation ($file: Upload!) {
        Stickerinator(file: $file) {
          name
          imageFile
        }
      }
    `;
    return MUTATION;
  }
}

const contentType = "image/png";
var blob;
var name: any;
function ResponseData(data: any, Model: any, setSelectedImages: any) {
  blob = base64StringToBlob(data.imageFile, contentType);
  name = data.name;
  const blobImage = URL.createObjectURL(blob);
  setSelectedImages((current: any) =>
    current.map((obj: any) => {
      if (obj.Imagename === name && Model === "U2net") {
        return { ...obj, U2net: blobImage };
      }
      if (obj.Imagename === name && Model === "Stickerinator") {
        return { ...obj, Stickerinator: blobImage };
      }
      return obj;
    })
  );
}

async function StartButton(selectedImages: any, gliderState: any, mutate: any) {
  startTriggered = true;
  var zero = 0;
  var one = 0;
  for (let i = 0; i < selectedImages.length; i++) {
    if (typeof selectedImages[i].U2net === "undefined") {
      zero = zero + 1;
    }
    if (typeof selectedImages[i].Stickerinator === "undefined") {
      one = one + 1;
    }
    console.log("zero", zero, "one", one);
  }

  try {
    for (let i = 0; i < selectedFilesArray.length; i++) {
      if (
        gliderState === "0" &&
        typeof selectedImages[i].U2net === "undefined"
      ) {
        if (waitForRes >= selectedFilesArray.length + 1) {
          waitForRes = selectedFilesArray.length - zero;
          waitForRes = waitForRes + 1;
          console.log("At zero waitForRes", waitForRes);
        }
        await pWaitFor(() => waitForMutate == true);
        var file = selectedFilesArray[i];

        mutate({ variables: { file } });
        waitForMutate = false;
        if (i == selectedFilesArray.length - 1) {
          await pWaitFor(() => waitForRes == selectedFilesArray.length + 1);
        }
      }

      if (
        gliderState === "1" &&
        typeof selectedImages[i].Stickerinator === "undefined"
      ) {
        if (waitForRes >= selectedFilesArray.length + 1) {
          waitForRes = selectedFilesArray.length - one;
          waitForRes = waitForRes + 1;
          console.log("At one waitForRes", waitForRes);
        }
        await pWaitFor(() => waitForMutate == true);
        var file = selectedFilesArray[i];

        mutate({ variables: { file } });
        waitForMutate = false;
        if (i == selectedFilesArray.length - 1) {
          await pWaitFor(() => waitForRes == selectedFilesArray.length + 1);
        }
      }
    }
  } catch (err) {
    alert(err);
  }
}
