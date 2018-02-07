import * as actions from './constants';
import { LOAD_DONATIONS } from '../donations/constants';
import usersApi from '../services/users-api';
import donationApi from '../services/donation-api';


export function loadUsers() {
  return {
    type: actions.LOAD_USERS,
    payload: usersApi.get()
  };
}

export function updateUser(dropSite) {
  return {
    type: actions.UPDATE_USER,
    payload: usersApi.update(dropSite)
  };
}

export function deleteUser(id) {
  return dispatch => {
    dispatch({
      type: actions.DELETE_USER,
      payload: usersApi.remove(id).then(() => id) 
    })
      .then(() => {
        return dispatch({
          type: LOAD_DONATIONS,
          payload: donationApi.get()
        });
      });
  };
}