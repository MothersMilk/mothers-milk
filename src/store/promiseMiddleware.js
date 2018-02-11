import { LOADING, DONE_LOADING, ERROR } from '../services/constants';
const isPromise = val => val && typeof val.then === 'function';

export default ({ dispatch }) => next => async action => {
  
  if (!isPromise(action.payload)) return next(action);

  const { type, payload } = action;
  dispatch({ type: LOADING });
  
  try {
    const result = await payload;
    dispatch({ type: DONE_LOADING });    
    dispatch({ 
      type, 
      payload: result
    });
  }
  catch(err) {
    dispatch({
      type: ERROR,
      payload: err
    });
    throw err;
  }
};