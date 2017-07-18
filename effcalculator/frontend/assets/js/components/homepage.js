/**
 * Created by alvarocbasanez on 13/07/17.
 */

import React, { Component } from 'react';

class Homepage extends Component {

  render() {
    return (

      <div className="Homepage">
          <navbarInstance/>
        <div className="App-header">
          <h2>Welcome to the Neutron detector efficiency calculator</h2>
        </div>
      </div>
    );
  }
}


export default Homepage;