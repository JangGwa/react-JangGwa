import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { browserHistory, Router, Route } from 'react-router';
import './index.css';
import store from './src/store';
import Main from './src/root';

const rootElement = document.getElementById('root');

ReactDOM.render(
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path="/" component={Main} />
    </Router>
  </Provider>
  , rootElement,
);
