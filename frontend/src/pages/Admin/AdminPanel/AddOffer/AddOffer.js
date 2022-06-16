import { useState } from "react";
import validations from "../../../../helpers/validations";
import style from "./AddOffer.module.css";
import axios from "../../../../axios";

const AddOffer = (props) => {
  const [offer, setOffer] = useState({
    title: {
      value: "",
      rules: [{ rule: "minCharacters", value: 5 }, "required"],
      errorLog: "",
    },
    price: {
      value: "",
      rules: ["numberRequired", "required"],
      errorLog: "",
    },
    area: {
      value: "",
      rules: ["numberRequired", "required"],
      errorLog: "",
    },
    description: {
      value: "",
      rules: [{ rule: "minCharacters", value: 5 }, "required"],
      errorLog: "",
    },
    imagePath: {
      value: "",
      rules: ["urlCheck", "required"],
      errorLog: "",
    },
    height: {
      value: "",
      rules: ["numberRequired", "required"],
      errorLog: "",
    },
    volume: {
      value: "",
      rules: ["numberRequired", "required"],
      errorLog: "",
    },
    floorSurface: {
      value: "",
      rules: ["numberRequired", "required"],
      errorLog: "",
    },
    heating: {
      value: "",
      rules: [{ rule: "minCharacters", value: 5 }, "required"],
      errorLog: "",
    },
    ventilation: {
      value: "",
      rules: [{ rule: "minCharacters", value: 5 }, "required"],
      errorLog: "",
    },
    roof: {
      value: "",
      rules: [{ rule: "minCharacters", value: 5 }, "required"],
      errorLog: "",
    },
    ceiling: {
      value: "",
      rules: [{ rule: "minCharacters", value: 5 }, "required"],
      errorLog: "",
    },
  });
  const [disableButton, setDisableButton] = useState(true);
  const [exception, setException] = useState(false);
  const [response, setResponse] = useState(false);

  const onChangeFunction = (value, fieldName) => {
    setException("");
    const error = validations(value, offer[fieldName].rules);
    setDisableButton(
      error ||
        offer.title.value.length == 0 ||
        offer.price.value.length == 0 ||
        offer.description.value.length == 0 ||
        offer.imagePath.value.length == 0 ||
        offer.height.value.length == 0 ||
        offer.volume.value.length == 0 ||
        offer.floorSurface.value.length == 0 ||
        offer.heating.value.length == 0 ||
        offer.ventilation.value.length == 0 ||
        offer.roof.value.length == 0 ||
        offer.ceiling.value.length == 0 ||
        offer.area.value.length == 0
        ? true
        : false
    );

    setOffer({
      ...offer,
      [fieldName]: {
        ...offer[fieldName],
        value: value,
        errorLog: error,
      },
    });
  };
  const onSubmit = async (e) => {
    e.preventDefault();
    const newOffer = {
      title: offer.title.value,
      price: offer.price.value,
      area: offer.area.value,
      description: offer.description.value,
      imagePath: offer.imagePath.value,
      additionalInfo: {
        height: offer.height.value,
        volume: offer.volume.value,
        floorSurface: offer.floorSurface.value,
        heating: offer.heating.value,
        ventilation: offer.ventilation.value,
        roof: offer.roof.value,
        ceiling: offer.ceiling.value,
      },
    };

    try {
      const res = await axios.post("/offers", newOffer);
      setResponse(res.data.message);
    } catch (ex) {
      console.log(ex.response.data.message);
      setException(ex.response.data.message);
    }
  };

  return (
    <div>
      <h2 id={style.heading1}>DODAJ OFERTĘ</h2>
      <div>
        <form onSubmit={onSubmit} className={style.form}>
          <label className={style.label}>Tytuł oferty</label>
          <input
            className={style.input}
            placeholder="Tutaj podaj tytuł oferty"
            type="text"
            onChange={(e) => onChangeFunction(e.target.value, "title")}
          ></input>
          {offer.title.errorLog ? (
            <label className={style.errorLog}>{offer.title.errorLog}</label>
          ) : (
            <></>
          )}
          <label className={style.label}>Cena</label>
          <input
            className={style.input}
            placeholder="Podaj cenę"
            type="text"
            onChange={(e) => onChangeFunction(e.target.value, "price")}
          ></input>
          {offer.price.errorLog ? (
            <label className={style.errorLog}>{offer.price.errorLog}</label>
          ) : (
            <></>
          )}
          <label className={style.label}>Powierzchnia</label>

          <input
            className={style.input}
            placeholder="Wprowadź powierzchnię budynku"
            type="text"
            onChange={(e) => onChangeFunction(e.target.value, "area")}
          ></input>
          {offer.area.errorLog ? (
            <label className={style.errorLog}>{offer.area.errorLog}</label>
          ) : (
            <></>
          )}
          <label className={style.label}>Opis</label>

          <textarea
            className={style.textArea}
            placeholder="opis produktu..."
            type="text"
            onChange={(e) => onChangeFunction(e.target.value, "description")}
          ></textarea>
          {offer.description.errorLog ? (
            <label className={style.errorLog}>
              {offer.description.errorLog}
            </label>
          ) : (
            <></>
          )}
          <label className={style.label}>Link do zdjęcia</label>

          <input
            className={style.input}
            placeholder="Podaj link do zdjęcia"
            type="text"
            onChange={(e) => onChangeFunction(e.target.value, "imagePath")}
          ></input>
          {offer.imagePath.errorLog ? (
            <label className={style.errorLog}>{offer.imagePath.errorLog}</label>
          ) : (
            <></>
          )}
          <h3 id={style.heading2}>Dodatkowe informacje</h3>
          <label className={style.label}>Wysokość budynku</label>
          <input
            className={style.input}
            placeholder="podaj wysokość budynku"
            type="text"
            onChange={(e) => onChangeFunction(e.target.value, "height")}
          ></input>
          {offer.height.errorLog ? (
            <label className={style.errorLog}>{offer.height.errorLog}</label>
          ) : (
            <></>
          )}
          <label className={style.label}>Kubatura</label>

          <input
            className={style.input}
            placeholder="wprowadź kubature budynku"
            type="text"
            onChange={(e) => onChangeFunction(e.target.value, "volume")}
          ></input>
          {offer.volume.errorLog ? (
            <label className={style.errorLog}>{offer.volume.errorLog}</label>
          ) : (
            <></>
          )}
          <label className={style.label}>Powierzchnia podłóg</label>

          <input
            className={style.input}
            placeholder="wprowadź powierzchnie podłóg"
            type="text"
            onChange={(e) => onChangeFunction(e.target.value, "floorSurface")}
          ></input>
          {offer.floorSurface.errorLog ? (
            <label className={style.errorLog}>
              {offer.floorSurface.errorLog}
            </label>
          ) : (
            <></>
          )}
          <label className={style.label}>Ogrzewanie</label>
          <input
            className={style.input}
            placeholder="Wprowadź rodzaj ogrzewania"
            type="text"
            onChange={(e) => onChangeFunction(e.target.value, "heating")}
          ></input>
          {offer.heating.errorLog ? (
            <label className={style.errorLog}>{offer.heating.errorLog}</label>
          ) : (
            <></>
          )}
          <label className={style.label}>Wentylacja</label>
          <input
            className={style.input}
            placeholder="Typ wentylacji"
            type="text"
            onChange={(e) => onChangeFunction(e.target.value, "ventilation")}
          ></input>
          {offer.ventilation.errorLog ? (
            <label className={style.errorLog}>
              {offer.ventilation.errorLog}
            </label>
          ) : (
            <></>
          )}
          <label className={style.label}>Dach</label>
          <input
            className={style.input}
            placeholder="Podaj rodzaj dachu"
            type="text"
            onChange={(e) => onChangeFunction(e.target.value, "roof")}
          ></input>
          {offer.roof.errorLog ? (
            <label className={style.errorLog}>{offer.roof.errorLog}</label>
          ) : (
            <></>
          )}
          <label className={style.label}>Strop</label>
          <input
            className={style.input}
            placeholder="Wprowadź typ stropu"
            type="text"
            onChange={(e) => onChangeFunction(e.target.value, "ceiling")}
          ></input>
          {offer.ceiling.errorLog ? (
            <label className={style.errorLog}>{offer.ceiling.errorLog}</label>
          ) : (
            <></>
          )}
          {response ? (
            <label className="alert alert-success">{response}</label>
          ) : (
            <></>
          )}
          <button
            disabled={disableButton}
            type="submit"
            className={style.button}
          >
            Zapisz
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddOffer;
