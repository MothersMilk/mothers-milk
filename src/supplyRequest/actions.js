import * as actions from './constants';
import supplyRequestApi from '../services/supplyRequestApi';
import io from 'socket.io-client';

const socket = io({ path: '/socket' });

export function loadSupplyRequests() {
  return dispatch => {
    dispatch({ 
      type: actions.LOAD_SUPPLIES,
      payload: supplyRequestApi.get()
    });
    socket.on('newSupplyRequest', supply => {
      dispatch({
        type: actions.ADD_SUPPLIES,
        payload: supply
      });
    });
  };
}

export function loadMySupplyRequests() {
  return dispatch => {
    dispatch({
      type: actions.LOAD_SUPPLIES,
      payload: supplyRequestApi.getMy()
    });
    socket.on('updateSupplyRequest', supply => {
      dispatch({
        type: actions.UPDATE_SUPPLY,
        payload: supply
      });
    });
  };
}

export function addSupplyRequest(supply) {
  return dispatch => {
    dispatch({
      type: actions.ADD_SUPPLIES,
      payload: supplyRequestApi.add(supply)
    });   
  };
}

// export function requestSupply(supply) {
//   return {
//     type: actions.REQUEST_SUPPLIES,
//     payload: supplyRequestApi.add(supply)
//   };
// }

export function updateSupplyRequest(supply) {
  return {
    type: actions.UPDATE_SUPPLY,
    payload: supplyRequestApi.update(supply)
  };
}

export function deleteSupplyRequest(id) {
  return {
    type: actions.DELETE_SUPPLY,
    payload: supplyRequestApi.remove(id).then(() => id)
  };
}

export function removeAllListeners() {
  socket.off('newSupply');
  socket.off('updatedSupply');
}