import PoolModel from 'types/state/pools';

interface ModelState<Model> {
  entities: {
    [key: number]: Model
  }
  result: number[];
}

export type PoolModel = PoolModel;
export type PoolsState = ModelState<PoolModel>

interface ReduxState {
  pools: PoolsState;
};

export default ReduxState;