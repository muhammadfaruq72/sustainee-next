import React from "react";
import styles from "../../styles/components/AppsExploreHori.module.css";

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
          <div className={styles.Button}>
            <h5 className={styles.ButtonName}>Explore</h5>
          </div>
        </div>
      </div>
    </div>
  );
}
