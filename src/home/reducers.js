import * as actions from './constants';
import { combineReducers } from 'redux';

export default (state = {}, action) => combineReducers({ user, token, error, checkedToken })(state, action);

export function user(state = null, { type, payload }) {
  switch(type) {
    case actions.FETCHED_USER:
      return payload;
    case actions.LOGOUT:
      return null;
    default:
      return state;
  }
}

export function token(state = null, { type, payload }) {
  switch(type) {
    case actions.GOT_TOKEN:
      return payload;
    case actions.LOGOUT:
      return null;
    default:
      return state;
  }
}

export function error(state = null, { type, payload }) {
  switch(type) {
    case actions.GOT_TOKEN:
    case actions.LOGOUT:
    case actions.FETCHED_USER:
      return null;
    default:
      return state;
  }
}

export function checkedToken(state = null, { type, payload }) {
  switch(type) {
    case actions.CHECKED_TOKEN:
    case actions.FETCHED_USER:
      return true;
    default:
      return state;
  }
}