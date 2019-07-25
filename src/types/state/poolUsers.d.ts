import DatabaseObject from './database';

export default interface PoolUserModel extends DatabaseObject{
  unverified_email: string | null;
  pool: number;
  user: number | null;
}
