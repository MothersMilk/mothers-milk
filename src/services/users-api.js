import api from './api';
const settings = {
  headers: {
    Authorization: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVhMzA0OWE5YjliNWJlMzlhNjQ4OTA2YyIsInJvbGVzIjpbImFkbWluIl0sImlhdCI6MTUxMzExNDE3Mn0.NfQ9Z-DeSopMDbSVthr5Z_31u-Ygy82KuKMNeSVBVw4'
  }
};

export default {
  get(id, options = {}) {
    const path = id ? `/users/${id}` : '/users';
    return api.get(path, { ...settings, ...options });
  },

  add(user) {
    return api.post('/users', user);
  },

  update(user) {
    return api.put(`/users/${user._id}`, user);
  },

  remove(id) {
    return api.delete(`/users/${id}`);
  }
};
