import style from "./Menu.module.css";
import { useNavigate } from "react-router-dom";
import react, { useState } from "react";
function Menu(props) {
  const [searchTerm, setSearchTerm] = useState("");
  let navigate = useNavigate();

  const search = () => {
    navigate(`/szukaj/${searchTerm}`);
  };

  const keyDownHendler = (e) => {
    if (e.key == "Enter") {
      search();
      if (searchTerm == "") {
        navigate("/");
      }
    }
  };

  return (
    <div>
      <div className={style.menu}>
        <div className={style.menuForm}>
          <p className={style.text}>ZNAJDŹ PROJEKT DOMU</p>
          <input
            className={`${style.search} form-control `}
            type="text"
            placeholder="Podaj nazwę projektu ..."
            onKeyDown={keyDownHendler}
            onChange={(e) => setSearchTerm(e.target.value)}
          ></input>
        </div>
      </div>
    </div>
  );
}

export default Menu;
