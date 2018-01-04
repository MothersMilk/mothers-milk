import { DROPSITE_ADD, DROPSITE_DELETE, DROPSITES_LOAD, DROPSITE_UPDATE, LOGOUT } from './constants';

export function dropSites(state = [], { type, payload }) {
  switch(type) {
    case DROPSITES_LOAD: 
      return payload;
    case DROPSITE_ADD:
      return [
        ...state,
        payload
      ];
    case DROPSITE_DELETE:
      return state.filter(dropSite => dropSite._id !== payload);
    case DROPSITE_UPDATE:
      return state.map(dropSite => dropSite._id === payload._id ? { ...dropSite, ...payload } : dropSite);
    case LOGOUT: 
      return [];
    default:
      return state;
  } 
}  