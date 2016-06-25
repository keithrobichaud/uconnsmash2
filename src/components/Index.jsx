import React, { Component } from 'react';

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
          <h2>Welcome to UConnSmash.com</h2>
      </div>
    );
  }
}

export default IndexComponent;