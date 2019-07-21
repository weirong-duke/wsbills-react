import React, {FC, useEffect} from 'react';
import {connect} from 'react-redux';
import DispatchProp from 'types/dispatch';

import { ListGroup, ListGroupItem, Nav, NavItem, NavLink } from "shards-react";
import {getPoolList} from 'actions/pools/pools'

interface ConnectProps{

}

type MainProps = ConnectProps & DispatchProp;

const Main: FC<MainProps>= ({dispatch}) => {
  const onMount = () => {
    dispatch(getPoolList());
  };

  useEffect(onMount, []);
  return <div className="App">
    <Nav>
      <NavItem>
        <NavLink active href="#">
          Pools
        </NavLink>
      </NavItem>
    </Nav>
    <header className="App-header">
      <ListGroup>
        <ListGroupItem>Cras justo odio</ListGroupItem>
        <ListGroupItem>Dapibus ac facilisis in</ListGroupItem>
        <ListGroupItem>Morbi leo risus</ListGroupItem>
        <ListGroupItem>Porta ac consectetur ac</ListGroupItem>
        <ListGroupItem>Vestibulum at eros</ListGroupItem>
      </ListGroup>
      <p>
        Edit <code>src/App.tsx</code> and ssdfsffsdsfsfsdfsfsdfsdave to reload.
      </p>
      <a
        className="App-link"
        href="https://reactjs.org"
        target="_blank"
        rel="noopener noreferrer"
      >
        Learn React
      </a>
    </header>
  </div>
};

export default connect(() => ({lallaa: 1}))(Main);
