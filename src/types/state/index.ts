import PoolModel from 'types/state/pools';
import PoolUserModel from 'types/state/poolUsers';
import UserModel from 'types/state/users';

export interface DefaultState {
  entities: {
    [key: number]: any
  }
  result: number[];
}

interface ModelState<Model> {
  entities: {
    [key: number]: Model
  }
  result: number[];
}

export type PoolModel = PoolModel;
export type PoolsState = ModelState<PoolModel>
export type PoolUserModel = PoolUserModel;
export type PoolUsersState = ModelState<PoolUserModel>;
export type UserModel = UserModel;
export type UsersState = ModelState<UserModel>

interface ReduxState {
  pools: PoolsState;
  poolUsers: PoolUsersState;
  users: UsersState;
};

export default ReduxState;