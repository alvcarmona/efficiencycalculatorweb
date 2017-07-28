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
            <p class="skills">  This is the B10 Neutron detector efficiency calculator, a set of python scripts, web app and a graphical user interface designed to calculate, visualize, optimize and compare the efficiency of B10 based neutron detectors.</p>
        </div>
      </div>
    );
  }
}


export default Homepage;