import axiosClient from "./_axiosClient";

const taskApi = {
  get() {
    const url = "/tasks";
    return axiosClient.get(url);
  },
  post(payload) {
    const url = "/tasks";
    return axiosClient.post(url, payload);
  },
};

export default taskApi;
