import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { hashHistory, IndexRoute, Router, Route } from 'react-router';
import './index.css';
import store from './src/store';
import Main from './src/root';
import LoginPage from './src/containers/LoginPage';

const rootElement = document.getElementById('root');

ReactDOM.render(
  <Provider store={store}>
    <Router history={hashHistory}>
      <IndexRoute component={LoginPage} />
      <Route path="/" component={LoginPage} />
      <Route path="/home" component={Main} />
      <Route path="/**" component={Main} />
    </Router>
  </Provider>
  , rootElement,
);
