import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'

import "bootstrap/dist/css/bootstrap.min.css";
import "shards-ui/dist/css/shards.min.css"
import "styles/index.scss";

import Routes from 'routes';
import store from 'store';

const App: React.FC = () => {
  return <Provider store={store}>
    <Routes />
  </Provider>;
};

ReactDOM.render(<App />, document.getElementById('root'));

export default App;
