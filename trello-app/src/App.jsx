import { Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import PrivateRoutes from "./routes/PrivateRoutes";
import Home from "./pages/Home";
import Auth from "./pages/Auth";

import "react-toastify/dist/ReactToastify.css";
import Header from "./layouts/DefaultLayout/Header";
import DefaultLayout from "./layouts/DefaultLayout/DefaultLayout";

function App() {
  return (
    <div>
      <Routes>
        <Route
          element={
            <>
              <Header />
              <DefaultLayout>
                <PrivateRoutes />
              </DefaultLayout>
            </>
          }
        >
          <Route path="*" element={<Home />} />
        </Route>
        <Route path="/auth/login" element={<Auth />} />
      </Routes>
      <ToastContainer autoClose={2000} closeOnClick />
    </div>
  );
}

export default App;
