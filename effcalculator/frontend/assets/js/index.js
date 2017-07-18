

import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import { BrowserRouter } from 'react-router-dom'
import '../../../node_modules/bootstrap/dist/css/bootstrap.css'

ReactDOM.render(
    <div id="root">
        <BrowserRouter>
                    <App />
        </BrowserRouter>
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