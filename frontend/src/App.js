import React, { useReducer } from "react";
import "./App.css";
import { Footer } from "./Components/Footer/Footer";
import Header from "./Components/Header/Header";
import Layout from "./Components/Layout/Layout";
import Menu from "./Components/Menu/Menu";
import HomePage from "./pages/HomePage/HomePage";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ContactPage from "./pages/ContactPage/ContactPage";
import LoginPage from "./pages/LoginPage/LoginPage";
import AboutAsPage from "./pages/AboutAsPage/AboutsAsPage";
import Project from "./pages/Project/Project";
import ShoppingCard from "./pages/ShoppingCard/ShoppingCard";
import { AuthContext } from "./Hooks/Auth/useAuth";

import { Reducer, InitialState } from "./Reducer";
import { ReducerContext } from "./Context/Context";
import RegisterPage from "./pages/RegisterPage/RegisterPage";
import MyProfile from "./pages/MyProfile/MyProfile";
import ProtectedRoute from "./Components/ProtectedRoute/ProtectedRoute";
import AdminPage from "./pages/Admin/AdminPage";
import AdminPanel from "./pages/Admin/AdminPanel/AdminPanel";
import SearchPage from "./pages/SearchPage/SearchPage";

function App() {
  const header = <Header />;
  const menu = <Menu />;
  const footer = <Footer />;
  const [state, dispatch] = useReducer(Reducer, InitialState);
  /*
  const Routes = [
    {
      path: "/",
      element: HomePage,
    },
  ];
  {Routes.map((route) => (
    <Route exact path={route.path} element={route.element} />
  ))}
*/

  const content = (
    <div>
      <Routes>
        <Route exact path="/oferty/:id" element={<Project />} />
        <Route exact path="/kontakt" element={<ContactPage />} />
        <Route exact path="/logowanie" element={<LoginPage />} />
        <Route exact path="/rejestracja" element={<RegisterPage />} />
        <Route exact path="/o-nas" element={<AboutAsPage />} />
        <Route exact path="/koszyk" element={<ShoppingCard />} />
        <Route exact path="/admin/*" element={<AdminPage />} />
        <Route exact path="/admin/panel/*" element={<AdminPanel />} />
        <Route exact path="/szukaj/:term" element={<SearchPage />} />
        <Route element={<ProtectedRoute />}>
          <Route path="/moj-profil/*" element={<MyProfile />} />
        </Route>
        <Route exact path="/" element={<HomePage />} />
      </Routes>
    </div>
  );

  return (
    <Router>
      <AuthContext.Provider
        value={{
          user: state.user,
          isAuthenticated: state.isAuthenticated,
          login: (user) => dispatch({ type: "login", user }),
          logout: () => dispatch({ type: "logout" }),
        }}
      >
        <ReducerContext.Provider
          value={{
            state: state,
            dispatch: dispatch,
          }}
        >
          <Layout
            header={header}
            menu={menu}
            footer={footer}
            content={content}
          />
        </ReducerContext.Provider>
      </AuthContext.Provider>
    </Router>
  );
}

export default App;
