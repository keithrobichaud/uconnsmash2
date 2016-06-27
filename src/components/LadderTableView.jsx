import React, { Component } from 'react';
import { ListGroup } from 'react-bootstrap';

import PlayerActions from '../actions/PlayerActions';
import PlayerStore from '../stores/PlayerStore';
import LadderCell from './LadderCell'

function getLadderCell(player, rank) {
  return (
    <LadderCell
      rank={rank}
      key={player._id}
      player={player}
    />
  );
}

// this is a hardcoded id for right now for development purposes.
var ladderId = '57661ba8bcb61e8a0643f231';

class LadderTableView extends Component {

	constructor() {
    	super();
    	this.state = {
      		players: []
    	}
    	this.onChange = this.onChange.bind(this);
  	}

  componentWillMount() {
		PlayerStore.addChangeListener(this.onChange);
  }

  componentDidMount() {
    PlayerActions.receivePlayersFromLadder(ladderId);
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
      ladderCells = this.state.players.map(function(player, i) { return getLadderCell(player, i) });
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