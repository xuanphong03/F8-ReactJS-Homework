import axiosClient from './axiosClient';

const userApi = {
  login(data) {
    const url = '/api-key';
    return axiosClient.get(url, { params: data });
  },
};

export default userApi;
