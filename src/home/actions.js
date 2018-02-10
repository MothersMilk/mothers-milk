import * as actions from './constants';
import authApi from '../services/authApi';
import { getStoredToken } from '../services/request';
import { removeAllListeners } from '../donations/actions';

export function checkForToken() {
  return dispatch => {
    const token = getStoredToken();

    if(!token) {
      dispatch({ type: actions.CHECKED_TOKEN });
      return;
    }

    dispatch({ type: actions.GOT_TOKEN, payload: token });

    dispatch({
      type: actions.FETCHED_USER,
      payload: authApi.verify().then(id => authApi.getUser(id))
    });
  };
}

export function signin(credentials) {
  return dispatch => {
    return authApi.signin(credentials)
      .then(({ token }) => dispatch({ type: actions.GOT_TOKEN, payload: token }))
      .then(user => dispatch({ 
        type: actions.FETCHED_USER, 
        payload: authApi.verify().then(id => authApi.getUser(id)) 
      }))
      .catch(error => {
        dispatch({ type: actions.ERROR , payload: error });
      });
  };
}

export function signup(credentials) {
  return { type: actions.USER_CREATED, payload: authApi.signup(credentials).then(({ newUser }) => newUser) };
}

export function signout(){
  return dispatch => {
    dispatch({ type: actions.LOGOUT });
    removeAllListeners();
  };
}