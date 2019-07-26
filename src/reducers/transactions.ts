import reducerCreator from './abstract/reducerCreator';
import {TransactionSchemaName} from 'utils/normalizrModels';

const transactionReducer = reducerCreator(TransactionSchemaName);

export default transactionReducer;