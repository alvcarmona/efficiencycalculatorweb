import {compose, createStore, applyMiddleware} from 'redux';

import rootReducer from './reducers';
import thunkMiddleware from 'redux-thunk';


import {createLogger} from 'redux-logger'

const loggerMiddleware = createLogger()

const createAppStore = compose(
    applyMiddleware(thunkMiddleware, loggerMiddleware)
)(createStore);



export default function configureStore(preloadedState) {
  return createStore(
    rootReducer,
    preloadedState,
    applyMiddleware(
      thunkMiddleware,
      loggerMiddleware
    )
  )
}