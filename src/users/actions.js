import * as actions from './constants';
import usersApi from '../services/users-api';

export function loadUsers() {
  return dispatch => {
    dispatch({
      type: actions.LOAD_USERS,
      payload: usersApi.get()
    });
  };
}


export function updateUser(dropSite) {
  return dispatch => {
    dispatch({
      type: actions.UPDATE_USER,
      payload: usersApi.update(dropSite)
    });
  };
}

export function deleteUser(id) {
  return dispatch => {
    dispatch({
      type: actions.DELETE_USER,
      payload: usersApi.remove(id).then(() => id) 
    });
  };
}