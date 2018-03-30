import { request } from './request';

export default {
  get(id) {
    const path = id ? `/donations/${id}` : '/donations';
    return request.get(path);
  },
  
  getMy() {
    return request.get('/donations/me');
  },

  removeMy(id) {
    return request.delete(`/donations/me/${id}`);
  },

  updateMy(donation) {
    return request.update(`/donations/me/${donation._id}`, donation);
  },

  add(donation) {
    return request.post('/donations', donation);
  },

  update(donation) {
    return request.update(`/donations/${donation._id}`, donation);
  },

  remove(id) {
    return request.delete(`/donations/${id}`);
  }
};