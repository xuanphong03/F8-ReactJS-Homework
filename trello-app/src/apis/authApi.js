import axiosClient from "./_axiosClient";

const authApi = {
  get(params) {
    const url = "/api-key";
    return axiosClient.get(url, { params });
  },
};

export default authApi;
