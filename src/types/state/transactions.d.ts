import DatabaseObject from './database';

export default interface TransactionModel extends DatabaseObject{
  amount: number;
  identifier: string;
  notes: string | null;
  pool: number;
  pool_user: number | null;
  title: string | null;
}