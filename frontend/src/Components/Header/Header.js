import { NavLink } from "react-router-dom";
import style from "./Header.module.css";
import { MdShoppingCart } from "react-icons/md";
import useAuth from "../../Hooks/Auth/useAuth";
import { useState } from "react";

function Header(props) {
  const [auth, setAuth] = useAuth();
  const [show, setShow] = useState(false);
  const logout = (e) => {
    e.preventDefault();
    setAuth(false);
  };

  const showMenu = (e) => {
    e.preventDefault();
    setShow(!show);
  };

  return (
    <div className={style.header}>
      <div>
        <NavLink exact to="/">
          {" "}
          <img className={style.logo} src="/home.png" />
        </NavLink>
      </div>
      <ul className={style.header1}>
        <li className={show ? style.menuItemToggle : style.menuItem}>
          <NavLink
            exact
            to="/"
            className={(navData) =>
              navData.isActive ? style.menuItemActive : ""
            }
          >
            Home
          </NavLink>
        </li>
        {auth ? (
          <>
            <li className={show ? style.menuItemToggle : style.menuItem}>
              <NavLink
                exact
                to="/moj-profil"
                className={(navData) =>
                  navData.isActive ? style.menuItemActive : ""
                }
              >
                Mój profil
              </NavLink>
            </li>
            <li className={show ? style.menuItemToggle : style.menuItem}>
              <NavLink
                exact
                to="/"
                onClick={logout}
                className={(navData) =>
                  navData.isActive ? style.menuItemActive : ""
                }
              >
                Wyloguj się
              </NavLink>
            </li>
          </>
        ) : (
          <li className={show ? style.menuItemToggle : style.menuItem}>
            <NavLink
              exact
              to="/logowanie"
              className={(navData) =>
                navData.isActive ? style.menuItemActive : ""
              }
            >
              Zaloguj się
            </NavLink>
          </li>
        )}

        <li className={show ? style.menuItemToggle : style.menuItem}>
          <NavLink
            exact
            to="/koszyk"
            className={(navData) =>
              navData.isActive ? style.menuItemActive : ""
            }
          >
            <MdShoppingCart /> Koszyk
          </NavLink>
        </li>
      </ul>
      <div onClick={(e) => showMenu(e)} className={style.menu}>
        <div className={style.menu1}>
          <div className={style.menuLine}></div>
          <div className={style.menuLine}></div>
          <div className={style.menuLine}></div>
        </div>
        <span>menu</span>
      </div>
    </div>
  );
}

export default Header;
