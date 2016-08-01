import React from 'react';
import { Modal, Button } from 'react-bootstrap';

import ChallongeActions from '../../actions/ChallongeActions';
import ChallongeStore from '../../stores/ChallongeStore';
import PlayerActions from '../../actions/PlayerActions';
import PlayerStore from '../../stores/PlayerStore';

import PlayerMatchItem from './PlayerMatchItem';

var MatchPlayersModal = React.createClass({

	propTypes: {
		tournamentId: React.PropTypes.string,
		ladderId: React.PropTypes.string,
		apiKey: React.PropTypes.string.isRequired,
		isOpen: React.PropTypes.bool,
		onClose: React.PropTypes.func
	},

	getInitialState: function() {
		return {
			ladderPlayerMap: {},
			ladderToParticipantMap: {},
			ladderMatches: {}
		};
	},

	componentWillMount() {
		ChallongeStore.addChangeListener(this.onChange);
	},

	componentDidMount() {
		ChallongeActions.getChallongeTournament(this.props.apiKey, this.props.tournamentId);
		ChallongeActions.getChallongeTournamentMatches(this.props.apiKey, this.props.tournamentId);
		ChallongeActions.getChallongeTournamentParticipants(this.props.apiKey, this.props.tournamentId);
		PlayerActions.getPlayers(this.props.ladderId);
	},

	componentWillUnmount() {
		ChallongeStore.removeChangeListener(this.onChange);
	},

	onChange() {
		this.setState({
			tournament: ChallongeStore.getTournament(),
			ladderPlayers: PlayerStore.getPlayers()
		});
	},

	close() {
		this.props.onClose();
	},

	getPlayerElement: function(player) {
		var player = player.participant;
		return <PlayerMatchItem key={player.name} onChange={this.setPlayerValue.bind(this, player.name)} player={player} ladderPlayers={this.state.ladderPlayers} />;
	},

	// getPlayerMap() {
	// 	PlayerActions.getPlayers(this.props.ladderId);
	// 	console.log(this.state.ladderPlayerMap);
	// 	for (let challongePlayerName in this.state.ladderPlayerMap) {
	// 		var ladderPlayer, ladderPlayerName, ladderPlayerId, challongePlayer, challongePlayerId;
	// 		ladderPlayerId = null;

	// 		ladderPlayerName = this.state.ladderPlayerMap[challongePlayerName];

	// 		if (ladderPlayerName === 'none') {
	// 			continue;
	// 		}

	// 		for (var i = 0; i < this.state.ladderPlayers.length; i++) {
	// 			ladderPlayer = this.state.ladderPlayers[i];
	// 			if (ladderPlayer.name === ladderPlayerName) {
	// 				ladderPlayerId = ladderPlayer._id
	// 			}
	// 		}

	// 		for (var i = 0; i < this.state.tournament.participants.length; i++) {
	// 			challongePlayer = this.state.tournament.participants[i].participant;
	// 			if (challongePlayer.name == challongePlayerName) {
	// 				challongePlayerId = challongePlayer.id
	// 			}
	// 		}
	// 		var obj = this.state.ladderToParticipantMap;
	// 		if (ladderPlayerId) {
	// 			obj[challongePlayerId] = ladderPlayerId;
	// 		}

	// 		this.setState({
	// 			ladderToParticipantMap: obj
	// 		})
	// 	}
	// 	console.log(this.state.ladderToParticipantMap);
	// 	this.getMatches();
	// },

	// getMatches() {
	// 	this.state.tournament.matches.forEach(match => {
	// 		var match = match.match;
	// 		var winnerId = match.winner_id;
	// 		var loserId = match.loser_id;
	// 		var score = match.scores_csv;

	// 		//if both ids are in
	// 		var playerMap = this.state.ladderToParticipantMap;
	// 		if (playerMap.hasOwnProperty(winnerId) && playerMap.hasOwnProperty(loserId)) {

	// 			//add match to ladderMatches
	// 			var obj = this.state.ladderMatches;
	// 			obj[match.id] = {
	// 				winnerId: playerMap[winnerId],
	// 				loserId: playerMap[loserId],
	// 				score: score
	// 			};
	// 			this.setState({
	// 				ladderMatches: obj
	// 			});
	// 		}
	// 	})
	// },

	createPlayer(player) {
		return PlayerActions.createPlayer(this.props.ladderId, player);
	},

	createPlayers() {
		var playerMap = this.state.ladderPlayerMap;
		var newPlayerMap = {};
		Object.keys(playerMap).map(function (key) {
			if (playerMap[key] === 'new') {
				this.createPlayer({name: key});
				newPlayerMap[key] = key;
			} else {
				newPlayerMap[key] = playerMap[key];
			}
		}, this);

		// console.log(newPlayerMap);

		this.setState({
			ladderPlayerMap: newPlayerMap
		});
		this.getPlayerMap();
	},


	saveAndContinue: function(e) {
		e.preventDefault();

		this.createPlayers();

		var data = {
			ladderPlayerMap: this.state.ladderPlayerMap,
			ladderMatches: this.state.ladderMatches,
			ladderPlayers: this.state.ladderPlayers,
			tournament: this.state.tournament
		};

		this.props.saveValues(data);
		// this.props.nextStep();
	},

	setPlayerValue: function (field, event) {
 		var object = this.state.ladderPlayerMap;
 		object[field] = event.target.value;
 		this.setState({ladderPlayerMap: object});
	},

	render: function() {
		if (this.state && this.state.tournament && this.state.tournament.participants) {
			var players = this.state.tournament.participants.map(player => { return this.getPlayerElement(player) });
		}

		return (
			<Modal show={this.props.isOpen} onHide={this.close}>
				<Modal.Header closeButton>
					<Modal.Title>Match Players</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<form>
						{players}
					</form>
				<hr />
				</Modal.Body>
				<Modal.Footer>
					<Button onClick={this.props.previousStep} disabled={false}> Back </Button>
					<Button onClick={this.saveAndContinue} disabled={false}> Continue </Button>
				</Modal.Footer>
			</Modal>
		)
	}

});

module.exports = MatchPlayersModal