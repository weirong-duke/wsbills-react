import axios from 'axios';
import {Dispatch} from "redux";
import {TransactionModel} from 'types/state';
import {stringify} from 'utils/ajax';
import {setStateModels} from 'utils/models';
import {TransactionSchema, TransactionSchemaName} from 'utils/normalizrModels';

interface TransactionQueryParams extends Partial<TransactionModel> {
  pool__identifier: string;
}

interface TransactionCreateData {
  amount: number;
  notes?: string;
  pool: number;
  pool_user_id: number;
  title?: string;
}

export const getTransactionList = (params?: TransactionQueryParams) => async (dispatch: Dispatch) => {
  try{
    const response = await axios.get(`/transactions${stringify(params)}`, {headers: {'Authorization': `Token 5ebc185993bbd6d20fd9fa225edd98a0331e9a85`}});
    setStateModels(response.data, [TransactionSchema], TransactionSchemaName, dispatch)
    return response;
  }
  catch(e) {
    console.log('error', e)
  }
};

export const getTransactionDetails = (id: string) => async (dispatch: Dispatch) => {
  try {
    const response = await axios.get(`/transactions/${id}`);
    setStateModels(response.data, TransactionSchema, TransactionSchemaName, dispatch);
    return response;
  }
  catch(e) {
    console.log('error', e)
  }
};

export const createTransaction = (data: TransactionCreateData) => async (dispatch: Dispatch) => {
  try {
    const response = await axios.post(`/transactions`, data, {headers: {'Authorization': `Token 5ebc185993bbd6d20fd9fa225edd98a0331e9a85`}});
    console.log('response', response, response.data)
    setStateModels(response.data, TransactionSchema, TransactionSchemaName, dispatch);
    return response;
  }
  catch(e) {
    console.log('error', e)
  }
};
