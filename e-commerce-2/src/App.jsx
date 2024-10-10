import { Fragment } from "react";
import Header from "./layouts/Header";
import DefaultLayout from "./layouts/DefaultLayout";
import { Route, Routes } from "react-router-dom";
import Cart from "./page/Cart";
import ProductDetails from "./page/ProductDetails";
import ProductList from "./page/ProductList";
import ScrollTop from "./components/scrolls/ScrollTop";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <Fragment>
      <ScrollTop />
      <Header />
      <DefaultLayout>
        <Routes>
          <Route path="products/:page" element={<ProductList />} />
          <Route path="details/:name/:id" element={<ProductDetails />} />
          <Route path="cart" element={<Cart />} />
          <Route path="*" element={<ProductList />} />
        </Routes>
      </DefaultLayout>
      <ToastContainer
        position="top-center"
        autoClose={2000}
        closeOnClick={true}
      />
    </Fragment>
  );
}

export default App;
