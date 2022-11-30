import React from "react";
import AppsExplore from "./AppsExplore";
import AppsExploreHori from "./AppsExploreHori";
import styles from "../../styles/components/IntroSections.module.css";

export default function IntroSection() {
  return (
    <div className={styles.Wrapper}>
      <div className={styles.ContentWrapper}>
        <div className={styles.TextWrapper}>
          <h4 className={styles.Title}>Tools to enhance your creativity</h4>
          <h4 className={styles.Description}>
            These tools open up a new door for creativity. A solid set of
            features that will help you to be more creative.
          </h4>
        </div>
        <div className={styles.AppsWrapperHori}>
          <div className={styles.AppsWrapper}>
            <AppsExplore
              title="AI Image Background Remover"
              subtitle="Our app gives you the chance to shine against completely clear photo
        backgrounds."
              image="../../images/appExplore/bgRemove.png"
              link="/BackgroundRemover"
            />
            <AppsExplore
              title="AI Image Upscaler"
              subtitle="Sustainee Image upscaler can improve image quality
          using advanced AI models."
              image="../../images/appExplore/upscaler.png"
              link="/"
            />
          </div>
          <AppsExploreHori
            title="AI Paraphraser Tool, Rewrite Any Text"
            subtitle="A paraphrase must provide the same information as
            the original and be written in your own word
            choice and sentence structure."
            image="../../images/appExplore/reWrite.png"
          />
        </div>
      </div>
    </div>
  );
}
