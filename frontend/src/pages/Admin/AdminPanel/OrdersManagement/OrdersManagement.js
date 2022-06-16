import { useEffect, useState } from "react";
import Orders from "../Orders/Orders";
import styles from "./OrdersManagement.module.css";
import axios from "../../../../axios";
const OrdersManagement = (props) => {
  const [orders, setOrders] = useState([]);
  useEffect(async () => {
    const users = await axios.get("/users");
    setOrders(users.data);
  }, []);
  return (
    <div className={styles.adminPanel}>
      <div className={styles.panel}>
        <h2 id={styles.heading}>Zamówienia</h2>
        <div className={styles.orders}>
          <div className={styles.rows}>
            <label>ID użytkownika</label>
            <label>Nazwa użytkownika</label>
            <label>Więcej informacji</label>
          </div>
          {orders.map((order) => (
            <Orders order={order} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default OrdersManagement;
