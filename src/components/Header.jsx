import React, { Component } from 'react';
import { Nav, Navbar, NavItem, Header, Brand } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

import AuthActions from '../actions/AuthActions';
import AuthStore from '../stores/AuthStore';

class HeaderComponent extends Component {

  constructor() {
    super();
    this.state = {
      authenticated: AuthStore.isAuthenticated(),
      isAdmin: AuthStore.isAdmin()
    }
    this.login = this.login.bind(this);
    this.logout = this.logout.bind(this);
  }

  login() {
    this.props.lock.show((err, profile, token) => {
      if (err) {
        alert(err);
        return;
      }
      AuthActions.logUserIn(profile, token);
      this.setState({
        authenticated: true,
        isAdmin: AuthStore.isAdmin()
      });
    });
  }

  logout() {
    AuthActions.logUserOut();
    this.setState({
      authenticated: false,
      isAdmin: null
    });
  }

  render() {
    return (
      <Navbar>
        <Navbar.Header>
          <LinkContainer to="/#">
            <Navbar.Brand>UConn Smash</Navbar.Brand>
          </LinkContainer>
        </Navbar.Header>
        <Nav>
          <LinkContainer to="/ladder">
            <NavItem>Ladder</NavItem>
          </LinkContainer>
          <LinkContainer to="/tournaments">
            <NavItem>Tournaments</NavItem>
          </LinkContainer>
          { this.state.isAdmin ? (
            <LinkContainer to="/admin">
              <NavItem>Admin</NavItem>
            </LinkContainer>
          ) : null}
        </Nav>
        <Nav pullRight>
          { !this.state.authenticated ? (
            <NavItem onClick={this.login}>Login</NavItem>
          ) : (
            <NavItem onClick={this.logout}>Logout</NavItem>
          )}
        </Nav>

      </Navbar>
    );
  }
}

export default HeaderComponent;