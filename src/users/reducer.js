import * as actions from './constants';

export default function (state = [], { type, payload }) {
  switch(type) {
    case actions.USER_CREATED:
      return [
        ...state,
        payload
      ];
    case actions.LOAD_USERS:
      return payload;
    case actions.DELETE_USER:
      return state.filter(user => user._id !== payload);
    case actions.UPDATE_USER:
      return state.map(user => user._id === payload._id ? { ...user, ...payload } : user);
    case actions.LOGOUT: 
      return [];
    default:
      return state;
  } 
}  