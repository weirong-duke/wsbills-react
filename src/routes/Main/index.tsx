import React, {ChangeEvent, FC, useEffect, useState} from 'react';
import {connect} from 'react-redux';
import {Container, Col, Row, ListGroup, ListGroupItem, Nav, NavItem, NavLink } from "shards-react";

import {getPoolList} from 'actions/pools/pools'
import {selectPoolsEntities, selectPoolsResult} from 'selectors/state';

import DispatchProp from 'types/dispatch';

import ReduxState, {PoolModel} from 'types/state';

import './Main.scss';

interface ConnectProps{
  pools: PoolModel[];
}

type MainProps = ConnectProps & DispatchProp;

const Main: FC<MainProps>= ({dispatch, pools}) => {
  const [poolListOpen, setPoolListOpen] = useState<boolean>(true);
  const onMount = () => {
    dispatch(getPoolList());
  };

  useEffect(onMount, []);

  const handleToggleList = (e: ChangeEvent<HTMLInputElement>) => {
    e && e.preventDefault();
    setPoolListOpen(!poolListOpen);
  };

  console.log('what ', poolListOpen)

  return <div className="Main">
    <Nav>
      <NavItem>
        <NavLink active href="#" onClick={handleToggleList}>
          Pools
        </NavLink>
      </NavItem>
    </Nav>
      <Row>
        <Col sm="12" md="4" lg="3">
          <ListGroup className={`pool-list ${poolListOpen ? 'open' : ''}`}>
            <ListGroupItem onClick={handleToggleList}>Close</ListGroupItem>
            <ListGroupItem className="create-pool">Create a new pool</ListGroupItem>
            {pools.map((pool: PoolModel) => <ListGroupItem>{pool.name}</ListGroupItem>)}
          </ListGroup>
        </Col>
        <Col sm="12" md="8" lg="10">
        </Col>
      </Row>

  </div>
};

export default connect((state: ReduxState, props) => {
  console.log('hmmm', state)
  const poolsResults = selectPoolsResult(state);
  const poolsEntities = selectPoolsEntities(state);
  const pools = poolsResults.map(id => poolsEntities[id]);
  console.log('ppols', pools)
  return {
    pools
  }
})(Main);
