import { createSelector } from 'reselect'
import {selectPoolsEntities, selectPoolUsersEntities, selectUsersEntities, selectTransactionsEntities} from 'selectors/state';
import {selectParamsPoolId} from 'selectors/props';

export const selectPoolFromPoolId = createSelector(
  selectParamsPoolId,
  selectPoolsEntities,
  (poolId, pools) => {
    return Object.values(pools).find(pool => pool.identifier === poolId);
  }
);

export const selectTransactionsFromPoolId = createSelector(
  selectPoolFromPoolId,
  selectTransactionsEntities,
  (pool, transactions) => {
    return pool ? Object.values(transactions).filter(transaction => transaction.pool === pool.id) : [];
  }
);

export const selectPoolDetails = createSelector(
  selectPoolFromPoolId,
  selectPoolUsersEntities,
  selectUsersEntities,
  selectTransactionsFromPoolId,
  (pool, poolUsers, users, transactions) => {
    const relatedPoolUsers = pool && pool.pool_users ?
      pool.pool_users.map(poolUserId => {
        const relatedPoolUser = poolUsers[poolUserId];
        const relatedUser = relatedPoolUser.user ? users[relatedPoolUser.user] : null;
        return {
          ...poolUsers[poolUserId],
          user: relatedUser
        }
      }) : [];
    return {
      pool,
      poolUsers: relatedPoolUsers,
      transactions
    }
  }
);
