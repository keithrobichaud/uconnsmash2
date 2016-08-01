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
var ladderId = '5782defdd71d240d2d82c89e';

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
    PlayerActions.getPlayers(ladderId);
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

      var sortedPlayers = this.state.players.sort(function(a,b) {return (a.trueSkill < b.trueSkill) ? 1 : ((b.trueSkill < a.trueSkill) ? -1 : 0);} );
      ladderCells = sortedPlayers.map(function(player, i) { return getLadderCell(player, i) });
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