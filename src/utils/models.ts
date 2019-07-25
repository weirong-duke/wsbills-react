import {Dispatch} from "redux";
import {normalize} from 'normalizr';
import {ModelPayload} from 'types/actions';

export const setStateModels = (data, model, mainModelName: string, dispatch: Dispatch) => {
  const {entities, result} = normalize(data, model);
  for (const modelName of Object.keys(entities)) {
    const payload: ModelPayload = {
      entities: entities[modelName]
    };
    if (modelName === mainModelName && result.length) payload.result=result;
    dispatch({
      type: `SET_${modelName}`,
      payload
    })
  }
};