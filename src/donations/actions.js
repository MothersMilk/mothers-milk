import * as actions from './constants';
import donationApi from '../services/donation-api';
import { getStoredToken } from '../services/request';

export function loadDonations() {
  return dispatch => {
    dispatch({
      type: actions.LOAD_DONATOINS,
      payload: donationApi.get()
    });
  };
}

export function addDonation(donation) {
  return dispatch => {
    dispatch({
      type: actions.ADD_DONATION,
      payload: donationApi.add(donation)
    });
  };
}

export function updateDonation(donation) {
  return dispatch => {
    dispatch({
      type: actions.UPDATE_DONATION,
      payload: donationApi.add(donation)
    });
  };
}

export function deleteDonation(id) {
  return dispatch => {
    dispatch({
      type: actions.DELETE_DONATION,
      payload: donationApi.remove(id).then(() => id)
    });
  };
}
