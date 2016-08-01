import React, { Component } from 'react';
import { ListGroupItem, Button } from 'react-bootstrap';

import TournamentActions from '../../actions/TournamentActions';

class TournamentSmallView extends Component {

	submitTournament(props) {
		TournamentActions.submitTournament(props.tournament._id);
	}

	render() {
		return (
			<ListGroupItem>
				{this.props.tournament.name}
				<Button bsStyle="success" onClick={this.submitTournament.bind(this, this.props)}>Submit</Button>
			</ListGroupItem>
		);
	}
}

export default TournamentSmallView;