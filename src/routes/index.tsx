import React, {FC, useEffect} from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import Main from "routes/Main";

const Routes: FC = () => {
  const authenticate = () => {

  };
  return <Router>
    <Route path={["/pools/:poolId/transactions/:transactionId", "/pools/:poolId?"]} component={Main} />
    {/*<Route path="/" component={Main} />*/}

  </Router>
};



export default Routes;
