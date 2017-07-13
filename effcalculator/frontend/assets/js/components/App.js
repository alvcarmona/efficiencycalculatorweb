import React, { Component } from 'react';
import Homepage from  './homepage'
import DetectorEfficiencyCalculator from '../components/DetectorEfficiencyCalculator';
import logo from '../../img/logo.svg';
import '../../styles/App.css';
import { Route, Switch } from 'react-router-dom'

class App extends Component {

  render() {
    return (

      <div className="App">
        <div className="App-header">
         <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to the Neutron detector efficiency calculator</h2>
        </div>
        <div>
             <Switch>
                 <Route path='/frontend/homepage' component={Homepage}/>
                <Route path='/frontend/detectors' component={DetectorEfficiencyCalculator}/>
             </Switch>
        </div>
      </div>
    );
  }
}

export default App;