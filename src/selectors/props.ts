import {RouteComponentProps} from 'react-redux';
import {createSelector} from 'reselect';


export const selectParams = (_, props: RouteComponentProps) => props.match.params;
export const selectParamsPoolId = createSelector(
  selectParams,
  (params) => {
    return params.poolId
  }
);