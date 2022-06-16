import { useEffect, useState } from "react";
import MyOrder from "./MyOrder/MyOrder";
import axios from "../../../axios";
import useAuth from "../../../Hooks/Auth/useAuth";

const MyOrders = (props) => {
  const [auth, setAuth] = useAuth();
  const [orders, setOrders] = useState([]);

  useEffect(async () => {
    let newOrders = await axios("/orders", { params: { id: auth.id } });
    newOrders = newOrders.data.message;
    setOrders(newOrders);
  }, []);

  return (
    <div>
      {orders
        ? orders.map((order, key) => (
            <MyOrder
              orders={order}
              status={orders[key].status}
              totalPrice={orders[key].totalPrice}
            />
          ))
        : null}
    </div>
  );
};

export default MyOrders;
