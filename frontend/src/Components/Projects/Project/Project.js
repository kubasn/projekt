import styles from "./Project.module.css";
import { Link } from "react-router-dom";
const Project = (props) => {
  const details = props;
  return (
    <div className={`${styles.project} card`}>
      <span className={styles.area}>{props.area} metrów</span>
      <span className={styles.price}>{props.price} złotych</span>
      <Link to={`/oferty/${props._id}`}>
        <img className={styles.image} src={props.imagePath} alt="Card image" />
        <span className={styles.hide}>{props.title}</span>
      </Link>
    </div>
  );
};

export default Project;
