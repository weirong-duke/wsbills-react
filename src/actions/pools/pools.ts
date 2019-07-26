import axios from 'axios';
import {Dispatch} from "redux";
import {PoolModel} from 'types/state';
import {stringify} from 'utils/ajax';
import {setStateModels} from 'utils/models';
import {PoolSchema, PoolSchemaName} from 'utils/normalizrModels';

export const getPoolList = (params?: Partial<PoolModel>) => async (dispatch: Dispatch) => {
  try{
    const response = await axios.get(`/pools${stringify(params)}`);
    setStateModels(response.data, [PoolSchema], PoolSchemaName, dispatch);
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