import { Pagination } from "@mui/material";
import { useEffect, useMemo, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import productApi from "~/apis/productApi";
import SkeletonProduct from "~/components/skeletons/SkeletonProduct";
import queryString from "query-string";
import ProductItem from "./components/ProductItem";
import { useNavigate } from "react-router-dom";

function ShopPage() {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 12,
    total: 0,
  });

  const queryParams = useMemo(() => {
    const params = queryString.parse(location.search);
    return {
      ...params,
      page: Number.parseInt(params.page) || 1,
      limit: Number.parseInt(params.limit) || 12,
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.search]);

  const getProducts = async () => {
    try {
      setLoading(true);
      const {
        data: { listProduct, totalPage },
      } = await productApi.getAll(queryParams);
      setProducts(listProduct);
      setPagination({ ...pagination, total: totalPage });
    } catch (error) {
      throw new Error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handlePageChange = (event, page) => {
    const filters = {
      ...queryParams,
      page,
    };
    setPagination((prev) => ({ ...prev, page }));
    navigate(`?${queryString.stringify(filters)}`);
  };

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
    });
    getProducts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [queryParams]);

  return (
    <div>
      <div className="flex items-center gap-2 mb-5">
        <div className="h-5 rounded-md w-8 bg-gray-800"></div>
        <h2 className="font-medium">Danh sách sản phẩm</h2>
      </div>
      <div>
        <div className="grid grid-cols-12  gap-10">
          {loading &&
            [...Array(12)].map(() => (
              <article key={uuidv4()} className="col-span-3 p-3 bg-white">
                <SkeletonProduct />
              </article>
            ))}
          {!loading &&
            products.map((product) => {
              return (
                <article
                  key={uuidv4()}
                  className=" 2xl:col-span-3 md:col-span-4 col-span-12"
                >
                  <ProductItem product={product} />
                </article>
              );
            })}
          {!loading && !products.length && (
            <p className="col-span-12 bg-white px-10 py-5 rounded">
              Không có sản phẩm nào
            </p>
          )}
        </div>
      </div>
      <div className="mt-10 mb-5 flex justify-center">
        <Pagination
          count={pagination.total}
          page={pagination.page}
          variant="outlined"
          onChange={handlePageChange}
          shape="rounded"
        />
      </div>
    </div>
  );
}

export default ShopPage;
