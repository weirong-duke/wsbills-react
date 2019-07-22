import {Dispatch} from "redux";
import {normalize} from 'normalizr';

export const setStateModels = (data, model, modelName: string, dispatch: Dispatch) => {
  const {entities, result} = normalize(data, model);
  dispatch({
    type: `SET_${modelName}`,
    payload: {
      entities: entities[modelName],
      result
    }
  })
};