import styles from "./ProfileDetails.module.css";
import react, { useState } from "react";
import { FaUser } from "react-icons/fa";
import { RiLockPasswordFill } from "react-icons/ri";
import { NavLink, useNavigate, useLocation } from "react-router-dom";
import useAuth from "../../../Hooks/Auth/useAuth";
import validations from "../../../helpers/validations";
import axios from "../../../axios";

const ProfileDetails = (props) => {
  const [auth, setAuth] = useAuth();
  const url = useLocation();
  const [exception, setException] = useState(false);
  const [disableButton, setDisableButton] = useState(false);

  const [account, setAccount] = useState({
    login: {
      value: auth.login,
      rules: [{ rule: "minCharacters", value: 5 }, "required"],
      errorLog: "",
    },
    password: {
      value: "",
      rules: [{ rule: "minCharacters", value: 5 }, "required"],
      errorLog: "",
    },
  });

  const onChangeFunction = (value, fieldName) => {
    const error = validations(value, account[fieldName].rules);
    setDisableButton(error ? true : false);

    setAccount({
      ...account,
      [fieldName]: {
        ...account[fieldName],
        value: value,
        errorLog: error,
      },
    });
  };
  const onSubmit = async (e) => {
    e.preventDefault();
    const res = await axios.put(`users/${auth.id}`, {
      login: account.login.value,
      password: account.password.value,
    });
    setAuth({
      login: account.login.value,
      id: auth.id,
    });
  };
  return (
    <div>
      <form onSubmit={onSubmit}>
        <div className={styles.inputForm}>
          <label>
            <FaUser /> Mój login
          </label>
          <div>
            <input
              className={`${styles.inputs} form-control `}
              label="Wprowadź login"
              placeholder="login"
              type="text"
              value={account.login.value}
              onChange={(e) => onChangeFunction(e.target.value, "login")}
            />
            {account.login.errorLog ? (
              <label className={styles.errorLog}>
                {account.login.errorLog}
              </label>
            ) : (
              <></>
            )}
          </div>
        </div>
        <div className={styles.inputForm}>
          <label>
            <RiLockPasswordFill /> Moje hasło
          </label>
          <input
            className={`form-control ${styles.inputs}`}
            label="hasło"
            type="password"
            placeholder="hasło"
            onChange={(e) => onChangeFunction(e.target.value, "password")}
          />
          {account.password.errorLog ? (
            <label className={styles.errorLog}>
              {account.password.errorLog}
            </label>
          ) : null}
        </div>
        <button type="submit" disabled={disableButton} id={styles.btn1}>
          ZAPISZ DANE
        </button>
      </form>
    </div>
  );
};

export default ProfileDetails;
