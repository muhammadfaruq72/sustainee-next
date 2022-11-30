import React, { useState, useEffect, useRef } from "react";
import styles from "../../../styles/components/WorkingApp.module.css";
import Plus from "../../../public/images/appExplore/plus";
import Cube from "../../../public/images/appExplore/cube";
import PictureSVG from "../../../public/images/appExplore/picture";
import Process from "../../../public/images/appExplore/process";
import Arrow from "../../../public/images/appExplore/Arrow";
import back from "../../../public/images/back.png";
//import Mutation from "./ApolloWorkingApp";
import { base64StringToBlob } from "blob-util";
import { gql, useQuery, useMutation } from "@apollo/client";
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

var MUTATION: any;
var waitForMutate: Boolean = true;
var selectedFilesArray: File[] = [];
var selectedFilesArrayDuplicate: File[] = [];
var StartBoolean: Boolean = false;
var waitForRes: number = 1;
export default function WorkingApp() {
  const [selectedImages, setSelectedImages] = useState(Array<ImagesOBJ>);
  const [gliderState, setGlider] = useState("0");
  //const [StartBoolean, setStartBoolean] = useState(true);

  if (gliderState === "0") {
    MUTATION = gql`
      mutation ($file: Upload!) {
        U2net(file: $file) {
          name
          imageFile
        }
      }
    `;
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
  }

  const [mutate, { loading, error, data: mutateResponse }] = useMutation(
    MUTATION,
    {
      onCompleted(data) {
        //console.log("onCompleted", data);
        const contentType = "image/png";
        var blob;
        var name: any;
        if (gliderState === "0") {
          blob = base64StringToBlob(data.U2net.imageFile, contentType);
          name = data.U2net.name;
          const blobImage = URL.createObjectURL(blob);
          setSelectedImages((current) =>
            current.map((obj) => {
              //console.log("Start typeof U2net", typeof obj.U2net);
              if (obj.Imagename === name) {
                return { ...obj, U2net: blobImage };
              }
              //console.log("end typeof U2net", typeof obj.U2net);
              return obj;
            })
          );
        } else {
          blob = base64StringToBlob(data.Stickerinator.imageFile, contentType);
          name = data.Stickerinator.name;
          const blobImage = URL.createObjectURL(blob);
          setSelectedImages((current) =>
            current.map((obj) => {
              //console.log("Start typeof U2net", typeof obj.U2net);
              if (obj.Imagename === name) {
                return { ...obj, Stickerinator: blobImage };
              }
              //console.log("end typeof U2net", typeof obj.U2net);
              return obj;
            })
          );
        }
        waitForMutate = true;
        //console.log("onCompleted waitForMutate", waitForMutate);
        waitForRes = waitForRes + 1;
      },
    }
  );

  const handleSize = (event: any) => {
    //console.log(image?.offsetWidth);
  };

  const onSelectFile = async (event: any) => {
    const selectedFiles: File[] = Array.from(event.target.files);
    //console.log("selectedFiles", selectedFiles);
    selectedFilesArrayDuplicate =
      selectedFilesArrayDuplicate.concat(selectedFiles);
    //console.log("selectedFilesArray", selectedFilesArray);
    //selectedFilesArray.push(selectedFilesArray);
    //console.log("selectedFilesArray", selectedFilesArray);

    const imagesArray: Array<ImagesOBJ> = selectedFiles.map((image: any) => {
      //console.log(typeof image, image);
      // console.log(
      //   typeof URL.createObjectURL(image),
      //   URL.createObjectURL(image)
      // );
      return {
        Imagename: image.name,
        originalImage: URL.createObjectURL(image),
      };
    });
    //console.log("imagesArray", imagesArray);
    setSelectedImages(selectedImages.concat(imagesArray));
  };

  const onStartButton = async () => {
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
      // console.log(
      //   "0 = selectedFilesArrayDuplicate",
      //   selectedFilesArrayDuplicate
      // );
      // console.log("0 selectedFilesArray", selectedFilesArray);
      for (let i = 0; i < selectedFilesArrayDuplicate.length; i++) {
        if (
          gliderState === "0" &&
          typeof selectedImages[i].U2net === "undefined"
        ) {
          if (waitForRes >= selectedFilesArrayDuplicate.length + 1) {
            waitForRes = selectedFilesArrayDuplicate.length - zero;
            waitForRes = waitForRes + 1;
            console.log("At zero waitForRes", waitForRes);
          }
          //console.log("forEach Before waitUntil", waitForMutate);
          StartBoolean = true;
          await pWaitFor(() => waitForMutate == true);
          var file = selectedFilesArrayDuplicate[i];
          //console.log("tempFile", file);

          mutate({ variables: { file } });
          waitForMutate = false;
          if (i == selectedFilesArrayDuplicate.length - 1) {
            await pWaitFor(
              () => waitForRes == selectedFilesArrayDuplicate.length + 1
            );
            //console.log("0 wait StartBoolean", StartBoolean);
            StartBoolean = false;
          }
          StartBoolean = false;
          //console.log("forEach After waitUntil", waitForMutate);
        }

        if (
          gliderState === "1" &&
          typeof selectedImages[i].Stickerinator === "undefined"
        ) {
          if (waitForRes >= selectedFilesArrayDuplicate.length + 1) {
            waitForRes = selectedFilesArrayDuplicate.length - one;
            waitForRes = waitForRes + 1;
            console.log("At one waitForRes", waitForRes);
          }
          //console.log("forEach Before waitUntil", waitForMutate);
          StartBoolean = true;
          await pWaitFor(() => waitForMutate == true);
          var file = selectedFilesArrayDuplicate[i];
          //console.log("tempFile", file);

          mutate({ variables: { file } });
          waitForMutate = false;
          if (i == selectedFilesArrayDuplicate.length - 1) {
            await pWaitFor(
              () => waitForRes == selectedFilesArrayDuplicate.length + 1
            );
            StartBoolean = false;
            //console.log("1 wait StartBoolean", StartBoolean);
          }
          StartBoolean = false;
          //console.log("forEach After waitUntil", waitForMutate);
        }
      }
    } catch (err) {
      alert(err);
    }
  };

  useEffect(() => {
    // console.log("UseEffect selectedFilesArray", selectedFilesArray);
    // console.log(
    //   "UseEffect selectedFilesArrayDuplicate",
    //   selectedFilesArrayDuplicate
    // );
    // console.log("UseEffect selectedImages of Array", selectedImages);
    console.log(
      "UseEffect waitForRes",
      waitForRes,
      selectedFilesArrayDuplicate.length,
      StartBoolean
    );
    //console.log("UseEffect StartBoolean", StartBoolean);
  }, [selectedImages, StartBoolean]);

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
            <Process className={`${styles.ProcessSVG} `} />
            <h4 className={styles.textAnimBtn}>Start</h4>
            <Arrow className={styles.ArrowSVG} />
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
