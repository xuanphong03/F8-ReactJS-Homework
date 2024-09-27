import axiosClient from "./axiosClient";

const orderApi = {
  create(payload) {
    const url = `/orders`;
    return axiosClient.post(url, payload);
  },
};

export default orderApi;
