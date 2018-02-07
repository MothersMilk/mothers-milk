import * as actions from './constants';
import supplyRequestApi from '../services/supplyRequest-api';

export function loadSupplyRequest() {
  return { 
    type: actions.LOAD_SUPPLIES,
    payload: supplyRequestApi.get()
  };
}

export function requestSupply(supply) {
  return {
    type: actions.REQUEST_SUPPLIES,
    payload: supplyRequestApi.add(supply)
  };
}

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