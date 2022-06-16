import useAuth from "../../Hooks/Auth/useAuth";
import { ReducerContext } from "../../Context/Context";
import { Navigate, Route, Outlet } from "react-router-dom";
import { useContext } from "react";
const ProtectedRoute = (props) => {
  const auth = useAuth();
  const context = useContext(ReducerContext);
  return context.state.user ? <Outlet /> : <Navigate to="/logowanie" replace />;
};
export default ProtectedRoute;
