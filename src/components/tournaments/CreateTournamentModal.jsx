import React from 'react';
import { Button, Modal, FormGroup, FormControl, ControlLabel } from 'react-bootstrap';

import DatePicker from 'react-bootstrap-date-picker';

import TournamentActions from '../../actions/TournamentActions';

var CreateTournamentModal = React.createClass({

	propTypes: {
		isOpen: React.PropTypes.bool,
		onClose: React.PropTypes.func,
		ladderId: React.PropTypes.string.isRequired
	},

	getInitialState() {
		return {
			nameValue: '',
			dateValue: Date().toString()
		};
	},

	getValidationState() {
		const length = this.state.nameValue.length;
		if (length > 0) return 'success';
		else return 'error';
	},

	handleNameChange(e) {
		this.setState({ nameValue: e.target.value });
	},

	handleDateChange(value) {
		this.setState({ dateValue: value});
	},

	close() {
		this.props.onClose();
	},

	createTournament() {
		var tournament = {
			name: this.state.nameValue,
			date: this.state.dateValue,
			competitionType: 'hth'
		}
		TournamentActions.createTournament(this.props.ladderId, tournament)
		this.close();
	},

	render() {
		return (
			<Modal show={this.props.isOpen} onHide={this.close}>
				<Modal.Header closeButton>
					<Modal.Title>Create a new Tournament</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<form>
						<FormGroup
							controlId="formBasicText"
							validationState={this.getValidationState()}
						>
							<ControlLabel>Name</ControlLabel>
							<FormControl
								type="text"
								value={this.state.nameValue}
								placeholder="Enter name"
								onChange={this.handleNameChange}
							/>
							<FormControl.Feedback />
        				</FormGroup>
        				<FormGroup>
        					<ControlLabel>Date</ControlLabel>
        					<DatePicker value={this.state.dateValue} onChange={this.handleDateChange} />
        				</FormGroup>
					</form>

				</Modal.Body>
				<Modal.Footer>
					<Button bsStyle="success" onClick={this.createTournament} disabled={this.state.nameValue.length === 0} >Create</Button>
					<Button bsStyle="danger" onClick={this.close} >Close</Button>
				</Modal.Footer>
			</Modal>
		);
	}
});

export default CreateTournamentModal;