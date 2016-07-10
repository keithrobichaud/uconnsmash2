import React, { Component } from 'react';
import { Router, Route, IndexRoute } from 'react-router';
import Index from './components/Index';
import LadderPage from './pages/LadderPage'
import AdminPage from './pages/AdminPage'
import TournamentsPage from './pages/TournamentsPage'
import PlayerDetail from './components/PlayerDetail';

import AuthStore from './stores/AuthStore';

import App from './components/App';

class Root extends Component {

  requireAdmin(nextState, replace) {
    if (!AuthStore.isAdmin()) {
      replace({
        pathname: '/'
        // state: { nextPathname: nextState.location.pathname }
      })
    }
  }

  render() {
    return (
      <Router history={this.props.history}>
        <Route path='/' component={App}>
          <IndexRoute component={Index}/>
          <Route path='/ladder' component={LadderPage} />
          <Route path='/admin' component={AdminPage} onEnter={this.requireAdmin}/>
          <Route path='/tournaments' component={TournamentsPage} />
          <Route path='/players/:id' component={PlayerDetail} />
        </Route>
      </Router>
    );
  }
}

export default Root;