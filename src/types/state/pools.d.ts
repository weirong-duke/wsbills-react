import DatabaseObject from './database';

export default interface PoolModel extends DatabaseObject{
  name: string;
  date_added: string;
  description: string;
  identifier: string;
  pool_users?: number[];
}
