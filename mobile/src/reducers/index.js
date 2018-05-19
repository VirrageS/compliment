import { createStore, applyMiddleware, combineReducers, compose } from 'redux'
// import thunk from 'redux-thunk'

import devices from './devices';
import messages from './messages';
import rootSaga from '../sagas';

import createSagaMiddleware from 'redux-saga'

const reducer = combineReducers({
  messages,
  devices,
});

const sagaMiddleware = createSagaMiddleware();

const middleware = applyMiddleware(sagaMiddleware);
// const middleware = applyMiddleware(thunk);

export default function createAppStore(initialValue = {}) {
  let store

  if (process.env.NODE_ENV === 'development') {
    // Development mode with Redux DevTools support enabled.
    const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
      // Prevents Redux DevTools from re-dispatching all previous actions.
      shouldHotReload: false,
    }) : compose
    // Create the redux store.
    store = createStore(reducer, initialValue, composeEnhancers(middleware))
  } else {
    // Production mode.
    store = createStore(reducer, initialValue, middleware)
  }

//   sagaMiddleware.run(rootSaga);
//  return store
  console.log("root saga: ", rootSaga);
  return { store, callback: () => sagaMiddleware.run(rootSaga) }
}
