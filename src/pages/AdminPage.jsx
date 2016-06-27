import React, { Component } from 'react';
import { Button } from 'react-bootstrap';

import CreateTournamentModal from '../components/tournaments/CreateTournamentModal'


var AdminPage = React.createClass({
	propTypes: {
		// children: React.PropTypes.element.isRequired
	},

	getInitialState() {
		return { showTournamentModal: false };
	},

	showTournamentModal() {
		console.log('show modal');
		this.setState({ showTournamentModal: true });
		// return (<CreateTournamentModal/>);
	},

	hideTournamentModal() {
		this.setState({showTournamentModal: false});
	},

	render() {
		// var tournModal = this.getTournamentModal();

		return (
			<div>
				<h1>Admin Dashboard</h1>
				<Button bsStyle="success" onClick={this.showTournamentModal}>Create Tournament</Button>
				{this.state.showTournamentModal ?
					<CreateTournamentModal
						isOpen={this.state.showTournamentModal}
						onClose={this.hideTournamentModal}>
					</CreateTournamentModal>
				: null}
			</div>
		);
	}
});

export default AdminPage;