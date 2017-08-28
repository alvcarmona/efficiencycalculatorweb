import React, {Component} from 'react';
import '../../styles/App.css';
import {Link} from 'react-router-dom'
import {Navbar, NavItem, Nav} from 'react-bootstrap'

class NavbarContainer extends Component {
    handleSelect(selectedKey) {
    alert('selected ' + selectedKey);
  }
    render() {
        return (

            <Navbar inverse collapseOnSelect className="brand-primary">
                <Navbar.Header>
                    <Navbar.Brand>
                        <Link to={`/frontend/homepage/`}>DECal</Link>
                    </Navbar.Brand>
                    <Navbar.Toggle/>
                </Navbar.Header>
                <Navbar.Collapse>
                    <Nav>
                        <NavItem>
                            <Link to="/frontend/detectors/">Detectors</Link>
                        </NavItem>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>

        );
    }
}

export default NavbarContainer;