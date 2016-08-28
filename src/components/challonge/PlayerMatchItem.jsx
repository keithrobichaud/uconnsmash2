import React from 'react';
import _ from 'underscore';
import { FormControl, Panel} from 'react-bootstrap'


var PlayerMatchItem = React.createClass({

	propTypes: {
		tournamentId: React.PropTypes.string,
		ladderId: React.PropTypes.string,
		apiKey: React.PropTypes.string,
		player: React.PropTypes.object,
		ladderPlayers: React.PropTypes.array
	},

	guessTag: function() {
		for (var i = 0; i < this.props.ladderPlayers.length; i++) {
			var ladderPlayer = this.props.ladderPlayers[i];

			if (this.props.player.name.toUpperCase() === ladderPlayer.name.toUpperCase()) {
				return {ladderPlayerName: ladderPlayer.name};
			}
		}
	},

	getInitialState: function() {
		return {ladderPlayerName: 'none'};
	},

	getPlayerOption(player) {
		return (
			<option key={player._id} value={player.name} > {player.name} </option>
		);
	},

	handleChange: function(event) {
		this.setState({ladderPlayerName: event.target.value});
		this.props.onChange(event);
	},

	componentDidMount() {
		this.guessTag();
	},

	render: function() {
		var player = this.props.player;
		var playerOptions = [];
		playerOptions.push(<option key={'none'} value={'none'} > None </option>);
		playerOptions.push(<option key={'new'} value={'new'} > Create new player </option>);

		if (this.props.ladderPlayers) {
			var sortedPlayers = _.sortBy(this.props.ladderPlayers, function (player) {return player.name.toUpperCase()});
			sortedPlayers.map(player => { playerOptions.push(this.getPlayerOption(player)) });
		}

		
		var title = <div>
						<div class='text-left'>
						{this.props.player.name}
						</div>
						<h6 class='pull-right'>
						Place: {this.props.player.final_rank}
						</h6>
					</div>;
		var panelClass;
		if (player.name.toUpperCase() === this.state.ladderPlayerName.toUpperCase()) {
			panelClass = 'primary';
		}

		if (this.state.ladderPlayerName === 'new') {
			panelClass = 'success';
		}

		return (

				<Panel header={title} bsStyle={panelClass}>
					<div class='col'>
						<FormControl componentClass="select" value={this.state.ladderPlayerName} ref={'select-' + player.name} placeholder="select" onChange={this.handleChange} >
							{playerOptions}
						</FormControl>
					</div>
				</Panel>

		);
	}

});

module.exports = PlayerMatchItem;