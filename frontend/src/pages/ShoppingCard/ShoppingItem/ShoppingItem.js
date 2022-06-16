import styles from "./ShoppingItem.module.css";
import { BsTrash } from "react-icons/bs";
import { useEffect, useState } from "react";

const ShoppingItem = (props) => {
  let [quant, setQuant] = useState(props.quantity);
  const quantFunc = (type) => {
    let newQuant = quant;
    if (type == "decrease") {
      if (newQuant > 0) {
        newQuant = newQuant - 1;
        setQuant(newQuant);
        props.onQuantChange(props.id, newQuant, "-");
      }
    } else {
      newQuant = newQuant + 1;
      setQuant(newQuant);
      props.onQuantChange(props.id, newQuant, "+");
    }
  };

  useEffect(() => {
    setQuant(props.quantity);
  }, [props.quantity]);

  return (
    <div className={styles.item}>
      <div className={styles.details1}>
        <BsTrash onClick={() => props.onDelete(props.id)} id={styles.trash} />
      </div>
      <img className={styles.img} src={props.imagePath} />
      <div className={styles.details}>
        <p>{props.title}</p>
        <div className={styles.quantSelect}>
          <button onClick={() => quantFunc("decrease")} id={styles.button1}>
            -
          </button>
          <span id={styles.counter}>{quant}</span>
          <button onClick={() => quantFunc("increase")} id={styles.button1}>
            +
          </button>
        </div>
        <p id={styles.price}>
          Cena: <span>{props.price} zł</span>
        </p>
      </div>
    </div>
  );
};

export default ShoppingItem;
