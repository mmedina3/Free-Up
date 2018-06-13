import React, { Component } from 'react';
// eslint-disable-next-line
import { Navbar, NavItem, Nav, NavDropdown, MenuItem, Button } from 'react-bootstrap';

class Navbars extends Component {
    //the following code is for Auth0

    goTo(route) {
        this.props.history.replace(`/${route}`)
    }

    login() {
        this.props.auth.login();
    }

    logout() {
        this.props.auth.logout();
    }

      constructor(props) {
        super(props);
        this.state = {
          collapse: false,
          isWideEnough: false,
          dropdownOpen: false
        };
        this.onClick = this.onClick.bind(this);
        this.toggle = this.toggle.bind(this);
      }

    onClick() {
        this.setState({
            collapse: !this.state.collapse,
        });
    }

    toggle() {
        this.setState({
            dropdownOpen: !this.state.dropdownOpen
        });
    }

    render() {
        const { isAuthenticated } = this.props.auth;
        return (
            //the following code is for Auth0
            <div>
                <Navbar fluid>
                    <Navbar.Header>
                        <Navbar.Brand>
                            <a href="/">Free Up</a>
                        </Navbar.Brand>
                    </Navbar.Header>
                    <Nav>

                        <NavItem eventKey={2} href="ImageUpload"
                            onClick={this.goTo.bind(this, 'ImageUpload')}
                        > Post Item
                </NavItem>

                        {
                            !isAuthenticated() && (
                                <NavItem eventKey={1} href="#"
                                    onClick={this.login.bind(this)}
                                > Log In
                </NavItem>
                            )
                        }
                        <Nav pullRight>
                            <NavDropdown eventKey={3} title="Account" id="basic-nav-dropdown">
                                {
                                    isAuthenticated() && (

                                        <MenuItem eventKey={3.1}
                                            onClick={this.goTo.bind(this, 'profile')}
                                        > Profile
                  </MenuItem>
                                    )
                                }
                                {
                                    isAuthenticated() && (
                                        <MenuItem eventKey={3.2}
                                            onClick={this.logout.bind(this)}
                                        >
                                            Log Out
                    </MenuItem>
                                    )
                                }
                            </NavDropdown>
                        </Nav>
                    </Nav>
                </Navbar>
            </div>
        );
    }
};

export default Navbars;
