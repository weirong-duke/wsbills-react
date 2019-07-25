import reducerCreator from './abstract/reducerCreator';
import {UserSchemaName} from 'utils/normalizrModels';

const usersReducer = reducerCreator(UserSchemaName);

export default usersReducer;