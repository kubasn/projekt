import react, { useState } from "react";
import styles from "./Login.module.css";
import { FaUser } from "react-icons/fa";
import { NavLink, useNavigate } from "react-router-dom";
import { RiLockPasswordFill } from "react-icons/ri";
import useAuth from "../../Hooks/Auth/useAuth";
import validations from "../../helpers/validations";
import axios from "../../axios";
const LoginPage = (props) => {
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
    setException("");
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
      const res = await axios.post("/users/login", {
        login: account.login.value,
        password: account.password.value,
      });
      setAuth({
        login: account.login.value,
        id: res.data.message._id,
      });
      navigate("/");
    } catch (ex) {
      //console.log(ex.resp)
      setException(ex.response.data.message);
    }
  };

  return (
    <div className={styles.loginPage}>
      <div className={`container ${styles.login}`}>
        <h2 className={styles.loginText}>Formularz logowania</h2>
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
          <div id={styles.registerPage}>
            <NavLink to="/rejestracja">
              Nie masz konta? Zarejestruj się{" "}
            </NavLink>
          </div>
          {exception ? <div className={styles.exception}>{exception}</div> : ""}
          <button type="submit" disabled={disableButton} id={styles.btn1}>
            ZALOGUJ SIĘ
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
