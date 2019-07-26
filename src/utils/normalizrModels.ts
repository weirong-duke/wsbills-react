import {schema} from 'normalizr';

export const PoolSchemaName = 'POOLS';
export const PoolUserSchemaName = 'POOL_USERS';
export const TransactionSchemaName = 'TRANSACTIONS';
export const UserSchemaName = 'USERS';

export const UserSchema = new schema.Entity(UserSchemaName);

export const PoolUserSchema = new schema.Entity(PoolUserSchemaName, {user: UserSchema});
export const PoolSchema = new schema.Entity(PoolSchemaName, {pool_users: [PoolUserSchema]});
export const TransactionSchema = new schema.Entity(TransactionSchemaName, {pool: PoolSchema, pool_user: PoolUserSchema});