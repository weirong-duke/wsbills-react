import State from 'types/state';

export const selectPoolsEntities = (state: State) => state.pools.entities;
export const selectPoolsResult = (state: State) => state.pools.result;