import React, { useContext, useEffect, useState } from "react";
import styles from "../../../styles/components/BGApp/BGApp.module.css";
import styleButton from "../../../styles/SmallComponents/Buttons.module.css";
import Cube from "../../../public/images/appExplore/cube";
import PictureSVG from "../../../public/images/appExplore/picture";
import Process from "../../../public/images/appExplore/process";
import Arrow from "../../../public/images/appExplore/Arrow";
import Context from "./Upscaler_";
import Toggle from "./Toggle";
import AnimatedButton from "./AnimatedButton";
import Delete from "../../../public/images/appExplore/Delete.svg";
import Save from "../../../public/images/appExplore/save.svg";
import ImageBox from "./ImageBox";
import Dropdown from "./Dropdown";
import CompareImage from "./CompareImage";

interface CompareImgObject {
  original?: string;
  converted?: string;
  ArrayIndex?: number;
}

export default function Upscaler() {
  const [compareImage, setCompareImaage] = useState<CompareImgObject>();
  const [closeCompareImage, setCloseCompareImage] = useState(false);
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
    <>
      {closeCompareImage && (
        <CompareImage
          leftImage={`${compareImage?.original}`}
          rightImage={`${compareImage?.converted}`}
          setCloseCompareImage={setCloseCompareImage}
          closeCompareImage={closeCompareImage}
          selectedImages={selectedImages}
          compareImage={compareImage}
          setCompareImaage={setCompareImaage}
        />
      )}
      <div
        className={styles.Wrapper}
        onDrop={onDrop}
        onDragOver={onDrag}
        onDragLeave={onDragLeave}
      >
        <div className={styles.ContentWrapper}>
          <div className={styles.TextWrapper}>
            <h4 className={styles.Title}>Enhance image quality with AI</h4>
            <h5 className={styles.Description}>
              Image upscaler can improve image quality using advanced AI models.
            </h5>
          </div>
          <div className={styles.Stack}>
            <Toggle
              gliderState={gliderState}
              glider={glider}
              FirstSVG={PictureSVG}
              FirstText="Picture"
              SecondSVG={Cube}
              SecondText="Art work"
            />
            <Dropdown />
            <AnimatedButton
              StartBoolean={StartBoolean}
              onStartButton={onStartButton}
              FirstSVG={Process}
              SecondSVG={Arrow}
            />
          </div>
          <ImageBox
            dragStyle={dragStyle}
            selectedImages={selectedImages}
            gliderState={gliderState}
            StartBoolean={StartBoolean}
            handleSize={handleSize}
            setSelectedImages={setSelectedImages}
            setSelectedFilesArray={setSelectedFilesArray}
            selectedFilesArray={selectedFilesArray}
            onSelectFile={onSelectFile}
            SaveImages={SaveImages}
            setCloseCompareImage={setCloseCompareImage}
            setCompareImaage={setCompareImaage}
          />
          <div className={styleButton.functionStack}>
            <Toggle
              gliderState={gliderState}
              glider={glider}
              FirstSVG={PictureSVG}
              FirstText="Picture"
              SecondSVG={Cube}
              SecondText="Art work"
              mobileOnly={true}
            />
            <Dropdown />
          </div>
          <div className={styleButton.HStackBtn}>
            <AnimatedButton
              StartBoolean={StartBoolean}
              onStartButton={onStartButton}
              FirstSVG={Process}
              SecondSVG={Arrow}
              mobileOnly={true}
            />
            <div
              className={styleButton.deleteBtn}
              onClick={() => {
                setSelectedImages([]);
                setSelectedFilesArray([]);
              }}
            >
              <Delete
                style={{
                  stroke: "#ea2d49",
                  width: "30px",
                  margin: "auto auto",
                }}
              />
            </div>
            <div className={styleButton.saveBtn} onClick={SaveImages}>
              <Save
                style={{
                  stroke: "#ea2d49",
                  width: "30px",
                  margin: "auto auto",
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
