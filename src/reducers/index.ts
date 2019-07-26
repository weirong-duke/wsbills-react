import {combineReducers} from 'redux';
import pools from './pools';
import poolUsers from './poolUsers';
import transactions from './transactions';
import users from './users';

const appReducer = combineReducers({
  pools,
  poolUsers,
  transactions,
  users
});

export default appReducer;
