import AppDispatcher from '../dispatcher/AppDispatcher';
import TournamentConstants from '../constants/TournamentConstants';
import TournamentAPI from '../utils/TournamentAPI';

// when this gets hosted for real, the anyrank server should be running as well.
var urlBase = 'http://localhost:3000/api/';

export default {
	receieveTournamentsFromLadder: (ladderId) => {
		TournamentAPI
			.getTournaments(urlBase + 'ladder/' + ladderId + '/events')
			.then(tournaments => {
				AppDispatcher.dispatch({
					actionType: TournamentConstants.RECEIVE_TOURNAMENTS,
					tournaments: tournaments
				});
			})
			.catch(message => {
				AppDispatcher.dispatch({
					actionType: TournamentConstants.RECEIVE_TOURNAMENTS_ERROR,
					message: message
				});
			});
	},

	createTournament: (ladderId, tournament) => {
		TournamentAPI
			.createTournament(urlBase + 'ladder/' + ladderId + '/events', tournament)
			.then(function() {
				AppDispatcher.dispatch({
					actionType: TournamentConstants.CREATE_TOURNAMENT_SUCCESS,
					message: 'Tournament was successfully created.'
				});
			})
			.catch(message => {
				AppDispatcher.dispatch({
					actionType: TournamentConstants.CREATE_TOURNAMENT_ERROR,
					message: message
				});
			});
	}

}