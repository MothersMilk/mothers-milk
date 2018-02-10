import * as actions from './constants';
import authApi from '../services/authApi';
import { getStoredToken } from '../services/request';
import { removeAllListeners } from '../donations/actions';

export function checkForToken() {
  return dispatch => {
    const token = getStoredToken();

    if (!token) {
      dispatch({ type: actions.CHECKED_TOKEN });
      return;
    }

    dispatch({ type: actions.GOT_TOKEN, payload: token });

    return authApi.verify()
      .then(id => authApi.getUser())
      .then(user => dispatch({ type: actions.FETCHED_USER, payload: user }))
      .catch(error => dispatch({ type: actions.AUTH_FAILED , payload: error }));
  };
}

export function signin(credentials) {
  return dispatch => {
    return authApi.signin(credentials)
      .then(({ token }) => dispatch({ type: actions.GOT_TOKEN, payload: token }))
      .then(user => dispatch({ 
        type: actions.FETCHED_USER, 
        payload: authApi.verify().then(id => authApi.getUser(id)) 
      }));
  };
}

// export function signup(credentials) {
//   return {
//     type: actions.USER_CREATED,
//     payload: authApi.signup(credentials)
//   };
// }

export function signup(credentials) {
  return dispatch => {
    return authApi.signup(credentials)
      .then(({ token, newUser }) => dispatch({ type: actions.USER_CREATED, payload: newUser }));
  };
}

// export function signup(credentials) {
//   return dispatch => {
//     dispatch({ type: actions.LOADING });
//     return authApi.signup(credentials)
//       .then(({ token, newUser }) => dispatch({ type: actions.USER_CREATED, payload: newUser }))
//       .then(() => dispatch({ type: actions.DONE_LOADING }))
//       .catch(error => dispatch({ type: actions.ERROR , payload: error }));
//   };
// }

export function signout(){
  return dispatch => {
    dispatch({ type: actions.LOGOUT });
    removeAllListeners();
  };
}