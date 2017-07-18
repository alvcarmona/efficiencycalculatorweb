import React, { Component } from 'react';
import Homepage from  './homepage'
import DetectorEfficiencyCalculator from '../components/DetectorEfficiencyCalculator';
import logo from '../../img/logo.svg';
import '../../styles/App.css';
import { Route, Switch, Link } from 'react-router-dom'
import { Navbar, NavItem, NavDropdown, Nav, MenuItem } from 'react-bootstrap'

class App extends Component {

  render() {
    return (

      <div className="App">

        <div>
             <Navbar inverse collapseOnSelect>
                    <Navbar.Header>
                        <Navbar.Brand>
                            <Link to={`/frontend/homepage/`}>Eff calculator</Link>
                        </Navbar.Brand>
                        <Navbar.Toggle />
                    </Navbar.Header>
                    <Navbar.Collapse>
                        <Nav>
                            <NavItem eventKey={1} href="/detectors"><Link to={`/frontend/detectors/`}>Detectors</Link></NavItem>
                      </Nav>
                    </Navbar.Collapse>
                </Navbar>
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