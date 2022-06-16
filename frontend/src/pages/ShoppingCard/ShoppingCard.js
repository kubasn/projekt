import styles from "./ShoppingCard.module.css";
import { FaShoppingBasket } from "react-icons/fa";
import ShoppingItem from "./ShoppingItem/ShoppingItem";
import { useEffect, useState } from "react";
import useAuth from "../../Hooks/Auth/useAuth";
import axios from "../../axios";
const ShoppingCard = (props) => {
  const [itemsDetails, setItemsDetails] = useState([]);
  const [disableButton, setDisableButton] = useState(true);

  const [price, setPrice] = useState(0);
  const [auth, setAuth] = useAuth();

  let submitOrder = async (e) => {
    e.preventDefault();
    let orders = itemsDetails;
    orders.map((item) => {
      delete item.description;
      delete item.area;
      delete item.imagePath;
      delete item.additionalInfo;
    });
    setDisableButton(true);

    let newOrder;
    if (auth) {
      newOrder = {
        userId: auth.id,
        totalPrice: price,
        order: orders,
        status: "złożone",
      };
    }
    try {
      let res = await axios.post("/orders", newOrder);
      setItemsDetails(null);
      setPrice(0);
      localStorage.removeItem("products");
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    let products = JSON.parse(localStorage.getItem("products"));
    if (products) {
      setItemsDetails(products);
      if (products.length > 0) setDisableButton(false);
      let newprice = 0;
      for (let i = 0; i < products.length; i++) {
        newprice += products[i].price * products[i].quantity;
      }
      setPrice(newprice);
    }
  }, []);

  const onDeleteFunction = (key) => {
    let newItems = itemsDetails;

    let index = itemsDetails.findIndex((x) => x._id === key);
    setPrice(price - itemsDetails[index].price * itemsDetails[index].quantity);

    newItems = newItems.filter((item) => item._id !== key);
    if (newItems.length == 0) setDisableButton(true);
    setItemsDetails(newItems);
    localStorage.setItem("products", JSON.stringify(newItems));
  };

  const onQuantChangeFunction = (key, quant, sign) => {
    let newItems = itemsDetails;
    let index = newItems.findIndex((x) => x._id == key);

    newItems[index].quantity = quant;
    setItemsDetails(newItems);
    localStorage.setItem("products", JSON.stringify(newItems));
    if (sign == "-") setPrice(price - newItems[index].price);
    if (sign == "+") setPrice(price + newItems[index].price);
  };

  return (
    <div className={styles.shoppingPage}>
      <div className={styles.card}>
        <h2
          className={styles.header}
          style={{ textAlign: "center", marginBottom: "2%" }}
        >
          <FaShoppingBasket id={styles.basket} /> TWÓJ KOSZYK
        </h2>
        <div className={styles.details}>
          <div className={styles.products}>
            {itemsDetails
              ? itemsDetails.map((key) => {
                  return (
                    <>
                      <ShoppingItem
                        price={key.price}
                        title={key.title}
                        id={key._id}
                        imagePath={key.imagePath}
                        quantity={key.quantity}
                        onDelete={onDeleteFunction}
                        onQuantChange={onQuantChangeFunction}
                      />
                      <hr />
                    </>
                  );
                })
              : null}
          </div>
        </div>
        <div className={styles.paymentSection}>
          <p id={styles.priceSection}>
            DO ZAPŁATY: <span id={styles.price}>{price} zł</span>
          </p>
          {auth ? (
            <button
              disabled={disableButton}
              onClick={(e) => submitOrder(e)}
              id={styles.payButton}
            >
              ZAPŁAĆ
            </button>
          ) : (
            <>
              <label>Zaloguj się aby kupić projekty</label>
              <button
                disabled={true}
                onClick={(e) => submitOrder(e)}
                id={styles.payButton}
              >
                ZAPŁAĆ
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
export default ShoppingCard;
