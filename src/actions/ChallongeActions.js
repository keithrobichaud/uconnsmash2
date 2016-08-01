import AppDispatcher from '../dispatcher/AppDispatcher';
import ChallongeConstants from '../constants/ChallongeConstants';
import ChallongeAPI from '../utils/ChallongeAPI';

var urlBase = 'http://uconnsmash.com:3000/challonge/'

export default {
	receiveTournaments: (apiKey) => {
		ChallongeAPI
      		.getTournaments(urlBase + apiKey + '/tournaments')
			.then(tournaments => {
				AppDispatcher.dispatch({
					actionType: ChallongeConstants.RECEIVE_CHALLONGE_TOURNAMENTS,
					tournaments: tournaments
				});
			})
			.catch(message => {
				AppDispatcher.dispatch({
					actionType: ChallongeConstants.RECEIVE_CHALLONGE_TOURNAMENTS_ERROR,
					message: message
				});
			});
	},

	getChallongeTournament: (apiKey, tournamentId) => {
		ChallongeAPI
			.getTournament(urlBase + apiKey + '/tournaments/' + tournamentId)
			.then(tournament => {
				AppDispatcher.dispatch({
					actionType: ChallongeConstants.RECEIVE_CHALLONGE_TOURNAMENT,
					tournament: tournament.tournament
				});
			})
			.catch(message => {
				AppDispatcher.dispatch({
					actionType: ChallongeConstants.RECEIVE_CHALLONGE_TOURNAMENT_ERROR,
					message: message
				});
			});
	},

	getChallongeTournamentMatches: (apiKey, tournamentId) => {
		ChallongeAPI
			.getTournament(urlBase + apiKey + '/tournaments/' + tournamentId + '/matches')
			.then(matches => {
				AppDispatcher.dispatch({
					actionType: ChallongeConstants.RECEIVE_CHALLONGE_TOURNAMENT_MATCHES,
					matches: matches
				});
			})
			.catch(message => {
				AppDispatcher.dispatch({
					actionType: ChallongeConstants.RECEIVE_CHALLONGE_TOURNAMENT_MATCHES_ERROR,
					message: message
				});
			});
	},

	getChallongeTournamentParticipants: (apiKey, tournamentId) => {
		ChallongeAPI
			.getTournament(urlBase + apiKey + '/tournaments/' + tournamentId + '/participants')
			.then(participants => {
				AppDispatcher.dispatch({
					actionType: ChallongeConstants.RECEIVE_CHALLONGE_TOURNAMENT_PARTICIPANTS,
					participants: participants
				});
			})
			.catch(message => {
				AppDispatcher.dispatch({
					actionType: ChallongeConstants.RECEIVE_CHALLONGE_TOURNAMENT_PARTICIPANTS_ERROR,
					message: message
				});
			});
	}

}