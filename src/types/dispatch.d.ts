import {AnyAction} from 'redux';
import {ThunkDispatch} from 'redux-thunk';

export default interface DispatchProp {
  dispatch: ThunkDispatch<{}, null, AnyAction>;
}
