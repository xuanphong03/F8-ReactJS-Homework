import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { addProduct } from "../../redux/slices/cartSlice";
import { toast } from "react-toastify";

function ProductItem(product) {
  const dispatch = useDispatch();

  const handleAddToCart = () => {
    dispatch(addProduct(product));
    toast.success("Thêm sản phẩm thành công");
  };

  return (
    <div className="px-4 py-2 rounded-md border border-solid border-slate-700">
      <div className="w-full flex flex-col gap-2 items-center">
        <Link
          to={`/details/name~${product.name}/${product._id}`}
          className="flex items-center justify-center w-full aspect-video"
        >
          <img
            className="max-w-full scale-90 hover:scale-100 transition-all object-cover rounded"
            src={product.image}
            alt="product image"
          />
        </Link>
        <h3 className="font-semibold text-xl">{product.name}</h3>
      </div>
      <div className="flex justify-between items-center mt-2">
        <p className="medium text-lg">
          {product.price.toLocaleString("en", {
            style: "currency",
            currency: "USD",
          })}
        </p>
        <button
          onClick={handleAddToCart}
          className="px-4 py-2 text-white rounded bg-green-500 hover:bg-opacity-80 transition-all"
        >
          Add to cart
        </button>
      </div>
    </div>
  );
}

export default ProductItem;
