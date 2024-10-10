import { Link, useNavigate, useParams } from "react-router-dom";
import productApi from "../../apis/productApi";
import { Fragment, useEffect, useState } from "react";
import ProductDetailsSkeleton from "./ProductDetailsSkeleton";
import { useDispatch } from "react-redux";
import { addProduct } from "../../redux/slices/cartSlice";
import { toast } from "react-toastify";

function ProductDetails() {
  const dispatch = useDispatch();
  const { id } = useParams();
  const navigate = useNavigate();
  const [productDetails, setProductDetails] = useState({});
  const [loading, setLoading] = useState(true);

  const getProductDetails = async () => {
    try {
      setLoading(true);
      const { code, data } = await productApi.get(id);
      if (code === 200) {
        console.log(data);
        setProductDetails(data);
      }
    } catch (error) {
      navigate("/");
      throw new Error("Failed to get product details");
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCart = () => {
    dispatch(addProduct(productDetails));
    toast.success("Thêm sản phẩm thành công");
  };

  useEffect(() => {
    getProductDetails();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  return (
    <Fragment>
      {loading && <ProductDetailsSkeleton />}
      {!loading && (
        <div className="flex justify-center gap-20 items-center">
          <div className="basis-1/2">
            <div className="ml-auto w-3/4 aspect-square p-5 border rounded border-solid border-slate-700 ">
              <img
                alt="product image"
                src={productDetails?.image}
                className="w-full"
              />
            </div>
          </div>
          <div className="basis-1/2 text-slate-700 flex flex-col justify-between gap-10">
            <div>
              <h1 className="font-bold text-4xl mb-1">
                {productDetails?.name}
              </h1>
              <h2 className="mb-1">
                Loại sản phẩm: {productDetails?.category}
              </h2>
              <h3 className="mb-1">Thương hiệu: {productDetails?.brand}</h3>
              <p className="mb-5">{productDetails?.description}</p>
              <h4 className="font-bold text-2xl">
                Giá:{" "}
                {productDetails.price &&
                  productDetails.price.toLocaleString("en", {
                    style: "currency",
                    currency: "USD",
                  })}
              </h4>
            </div>
            <div className="flex items-center gap-4">
              <Link to="/products">
                <button className="px-4 py-2 text-white bg-blue-500 hover:opacity-80 transition-all rounded">
                  Quay về trang chủ
                </button>
              </Link>
              <button
                onClick={handleAddToCart}
                className="px-4 py-2 text-white bg-green-500 hover:opacity-80 transition-all rounded"
              >
                Thêm vào giỏ hàng
              </button>
            </div>
          </div>
        </div>
      )}
    </Fragment>
  );
}

export default ProductDetails;
