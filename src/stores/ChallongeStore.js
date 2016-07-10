import AppDispatcher from '../dispatcher/AppDispatcher';
import ChallongeConstants from '../constants/ChallongeConstants';
import { EventEmitter } from 'events';

const CHANGE_EVENT = 'change';

let _tournaments = [];
let _tournament = {};

function setTournaments(tournaments) {
	_tournaments = tournaments;
}

function setTournamentDetails(tournament) {
	_tournament.details = tournament;
}

function setTournamentMatches(matches) {
	_tournament.matches = matches;
}

function setTournamentParticipants(participants) {
	_tournament.participants = participants;
}

class ChallongeStoreClass extends EventEmitter {

	emitChange() {
		this.emit(CHANGE_EVENT);
	}

	addChangeListener(callback) {
		this.on(CHANGE_EVENT, callback);
	}

	removeChangeListener(callback) {
		this.removeListener(CHANGE_EVENT, callback);
	}

	getTournaments() {
		return _tournaments;
	}

	getTournament() {
		return _tournament;
	}

}

const ChallongeStore = new ChallongeStoreClass();

ChallongeStore.dispatchToken = AppDispatcher.register(action => {
	switch(action.actionType) {
		case ChallongeConstants.RECEIVE_CHALLONGE_TOURNAMENTS:
			setTournaments(action.tournaments);
			ChallongeStore.emitChange();
			break;

		case ChallongeConstants.RECEIVE_CHALLONGE_TOURNAMENT:
			setTournamentDetails(action.tournament);
			ChallongeStore.emitChange();
			break;

		case ChallongeConstants.RECEIVE_CHALLONGE_TOURNAMENT_MATCHES:
			setTournamentMatches(action.matches);
			ChallongeStore.emitChange();
			break;

		case ChallongeConstants.RECEIVE_CHALLONGE_TOURNAMENT_PARTICIPANTS:
			setTournamentParticipants(action.participants);
			ChallongeStore.emitChange();
			break;

		//Errors
		case ChallongeConstants.RECEIVE_CHALLONGE_TOURNAMENTS_ERROR:
			alert(action.message);
			ChallongeStore.emitChange();
			break;

		case ChallongeConstants.RECEIVE_CHALLONGE_TOURNAMENT_ERROR:
			alert(action.message);
			ChallongeStore.emitChange();
			break;

		case ChallongeConstants.RECEIVE_CHALLONGE_TOURNAMENT_PARTICIPANTS_ERROR:
			alert(action.message);
			ChallongeStore.emitChange();
			break;

		case ChallongeConstants.RECEIVE_CHALLONGE_TOURNAMENT_MATCHES_ERROR:
			alert(action.message);
			ChallongeStore.emitChange();
			break;

		default:
	}

});

export default ChallongeStore;