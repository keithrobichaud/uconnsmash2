import React, { Component } from 'react';
import { Button, ButtonToolbar } from 'react-bootstrap';

import CreateTournamentModal from '../components/tournaments/CreateTournamentModal'
import ChallongeImportModal from '../components/challonge/ChallongeImportModal'

import AuthStore from '../stores/AuthStore';

// hardcoded ids for right now for development purposes.
var ladderId = '5782defdd71d240d2d82c89e';
var apiKey = 'OTDkq2jLrPvgO7JaTPpq1gSqAe7DFl2Z4GzaCRNw';

class AdminPage extends Component {

	constructor() {
		super();
		this.state = {
			isAdmin: AuthStore.isAdmin(),
			showTournamentModal: false,
			showChallongeModal: false
		}
	}

	showTournamentModal = () => {
		this.setState({ showTournamentModal: true });
	}

	hideTournamentModal = () => {
		this.setState({showTournamentModal: false });
	}

	showChallongeModal = () => {
		this.setState({ showChallongeModal: true });
	}

	hideChallongeModal = () => {
		this.setState({ showChallongeModal: false });
	}

	render() {
		return (
			<div hide={!this.state.isAdmin}>
				<h1>Admin Dashboard</h1>
				<ButtonToolbar>
					<Button bsStyle="success" onClick={this.showTournamentModal}>Create Tournament</Button>
					<Button bsStyle="success" onClick={this.showChallongeModal}>Import from Challonge</Button>
				</ButtonToolbar>

				{this.state.showTournamentModal ?
					<CreateTournamentModal
						isOpen={this.state.showTournamentModal}
						onClose={this.hideTournamentModal}
						ladderId={ladderId} />
				: null}
				{this.state.showChallongeModal ?
					<ChallongeImportModal
						isOpen={this.state.showChallongeModal}
						onClose={this.hideChallongeModal}
						apiKey={apiKey}
						ladderId={ladderId} />
				: null}
			</div>
		);
	}
}

export default AdminPage;