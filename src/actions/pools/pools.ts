import axios from 'axios';
import {PoolsModel } from 'types/models';
import {Dispatch} from "redux";

export const getPoolList = (params?) => async (dispatch: Dispatch) => {
  try{
  const response = await axios.get('/pools')
  return response;

  }
  catch(e) {
    console.log('error', e)
  }
};
