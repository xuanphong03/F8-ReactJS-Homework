import PropTypes from "prop-types";
import { useContext } from "react";
import { toast } from "react-toastify";
import { AppContext } from "~/App";

ProductItem.propTypes = {
  product: PropTypes.object,
};

function ProductItem({ product }) {
  const { dispatch } = useContext(AppContext);

  const handleAddToCart = () => {
    dispatch({
      type: "cart/add",
      payload: {
        id: product._id,
        productId: product._id,
        name: product.name,
        left: product.quantity,
        price: product.price,
      },
    });
    toast.success("Đã thêm sản phẩm vào giỏ hàng");
  };

  return (
    <div className=" bg-white p-3 rounded">
      <div className="w-full aspect-square">
        <img
          src={product.image}
          alt="product thumbnail"
          className="size-full  object-cover rounded-md"
        />
      </div>
      <div className="mt-2 flex flex-col gap-2">
        <h4 className="2xl:text-xl xl:text-lg text-base font-medium">
          {product.name}
        </h4>
        <p className="font-bold text-lg text-red-400">
          {product.price.toLocaleString("en-US", {
            style: "currency",
            currency: "USD",
          })}
        </p>
        <button
          onClick={handleAddToCart}
          className="w-full px-5 py-2 text-white bg-green-500 rounded-md hover:bg-opacity-80 transition-colors"
        >
          Thêm vào giỏ hàng
        </button>
      </div>
    </div>
  );
}

export default ProductItem;
