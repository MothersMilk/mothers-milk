import { request } from './request';

export default {
  get(id) {
    const path = id ? `/supplies/${id}` : '/supplies';
    return request.get(path);
  },

  add(supply) {
    return request.post('/supplies', supply);
  },

  update(supply) {
    return request.put(`/supplies/${supply._id}`, supply);
  },

  remove(id) {
    return request.delete(`/supplies/${id}`);
  }

};