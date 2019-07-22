const DEFAULT_STATE = {
  entities: {},
  result: []
}

const reducerCreator = (model: string) => (state = DEFAULT_STATE, action) => {
  switch (action.type) {
    case `SET_${model}`:
      return {
        ...state,
        ...action.payload
      };
  }
  return state;
};

export default reducerCreator;