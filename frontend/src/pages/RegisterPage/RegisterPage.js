import react, { useState } from "react";
import styles from "./RegisterPage.module.css";
import { FaUser } from "react-icons/fa";
import { NavLink, useNavigate } from "react-router-dom";
import { RiLockPasswordFill } from "react-icons/ri";
import useAuth from "../../Hooks/Auth/useAuth";
import validations from "../../helpers/validations";
import axios from "../../axios";
const RegisterPage = (props) => {
  const [auth, setAuth] = useAuth();
  const [exception, setException] = useState(false);
  const [disableButton, setDisableButton] = useState(true);
  const navigate = useNavigate();
  const [account, setAccount] = useState({
    login: {
      value: "",
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
    setDisableButton(
      error ||
        account.login.value.length == 0 ||
        account.password.value.length == 0
        ? true
        : false
    );

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
    try {
      const res = await axios.post("/users/register", {
        login: account.login.value,
        password: account.password.value,
      });

      setAuth({
        login: account.login.value,
        id: res.data.message.insertedId,
      });
      navigate("/");
    } catch (ex) {
      setException(ex.response.data.message);
    }
  };

  return (
    <div className={styles.RegisterPage}>
      <div className={`container ${styles.register}`}>
        <h2 className={styles.registerText}>Formularz rejestracji</h2>
        <form onSubmit={onSubmit}>
          <div className={styles.inputForm}>
            <label>
              <FaUser /> Wprowadź login
            </label>
            <div>
              <input
                className={`form-control ${styles.inputs}`}
                label="Wprowadź login"
                placeholder="login"
                type="text"
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
              <RiLockPasswordFill /> Wprowadź hasło
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
          {exception ? <div className={styles.exception}>{exception}</div> : ""}
          <button type="submit" disabled={disableButton} id={styles.btn1}>
            ZAŁÓŻ KONTO
          </button>
        </form>
      </div>
    </div>
  );
};

export default RegisterPage;
