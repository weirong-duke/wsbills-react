import {combineReducers} from 'redux';
import pools from './pools';

const appReducer = combineReducers({
  pools
});

export default appReducer;
