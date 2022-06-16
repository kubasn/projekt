import styles from "./MyProfile.module.css";
import react, { useState } from "react";
import { FaUser } from "react-icons/fa";
import { RiLockPasswordFill } from "react-icons/ri";
import useAuth from "../../Hooks/Auth/useAuth";
import validations from "../../helpers/validations";
import {
  NavLink,
  useNavigate,
  useLocation,
  Routes,
  Route,
  BrowserRouter,
} from "react-router-dom";
import ProfileDetails from "./ProfileDetails/ProfileDetails";
import MyOrders from "./MyOrders/MyOrders";

const MyProfile = (props) => {
  const [auth, setAuth] = useAuth();
  const path = useLocation();
  const [exception, setException] = useState(false);
  const [disableButton, setDisableButton] = useState(true);

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
  const onSubmit = (e) => {
    e.preventDefault();
    setAuth({
      login: account.login.value,
      password: account.password.value,
    });
  };
  return (
    <div className={styles.myProfile}>
      <div className={styles.myAccount}>
        <div className={styles.profilePages}>
          <NavLink to={`/moj-profil`} id={styles.profile}>
            Mój profil
          </NavLink>
          <NavLink to={`zamowienia`} id={styles.orders}>
            Moje zamównienia
          </NavLink>
        </div>
        <div className="mt-3">
          <Routes>
            <Route path="zamowienia" element={<MyOrders />} />
            <Route path="/" element={<ProfileDetails />} />
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default MyProfile;
