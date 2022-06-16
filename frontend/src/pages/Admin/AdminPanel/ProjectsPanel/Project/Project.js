import { useState } from "react";
import validations from "../../../../../helpers/validations";
import EditPanel from "../EditPanel/EditPanel";
import style from "./Project.module.css";
import axios from "../../../../../axios";

const Project = (props) => {
  const [show, setShow] = useState(false);
  const [offer, setOffer] = useState({
    title: {
      value: props.title,
      rules: [{ rule: "minCharacters", value: 5 }, "required"],
      errorLog: "",
    },
    price: {
      value: props.price,
      rules: ["numberRequired", "required"],
      errorLog: "",
    },
    area: {
      value: props.area,
      rules: ["numberRequired", "required"],
      errorLog: "",
    },
    description: {
      value: props.description,
      rules: [{ rule: "minCharacters", value: 5 }, "required"],
      errorLog: "",
    },
    imagePath: {
      value: props.imagePath,
      rules: ["urlCheck", "required"],
      errorLog: "",
    },
    height: {
      value: props.additionalInfo.height,
      rules: ["numberRequired", "required"],
      errorLog: "",
    },
    volume: {
      value: props.additionalInfo.volume,
      rules: ["numberRequired", "required"],
      errorLog: "",
    },
    floorSurface: {
      value: props.additionalInfo.floorSurface,
      rules: ["numberRequired", "required"],
      errorLog: "",
    },
    heating: {
      value: props.additionalInfo.heating,
      rules: [{ rule: "minCharacters", value: 5 }, "required"],
      errorLog: "",
    },
    ventilation: {
      value: props.additionalInfo.ventilation,
      rules: [{ rule: "minCharacters", value: 5 }, "required"],
      errorLog: "",
    },
    roof: {
      value: props.additionalInfo.roof,
      rules: [{ rule: "minCharacters", value: 5 }, "required"],
      errorLog: "",
    },
    ceiling: {
      value: props.additionalInfo.ceiling,
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
      const res = await axios.put(`/offers/${props._id}`, newOffer);

      setResponse(res.data.message);
    } catch (ex) {
      console.log(ex);
      // setException(ex.response.data.message);
    }
  };

  const showEdit = () => {
    setShow(!show);
  };

  return (
    <>
      <div className={style.project}>
        <span>{props._id.slice(0, 5)}</span>
        <span>{props.title}</span>
        <div>
          <button
            onClick={showEdit}
            className={`btn btn-warning btn-sm ${style.btn}`}
          >
            Edytuj
          </button>
          <button onClick={props.onDelete} className={`btn btn-danger btn-sm`}>
            Usuń
          </button>
        </div>
      </div>
      {show ? (
        <div>
          <h2 id={style.heading1}>EDYTUJ OFERTĘ</h2>
          <div>
            <form onSubmit={onSubmit} className={style.form}>
              <label className={style.label}>Tytuł oferty</label>
              <input
                className={style.input}
                value={offer.title.value}
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
                value={offer.price.value}
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
                value={offer.area.value}
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
                value={offer.description.value}
                type="text"
                onChange={(e) =>
                  onChangeFunction(e.target.value, "description")
                }
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
                value={offer.imagePath.value}
                type="text"
                onChange={(e) => onChangeFunction(e.target.value, "imagePath")}
              ></input>
              {offer.imagePath.errorLog ? (
                <label className={style.errorLog}>
                  {offer.imagePath.errorLog}
                </label>
              ) : (
                <></>
              )}
              <h3 id={style.heading2}>Dodatkowe informacje</h3>
              <label className={style.label}>Wysokość budynku</label>
              <input
                className={style.input}
                value={offer.height.value}
                type="text"
                onChange={(e) => onChangeFunction(e.target.value, "height")}
              ></input>
              {offer.height.errorLog ? (
                <label className={style.errorLog}>
                  {offer.height.errorLog}
                </label>
              ) : (
                <></>
              )}
              <label className={style.label}>Kubatura</label>

              <input
                className={style.input}
                value={offer.volume.value}
                type="text"
                onChange={(e) => onChangeFunction(e.target.value, "volume")}
              ></input>
              {offer.volume.errorLog ? (
                <label className={style.errorLog}>
                  {offer.volume.errorLog}
                </label>
              ) : (
                <></>
              )}
              <label className={style.label}>Powierzchnia podłóg</label>

              <input
                className={style.input}
                value={offer.floorSurface.value}
                type="text"
                onChange={(e) =>
                  onChangeFunction(e.target.value, "floorSurface")
                }
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
                value={offer.heating.value}
                type="text"
                onChange={(e) => onChangeFunction(e.target.value, "heating")}
              ></input>
              {offer.heating.errorLog ? (
                <label className={style.errorLog}>
                  {offer.heating.errorLog}
                </label>
              ) : (
                <></>
              )}
              <label className={style.label}>Wentylacja</label>
              <input
                className={style.input}
                value={offer.ventilation.value}
                type="text"
                onChange={(e) =>
                  onChangeFunction(e.target.value, "ventilation")
                }
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
                value={offer.roof.value}
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
                value={offer.ceiling.value}
                type="text"
                onChange={(e) => onChangeFunction(e.target.value, "ceiling")}
              ></input>
              {offer.ceiling.errorLog ? (
                <label className={style.errorLog}>
                  {offer.ceiling.errorLog}
                </label>
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
      ) : null}
    </>
  );
};
export default Project;
