import { request } from './request';

export default {
  get(id) {
    const path = id ? `/dropSites/${id}` : '/dropSites';
    return request.get(path);
  },

  add(dropSite) {
    return request.post('/dropSites', dropSite);
  },

  update(dropSite) {
    return request.update(`/dropSites/${dropSite._id}`, dropSite);
  },

  remove(id) {
    return request.delete(`/dropSites/${id}`);
  }
};