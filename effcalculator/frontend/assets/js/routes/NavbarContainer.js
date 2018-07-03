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
                        <Link to={`/`}>DECal</Link>
                    </Navbar.Brand>
                    <Navbar.Toggle/>
                </Navbar.Header>
                <Navbar.Collapse>
                    <Nav>
                        <NavItem className="NavbarItem">
                            <Link className="NavbarLink" to="/detectors/">Detectors</Link>
                        </NavItem>
                        <NavItem className="NavbarItem">
                            <Link className="NavbarLink" to="/explanation/">Explanation</Link>
                        </NavItem>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>

        );
    }
}

export default NavbarContainer;