import React, { Component } from 'react';
import { Button, Modal } from 'react-bootstrap';

import TournamentActions from '../../actions/TournamentActions'

var CreateTournamentModal = React.createClass({

	propTypes: {
		isOpen: React.PropTypes.bool,
		onClose: React.PropTypes.func
	},

	close() {
		this.props.onClose();
	},

	createTournament() {
		// this is a hardcoded id for right now for development purposes.
		var ladderId = '57661ba8bcb61e8a0643f231';
		var tournament = {
			name: 'newEvent8',
			date: '2017-9-11',
			competitionType: 'hth'
		}
		TournamentActions.createTournament(ladderId, tournament)
	},

	render() {
		return (
			<Modal show={this.props.isOpen} onHide={this.close}>
				<Modal.Header closeButton>
					<Modal.Title>Create a new Tournament</Modal.Title>
				</Modal.Header>
				<Modal.Body>
				</Modal.Body>
				<Modal.Footer>
					<Button bsStyle="success" onClick={this.createTournament}>Create</Button>
					<Button bsStyle="danger" onClick={this.close}>Close</Button>
				</Modal.Footer>
			</Modal>
		);
	}
});

export default CreateTournamentModal;