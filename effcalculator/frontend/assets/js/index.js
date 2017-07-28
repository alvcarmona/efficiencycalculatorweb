

import React from 'react';
import ReactDOM from 'react-dom';
import App from './routes/App';
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux';
import '../../../node_modules/bootstrap/dist/css/bootstrap.css'
import { reduxReactRouter, routerStateReducer, ReduxRouter } from 'react-router-redux';
import configureStore from './modules/store';
import { createLogger } from 'redux-logger'

const store = configureStore();
ReactDOM.render(
    <div id="root">
        <Provider store={store}>
            <BrowserRouter>
                        <App />

            </BrowserRouter>
        </Provider>
    </div>,
   document.querySelector('body')
);



/*
ReactDOM.render(
    <div id="root">
  <h1>Hello, world!</h1></div>,
  document.querySelector('body')
);
*/