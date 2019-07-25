import State from 'types/state';

export const selectPoolsEntities = (state: State) => state.pools.entities;
export const selectPoolsResult = (state: State) => state.pools.result;
export const selectPoolUsersEntities = (state: State) => state.poolUsers.entities;
export const selectUsersEntities = (state: State) => state.users.entities;