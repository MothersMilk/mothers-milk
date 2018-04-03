import { request } from './request';

export default {
  get(id) {
    const path = id ? `/supplies/${id}` : '/supplies';
    return request.get(path);
  },

  getMy() {
    return request.get('/supplies/me');
  },

  add(supply) {
    return request.post('/supplies', supply);
  },

  update(supply) {
    return request.update(`/supplies/${supply._id}`, supply);
  },

  remove(id) {
    return request.delete(`/supplies/${id}`);
  }

};