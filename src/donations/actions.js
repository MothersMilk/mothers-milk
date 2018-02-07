import * as actions from './constants';
import donationApi from '../services/donation-api';
import io from 'socket.io-client';

const socket = io({ path: '/socket' });

export function loadDonations() {
  return dispatch => {
    dispatch({
      type: actions.LOAD_DONATIONS,
      payload: donationApi.get()
    });
    socket.on('newDonation', donation => {
      dispatch({
        type: actions.ADD_DONATION,
        payload: donation
      });
    }); 
  };
}

export function loadMyDonations() {
  return dispatch => {
    dispatch({
      type: actions.LOAD_DONATIONS,
      payload: donationApi.getMy()
    });
    socket.on('updatedDonation', donation => {
      dispatch({
        type: actions.UPDATE_DONATION,
        payload: donation
      });
    });
  };
}

export function addDonation(donation) {
  return {
    type: actions.ADD_DONATION,
    payload: donationApi.add(donation)
  };
}

export function updateDonation(donation) {
  return {
    type: actions.UPDATE_DONATION,
    payload: donationApi.update(donation)
  };
}

export function deleteDonation(id) {
  return {
    type: actions.DELETE_DONATION,
    payload: donationApi.remove(id).then(() => id)
  };
}

export function removeAllListeners() {
  socket.off('newDonation');
  socket.off('updatedDonation');
}