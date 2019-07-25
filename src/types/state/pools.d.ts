import DatabaseObject from './database';

export default interface PoolModel extends DatabaseObject{
  name: string;
  description: string;
  identifier: string;
  pool_users?: number[];
}
