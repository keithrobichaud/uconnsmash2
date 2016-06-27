import React, { Component } from 'react';
import { Button } from 'react-bootstrap';

import CreateTournamentModal from '../components/tournaments/CreateTournamentModal'

// this is a hardcoded id for right now for development purposes.
var ladderId = '57661ba8bcb61e8a0643f231';

class AdminPage extends Component {

	constructor() {
		super();
		this.state = {
			showTournamentModal: false
		}
	}

	showTournamentModal = () => {
		this.setState({ showTournamentModal: true });
	}

	hideTournamentModal = () => {
		this.setState({showTournamentModal: false});
	}

	render() {
		return (
			<div>
				<h1>Admin Dashboard</h1>
				<Button bsStyle="success" onClick={this.showTournamentModal}>Create Tournament</Button>
				{this.state.showTournamentModal ?
					<CreateTournamentModal
						isOpen={this.state.showTournamentModal}
						onClose={this.hideTournamentModal}
						ladderId={ladderId} />
				: null}
			</div>
		);
	}
}

export default AdminPage;