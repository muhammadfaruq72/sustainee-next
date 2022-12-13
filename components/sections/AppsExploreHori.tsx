import React from "react";
import styles from "../../styles/components/AppsExploreHori.module.css";
import styleButton from "../../styles/SmallComponents/Buttons.module.css";

interface props {
  title: string;
  subtitle: string;
  image: string;
}

export default function AppsExploreHori(props: props) {
  const { title, subtitle, image } = props;
  return (
    <div className={styles.Wrapper}>
      <div className={styles.ContentWrapper}>
        <img className={styles.Image} src={image} />
        <div className={styles.HoriWrapper}>
          <h5 className={styles.Title}>{title}</h5>
          <p className={styles.Subtitle}>{subtitle}</p>
          <button type="button" className={styleButton.Button}>
            Explore
          </button>
        </div>
      </div>
    </div>
  );
}
