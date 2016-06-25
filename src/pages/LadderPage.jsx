import React, { Component } from 'react';

import LadderTableView from '../components/LadderTableView'

class LadderPage extends Component {


  render() {
    return (
    	<div>
    		<h1>Smash Ladder</h1>
      		<LadderTableView />
      	</div>
    );
  }
}

export default LadderPage;