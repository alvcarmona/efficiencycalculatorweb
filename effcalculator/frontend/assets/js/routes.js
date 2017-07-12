/**
 * Created by alvarocbasanez on 11/07/17.
 */
import React from 'react';
import { Router, Route, hashHistory, IndexRoute } from 'react-router-dom';
import App from './components/App';

// Use hashHistory for easier development
const routes = (
  <Router history={hashHistory}>
    <Route path="/" component={App}>
    </Route>
  </Router>
);

export default routes;