import React, {FC, useEffect, useState} from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router'
import './PoolDetails.scss';
import {selectPoolDetails} from './selectors'

import {getPoolDetails} from 'actions/pools/pools';
import {selectParamsPoolId} from 'selectors/props';
import DispatchProp from 'types/dispatch';
import ReduxState, {PoolModel, PoolUserModel, UserModel} from 'types/state';
import {RouteComponentProps} from 'react-router';
import {Button, Collapse, ListGroup, ListGroupItem} from "shards-react";

interface PoolUsersDetails extends Omit<PoolUserModel, 'user'> {
  user: UserModel | null
}

interface ParentProps {
  isPoolListOpen: boolean;
}

interface ConnectProps {
  pool: PoolModel | undefined;
  poolId: string;
  poolUsers: PoolUsersDetails[]
}

type PoolDetailsProps = ConnectProps & DispatchProp & ParentProps & RouteComponentProps;

const PoolDetails: FC<PoolDetailsProps> = ({dispatch, isPoolListOpen, pool, poolId, poolUsers}) => {
  const [showParticipants, setShowParticipants] = useState<boolean>(true);
  const [detailsOpened, setDetailsOpened] = useState<boolean>(false);

  useEffect(() => {
    dispatch(getPoolDetails(poolId))
  }, [poolId]);

  useEffect(() => {
    if (!isPoolListOpen) {
      setTimeout(() => {
        setDetailsOpened(isPoolListOpen);
      }, 400);
    }
    else {
      setDetailsOpened(true)
    }
  }, [isPoolListOpen]);

  const handleClickToggleShowParticipants = () => {
    setShowParticipants(!showParticipants)
  };

  return poolId && pool ? <div className={`PoolDetails ${detailsOpened ? 'open' : ''}`}>
    <div className="details">
      {/*<h1>{pool.name}</h1>*/}
    <Button className="bg-color-tertiary--dark border-none" theme="success" onClick={handleClickToggleShowParticipants}>{showParticipants ? 'Hide' : 'Show'} Participants</Button>
      <Collapse open={showParticipants}>
        <div className="participants">
          {poolUsers.map(poolUser => {
            return <Button theme="light" outline pill>
              {poolUser.user ? poolUser.user.first_name ? `${poolUser.user.first_name} ${poolUser.user.last_name}` : poolUser.user.email : poolUser.unverified_email}
            </Button>
          })}
        </div>
      </Collapse>
    </div>
  </div> : null;
};

export default withRouter(connect((state: ReduxState, props: RouteComponentProps): ConnectProps => {
  const poolId = selectParamsPoolId(state, props);
  return {
    poolId,
    ...selectPoolDetails(state, props)
  }
})(PoolDetails));

