import axios from 'axios';
import { toast } from 'react-toastify';
import { StorageKeys } from '~/constant/storage-key';

const axiosClient = axios.create({
  baseURL: 'https://api-todo-ebon.vercel.app/api/v1',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add a request interceptor
axiosClient.interceptors.request.use(
  function (config) {
    // Do something before request is sent
    if (sessionStorage.getItem('api_key')) {
      const apiKey = sessionStorage.getItem('api_key');
      config.headers['X-Api-Key'] = apiKey;
    }
    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  },
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
      sessionStorage.removeItem(StorageKeys.API_KEY);
      sessionStorage.removeItem(StorageKeys.USER);
      if (window.confirm('Đã có lỗi xảy ra. Vui lòng tải lại trang')) {
        location.reload();
      }
    }

    return Promise.reject(error);
  },
);

export default axiosClient;
