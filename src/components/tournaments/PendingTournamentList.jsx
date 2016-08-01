import React, { Component } from 'react';
import { ListGroup } from 'react-bootstrap';

import TournamentActions from '../../actions/TournamentActions';
import TournamentStore from '../../stores/TournamentStore';
import PendingTournamentItem from './PendingTournamentItem'

function getPendingTournamentItem(tournament) {
  return (
    <PendingTournamentItem
      key={tournament._id}
      tournament={tournament}
    />
  );
}

// this is a hardcoded id for right now for development purposes.
var ladderId = '5782defdd71d240d2d82c89e';

class PendingTournamentList extends Component {

	constructor() {
    	super();
    	this.state = {
      		pendingTournaments: []
    	}
    	this.onChange = this.onChange.bind(this);
  	}

  componentWillMount() {
	TournamentStore.addChangeListener(this.onChange);
  }

  componentDidMount() {
    TournamentActions.receieveTournamentsFromLadder(ladderId);
  }

  componentWillUnmount() {
  	TournamentStore.removeChangeListener(this.onChange);
  }

  onChange() {
    this.setState({
      pendingTournaments: TournamentStore.getPendingTournaments()
    });
  }


	render() {
		var pendingTournaments;
		if (this.state.pendingTournaments.length > 0) {
			var title = <h4>Pending Tournaments</h4>;

			pendingTournaments = this.state.pendingTournaments.map(function(tournament) { return getPendingTournamentItem(tournament) });
		}

		return (
			<div>
				{title}
		        <ListGroup>
					{pendingTournaments}
				</ListGroup>
			</div>
		);
	}
}

export default PendingTournamentList;