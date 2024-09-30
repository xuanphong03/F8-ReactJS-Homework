import { useSelector } from "react-redux";
import { Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Header from "./layouts/Header";
import AuthPage from "./pages/Auth";
import CartPage from "./pages/Cart";
import ShopPage from "./pages/Shop";
import ProtectedRoutes from "./routes/ProtectedRoutes";
import DefaultLayout from "./layouts/DefaultLayout";
import { createContext, useReducer } from "react";
import { reducer } from "./utils/reducer";
import ErrorPage from "./pages/Error";
import { StorageKeys } from "./constants/storage-key";

export const AppContext = createContext();

function App() {
  const initialState = JSON.parse(localStorage.getItem(StorageKeys.CART)) || {
    items: [],
    totalQuantity: 0,
  };
  const [state, dispatch] = useReducer(reducer, initialState);

  const { email } = useSelector((state) => state.user.data);
  const isAuthenticated = !!email;

  return (
    <div>
      <AppContext.Provider value={{ state, dispatch }}>
        {isAuthenticated && <Header />}
        <DefaultLayout>
          <Routes>
            <Route
              path="/"
              element={isAuthenticated ? <ShopPage /> : <AuthPage />}
            />
            <Route element={<ProtectedRoutes />}>
              <Route path="/cart" element={<CartPage />} />
            </Route>
            <Route path="*" element={<ErrorPage />} />
          </Routes>
          <ToastContainer autoClose={2000} closeOnClick={true} />
        </DefaultLayout>
      </AppContext.Provider>
    </div>
  );
}

export default App;
