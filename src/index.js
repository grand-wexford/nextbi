import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import browserHistory from 'history/createBrowserHistory';
import App from './components/App';
import configureStore from './store/configureStore';
import './index.css';

import WebFontLoader from 'webfontloader';
// import { createStore } from 'redux'
const store = configureStore();
WebFontLoader.load({
  google: {
    families: ['Roboto:300,400,500,700', 'Material Icons'],
  },
});

ReactDOM.render(
  <Provider store={store}><Router history={browserHistory}><App /></Router></Provider>,
  document.getElementById('root')
);
