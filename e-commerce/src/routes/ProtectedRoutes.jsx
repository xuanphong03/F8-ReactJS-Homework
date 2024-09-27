import { useSelector } from "react-redux";
import { Outlet, Navigate } from "react-router-dom";

function ProtectedRoutes() {
  const { email } = useSelector((state) => state.user.data);
  const isAuthenticated = !!email;

  return isAuthenticated ? <Outlet /> : <Navigate to="/" />;
}

export default ProtectedRoutes;
