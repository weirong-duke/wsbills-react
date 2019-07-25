import {ModelPayload} from 'types/actions';
import {DefaultState} from 'types/state';

const DEFAULT_STATE = {
  entities: {},
  result: []
};

const reducerCreator = (model: string) => (state: DefaultState = DEFAULT_STATE, action: {type: string, payload: ModelPayload}) => {
  switch (action.type) {
    case `SET_${model}`:
      const newResult = action.payload.result || state.result;
      return {
        entities: {
          ...state.entities,
          ...action.payload.entities
        },
        result: newResult
      };
  }
  return state;
};

export default reducerCreator;