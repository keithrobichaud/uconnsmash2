import React from 'react';
var SelectChallongeTournamentModal = require('./SelectChallongeTournamentModal')
var MatchPlayersModal  = require('./MatchPlayersModal')
var ConfirmTournamentDetailsModal  = require('./ConfirmTournamentDetailsModal')
var ImportSuccess       = require('./ImportSuccess')

var fieldValues = {
	tournamentId: null,
	playerMap: {}
}

var ChallongeImportModal = React.createClass({

	propTypes: {
		apiKey: React.PropTypes.string.isRequired,
		isOpen: React.PropTypes.bool,
		onClose: React.PropTypes.func,
		ladderId: React.PropTypes.string.isRequired
	},

	getInitialState: function() {
		return {
			step: 1
		}
	},

	saveValues: function(fields) {
		return function() {
			fieldValues = Object.assign({}, fieldValues, fields)
		}()
	},

	nextStep: function() {
		this.setState({
			step : this.state.step + 1
		})
	},

	previousStep: function() {
		this.setState({
			step : this.state.step - 1
		})
	},

	render: function() {
		switch (this.state.step) {
			case 1:
				return <SelectChallongeTournamentModal
					isOpen={this.props.isOpen}
					onClose={this.props.onClose}
					apiKey={this.props.apiKey}
					nextStep={this.nextStep}
					fieldValues={fieldValues}
					saveValues={this.saveValues}
				/>
			case 2:
				return <MatchPlayersModal
					isOpen={this.props.isOpen}
					onClose={this.props.onClose}
					apiKey={this.props.apiKey}
					nextStep={this.nextStep}
					previousStep={this.previousStep}
					tournamentId={fieldValues.tournamentId}
					saveValues={this.saveValues}
					fieldValues={fieldValues}
					ladderId={this.props.ladderId}
				/>
			case 3:
				return <ConfirmTournamentDetailsModal
					apiKey={this.props.apiKey}
					isOpen={this.props.isOpen}
					onClose={this.props.onClose}
					nextStep={this.nextStep}
					previousStep={this.previousStep}
					ladderMatches={fieldValues.ladderMatches}
					saveValues={this.saveValues}
					fieldValues={fieldValues}
					ladderId={this.props.ladderId}
				/>
			case 4:
				return <ImportSuccess onClose={this.props.onClose} />
		}

	}
});

module.exports = ChallongeImportModal;