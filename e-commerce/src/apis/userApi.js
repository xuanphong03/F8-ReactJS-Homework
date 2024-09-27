import axiosClient from "./axiosClient";

const userApi = {
  login(data) {
    const url = "/api-key";
    return axiosClient.get(url, { params: data });
  },
  getInfo() {
    const url = "/users/profile";
    return axiosClient.get(url);
  },
};

export default userApi;
