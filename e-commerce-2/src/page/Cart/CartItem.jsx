import { useDispatch } from "react-redux";
import {
  decreaseProductQty,
  deleteProduct,
  increaseProductQty,
} from "../../redux/slices/cartSlice";
import { toast } from "react-toastify";

function CartItem({ ...product }) {
  const dispatch = useDispatch();

  const handleIncrement = (id) => {
    dispatch(increaseProductQty({ id }));
  };

  const handleDecrement = (id) => {
    if (product.quantity > 1) {
      dispatch(decreaseProductQty({ id }));
    } else if (
      product.quantity === 1 &&
      window.confirm("Bạn chắc chắn muốn xóa sản phẩm này chứ")
    ) {
      dispatch(deleteProduct({ id }));
      toast.success("Xóa sản phẩm thành công");
    }
  };

  const handleRemove = (id) => {
    if (window.confirm("Bạn chắc chắn muốn xóa sản phẩm này chứ")) {
      dispatch(deleteProduct({ id }));
      toast.success("Xóa sản phẩm thành công");
    }
  };

  return (
    <article
      key={product._id}
      className="p-4 rounded-xl border border-solid border-gray-500 space-y-5"
    >
      <div className="flex gap-5">
        <div className="basis-1/4 aspect-square rounded-md overflow-hidden">
          <img
            alt="product image"
            src={product.image}
            className="size-full object-cover"
          />
        </div>
        <div className="basis-3/4">
          <h3 className="text-xl font-bold">{product.name}</h3>
          <div className="flex gap-5 items-center">
            <h4>{product.brand}</h4>
            <h4>{product.category}</h4>
          </div>
          <p>
            Giá:{" "}
            {product.price.toLocaleString("en", {
              style: "currency",
              currency: "USD",
            })}
          </p>
          <p>Còn lại: {product.amount}</p>
        </div>
      </div>
      <div className="flex justify-between items-center">
        <div className="flex text-xl font-bold">
          <button
            onClick={() => handleDecrement(product._id)}
            className={`h-8 w-14 border border-solid border-black ${
              product.quantity === 1 ? "bg-gray-200 text-gray-500" : ""
            }`}
          >
            -
          </button>
          <span className="h-8 w-14 border border-solid border-black flex justify-center items-center">
            {product.quantity}
          </span>
          <button
            onClick={() => handleIncrement(product._id)}
            className="h-8 w-14 border border-solid border-black"
          >
            +
          </button>
        </div>
        <div className="flex items-center gap-5">
          <p className="text-2xl font-bold">
            Tổng: {product.price * product.quantity}
          </p>
          <button
            onClick={() => handleRemove(product._id)}
            className="px-5 py-2 bg-red-500 text-white rounded hover:bg-opacity-80  "
          >
            Xóa sản phẩm
          </button>
        </div>
      </div>
    </article>
  );
}

export default CartItem;
