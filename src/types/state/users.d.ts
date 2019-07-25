import DatabaseObject from './database';

export default interface UserModel extends DatabaseObject {
  email: string;
  first_name: string;
  last_name: string;
}
