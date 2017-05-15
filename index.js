import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import './index.css';
import Main from './src/root';
import store from './src/store';

const rootElement = document.getElementById('root');

ReactDOM.render(
  <Provider store={store}>
    <Main />
  </Provider>
  , rootElement,
);
