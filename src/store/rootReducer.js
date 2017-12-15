import { combineReducers } from 'redux';
import auth from '../home/reducers';
import { dropSites } from '../dropSites/reducer';
import donations from '../donations/reducers';
import users from '../users/reducer';
import { error, loading } from '../services/reducer';

export default combineReducers({
  auth,
  users,
  donations,
  dropSites,
  error,
  loading
});