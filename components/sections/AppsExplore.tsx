import Link from "next/link";
import React from "react";
import styles from "../../styles/components/AppExplore.module.css";

interface props {
  title: string;
  subtitle: string;
  image: string;
  link: string;
}

export default function AppsExplore(props: props) {
  const { title, subtitle, image, link } = props;
  return (
    <div className={styles.Wrapper}>
      <div className={styles.ContentWrapper}>
        <img className={styles.Image} src={image} />
        <h5 className={styles.Title}>{title}</h5>
        <p className={styles.Subtitle}>{subtitle}</p>
        <Link href={link}>
          {" "}
          <div className={styles.Button}>
            <h5 className={styles.ButtonName}>Explore</h5>
          </div>
        </Link>
      </div>
    </div>
  );
}
