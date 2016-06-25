import React, { Component } from 'react';
import { ListGroup } from 'react-bootstrap';
// import { Link } from 'react-router';

import PlayerActions from '../actions/PlayerActions';
import PlayerStore from '../stores/PlayerStore';
import LadderCell from './LadderCell'

function getLadderCell(player) {
  return (
    <LadderCell
      key={player._id}
      player={player}
    />
  );
}

class LadderTableView extends Component {

	constructor() {
    	super();
    // For our initial state, we just want
    // an empty array of players
    	this.state = {
      		players: []
    	}
    // We need to bind this to onChange so we can have
    // the proper this reference inside the method
    	this.onChange = this.onChange.bind(this);
  	}

  componentWillMount() {
  		PlayerStore.addChangeListener(this.onChange);
  }

  componentDidMount() {
    PlayerActions.recievePlayers();
  }

  componentWillUnmount() {
  	PlayerStore.removeChangeListener(this.onChange);
  }

  onChange() {
    this.setState({
      players: PlayerStore.getPlayers()
    });
  }


  render() {
    let ladderCells;
    if (this.state.players) {
      // Map over the players and get an element for each of them
      ladderCells = this.state.players.map(player => getLadderCell(player));
    }
    return (
      <div>
        <ListGroup>
          {ladderCells}
        </ListGroup>
      </div>
    );
  }
}

export default LadderTableView;