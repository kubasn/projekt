import styles from "./Footer.module.css";
import { AiOutlineInstagram } from "react-icons/ai";
import { FaYoutube } from "react-icons/fa";

export function Footer(props) {
  return (
    <div className={styles.footer}>
      <div className={styles.leftSide}>
        <p className={styles.first}>PROJEKTY.PL</p>
        <p className={styles.second}>BIURO PROJEKTÓW KRAKÓW</p>
      </div>
      <div className={styles.centerSide}></div>
      <div className={styles.rightSide}>
        <p className={styles.rightFirst}>Znajdź nas na:</p>
        <div className={styles.icons}>
          <AiOutlineInstagram className={styles.icon1} />
          <FaYoutube className={styles.icon2} />
        </div>
      </div>
    </div>
  );
}
