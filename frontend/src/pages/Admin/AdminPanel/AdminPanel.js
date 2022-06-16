import { useEffect, useState } from "react";
import { NavLink, Route, Routes } from "react-router-dom";
import axios from "../../../axios";
import useAuth from "../../../Hooks/Auth/useAuth";

import { useNavigate } from "react-router-dom";

import AddOffer from "./AddOffer/AddOffer";
import styles from "./AdminPanel.module.css";
import OrdersManagement from "./OrdersManagement/OrdersManagement";
import ProjectsPanel from "./ProjectsPanel/ProjectsPanel";

const AdminPanel = (props) => {
  const [auth, setAuth] = useAuth();
  const navigate = useNavigate();
  return (
    <>
      {auth && auth.admin ? (
        <div className={styles.adminPanel}>
          <div className={styles.panel}>
            <div className={styles.adminPages}>
              <NavLink to={``} id={styles.profile}>
                Zamówienia użytkowników
              </NavLink>
              <NavLink to={`dodaj-oferte`} id={styles.orders}>
                Dodaj ofertę
              </NavLink>
              <NavLink to={`edytuj-oferte`} id={styles.orders}>
                Edytuj/usuń ofertę
              </NavLink>
            </div>
            <Routes>
              <Route path="dodaj-oferte" element={<AddOffer />} />
              <Route path="/" element={<OrdersManagement />} />
              <Route path="edytuj-oferte" element={<ProjectsPanel />} />
            </Routes>
          </div>
        </div>
      ) : (
        <>
          <h2 className="alert alert-danger">
            Nie można wyswietlić - nie jesteś administratorem
          </h2>
        </>
      )}
    </>
  );
};
export default AdminPanel;
