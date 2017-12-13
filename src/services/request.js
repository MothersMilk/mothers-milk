import store from '../store/store';
import { API_URL } from './constants';
import superagent from 'superagent';

let token = '';

const storage = window.localStorage;

store.subscribe(() => {
  const { token: newToken } = store.getState().auth;
  console.log('Store updated!, it\'s', store.getState());
  if(newToken !== token) {
    token = newToken;
    token ? storage.token = token : storage.clear('token');
  }
});

export const getStoredToken = () => storage.token;

const wrap = cmd => cmd 
  .set('Authorization', token)
  .then(
    res => res.body,
    ({ response }) => {
      const { body, text } = response;
      const error = body ? body.message || body.error || body : text;
      throw error;
    }
  );


export const request = {
  get(url) {
    return wrap(superagent.get(`${API_URL}${url}`));
  }, 
  post(url, data) {
    return wrap(superagent.post(`${API_URL}${url}`).send(data));
  } 
};







