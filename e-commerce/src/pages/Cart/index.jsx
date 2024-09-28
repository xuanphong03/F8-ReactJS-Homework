import { v4 as uuidv4 } from "uuid";

import { Fragment, useContext, useState } from "react";
import orderApi from "~/apis/orderApi";
import { AppContext } from "~/App";
import { toast } from "react-toastify";
import LoadingSpinner from "~/components/animations/LoadingSpinner";
import EmptyCart from "~/assets/images/empty_cart.png";

function CartPage() {
  const {
    state: { cart, totalQuantity },
    dispatch,
  } = useContext(AppContext);
  const [loading, setLoading] = useState(false);
  const handleDeleteItem = (id) => {
    if (confirm("Bạn chắc chắn muốn xóa sản phẩm này khỏi giỏ hàng chứ?")) {
      dispatch({ type: "cart/delete", payload: { id } });
      toast.success("Xóa thành công khỏi giỏ hàng");
    }
  };

  const handlePayment = async () => {
    try {
      setLoading(true);
      const response = await orderApi.create(cart);
      if (response.code === 200) {
        dispatch({ type: "cart/payment" });
        toast.success("Thanh toán thành công");
      }
    } catch (error) {
      throw new Error("Failed to create order");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Fragment>
      {loading && (
        <div className="fixed z-50 inset-0 bg-white bg-opacity-20 flex justify-center items-center">
          <LoadingSpinner />
        </div>
      )}
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                Tên sản phẩm
              </th>
              <th scope="col" className="px-6 py-3">
                Số lượng mua
              </th>
              <th scope="col" className="px-6 py-3">
                Còn lại
              </th>
              <th scope="col" className="px-6 py-3">
                Tổng tiền
              </th>
              <th scope="col" className="px-6 py-3">
                Xóa
              </th>
            </tr>
          </thead>
          <tbody>
            {cart.map(({ id, name, left, quantity, price }) => (
              <tr
                key={uuidv4()}
                className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700"
              >
                <th
                  scope="row"
                  className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  {name}
                </th>
                <td className="px-6 py-4">{quantity}</td>
                <td className="px-6 py-4">{left}</td>
                <td className="px-6 py-4">
                  {(quantity * price).toLocaleString("en-US", {
                    style: "currency",
                    currency: "USD",
                  })}
                </td>
                <td className="px-6 py-4">
                  <button
                    onClick={() => handleDeleteItem(id)}
                    className="font-medium text-red-600 dark:text-red-500 hover:underline"
                  >
                    Xóa
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {!cart.length && (
          <div className="flex items-center justify-center">
            <img alt="empty image" src={EmptyCart} />
          </div>
        )}
      </div>
      <div className="flex justify-end mt-5">
        <button
          onClick={handlePayment}
          disabled={!totalQuantity}
          className={`px-5 py-2  text-white rounded ${
            !totalQuantity
              ? "bg-gray-300 cursor-not-allowed"
              : "bg-green-500 hover:opacity-80 cursor-pointer"
          }`}
        >
          Thanh toán giỏ hàng
        </button>
      </div>
    </Fragment>
  );
}

export default CartPage;
