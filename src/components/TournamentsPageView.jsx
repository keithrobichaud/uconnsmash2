import React, { Component } from 'react';
import { ListGroup } from 'react-bootstrap';

import TournamentActions from '../actions/TournamentActions';
import TournamentStore from '../stores/TournamentStore';

import TournamentSmallView from '../components/TournamentSmallView'

function getTournamentView(tournament) {
	return (
			<TournamentSmallView
				key={tournament._id}
				tournament={tournament}
			/>
		);
}

// this is a hardcoded id for right now for development purposes.
var ladderId = '57661ba8bcb61e8a0643f231';

class TournamentsPageView extends Component {

	constructor() {
		super();
		this.state = {
			tournaments: []
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
			tournaments: TournamentStore.getTournaments()
		})
	}

	render() {
		let tournamentViews;
		if(this.state.tournaments) {
			tournamentViews = this.state.tournaments.map(tournament => getTournamentView(tournament));
		}
		return (
			<div>
				<ListGroup>
					{tournamentViews}
				</ListGroup>
			</div>
		);
	}
}

export default TournamentsPageView;