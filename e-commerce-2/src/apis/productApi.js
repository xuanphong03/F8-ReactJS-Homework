import axiosClient from "./axiosClient";

const productApi = {
  getAll(params) {
    const endpoint = "/products";
    return axiosClient.get(endpoint, { params });
  },
  get(id) {
    const endpoint = `/products/${id}`;
    return axiosClient.get(endpoint);
  },
};

export default productApi;
