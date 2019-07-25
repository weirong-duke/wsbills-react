import reducerCreator from './abstract/reducerCreator';
import {PoolUserSchemaName} from 'utils/normalizrModels';

const poolUsersReducer = reducerCreator(PoolUserSchemaName);

export default poolUsersReducer;