import React, { Component } from 'react';
import { Jumbotron } from 'react-bootstrap';
import AuthStore from '../stores/AuthStore';


class IndexComponent extends Component {

  constructor() {
    super();
    this.state = {
      authenticated: AuthStore.isAuthenticated()
    }
  }
  render() {
    return (
      <div>
        <h1>Welcome to UConnSmash.com</h1>
          <Jumbotron>
            <h3>2014-2015 Combo Video</h3>
            <iframe width="560" height="315" src="https://www.youtube.com/embed/1iua_B0hwUw" frameborder="0" allowfullscreen></iframe>
          </Jumbotron>
      </div>
    );
  }
}

export default IndexComponent;