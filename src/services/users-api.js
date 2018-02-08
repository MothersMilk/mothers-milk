import { request } from './request';

export default {
  get(id) {
    const path = id ? `/users/${id}` : '/users';
    return request.get(path);
  },

  add(user) {
    return request.post('/users', user);
  },

  update(user) {
    return request.update(`/users/${user._id}`, user);
  },

  updateMe(user) {
    return request.update('/users/me', user);
  },

  remove(id) {
    return request.delete(`/users/${id}`);
  }
};