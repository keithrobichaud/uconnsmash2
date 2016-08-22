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
				<h5 className="text-center">{this.props.tournament.name}</h5>
				<hr/>
				<div className="text-center" >
					<Button bsStyle="success" onClick={this.submitTournament.bind(this, this.props)}>Submit</Button>
				</div>
			</ListGroupItem>
		);
	}
}

export default TournamentSmallView;