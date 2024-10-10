import { Pagination } from "@mui/material";
import { Fragment, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import productApi from "../../apis/productApi";
import SpinnerLoading from "../../components/loadings/SpinnerLoading";
import ProductItem from "./ProductItem";

function ProductList() {
  const navigate = useNavigate();
  const { page } = useParams();

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const [pagination, setPagination] = useState({
    limit: 16,
    page: parseInt(page) || 1,
    total: 0,
  });

  const getProducts = async () => {
    try {
      setLoading(true);
      const { code, data } = await productApi.getAll({
        page: page || 1,
        limit: pagination.limit,
      });
      if (code === 200) {
        setProducts(data.listProduct);
        setPagination({ ...pagination, total: data.totalPage });
      }
    } catch (error) {
      throw new Error("Failed to get all products");
    } finally {
      setLoading(false);
    }
  };

  const handleChangePage = (e, page) => {
    setPagination({ ...pagination, page });
    navigate(`/products/${page}`);
  };

  useEffect(() => {
    getProducts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  useEffect(() => {
    if (!page) {
      navigate("/products/1", { replace: true });
      setPagination({ ...pagination, page: 1 });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  return (
    <div>
      <h1 className="uppercase text-center font-bold text-4xl tracking-widest text-slate-700 mb-5">
        Products
      </h1>
      {loading ? (
        <div className="flex items-center justify-center">
          <SpinnerLoading />
        </div>
      ) : (
        <Fragment>
          <div className="grid grid-cols-12 gap-4">
            {products.map((product) => (
              <article key={product._id} className="col-span-4 2xl:col-span-3">
                <ProductItem {...product} />
              </article>
            ))}
          </div>
          <Pagination
            count={pagination.total}
            page={pagination.page || 1}
            onChange={handleChangePage}
            variant="outlined"
            shape="rounded"
            className="mt-5 flex justify-center"
          />
        </Fragment>
      )}
    </div>
  );
}

export default ProductList;
