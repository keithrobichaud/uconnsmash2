import AppDispatcher from '../dispatcher/AppDispatcher';
import TournamentConstants from '../constants/TournamentConstants';
import { EventEmitter } from 'events';

const CHANGE_EVENT = 'change';

let _tournaments = [];
let _tournament = {};

function setTournaments(tournaments) {
	_tournaments = tournaments
}

// function setTournament(tournament) {
// 	_tournament = tournament
// }

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

}

const TournamentStore = new TournamentStoreClass();

TournamentStore.dispatchToken = AppDispatcher.register(action => {
	switch(action.actionType) {
		case TournamentConstants.RECEIVE_TOURNAMENTS:
			setTournaments(action.tournaments);
			TournamentStore.emitChange();
			break;

		case TournamentConstants.RECEIVE_TOURNAMENT:
			setTournaments(action.tournament);
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

		default:
	}

});

export default TournamentStore;