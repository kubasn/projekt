import styles from "./Project.module.css";
import { AiOutlineDownload } from "react-icons/ai";
import { RiPriceTag3Line } from "react-icons/ri";
import { BiMessageSquareAdd } from "react-icons/bi";
import { AiFillTags } from "react-icons/ai";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "../../axios";
const Project = (props) => {
  const [show, setShow] = useState(false);
  const [offer, setOffer] = useState({});
  const { id } = useParams();

  const backend = {
    quantity: 1,
  };
  let products = [];

  useEffect(async () => {
    try {
      await axios
        .get(`/offers/${id}`)
        .then((offer) => {
          offer.data.message.quantity = 1;
          setOffer(offer.data.message);
        })
        .catch((err) => console.log(err));
    } catch (err) {
      console.log(err);
    }
  }, []);

  const addProduct = () => {
    setShow(true);
    setTimeout(() => {
      setShow(false);
    }, 4000);
    products = JSON.parse(localStorage.getItem("products"));
    if (products && products.length > 0) {
      for (let i = 0; i < products.length; i++) {
        if (products[i]._id == id) {
          products[i].quantity++;
          break;
        }
        if (products.length - 1 == i) {
          products.push(offer);
          break;
        }
      }

      // products.push(offer);
      localStorage.setItem("products", JSON.stringify(products));
    } else {
      products = [];
      products.push(offer);
      localStorage.setItem("products", JSON.stringify(products));
    }
  };

  return (
    <div className={styles.Project}>
      <div className={styles.card}>
        <h1 className={styles.heading1}>{offer.title}</h1>
        <img
          className={`card-img ${styles.image}`}
          src={offer.imagePath}
          alt="Card image"
        />
        <div className={styles.details}>
          <div className={styles.leftSide}>
            <p>
              <RiPriceTag3Line /> Cena: {offer.price} zł
            </p>
            <p>
              <BiMessageSquareAdd /> Powierzchnia: {offer.area} m<sup>2</sup>
            </p>
          </div>
          <div className={styles.rightSide}>
            <button onClick={addProduct} className={styles.button}>
              KUP PROJEKT
            </button>
          </div>
        </div>
        <div className={`table-responsive ${styles.table}`}>
          <table className="table">
            <thead>
              <tr>
                <th scope="col">Wymiary</th>
                <th scope="col">Technologia</th>
                <th scope="col">Konstrukcja</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  Wysokość budynku :{" "}
                  <b>
                    {offer.additionalInfo ? offer.additionalInfo.height : ""} m
                  </b>
                </td>
                <td>
                  ogrzewanie podłogowe:{" "}
                  <b>
                    {offer.additionalInfo ? offer.additionalInfo.heating : ""}
                  </b>
                </td>
                <td>
                  strop:{" "}
                  <b>
                    {offer.additionalInfo ? offer.additionalInfo.ceiling : ""}
                  </b>
                </td>
              </tr>
              <tr>
                <td>
                  Kubatura:{" "}
                  <b>
                    {offer.additionalInfo ? offer.additionalInfo.volume : ""}m
                    <sup>3</sup>
                  </b>
                </td>
                <td>
                  wentylacja:{" "}
                  <b>
                    {offer.additionalInfo
                      ? offer.additionalInfo.ventilation
                      : ""}
                  </b>
                </td>
                <td>
                  dach:{" "}
                  <b>{offer.additionalInfo ? offer.additionalInfo.roof : ""}</b>
                </td>
              </tr>
              <tr>
                <td>
                  Powierzchnia podłóg:{" "}
                  <b>
                    {offer.additionalInfo
                      ? offer.additionalInfo.floorSurface
                      : ""}{" "}
                    m<sup>2</sup>
                  </b>
                </td>
                <td></td>
                <td></td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className={styles.details3}>
          <h2>Opis projektu:</h2>
          <p>{offer.description}</p>
        </div>
        <div className={styles.details2}>
          <a
            href="https://i0.wp.com/samhouseplans.com/wp-content/uploads/2019/05/7x15m-layout-floor-plan-rotated.jpg?fit=1280%2C1600&ssl=1 "
            target="_blank"
          >
            <AiOutlineDownload /> Pobierz projekt
          </a>
        </div>
        <div className={styles.details4}>
          <span>
            <AiFillTags /> TAGI:{" "}
            <span className={styles.tags}>
              {" "}
              energooszczędny, projekty małych domów, projekty domów
              nowoczesnych{" "}
            </span>
          </span>
        </div>
      </div>
      {show ? (
        <div className={styles.showBar}>
          <span>Dodałeś projekt do koszyka</span>
        </div>
      ) : null}
    </div>
  );
};

export default Project;
