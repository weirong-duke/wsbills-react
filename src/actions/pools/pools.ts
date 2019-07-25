import axios from 'axios';
import {PoolSchema, PoolSchemaName} from 'utils/normalizrModels';
import {PoolModel} from 'types/state';
import {Dispatch} from "redux";
import {setStateModels} from 'utils/models';


export const getPoolList = (params?: Partial<PoolModel>) => async (dispatch: Dispatch) => {
  try{
    const response = await axios.get('/pools');
    setStateModels(response.data, [PoolSchema], PoolSchemaName, dispatch)
    return response;
  }
  catch(e) {
    console.log('error', e)
  }
};

export const getPoolDetails = (id: string) => async (dispatch: Dispatch) => {
  try {
    const response = await axios.get(`/pools/${id}`);
    setStateModels(response.data, PoolSchema, PoolSchemaName, dispatch);
    return response;
  }
  catch(e) {
    console.log('error', e)
  }
};