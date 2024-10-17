import axios from "axios";
import { toast } from "react-toastify";
import { storageKeys } from "../constants/storage-keys";

const axiosClient = axios.create({
  baseURL: import.meta.env.VITE_TRELLO_API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Add a request interceptor
axiosClient.interceptors.request.use(
  function (config) {
    // Do something before request is sent
    if (localStorage.getItem(storageKeys.API_KEY)) {
      const apiKey = localStorage.getItem(storageKeys.API_KEY);
      config.headers["X-Api-Key"] = apiKey;
    }
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
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response && response.data ? response.data : response;
  },
  function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    const { status } = error;
    if (status === 400) {
      const {
        response: {
          data: { message },
        },
      } = error;
      toast.error(message);
    } else if (status === 401) {
      // Hết hạn token
      localStorage.removeItem(storageKeys.API_KEY);
      localStorage.removeItem(storageKeys.COLUMNS);
      localStorage.removeItem(storageKeys.TASKS);
      location.reload();
    }

    return Promise.reject(error);
  }
);

export default axiosClient;
