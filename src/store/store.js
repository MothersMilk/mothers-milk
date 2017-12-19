import { applyMiddleware, compose, createStore } from 'redux';
import promiseMiddleware from './promise-middleware';
import thunk from 'redux-thunk';
import rootReducer from './rootReducer';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

// wat?
// const logger = store => next => action => {
//   return next(action);
// };

const store = createStore(
  rootReducer,
  {}, 
  composeEnhancers(
    applyMiddleware(
      thunk,
      promiseMiddleware
    )
  )
);

export default store;