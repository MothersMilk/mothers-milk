import * as actions from './constants'; 

export default function supplies(state = [], { type, payload }) {
  switch(type) {
    case actions.LOAD_SUPPLIES:
      return payload;
    case actions.REQUEST_SUPPLIES:
      return [
        ...state,
        payload
      ];
    case actions.DELETE_SUPPLY:
      return state.filter(supply => supply._id !== payload);
    case actions.UPDATE_SUPPLY:
      return state.map(supply => supply._id === payload._id ? { ...supply, ...payload } : supply);
    default:
      return state;
  }
}