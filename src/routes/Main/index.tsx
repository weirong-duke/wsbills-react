import React, {ChangeEvent, FC, useEffect, useState} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import {FaPlusCircle} from 'react-icons/fa'
import {ListGroup, ListGroupItem, Nav, NavItem, NavLink } from "shards-react";

import {getPoolList} from 'actions/pools/pools'

import PoolSlider from 'components/PoolSlider';
import PoolDetails from 'routes/PoolDetails';
import {selectPoolsEntities, selectPoolsResult} from 'selectors/state';

import DispatchProp from 'types/dispatch';
import ReduxState, {PoolModel} from 'types/state';

import './Main.scss';
import {selectParamsPoolId} from "../../selectors/props";

interface ConnectProps{
  poolId: string;
  pools: PoolModel[];
}

type MainProps = ConnectProps & DispatchProp;

const Main: FC<MainProps>= ({dispatch, poolId, pools}) => {
  const [isPoolListOpen, setIsPoolListOpen] = useState<boolean>(true);
  const onMount = () => {
    dispatch(getPoolList());
  };

  useEffect(onMount, []);

  const handleToggleList = (e: ChangeEvent<HTMLInputElement>) => {
    setIsPoolListOpen(!isPoolListOpen);
  };

  return <div className="Main">
    <Nav>
      <NavItem>
        <NavLink active href="#" onClick={handleToggleList}>
          Pools
        </NavLink>
      </NavItem>
    </Nav>
    <div className="main-container">
      <PoolSlider isOpen={isPoolListOpen}>
        <ListGroup>
          <ListGroupItem className="cursor-pointer" onClick={handleToggleList}>Close</ListGroupItem>
          <ListGroupItem className="create-pool cursor-pointer">Create a new pool <FaPlusCircle /></ListGroupItem>
          {pools.map((pool: PoolModel) => <Link onClick={handleToggleList} key={pool.identifier} to={`/pools/${pool.identifier}`}><ListGroupItem className={pool.identifier === poolId ? 'selected' : ''}>{pool.name}</ListGroupItem></Link>)}
        </ListGroup>
      </PoolSlider>
      <PoolDetails />
    </div>


  </div>
};

export default connect((state: ReduxState, props) => {
  const poolsResults = selectPoolsResult(state);
  const poolsEntities = selectPoolsEntities(state);
  const pools = poolsResults.map(id => poolsEntities[id]);
  const poolId = selectParamsPoolId(state, props);
  return {
    poolId,
    pools
  }
})(Main);
