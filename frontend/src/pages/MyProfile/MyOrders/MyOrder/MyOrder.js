import styles from "./MyOrder.module.css";
import { AiOutlineArrowDown } from "react-icons/ai";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";

const MyOrder = (props) => {
  const [details, showDetails] = useState(false);
  const order = {
    status: "w realizacji",
  };
  const set = (e) => {
    e.preventDefault();
    showDetails(!details);
  };

  const statusColor = (value) => {
    if (
      value == "złożone" ||
      value == "przyjęte do realizacji" ||
      value == "w trakcie realizacji"
    )
      return "#f7c136";
    if (value == "odrzucone") return "#f21b1b";
    if (value == "wysłane") return "#11cf17";
  };
  return (
    <div className={styles.order}>
      <div className={styles.basicDetails}>
        <span className={styles.showInfo} onClick={(e) => set(e)}>
          <b style={{ textAlign: "center" }}>
            Więcej info <AiOutlineArrowDown className={styles.click} />
          </b>
        </span>
        <span>
          <b>ID zamówienia:</b> {props.orders._id}
        </span>
        <span>
          <b>Podsumowanie:</b> {props.totalPrice}
        </span>
        <span>
          <b>Status: </b>
          <label
            style={{
              color: statusColor(props.status),
              fontWeight: "normal",
            }}
          >
            {props.status}
          </label>
        </span>
      </div>
      {details && props.orders.order ? (
        <div className={styles.moreDetails}>
          {props.orders.order.map((item) => {
            return (
              <div className={styles.items}>
                <span>
                  Projekt: <b>{item.title}</b>
                </span>
                <span>
                  Cena: <b>{item.price} zł</b>
                </span>
                <span>
                  Ilość: <b>{item.quantity}</b>
                </span>
              </div>
            );
          })}
        </div>
      ) : null}
    </div>
  );
};
export default MyOrder;
