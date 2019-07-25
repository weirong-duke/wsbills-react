import React, {FC} from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import Main from "routes/Main";

const Routes: FC = () => {
  return <Router>
    <Route path="/pools/:poolId?" component={Main} />
    {/*<Route path="/" component={Main} />*/}

  </Router>
};



export default Routes;
