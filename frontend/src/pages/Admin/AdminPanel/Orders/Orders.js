import { useState } from "react";
import styles from "./Orders.module.css";
import axios from "../../../../axios";

const Orders = (props) => {
  const [show, setShow] = useState(false);
  const [orders, setOrders] = useState([]);
  const [status, setStatus] = useState("");
  const showMore = async (e) => {
    e.preventDefault();
    setShow(!show);
    //  if (show == true) {
    const orders = await axios("/orders", {
      params: { id: props.order._id },
    });
    setOrders(orders.data.message);
    //  }
  };

  const onChangeFunction = (val, id) => {
    setStatus({ ...status, [id]: val });
  };

  const submit = async (e, orderId) => {
    e.preventDefault();

    let newStatus = status[orderId];
    await axios.put(`/orders/${orderId}`, { status: newStatus });
  };

  const options = [
    { value: "złożone", label: "złożone" },
    { value: "przyjęte do realizacji", label: "przyjęte do realizacji" },
    { value: "w trakcie realizacji", label: "w trakcie realizacji" },
    { value: "odrzucone", label: "odrzucone" },
    { value: "wysłane", label: "wysłane" },
  ];

  return (
    <div className={styles.order}>
      <div className={styles.userDetails}>
        <label>{props.order._id.substring(0, 6)}</label>
        <label>{props.order.login}</label>
        <label className={styles.showMore} onClick={(e) => showMore(e)}>
          Pokaż więcej
        </label>
      </div>
      {show ? (
        <div className={styles.moreInfo}>
          <div className={styles.rows}>
            <label>ID zamówienia</label>
            <label>Ilość projektów</label>
            <label>Wartość</label>
            <label>Status</label>
          </div>
          {orders.map((val) => {
            return (
              <div className={styles.details}>
                <label>{val._id}</label>
                <label>{val.order.length} </label>
                <label>{val.totalPrice} złotych</label>
                <form
                  onSubmit={(e) => submit(e, val._id)}
                  className={styles.status}
                >
                  <select
                    onChange={(e) => onChangeFunction(e.target.value, val._id)}
                  >
                    {options.map((option) => (
                      <option
                        selected={val.status == option.value ? true : false}
                        value={option.value}
                      >
                        {option.label}
                      </option>
                    ))}
                  </select>
                  <button type="submit" id={styles.submit}>
                    Zapisz
                  </button>
                </form>
              </div>
            );
          })}
        </div>
      ) : null}
    </div>
  );
};

export default Orders;
