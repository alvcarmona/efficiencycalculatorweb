/**
 * Created by alvarocbasanez on 11/07/17.
 */
import React from 'react';
import App from './components/App';

// Use hashHistory for easier development
const routes = (
  <Router history={hashHistory}>
    <Route path="/" component={App}>
    </Route>
  </Router>
);

export default routes;