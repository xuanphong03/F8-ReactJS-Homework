import { useDispatch, useSelector } from "react-redux";
import CartItem from "./CartItem";
import { Link } from "react-router-dom";
import { Fragment } from "react";
import { pay } from "../../redux/slices/cartSlice";
import { toast } from "react-toastify";

function Cart() {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  const total = cart.reduce((total, product) => {
    return total + product.quantity * product.price;
  }, 0);

  const handlePayment = () => {
    dispatch(pay());
    toast.success("Thank you!");
  };

  return (
    <div>
      <h1 className="uppercase text-center font-bold text-4xl tracking-widest text-slate-700 mb-5">
        Shopping Cart
      </h1>
      <div className="space-y-5">
        {cart.length > 0 ? (
          <Fragment>
            <div className="space-y-5">
              {cart.map((product) => (
                <CartItem key={product._id} {...product} />
              ))}
            </div>
            <h2 className="font-bold text-4xl text-center">
              Total:{" "}
              {total.toLocaleString("en", {
                style: "currency",
                currency: "USD",
              })}
            </h2>
            <div className="flex items-center gap-5 justify-center">
              <Link
                to="/products"
                className="px-5 py-2 bg-green-500 text-white rounded hover:bg-opacity-80"
              >
                Quay về trang chủ
              </Link>
              <button
                onClick={handlePayment}
                className="px-5 py-2 bg-blue-500 text-white rounded hover:bg-opacity-80"
              >
                Thanh toán giỏ hàng
              </button>
            </div>
          </Fragment>
        ) : (
          <div className="flex flex-col items-center justify-center">
            <h2>Không có gì trong giỏ hàng</h2>
            <Link
              to="/products"
              className="bg-green-500 flex w-fit px-5 py-2 text-white rounded"
            >
              Quay trở về trang chủ
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}

export default Cart;
