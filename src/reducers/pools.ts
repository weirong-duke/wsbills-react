import reducerCreator from './abstract/reducerCreator';
import {PoolSchemaName} from 'utils/normalizrModels';

const poolsReducer = reducerCreator(PoolSchemaName);

export default poolsReducer;