import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { browserHistory, Router, Route } from 'react-router';
import './index.css';
import store from './src/store';
import Main from './src/root';
import RegisterRecord from './src/root';

const rootElement = document.getElementById('root');

ReactDOM.render(
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path="/" component={Main} />
      <Route path="/register" component={RegisterRecord} />
    </Router>
  </Provider>
  , rootElement,
);
