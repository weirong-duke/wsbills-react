import {combineReducers} from 'redux';
import pools from './pools';
import poolUsers from './poolUsers';
import users from './users';

const appReducer = combineReducers({
  pools,
  poolUsers,
  users
});

export default appReducer;
