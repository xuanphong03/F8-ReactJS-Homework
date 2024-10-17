import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

function PrivateRoutes() {
  const { apiKey } = useSelector((state) => state.auth);
  return apiKey ? <Outlet /> : <Navigate to={"/auth/login"} />;
}

export default PrivateRoutes;
