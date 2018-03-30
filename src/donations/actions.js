import * as actions from './constants';
import { UPDATE_USER } from '../users/constants';
import donationApi from '../services/donationApi';
import usersApi from '../services/usersApi';
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

export function removeMyDonation(id) {
  return dispatch => {
    dispatch({
      type: actions.DELETE_DONATION,
      payload: donationApi.removeMy(id).then(() => id)
    });
  };
}

export function addDonation(donation) {
  return dispatch => {
    dispatch({
      type: actions.ADD_DONATION,
      payload: donationApi.add(donation)
    });
    dispatch({
      type: UPDATE_USER,
      payload: usersApi.updateMe({ myDropSite: donation.dropSite })
    });
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