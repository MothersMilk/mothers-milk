import * as actions from './constants';
import authApi from '../services/authApi';
import { getStoredToken } from '../services/request';

// suggested changes below are based on moving to letting redux promise-middleware handle errors

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
      // no need for verify, token is already good! But you need the user id too, so enhance your signin method!
      .then(() => dispatch({
        type: actions.FETCHED_USER,
        payload: authApi.verify().then(id => authApi.getUser(id))
      }));
  };
}

export function signup(credentials) {
  return {
    type: actions.USER_CREATED,
    payload: authApi.signup(credentials)
  };
}

export function signout(){
  return { type: actions.LOGOUT };
}