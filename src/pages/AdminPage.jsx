import React, { Component } from 'react';
import { Button, ButtonToolbar, Col } from 'react-bootstrap';

import CreateTournamentModal from '../components/tournaments/CreateTournamentModal'
import ChallongeImportModal from '../components/challonge/ChallongeImportModal'
import PendingTournamentList from '../components/tournaments/PendingTournamentList'

import AuthStore from '../stores/AuthStore';

// hardcoded ids for right now for development purposes.
var ladderId = '57c5aa6b7a8711e857b6c8bc';
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
				<Col md={4}>
					<PendingTournamentList />
				</Col>
			</div>
		);
	}
}

export default AdminPage;