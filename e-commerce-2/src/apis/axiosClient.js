import axios from "axios";

const axiosClient = axios.create({
  baseURL: import.meta.env.VITE_API_EXERCISE_SOPI,
  headers: {
    "Content-Type": "application/json",
  },
});

// Add a request interceptor
axiosClient.interceptors.request.use(
  function (config) {
    // Do something before request is sent

    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

// Add a response interceptor
axiosClient.interceptors.response.use(
  function (response) {
    return response && response.data ? response.data : response;
  },
  function (error) {
    return Promise.reject(error);
  }
);

export default axiosClient;
