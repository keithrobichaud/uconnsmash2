import AppDispatcher from '../dispatcher/AppDispatcher';
import TournamentConstants from '../constants/TournamentConstants';
import TournamentAPI from '../utils/TournamentAPI';
import MatchActions from './MatchActions';
import ResultActions from './ResultActions';

// when this gets hosted for real, the anyrank server should be running as well.
var urlBase = 'http://uconnsmash.com:3000/api/';

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

	getTournament: (tournamentId) => {
		TournamentAPI
			.getTournaments(urlBase + 'events/' + tournamentId)
			.then(tournament => {
				AppDispatcher.dispatch({
					actionType: TournamentConstants.RECEIVE_TOURNAMENT,
					tournament: tournament
				});
			})
			.catch(message => {
				AppDispatcher.dispatch({
					actionType: TournamentConstants.RECEIVE_TOURNAMENT_ERROR,
					message: message
				});
			});
	},

	createTournament: (ladderId, tournament) => {
		TournamentAPI
			.createTournament(urlBase + 'ladder/' + ladderId + '/events', tournament)
			.then(tournament => {
				AppDispatcher.dispatch({
					actionType: TournamentConstants.CREATE_TOURNAMENT_SUCCESS,
					tournament: tournament.body,
					message: 'Tournament was successfully created.'
				});
			})
			.catch(message => {
				AppDispatcher.dispatch({
					actionType: TournamentConstants.CREATE_TOURNAMENT_ERROR,
					message: message
				});
			});
	},

	createTournamentWithMatchesAndResults: (ladderId, tournament, matches, results) => {
		TournamentAPI
			.createTournament(urlBase + 'ladder/' + ladderId + '/events', tournament)
			.then(tournament => {
				var tournamentId = tournament.body._id;

				matches.forEach(function (match) {
					MatchActions.createMatch(tournamentId, match);
				});

				results.forEach(function (result) {
					ResultActions.createResult(tournamentId, result);
				});

				TournamentAPI.getTournaments(urlBase + '/events/' + tournamentId)
				.then(tournament => {
					AppDispatcher.dispatch({
						actionType: TournamentConstants.CREATE_TOURNAMENT_SUCCESS,
						tournament: tournament,
						message: 'Tournament was successfully created.'
					});
				})

			})
			.catch(message => {
				AppDispatcher.dispatch({
					actionType: TournamentConstants.CREATE_TOURNAMENT_ERROR,
					message: message
				});
			});
	},

	submitTournament: (tournamentId) => {
		TournamentAPI
			.submitTournament(urlBase + 'events/' + tournamentId + '/submit')
			.then(tournament => {
				AppDispatcher.dispatch({
					actionType: TournamentConstants.SUBMIT_TOURNAMENT_SUCCESS,
					tournament: tournament.body,
					message: 'Tournament was successfully submitted.'
				});
			})
			.catch(message => {
				AppDispatcher.dispatch({
					actionType: TournamentConstants.SUBMIT_TOURNAMENT_ERROR,
					message: message
				});
			});
	}

}