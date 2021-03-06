import AppDispatcher from '../dispatcher/AppDispatcher';
import TournamentConstants from '../constants/TournamentConstants';
import { EventEmitter } from 'events';

const CHANGE_EVENT = 'change';

let _tournaments = [];
let _pendingTournaments = [];
let _tournament = {};
let _newTournament = {};

function setTournaments(tournaments) {
	_tournaments = tournaments.filter(tournament => tournament.submitted);
	_pendingTournaments = tournaments.filter(tournament => !tournament.submitted);
}

function addTournament(tournament) {
	_pendingTournaments.push(tournament);
}

function setTournament(tournament) {
	_tournament = tournament
}

function setNewTournament(tournament) {
	_newTournament = tournament
}

function removePendingTournament(tournament) {
	_pendingTournaments = _pendingTournaments.filter(pending => pending._id !== tournament._id);
}

class TournamentStoreClass extends EventEmitter {

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

	getNewTournament() {
		return _newTournament;
	}

	getPendingTournaments() {
		return _pendingTournaments;
	}

}

const TournamentStore = new TournamentStoreClass();

TournamentStore.dispatchToken = AppDispatcher.register(action => {
	switch(action.actionType) {
		case TournamentConstants.RECEIVE_TOURNAMENTS:
			setTournaments(action.tournaments);
			TournamentStore.emitChange();
			break;

		case TournamentConstants.RECEIVE_TOURNAMENT:
			setTournament(action.tournament);
			TournamentStore.emitChange();
			break;

		case TournamentConstants.CREATE_TOURNAMENT_SUCCESS:
			setNewTournament(action.tournament);
			addTournament(action.tournament);
			TournamentStore.emitChange();
			break;

		case TournamentConstants.SUBMIT_TOURNAMENT_SUCCESS:
			removePendingTournament(action.tournament);
			TournamentStore.emitChange();
			break;

		case TournamentConstants.RECEIVE_TOURNAMENTS_ERROR:
			alert(action.message);
			TournamentStore.emitChange();
			break;

		case TournamentConstants.RECEIVE_TOURNAMENT_ERROR:
			alert(action.message);
			TournamentStore.emitChange();
			break;

		case TournamentConstants.SUBMIT_TOURNAMENT_ERROR:
			alert(action.message);
			TournamentStore.emitChange();
			break;

		default:
	}

});

export default TournamentStore;