import { Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import PrivateRoutes from "./routes/PrivateRoutes";
import Home from "./pages/Home";
import Auth from "./pages/Auth";

import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <div>
      <Routes>
        <Route element={<PrivateRoutes />}>
          <Route path="*" element={<Home />} />
        </Route>
        <Route path="/auth/login" element={<Auth />} />
      </Routes>
      <ToastContainer autoClose={2000} closeOnClick />
    </div>
  );
}

export default App;
