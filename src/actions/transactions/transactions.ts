import axios from 'axios';
import {Dispatch} from "redux";
import {TransactionModel} from 'types/state';
import {stringify} from 'utils/ajax';
import {setStateModels} from 'utils/models';
import {TransactionSchema, TransactionSchemaName} from 'utils/normalizrModels';

interface TransactionQueryParams extends Partial<TransactionModel> {
  pool__identifier: string;
}

export const getTransactionList = (params?: TransactionQueryParams) => async (dispatch: Dispatch) => {
  try{
    const response = await axios.get(`/transactions${stringify(params)}`);
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