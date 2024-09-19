import axiosClient from './axiosClient';

const todoApi = {
  get(id) {
    const url = `/todos/${id}`;
    return axiosClient.get(url);
  },
  getAll(params) {
    const url = '/todos';
    return axiosClient.get(url, { params });
  },
  create(payload) {
    const url = '/todos';
    return axiosClient.post(url, payload);
  },
  update(id, payload) {
    const url = `/todos/${id}`;
    return axiosClient.patch(url, payload);
  },
  delete(id) {
    const url = `/todos/${id}`;
    return axiosClient.delete(url);
  },
};

export default todoApi;
