import {applyMiddleware, compose, createStore} from 'redux';
import ReduxPromise from 'redux-promise';
import ReduxThunk from 'redux-thunk'

import appReducer from 'reducers';

// @ts-ignore
const composer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  appReducer,
  composer(applyMiddleware(ReduxPromise, ReduxThunk)
  ));

export default store;
